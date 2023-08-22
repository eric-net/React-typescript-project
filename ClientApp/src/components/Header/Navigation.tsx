import React from "react";
import { NavLink } from "react-router-dom";
import happyFace from "../../img/happy-smile.svg";


export const Navigation: React.FC<{ hamburgerOpen:boolean,setHamburgerOpen: (isOpen:boolean) => void }> = (props) => {
    const navLinkHandler = () => {
        document.body.classList.remove('modal-open')
        props.setHamburgerOpen(false)
    }

    return (
      <React.Fragment>
            
           <article className="msQuotes">
                <img src={happyFace} alt="Happy Face" />
                <p>Here to delight everyone, <br/> everyday, everytime! </p>
           </article>
      </React.Fragment >
      )
};
