import React, {useState, useContext } from 'react';
import { adminContext } from "../../../../store/DefaultSettings";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
type roleProps = {
    id: string
}
const initialState: roleProps[] = [
    { id: 'Design Research' },
    { id: 'User Experience and Design' },
    { id: 'Design Engineering' }
]
 const FilterRole = () => {
    const ctx = useContext(adminContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const roleName = event.target.id;
        let jobRole: string[] = [...ctx!.filterRole, roleName];
        if (jobRole.length > 0 && ctx!.filterRole.includes(roleName)) {
            jobRole = jobRole.filter(name => name !== roleName);
        }
        ctx?.filterRoleHandler(jobRole)
        ctx?.resetFilterHandler(true)
    }
    return <>
        <FormControl component="fieldset">
            <FormGroup>
                <FormLabel component="legend">Filter By</FormLabel>
                {initialState.map((item, index) => {
                    return <FormControlLabel key={index}
                        control={
                            <Checkbox
                                checked={ctx!.filterRole.length > 0 && ctx?.filterRole.includes(item.id)}
                                onChange={handleChange}
                                id={item.id}
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
export default FilterRole;