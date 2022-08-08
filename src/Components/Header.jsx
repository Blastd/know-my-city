import React from "react";
import isMobile from "../Libraries/ScreenUtil";
import './headerStyle.css';
import { IconContext } from "react-icons";
import {MdMenu, MdClose} from 'react-icons/md';
import LanguageBar from "./LanguageBar";
import { Link } from "react-router-dom";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isOpen: false  
        };
        this.clickMenu = this.clickMenu.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    clickMenu(){
        this.setState({isOpen: !this.state.isOpen});
    }

    componentDidMount(){

    }

    onLanguageChange(data){
        this.props.onLanguageChange(data);
        //this.props.onLanguageChange(data);
    }

    render(){
        return isMobile()? this.renderMobile() : this.renderDesktop();
    }

    renderMobile(){
        return (<React.Fragment>
            <div className="header-nav" style={{marginTop: window.location.pathname === "/" ? '80px':'10px'}}>
                <div className="header-nav-container">
                    <img alt="City logo" width={82/360*window.innerWidth} src="./images/headerCity.svg"></img>
                    <header className="header-heading">{"Barletta"}</header>
                    <div className="header-menu" onClick={this.clickMenu}>
                        <IconContext.Provider value={{className: "header-menu-symbol" }}>
                            {!this.state.isOpen && (<MdMenu/>)}
                            {this.state.isOpen && (<MdClose/>)}
                        </IconContext.Provider>
                    </div>
                </div>
                <nav className={(this.state.isOpen?"nav-opened":"nav-closed") + " nav-bar"}>
                    <a href="/explore">{this.props.translator.t("header-nav-explore")}</a>
                    <a href="/activities">{this.props.translator.t("header-nav-activities")}</a>
                    <a href="/attractions">{this.props.translator.t("header-nav-attractions")}</a>
                    <div className="toolBar">
                        <LanguageBar languageChanged={this.onLanguageChange}/>
                    </div>
                </nav>
            </div>
        </React.Fragment>);
    }

    renderDesktop(){
        return (<React.Fragment>

        </React.Fragment>);
    }
}