import "../../Header/header.scss";
import React, { useState, useEffect } from "react";

import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

const Header = () => {
    const isAuthenticated = useState(true);
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0]?.name;

    // Renders a button which, when selected, will redirect the page to the logout prompt 
    function handleLogout(instance: IPublicClientApplication) {
        instance.logoutRedirect().catch(e => {
            console.log(e);
        });
    }
    return (
        <>
            <div className="appHeader">
                <div className="headerLogo">
                    
                    my header
               </div>
               {isAuthenticated &&
                   <div className="headerRightContent">
                       <span>{ name }</span>
                       <a className="header-link" onClick={() => handleLogout(instance)}>
                            Logout
                        </a>
                    </div>
                }
            </div>
            
        </>
    );
};
export default Header;