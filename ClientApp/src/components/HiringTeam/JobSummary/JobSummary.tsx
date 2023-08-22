import React, { useContext } from "react";
import "./jobsummary.scss";
import { jobApplyContext } from "../../../store/DefaultSettings";

const JobSummary = () => {
    const ctx = useContext(jobApplyContext)
    return <article className="jobSummary">
        <div className="subTitle">Applying for</div>
        <h2>{ctx?.jobRole} role</h2>
        <p> we assess your submission based on a lot of factors like your superpowers,
            work experience, preferred location and a whole lot more to tailor a role that suits you best!</p>
    </article>
}
export default JobSummary;