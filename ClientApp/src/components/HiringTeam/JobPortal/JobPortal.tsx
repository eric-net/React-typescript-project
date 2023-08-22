import "./jobportal.scss";
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FadingBallsLoader } from "../../LoadingSpinner/LoadingSpinner";
import { UserJobProfileForm,jobApplyContext } from "../../../store/DefaultSettings";
import CloseIcon from '@material-ui/icons/Close';

import {
    Select, Checkbox,
    MenuItem, FormControlLabel,
    FormControl,
} from "@material-ui/core";


type jobportalProps = {
     setFullName: React.Dispatch<React.SetStateAction<string>>
}

const JobPortal = ({ setFullName }: jobportalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalExp, setTotalExp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const ctx = useContext(jobApplyContext);

    const validationSchema = Yup.object().shape({
        FullName: Yup.string()
            .required('Name is required'),
        Email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        ResumeUrl: Yup.string().url('Resume Link must be a valid URL')
            .required('Resume Link is required'),
        PortfolioUrl: Yup.string().url('Portfolio Link must be a valid URL')
            .required('Portfolio Link is required'),
        Year_Experience: Yup.string()
            .required('Years of Experience is required')
     });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserJobProfileForm>({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        reset();
    }, [ctx?.currentIndex]) 
       
    const closeModelHandler = () => {
        ctx?.modelOpenHandler(false)
        ctx?.JobTitleHandler('')
        ctx?.successModelHandler(false)
        reset()
    }
    const onSubmit = (data: UserJobProfileForm) => {
        ctx?.formSubmitHandler(false)
        setFullName('')
        if (data.JobLocation == '') {
            data.JobLocation = "Not Filled";
        }
        if (data.LinkedinUrl == '') {
            data.LinkedinUrl = "Not Filled";
        }
        const newUser = {
            FullName: data.FullName,
            Email: data.Email,
            ResumeUrl: data.ResumeUrl,
            PortfolioUrl: data.PortfolioUrl,
            Year_Experience: data.Year_Experience,
            LinkedinUrl: data.LinkedinUrl,
            JobLocation: data.JobLocation.toString().split(',').sort().toString(),
            JobRole: ctx?.jobRole,
            JobStatus: 'Pending',
            AppliedDate:new Date().toISOString().split('T')[0]
        }
        setIsLoading(true)

        async function createUser(url: string) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            try {
                setError('');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const dataOrg = await response.json();
                if (dataOrg.Message) {
                    throw new Error(dataOrg.Message)
                }
                setIsLoading(false)
                ctx?.formSubmitHandler(true)
                ctx?.successModelHandler(true)
                setFullName(dataOrg.userList[0]?.FullName);
                ctx?.JobTitleHandler('')
                reset();
            } catch (err:any) {
                setError(err.message);
            }
        }
        createUser('http://localhost:3004/user')
    }
        
    return (
        <div className="jobportal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="close-model" onClick={closeModelHandler}><CloseIcon fontSize="medium" /></div>
                {error ? <p className="form-error">{ error}</p>:
                <>
                <div className="form-row clearfix">
                    <div className="form-col">
                            <div className=" form-group">
                                <label>Name <span className="required">*</span></label>
                            <input
                                type="text" 
                                placeholder="Sri Prakash"
                                {...register('FullName')}
                                className={`form-control ${errors.FullName ? 'is-invalid' : ''}`}
                                />
                            <div className="error">{errors.FullName?.message}</div>
                            </div>
                    </div>
                    <div className="form-col">
                            <div className="form-group">
                            <label>Email <span className="required">*</span></label>
                                <input
                                type="text"
                                placeholder="sriprakash@example.com"
                                {...register('Email')}
                                className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                                />
                            <div className="error">{errors.Email?.message}</div>
                            </div>
                     </div>
                </div>

                <div className="form-row clearfix">
                    <div className="form-col">
                        <div className=" form-group">
                            <label>Resume Link <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Add your PDF/other link"
                                {...register('ResumeUrl')}
                                className={`form-control ${errors.ResumeUrl ? 'is-invalid' : ''}`}
                            />
                            <div className="error">{errors.ResumeUrl?.message}</div>
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label>Portfolio Link <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Add your Behance, Website, others link"
                                {...register('PortfolioUrl')}
                                className={`form-control ${errors.PortfolioUrl ? 'is-invalid' : ''}`}
                            />
                            <div className="error">{errors.PortfolioUrl?.message}</div>
                        </div>
                    </div>
                </div>
                

                <div className="form-row clearfix">
                    <div className="form-col">
                        <div className=" form-group">
                            <label>Years Of Experience<span className="required">*</span></label>
                            
                            <FormControl fullWidth>
                                <Select
                                    displayEmpty
                                    value={totalExp}
                                    className={`${totalExp && 'isSelected'} ${errors.Year_Experience ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('Year_Experience', { onChange: (e) => { setTotalExp(e.target.value) } })}

                                ><MenuItem value="">
                                        <em>Select from the list</em>
                                    </MenuItem>
                                    <MenuItem value="0-1">0-1</MenuItem>
                                    <MenuItem value="1-5">1-5</MenuItem>
                                    <MenuItem value="5-10">5-10</MenuItem>
                                    <MenuItem value="10+">10+</MenuItem>
                                </Select>

                            </FormControl>
                         
                            <div className="error">{errors.Year_Experience?.message}</div>
                        </div>
                    </div>
                    <div className="form-col">
                        <div className="form-group">
                            <label>LinkedIn</label>
                            <input {...register('LinkedinUrl')}
                                type="text"
                                placeholder="Add link here"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row clearfix jobLocation">
                    <div className="form-col">
                        <div className=" form-group">
                            <label>Preferred Location(s)</label>

                            <div className="form-check-box">
                                <label className="form-control">
                                    <FormControlLabel value="Hyderabad" control={<Checkbox classes={{ root: 'custom-checkbox-root' }} {...register('JobLocation')} color="default" inputProps={{ 'aria-label': `Hyderabad checkbox` }} />} label="Hyderabad" labelPlacement="start" />
                                </label>
                                <label className="form-control">
                                    <FormControlLabel value="Noida" control={<Checkbox classes={{ root: 'custom-checkbox-root' }} {...register('JobLocation')} color="default" inputProps={{ 'aria-label': `Noida checkbox` }} />} label="Noida" labelPlacement="start" />
                                </label>
                                <label className="form-control">
                                    <FormControlLabel value="Bangalore" control={<Checkbox classes={{ root: 'custom-checkbox-root' }} {...register('JobLocation')} color="default" inputProps={{ 'aria-label': `Bangalore checkbox` }} />} label="Bangalore" labelPlacement="start" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group submit-form clearfix">
                    <button type="submit" className="btn-primary">
                        {isLoading ? 'Submitting' : 'Submit'} {isLoading && <FadingBallsLoader />}
                    </button>
                </div>
                   </> }
            </form>
        </div>
    );
};
export default JobPortal;
