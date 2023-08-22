import "./header.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { Navigation } from "./Navigation"; 
import { useState, FunctionComponent } from 'react';


export const Header = () => {

    const [hamburgerOpen, setHamburgerOpen] = useState (false)
    
        const toggleHamBurger = () => {
            setHamburgerOpen(!hamburgerOpen)
        }
        { hamburgerOpen ? document.body.classList.add('modal-open') : document.body.classList.remove('modal-open') } // for removing scrollbar on body

    return (
        <>
            <header className="appHeader">
                <div className="headerLogo">
                    <div className="" style={{fontSize:'20px'}}>Job Apply</div>
                    <div className="VrLine"></div>
                    <div className="studioLogo" style={{fontSize:'20px',fontWeight:700}}><h1>React Typescript Project</h1></div>
                    {/*web Accessibility StudioLogo Hight Contrast mode */}
                    {/* <div className="studioLogo highConrrastMode">{StudioLogoHighContrastMode}</div> */}

                </div>
                <Navigation setHamburgerOpen={setHamburgerOpen} hamburgerOpen={hamburgerOpen} />
                <div className={hamburgerOpen ? 'hamburger active' : 'hamburger '} role="button" aria-haspopup="true" aria-expanded={hamburgerOpen?"true":"false"}  onClick={toggleHamBurger }>
                    <div className="burger burger1"  />
                    <div className="burger  burger2" />
                    <div className="burger burger3" />
                </div>
            </header>
            <div className='mobileNav ' style={{right: hamburgerOpen ? 0 : '-100%'}}>
                {hamburgerOpen && <Navigation hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen }   />}
            </div>
        </>
  );
};
