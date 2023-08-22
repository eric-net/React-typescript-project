import React from "react";
import {  useHistory } from "react-router-dom";
import { useMsal, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

const Login = () => {
    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
             <WelcomeUser />
        </MsalAuthenticationTemplate>
    );

};
export default Login;

function WelcomeUser() {
    const history = useHistory();
    const { accounts } = useMsal();
    const username = accounts[0]?.username;
    return <>
        {username && history.push('/dashboard') }
    </>;
}