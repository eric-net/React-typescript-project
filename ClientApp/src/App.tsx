 import React, { Component } from "react";
import { Route } from 'react-router-dom';
import "./App.scss";
import "./scss/common.scss";
import Home  from "./components/Home";
import { Layout } from "./components/Layout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";

const  App = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
        </Layout>
    )
}
export default App;

