import React from "react";
type layoutProps = {
    children: React.ReactNode;
}

export const Layout = ({ children }: layoutProps) => {
  return <div className="main-container">{children}</div>;
};


