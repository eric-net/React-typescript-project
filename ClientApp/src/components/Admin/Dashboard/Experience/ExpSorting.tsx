import React, { useContext, useState } from 'react';
import { adminContext,UserJobProfileForm as DataRow } from "../../../../store/DefaultSettings";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const userExp = ['0-1', '1-5', '5-10', '10+'];
const ExpSorting = () => {
    const ctx = useContext(adminContext);
    const [sortingTable, setSortingTable] = useState<string>(ctx!.defaultSort);
    const [defaultSort, setDefaultSort] = useState<DataRow[]>(ctx!.tableData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setSortingTable(val);
        ctx?.defaultSortHandler(val)
    };

    const SortFn = React.useMemo(() => {
        let filteredItems = ctx!.tableData.filter(item => item.Year_Experience);
        if (sortingTable === "asec") {
            if (ctx!.filterExp.length === 0) { //No checkbox selected
                filteredItems.sort((a: DataRow, b: DataRow) => a.Year_Experience < b.Year_Experience ? -1 : 1);
            }
            else {
                for (var i = 0; i < userExp.length - 1; i++) {
                    for (var j = i + 1; j < userExp.length; j++) {
                        if (ctx!.filterExp.includes(userExp[i]) && ctx!.filterExp.includes(userExp[j])) {
                            const UpdatedFilters = filteredItems.filter((value) => ctx!.filterExp.includes(value.Year_Experience))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.Year_Experience < b.Year_Experience ? -1 : 1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }
        if (sortingTable === "desc") {
            if (ctx!.filterExp.length === 0) { //No checkbox selected
                filteredItems.sort((a: DataRow, b: DataRow) => a.Year_Experience < b.Year_Experience ? 1 : -1);
            }
            else {
                for (var i = 0; i < userExp.length - 1; i++) {
                    for (var j = i + 1; j < userExp.length; j++) {
                        if (ctx!.filterExp.includes(userExp[i]) && ctx!.filterExp.includes(userExp[j])) {
                            const UpdatedFilters = filteredItems.filter((value) => ctx!.filterExp.includes(value.Year_Experience))
                            filteredItems = UpdatedFilters.sort((a: DataRow, b: DataRow) => a.Year_Experience < b.Year_Experience ? 1 : -1);
                        }
                    }
                }
            }
            ctx?.tableDataHandler(filteredItems);
        }

        if (sortingTable === "default") {
            ctx?.tableDataHandler(defaultSort);
            if (ctx!.filterExp.length > 0) {
                ctx?.filterExpHandler([])
            }
        }
    }, [sortingTable]);
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sort By </FormLabel>
            <RadioGroup aria-label="Sort By Job Experience" name="sorting" value={ctx?.defaultSort === 'default' ? 'default' : sortingTable} onChange={handleChange}>
                <FormControlLabel value="default" control={<Radio color="default" />} label="Default" />
                <FormControlLabel disabled={ctx!.filterExp.length === 1 ? true : false} value="asec" control={<Radio color="default" />} label="A-Z" />
                <FormControlLabel disabled={ctx!.filterExp.length === 1 ? true : false} value="desc" control={<Radio color="default" />} label="Z-A" />
            </RadioGroup>
        </FormControl>
    );
}
export default ExpSorting;
