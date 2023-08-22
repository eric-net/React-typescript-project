import React from "react";
import "./loadingspinner.scss";
const LoadingSpinner = () => {
    return (

        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>
    )
}
export default LoadingSpinner;

export const FadingBallsLoader = () => {
    return (
        <div className="dots">
            <div></div>
            <div></div>
            <div></div>
        
    </div>)
}

export const Spin = () => {
    return (<div className="animate-loader"><div className="spin"></div></div>)
}