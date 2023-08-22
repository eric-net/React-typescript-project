import React, { useState,Component  } from 'react';
import Select from "react-select";
//import CreatableSelect from 'react-select/creatable';

// status filter
type Props = {
    //jobLocation: string,
    //onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void,
    //onJobLocFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    setExp: React.Dispatch<React.SetStateAction<number[]>>,
    //children: React.ReactNode;
    //options?: { value: string, label: string }[]
}


type MyOption = { label: string;  value: number; }


const expOptions: MyOption[] = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
]

 
const ExperienceFilter = ({ setExp }: Props) => {
 
    const handleChange = (selected: MyOption[]) => {

        
       const newArray = selected.map((item) => {
            return item.value
       })
        setExp(newArray);
    }
    

    return <>
        <Select
            className="select-menu"
            classNamePrefix="select-menu" placeholder="Experience &#10;(in years)"
            options={expOptions}
            //onChange={handleChange}
            hideSelectedOptions={false}
            isClearable={true}
            isMulti
            controlShouldRenderValue={false}


            />
    </>
}
export default ExperienceFilter;