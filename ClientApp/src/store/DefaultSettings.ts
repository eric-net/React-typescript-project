import React, { createContext } from 'react';
import designResearch from "../img/design-research.png";
import userExperience from "../img/user-experience.png";
import DesignEngineering from "../img/design-engineering.png";


// 1.) create new job 
 const JobVacancyList: { title: string, image: string }[] = [
    {
        title: 'Design Research',
        image: designResearch
    },
    {
        title: 'User Experience and Design',
        image: userExperience
    },
    {
        title: 'Design Engineering',
        image: DesignEngineering
    }
]
export default JobVacancyList;

// 2.) HiringContext API for job form
type jobApplyProps = {
    jobRole: string,
    currentIndex: number,
    isOpenFormModel: boolean,
    isSuccessModel: boolean,
    formIsSubmit: boolean,
    selectedItemHandler: (id: number) => void,
    JobTitleHandler: (title: string) => void,
    modelOpenHandler: (open: boolean) => void,
    getCurrentItemIndex: (index: number) => void,
    successModelHandler: (bool: boolean) => void
    formSubmitHandler: (bool: boolean) => void,
}
export const jobApplyContext = createContext<jobApplyProps | null>(null)

// 3.) dashboard Context API for Admin
type adminProps = {
    tableData: UserJobProfileForm[],
    count: number,
    defaultSort: string
    filterRole: string[],
    filterExp: string[],
    filterStatus: string[],
    filterLocation: string[],
    resetFilter: boolean,
    Error: string,
    errorHandler: (err: string) => void,
    filterRoleHandler: (title: string[]) => void,
    filterExpHandler: (num: string[]) => void,
    filterLocationHandler: (title: string[]) => void,
    FilterStatusHandler: (title: string[]) => void,
    tableDataHandler: (user: UserJobProfileForm[]) => void,
    resetFilterHandler: (reset: boolean) => void,
    defaultSortHandler: (value: string) => void,
    countHandler: (num: number) => void
}
export const adminContext = createContext<adminProps | null>(null)

// 4.) User profile schema for database
export type UserJobProfileForm = {
    Id: number,
    FullName: string,    // All key should be same as UserDB Database Table
    Email: string,
    ResumeUrl: string,
    PortfolioUrl: string,
    Year_Experience: string,
    LinkedinUrl: string,
    JobLocation: string,
    JobRole: string,
    JobStatus: string,
    AppliedDate: Date
}