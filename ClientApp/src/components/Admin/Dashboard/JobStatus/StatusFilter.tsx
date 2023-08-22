import React, { useState, useContext, useEffect } from 'react';
import { adminContext } from "../../../../store/DefaultSettings";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

type statusProps = {
    id: string
}

const initialState: statusProps[] = [
    { id: 'Pending'},
    { id: 'Fly'},
    { id: 'No-Fly'}
]

export const StatusFilter = () => {
    const ctx = useContext(adminContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const statusName = event.target.id;
        let jobStatus: string[] = [...ctx!.filterStatus, statusName];
        if (jobStatus.length > 0 && ctx!.filterStatus.includes(statusName)) {
            jobStatus = jobStatus.filter(name => name !== statusName);
        }        
        ctx?.FilterStatusHandler(jobStatus)
        ctx?.resetFilterHandler(true)
        ctx?.countHandler(jobStatus.length)
        
    }
    return <>
        <FormControl component="fieldset">
            <FormGroup>
                <FormLabel component="legend">Filter By</FormLabel>
                {initialState.map((item,index) => {
                    return <FormControlLabel key={index }
                        control={
                            <Checkbox
                                onChange={handleChange}
                                id={item.id}
                                checked={ctx!.filterStatus.length>0 && ctx?.filterStatus.includes(item.id)}
                                color="default"
                                inputProps={{ 'aria-label': `${item.id} checkbox` }}
                            />
                        }
                        label={item.id} htmlFor={item.id}
                    />
                })}
            </FormGroup>
        </FormControl>
    </>
}
