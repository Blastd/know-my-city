import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import isMobile from "../Libraries/ScreenUtil";
import Header from "../Components/Header";
import "./main.css";
import Translator from "../Components/Translator";

import Index from "./Index";
import Explore from "./Explore/Explore";
import Sign from "./Sign/Sign";

export default class ContainerView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isMobile: isMobile,
          language: "en-GB",
          translator: new Translator("en-GB"),
          
        };
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentDidMount(){

    }

    onLanguageChange(data){
        if(data!==this.state.language){
            this.setState({language: data, translator: new Translator(data)})
        }
    }

    render(){
        return(
            <Router>
                <Header onLanguageChange={this.onLanguageChange} language={this.state.language} translator={this.state.translator}/>
                <Routes>
                    <Route exact path="/" element={<Index translator={this.state.translator}/>}/>
                    <Route exact path="/explore" element={<Explore translator={this.state.translator}/>} />
                    <Route exact path="/sign" element={<Sign translator={this.state.translator}/>} />
                </Routes>
            </Router>
        );
        //return 
    }
}