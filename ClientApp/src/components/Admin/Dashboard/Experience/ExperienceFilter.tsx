import React, { useContext, useState } from 'react';
import { adminContext } from "../../../../store/DefaultSettings";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

type expProps = {
    id: string
}

const initialState: expProps[] = [
    { id: '0-1'},
    { id: '1-5'},
    { id: '5-10'},
    { id: '10+'},
]

const ExperienceFilter = () => {
    const ctx = useContext(adminContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const totalExp = event.target.id;
        let exp: string[] = [...ctx!.filterExp, totalExp];
        if (exp.length > 0 && ctx!.filterExp.includes(totalExp)) {
            exp = exp.filter(name => name !== totalExp);
        }
        ctx?.filterExpHandler(exp)
        ctx?.resetFilterHandler(true)
}
    return <FormControl component="fieldset">
        <FormGroup>
            <FormLabel component="legend">Filter By</FormLabel>
            {initialState.map((item, index) => {
                return <FormControlLabel key={index}
                    control={
                        <Checkbox
                            checked={ctx!.filterExp.length > 0 && ctx?.filterExp.includes(item.id)}
                            onChange={handleChange}
                            id={item.id}
                            color="default"
                            inputProps={{ 'aria-label': `${item.id} experience checkbox` }}
                        />
                    }
                    label={item.id} htmlFor={item.id}
                />
            })}
        </FormGroup>
    </FormControl>
}
export default ExperienceFilter;



