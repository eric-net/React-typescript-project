import "./jobscategories.scss";
import React, { useState } from "react";
import JobCard from "../JobCard/JobCard";
import JobVacancyList,{ jobApplyContext } from "../../../store/DefaultSettings";
import JobApplyContainer from "../JobApplyContainer/JobApplyContainer";
const JobsCategories = () => {
    let [currentIndex, setCurrentIndex] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [succesModel, setSuccessModel] = useState<boolean>(false);
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
  

    const itemMatchedHandler = (id: number) => {
        const getItem = JobVacancyList.filter((item, index) => index === id);
        if (getItem) {
            modelHandler(true)
            formSubmitHandler(false)
            getJobTitle(getItem[0]?.title)
        }
    }

    const getJobTitle = (title: string) =>{
        setTitle(title)
    }
    

    const modelHandler = (open: boolean) => {
        setIsModelOpen(open)
    }

    const getCurrentIndex = (index: number) => {
        setCurrentIndex(index)
    }

    const successModelHandler = (bool: boolean) => {
        setSuccessModel(bool)
    }

    const formSubmitHandler = (bool: boolean) => {
        setFormSubmit(bool)
    }
   

    const jobContext = {
        jobRole: title,
        currentIndex: currentIndex,
        isOpenFormModel: isModelOpen,
        formIsSubmit: formSubmit,
        isSuccessModel: succesModel,
        JobTitleHandler: getJobTitle,
        selectedItemHandler: itemMatchedHandler,
        modelOpenHandler: modelHandler,
        getCurrentItemIndex:getCurrentIndex,
        successModelHandler: successModelHandler,
        formSubmitHandler: formSubmitHandler,
    }

    { isModelOpen ? document.body.classList.add('form-modal-open') : document.body.classList.remove('form-modal-open') } 

    return <jobApplyContext.Provider value={jobContext}>
        <div className="jobContentSection">
            <div className="jobCardList">
                <JobCard />
                {(jobContext.isOpenFormModel) &&
                    <JobApplyContainer className='jobApplyContainer'  />
                }
            </div>
        </div>
    </jobApplyContext.Provider>
}
export default JobsCategories;