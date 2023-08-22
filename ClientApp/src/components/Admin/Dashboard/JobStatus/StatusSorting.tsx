import React, { useContext, useState } from 'react';
import { adminContext } from "../../../../store/DefaultSettings";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const StatusSorting = () => {
    const ctx = useContext(adminContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       // ctx?.defaultSortByHandler((event.target as HTMLInputElement).value);
    };
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sort By </FormLabel>
            <RadioGroup aria-label="Sort By" name="sorting"  onChange={handleChange}>
                <FormControlLabel value="default" control={<Radio color="default" />} label="Default" />
                <FormControlLabel value="asec" control={<Radio color="default" />} label="A-Z" />
                <FormControlLabel value="desc" control={<Radio color="default" />} label="Z-A" />
            </RadioGroup>
        </FormControl>
    );
}
export default StatusSorting
