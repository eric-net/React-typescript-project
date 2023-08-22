import React, { useContext, useState } from 'react';
import { adminContext,UserJobProfileForm as DataRow } from "../../../../store/DefaultSettings";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const userRole = ['Design Research','User Experience and Design','Design Engineering']
const RoleSorting = () => {
    const ctx = useContext(adminContext);
    const [sortingTable, setSortingTable] = useState<string>(ctx!.defaultSort);
    const [defaultSort, setDefaultSort] = useState<DataRow[]>(ctx!.tableData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setSortingTable(val);
        ctx?.defaultSortHandler(val)
    };
    const SortFn = React.useMemo(() => {
        let filteredItems = ctx!.tableData.filter(item => item.JobRole);
        if (sortingTable === "asec") {

            if (ctx!.filterRole.length === 0) { //No checkbox selected
                filteredItems.sort((a: DataRow, b: DataRow) => a.JobRole < b.JobRole ? -1 : 1);
            }
            else {
                for (var i = 0; i < userRole.length - 1; i++) {
                    for (var j = i + 1; j < userRole.length; j++) {
                        if (ctx!.filterRole.includes(userRole[i]) && ctx!.filterRole.includes(userRole[j])) {
                            const UpdatedFilters = filteredItems.filter((value) => ctx!.filterRole.includes(value.JobRole))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.JobRole < b.JobRole ? -1 : 1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }
        if (sortingTable === "desc") { //No checkbox selected
            if (ctx!.filterRole.length === 0) {
                filteredItems.sort((a: DataRow, b: DataRow) => a.JobRole < b.JobRole ? 1 : -1);
            }
            else {
                for (var i = 0; i < userRole.length - 1; i++) {
                    for (var j = i + 1; j < userRole.length; j++) {
                        if (ctx!.filterRole.includes(userRole[i]) && ctx!.filterRole.includes(userRole[j])) {
                            const UpdatedFilters = filteredItems.filter((value) => ctx!.filterRole.includes(value.JobRole))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.JobRole < b.JobRole ? 1 : -1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }
        if (sortingTable === "default") {
            ctx?.tableDataHandler(defaultSort);
            if (ctx!.filterRole.length > 0) {
                ctx?.filterRoleHandler([])
            }
        }
    }, [sortingTable]);
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sort By </FormLabel>
            <RadioGroup aria-label="Sort By Job Role" name="sorting" value={ctx?.defaultSort === 'default' ? 'default' : sortingTable} onChange={handleChange}>
                <FormControlLabel aria-label="Sorting By default" value="default" control={<Radio color="default" />} label="Default" />
                <FormControlLabel aria-label="Sorting By asecending" disabled={ctx!.filterRole.length === 1 ? true : false} value="asec" control={<Radio color="default" />} label="A-Z" />
                <FormControlLabel aria-label="Sorting By descending" disabled={ctx!.filterRole.length === 1 ? true : false} value="desc" control={<Radio color="default" />} label="Z-A" />
            </RadioGroup>
        </FormControl>
    );
}
export default RoleSorting
