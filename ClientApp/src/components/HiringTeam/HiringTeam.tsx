import "./hiringteam.scss";
import React from "react";

type hiringTeamProps = {
    children: React.ReactNode;
}

const HiringTeam = ({ children }: hiringTeamProps) => {
    return <section className="hiringSection" role="region" aria-label="Apply for job in Studio+91">{children}</section>
    
}
export default HiringTeam;