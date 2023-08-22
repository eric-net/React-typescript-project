import React,{ useState, useEffect, useCallback,useContext } from "react";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import Header from "../Header/Header";
import "./dashboard.scss";
import DataTable, { defaultThemes, TableColumn } from 'react-data-table-component';
import { UserJobProfileForm as DataRow } from "../../../store/DefaultSettings";
import { Spin } from "../../LoadingSpinner/LoadingSpinner";
import { loginRequest } from "../../../authConfig";
import { fetchApi } from "../../../api/userAPI";
import UserStatus from "../Dashboard/JobStatus/UserStatus";
import MenuButton from "../../../utils/CustomMenu";
import { adminContext } from "../../../store/DefaultSettings";
import Button from '@material-ui/core/Button';


const DataRowArray: DataRow[] = []
const CustomLink = ({ ResumeUrl }: DataRow) => <a href={ResumeUrl} className="link-btn" target="_blank" rel="noopener noreferrer" > View Resume </a>;

const customStyles = {
    rows: {
        style: {
            minHeight: '56px', // override the row height
        },
    },
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize: '15px',
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },

    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize: '15px',
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
            },
        },
    },
};



const Dashboard: React.FC = () => {
    let [tableRowsData, setTableRowsData] = useState(DataRowArray);
    const ctx = useContext(adminContext)
    const [pending, setPending] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>('');


    // Filters
    const [filterByRole, setFilterByRole] = useState<string[]>([]);
    const [exp, setExp] = useState<string[]>([]);
    const [filterByLocation, setFilterByLocation] = useState<string[]>([]);
    const [filterByStatus, setFilterByStatus] = useState<string[]>([]);

    // reset filter and default sort
    const [reset, setReset] = useState<boolean>(false);
    let [defaultSortValue, setDefaultSortValue] = useState<string>('default');
    const [length, setLength] = useState<number>(0);

    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;

    const sendAPIUserRequest = useCallback(() => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        instance.acquireTokenSilent(request).then(async (response) => {
            setAccessToken(response.accessToken);
            const data = await fetchApi(response.accessToken)
            if (data.MessageDetail) {
                throw new Error(`${data.MessageDetail}`)
            }
            const users: DataRow[] = data.userList;
            if (users) {
                setTableRowsData(users);
            }
            setPending(false)
        })
            .catch((err: string) => {
            errorHandlerFn(err.toString());
            setPending(false)
        });
    }, [])

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Added On',
            cell: row => row.AppliedDate,
            grow: .8,
        },
        {
            name: 'Name',
            selector: row => row.FullName,
            grow: 1.1
        },
        {
            name: <MenuButton text="Role" />,
            selector: row => row.JobRole,
            grow: 1.5
        },
        {
            name: <MenuButton text="Experience" />,
            selector: row => row.Year_Experience,
            center: true
        },
        {
            name: 'Resume',
            cell: row => <CustomLink {...row} />,
            grow: 1
        },
        {
            name: 'LinkedIn',
            cell: row => <a href={row.LinkedinUrl !== 'Not Filled' ? row.LinkedinUrl : ''} className={row.LinkedinUrl !== 'Not Filled' ? 'link-btn' : 'link-btn pointer'} target="_blank" rel="noopener noreferrer" > {row.LinkedinUrl !== 'Not Filled' ? 'View LinkedIn' : 'Not Filled'}</a>,
            grow: 1
        },
        {
            name: 'Portfolio',
            cell: row => <a href={row.PortfolioUrl} className="link-btn" target="_blank" rel="noopener noreferrer"> View Portfolio</a>,
            grow: 1
        },
        {
            name: <MenuButton text="Location" />,
            selector: row => row.JobLocation,
        },
        {
            name: <MenuButton text="Status" />,
            cell: row => <UserStatus row={row}  />,
            grow: 1.1
        },
        {
            name: 'Email',
            selector: row => row.Email,
            grow: 2
        }
    ];

    const addFilter = React.useMemo(() => {
        let filteredItems: DataRow[] = [];

        if (filterByRole.length > 0) {
            filteredItems = tableRowsData.filter(
                item => filterByRole.includes(item.JobRole));
            tableRowsData = filteredItems;
        }
        if (exp.length > 0) {
            filteredItems = tableRowsData.filter(
                item => exp.includes(item.Year_Experience.toString()));
            tableRowsData = filteredItems;
        }
        if (filterByLocation.length > 0) {

            //read single location
            if(filterByLocation.length == 1){
                filteredItems = tableRowsData.filter(
                    item => item.JobLocation.toLowerCase().includes(filterByLocation.toString().toLowerCase()));
            }
            
            // read multiple location
            if (filterByLocation.length > 1) {
                const merge = filterByLocation.toString().split(',').sort().toString();
                filteredItems = tableRowsData.filter(
                    item => merge.includes(item.JobLocation) );
            }
            tableRowsData = filteredItems;
        }

        if (filterByStatus.length > 0) {
            filteredItems = tableRowsData.filter(
                    item => filterByStatus.includes(item.JobStatus));
                tableRowsData = filteredItems;
        } 
    }, [filterByRole, exp, filterByLocation, filterByStatus]);

    const filterRoleHandlerFn = (role: string[]) => {
        setFilterByRole(role)
    };

    const jobExpHandlerFn = (exp: string[]) => {
        setExp(exp)
    }
    const filterLocationHandlerFn = (loc: string[]) => {
        setFilterByLocation(loc)
    };
    const FilterStatusHandlerFn = (jobStatus: string[]) => {
        setFilterByStatus(jobStatus)
    };

    const tableDataHandlerFn = (user: DataRow[]) => {
        setTableRowsData(user)
    }
      

    const clearAllHandler = (flag: boolean) => {
        setFilterByStatus([])
        resetFilterHandlerFn(flag)
        defaultSortHandlerFn('default')
        sendAPIUserRequest()
        setResetPaginationToggle(true)
        setFilterByRole([])
        setExp([])
        setFilterByLocation([])
        
    }

    const resetFilterHandlerFn = (flag: boolean) => {
        setReset(flag);
    }
    const defaultSortHandlerFn = (val: string) => {
        setDefaultSortValue(val);
    }
    const countHandlerFn = (num: number) => {
        setLength(num);
    }

    const errorHandlerFn = (err: string) => {
        setReset(false);
        setError(err);
    }

    const FetchAllUser = async () => {
        
        try {

            const response = await fetch('http://localhost:3004/user');
            if (!response.ok) {
                
                throw new Error("something went wrong with API")
            }
            const data = await response.json();
            console.log(data)
            setTableRowsData(data)
            setPending(false)
        } catch (err) {
            if (err instanceof Error) {
               setError(err.message);
                setPending(false)
            }
        }
    }

    useEffect(() => {
        FetchAllUser()
    }, []) 


    const dashboardContext = {
        count:length,
        defaultSort: defaultSortValue,
        filterRole: filterByRole,
        Error:error,
        filterExp: exp,
        filterLocation:filterByLocation,
        filterStatus: filterByStatus,
        resetFilter:reset,
        filterRoleHandler: filterRoleHandlerFn,
        filterExpHandler: jobExpHandlerFn,
        filterLocationHandler: filterLocationHandlerFn,
        FilterStatusHandler: FilterStatusHandlerFn,
        tableData: tableRowsData,
        tableDataHandler: tableDataHandlerFn,
        resetFilterHandler: resetFilterHandlerFn,
        defaultSortHandler: defaultSortHandlerFn,
        countHandler: countHandlerFn,
        errorHandler: errorHandlerFn
    }

    return <>
            <div className="adminContainer">
                {/* <Header /> */}
                <main className="adminContent">
                    <div className="subHeader">
                        <h2>Hiring Applications Database</h2>
                        { reset  && <Button variant="outlined" onClick={() => clearAllHandler(false)}>Reset Filters</Button>}
                    </div>
                    {error ? <p className="form-error">{error}</p> :
                        <adminContext.Provider value={dashboardContext}>
                        <DataTable striped={true} columns={columns} data={tableRowsData} pagination paginationPerPage={30} fixedHeader fixedHeaderScrollHeight="728px"
                            defaultSortFieldId={1} responsive={true} progressPending={pending} progressComponent={<Spin />} paginationResetDefaultPage={resetPaginationToggle}
                                persistTableHead customStyles={customStyles} />
                        </adminContext.Provider>}
                </main>
            </div>

    </>
}
export default Dashboard;


