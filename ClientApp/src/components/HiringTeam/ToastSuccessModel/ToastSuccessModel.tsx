import React, { useContext} from "react";
import "./ToastSuccessModel.scss";
import { Link,useHistory } from "react-router-dom";
import succesImage from "../../../img/success-image.png";
import { jobApplyContext } from "../../../store/DefaultSettings";
import CloseIcon from '@material-ui/icons/Close';

type toastSuccessProps = {
    fullName:string
}

const ToastSuccessModel = ({  fullName }: toastSuccessProps) => {
    const history = useHistory();
    const ctx = useContext(jobApplyContext);
    const closeModelHandler = () => {
        ctx?.modelOpenHandler(false)
        ctx?.formSubmitHandler(false)
        ctx?.successModelHandler(false)
    }

    const gotoDashboard = () => {
        ctx?.modelOpenHandler(false)
        ctx?.formSubmitHandler(false)
        ctx?.successModelHandler(false)
        document.body.classList.remove('form-modal-open')
        history.push('/dashboard')
    }

    return <div className="toast-message">
        <div className="close-model" onClick={closeModelHandler}><CloseIcon fontSize="medium" /></div>
                 <div className="toast-box">
                     <img src={succesImage} alt="Success Message" />
            <h2><strong>Thank you, <span>{fullName}</span></strong> for applying!</h2>
                     <p>We have received your submission, check your inbox for a confirmation.<br/>
                            Meanwhile, there’s a lot more for you to explore below. :)</p>
                <button onClick={gotoDashboard} style={{marginTop:'20px', background:'#000',color:'#fff', width:'200px',height:'40px', border:'none'}}>Go To Dashboard page</button>
                 </div>
        </div>
}
export default ToastSuccessModel;