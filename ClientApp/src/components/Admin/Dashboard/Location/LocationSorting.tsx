import React, { useContext, useState } from 'react';
import { adminContext,UserJobProfileForm as DataRow } from "../../../../store/DefaultSettings";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const userLocation = ['Hyderabad', 'Noida', 'Bangalore', 'Not Filled'];
const LocationSorting = () => {
    const ctx = useContext(adminContext);
    const [sortingTable, setSortingTable] = useState<string>(ctx!.defaultSort);
    const [defaultSort, setDefaultSort] = useState<DataRow[]>(ctx!.tableData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setSortingTable(val);
        ctx?.defaultSortHandler(val)
    };
    const SortFn = React.useMemo(() => {
        let filteredItems = ctx!.tableData.filter(item => item.JobLocation);
       
        if (sortingTable === "asec") {
            if (ctx!.filterLocation.length === 0) { //No checkbox selected
                filteredItems.sort((a: DataRow, b: DataRow) => a.JobLocation < b.JobLocation ? -1 : 1);
            }
            else {
                for (var i = 0; i < userLocation.length - 1; i++) {
                    for (var j = i + 1; j < userLocation.length; j++) {
                        if (ctx!.filterLocation.includes(userLocation[i]) && ctx!.filterLocation.includes(userLocation[j])) {
                            const merge = ctx!.filterLocation.toString().split(',').sort().toString();

                            const UpdatedFilters = filteredItems.filter((value) => merge.includes(value.JobLocation))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.JobLocation < b.JobLocation ? -1 : 1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }

        if (sortingTable === "desc") {
            if (ctx!.filterLocation.length === 0) { //No checkbox selected
                filteredItems.sort((a: DataRow, b: DataRow) => a.JobLocation < b.JobLocation ? 1 : -1);
            }
            else {
                for (var i = 0; i < userLocation.length - 1; i++) {
                    for (var j = i + 1; j < userLocation.length; j++) {
                        if (ctx!.filterLocation.includes(userLocation[i]) && ctx!.filterLocation.includes(userLocation[j])) {
                            const merge = ctx!.filterLocation.toString().split(',').sort().toString();

                            const UpdatedFilters = filteredItems.filter((value) => merge.includes(value.JobLocation))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.JobLocation < b.JobLocation ? 1 : -1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }
        if (sortingTable === "default") {
            ctx?.tableDataHandler(defaultSort);
            if (ctx!.filterLocation.length > 0) {
                ctx?.filterLocationHandler([])
            }
        }
    }, [sortingTable]);
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sort By </FormLabel>
            <RadioGroup aria-label="Sort By Job Location" name="sorting" value={ctx?.defaultSort === 'default' ? 'default' : sortingTable} onChange={handleChange}>
                <FormControlLabel value="default" control={<Radio color="default" />} label="Default" />
                <FormControlLabel disabled={ctx!.filterLocation.length === 1 ? true : false}  value="asec" control={<Radio color="default" />} label="A-Z" />
                <FormControlLabel disabled={ctx!.filterLocation.length === 1 ? true : false}  value="desc" control={<Radio color="default" />} label="Z-A" />
            </RadioGroup>
        </FormControl>
    );
}
export default LocationSorting
