import React, { useContext } from "react";
import { jobApplyContext } from "../../../store/DefaultSettings";

type JobTitleProps = {
    id: number,
    title: string,
    bannerImage: string,
    JobRoleTag?: string, // browser url jobtitle for sharable url
    className: string
}

const JobTitle = ({ title, bannerImage, id, className, JobRoleTag }: JobTitleProps) => {
       
    const getTilte = title.replace(/ +/g, "").toLowerCase();
    const ctx = useContext(jobApplyContext)
       
    const openModelHandler = (id: number) => {
        ctx?.getCurrentItemIndex(id)        
        ctx?.selectedItemHandler(id)
        if (ctx?.isSuccessModel) {
            ctx.successModelHandler(false)
            ctx.formSubmitHandler(false)
        }
    }
    
    return <>
        <div className={className} id={getTilte === JobRoleTag ? JobRoleTag : id.toString()}>
            <div className="jobContent">
              
                <div className="btn">
                    <button onClick={() => openModelHandler(id)}>{title}</button>
                </div>
            </div>
        </div>
    </>
}
export default JobTitle;




