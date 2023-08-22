import React, { useState,useContext,useEffect} from "react";
import "./jobapplycontainer.scss";
import JobSummary from "../JobSummary/JobSummary";
import JobPortal from "../JobPortal/JobPortal";
import { jobApplyContext } from "../../../store/DefaultSettings";

import ToastSuccessModel from "../ToastSuccessModel/ToastSuccessModel";
type postNameProps = {
    className:string
}

const JobApplyContainer = ({ className }: postNameProps) => {
    const ctx = useContext(jobApplyContext)
    const [fullName, setFullName] = useState<string>('');
    return <div className={className}>
        {ctx?.formIsSubmit ? (ctx?.isSuccessModel && < ToastSuccessModel  fullName={fullName} />)
            : <div className="jobApplyForm">
            <div className="leftSection">
                <JobSummary  />
            </div>
                <div className="rightSection">
                   <JobPortal setFullName={setFullName} />
                </div>
        </div>
        }
    </div>
}
export default JobApplyContainer;