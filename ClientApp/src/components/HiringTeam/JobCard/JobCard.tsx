import React, { useState, useEffect,useContext } from "react";
import JobTitle from "./JobTitle";
import "./jobcard.scss";
import { useLocation } from 'react-router-dom';
import JobVacancyList,{ jobApplyContext } from "../../../store/DefaultSettings";

const JobCard = () => {
    const ctx = useContext(jobApplyContext)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isJobRoleExits: string | null = queryParams.get('jobRole') != null ? queryParams.get("jobRole") : null;
    const JobRoleTag= isJobRoleExits?.toLowerCase() //designresearch
    const showJobList: JSX.Element[] = JobVacancyList.map((job, index) => {
        return <JobTitle key={index} title={job.title} id={index} 
            className={index === ctx?.currentIndex && ctx?.isOpenFormModel ? "jobColumn active" : "jobColumn"}
            bannerImage={job.image}  JobRoleTag={JobRoleTag}  
             />
    })
     return <>{ showJobList }</>
}
export default JobCard;