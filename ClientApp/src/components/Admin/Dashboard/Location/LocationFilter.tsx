import React, { useContext } from 'react';
import { adminContext } from "../../../../store/DefaultSettings";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
type locProps = {
    id: string
}
const initialState: locProps[] = [
    { id: 'Hyderabad' },
    { id: 'Noida' },
    { id: 'Bangalore' },
    { id: 'Not Filled' }
]
const LocationFilter = () => {
    const ctx = useContext(adminContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const LocName = event.target.id;
        let newLoc: string[] = [...ctx!.filterLocation, LocName];
        
        if (newLoc.length > 0 && ctx!.filterLocation.includes(LocName)) {
            newLoc = newLoc.filter(name => name !== LocName);
        }
        ctx?.filterLocationHandler(newLoc)
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
                                checked={ctx!.filterLocation.length > 0 && ctx?.filterLocation.includes(item.id)}
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
export default LocationFilter;