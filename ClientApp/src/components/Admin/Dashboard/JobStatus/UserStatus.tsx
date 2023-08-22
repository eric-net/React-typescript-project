import React, { useState, useContext, SetStateAction } from 'react';
import { UserJobProfileForm as DataRow } from "../../../../store/DefaultSettings";
import { adminContext } from "../../../../store/DefaultSettings";
import { FadingBallsLoader } from "../../../LoadingSpinner/LoadingSpinner";
import "../dashboard.scss";

type status = {
    row: DataRow
}

type statusRequest = {
    Id: number,
    JobStatus: string
}

const UserStatus = ({ row }: status) => {
    const ctx = useContext(adminContext);
    const defaultValue = row.JobStatus;
    const [choice, setChoice] = useState<string>(defaultValue);
    const [approved, setApproved] = useState<boolean>(false);
    const [reject, setReject] = useState<boolean>(false);
    const [hide, setHide] = useState<boolean | string>(true);
    const options = [
        { value: choice, text: defaultValue },
        { value: 'Fly', text: 'Fly' },
        { value: 'No-Fly', text: 'No-Fly' }
    ];
    const updateJobStatus = async (userObj: statusRequest) => {

        const response = await fetch(`/api/User/Status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const singleRecord = await response.json();

        if (singleRecord) {
            ctx?.tableData.map((item) => {
                if (item.Id === singleRecord.userList[0].Id) {
                    item.JobStatus = singleRecord.userList[0].JobStatus
                }
            })
        }
        if (singleRecord.userList[0].JobStatus === options[1].text) {
              setApproved(false)
                  
        }
        if (singleRecord.userList[0].JobStatus === options[2].text) {
                setReject(false)
        }
        return singleRecord.ResponseMessage;
    }

    const getStatusValue =  (value: string, row: DataRow) => {
        if (value !== defaultValue) {
            setHide(false)

            if (value === options[1].text) {
                setApproved(true)
            }
            else {
                setReject(true)
            }
            const singleUserStatus: statusRequest = {
                Id: row.Id,
                JobStatus: value
            }
            setChoice(value)
            updateJobStatus(singleUserStatus)
                .then((data) => {
                    if (approved == false || reject == false) {
                        setTimeout(() => {
                            setHide(true)
                        }, 100)
                    }
                })
                .catch(error => {
                    ctx?.errorHandler(error.message)
                });
        }
    }
    let Content = hide && <select name="statusOptions" value={choice} onChange={(event) => getStatusValue(event.target.value, row)} className="form-control status-cell">
        {options.map((item, index) => {
            return (<option key={index} value={item.value}>{item.text}</option>);
        })}
    </select>
    if (approved || row.JobStatus === options[1].text) {
        Content = hide === false && approved ?
            <div className="center-box"><FadingBallsLoader /></div> :
            <div className="statusCol approved" > {row.JobStatus}</div>
    }
    if (reject || row.JobStatus === options[2].text) {
        Content = hide === false && reject ?
            <div className="center-box"><FadingBallsLoader /></div> :
            <div className="statusCol rejected">{row.JobStatus} </div>
    }
    return <>
        {Content}

    </>
}
export default UserStatus

