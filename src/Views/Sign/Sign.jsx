import { Component } from "react";
import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";

import './sign.css';

import { getName, renderSections } from "./signUtils";

export default class Sign extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: null
        };
        this.downloadSign = this.downloadSign.bind(this);
        this.buildSign = this.buildSign.bind(this);
    }

    componentDidMount(){
        this.downloadSign();
    }

    downloadSign(){
        const signParam = new URLSearchParams(window.location.search);
        //Check for invalid params
        if(!signParam.has("name")) window.location.pathname = "/";
        fetch(`http://know-my-city-backend.herokuapp.com/getSign?name=${signParam.get('name')}`)
        .then(
        (response)=>{
            if(response.status == 200){
                response.json()
                .then((result)=>{
                    if(result.error != null)
                        this.setState({data: "error"});
                    else
                        this.setState({data: result});
                })
                .catch((error)=>{
                    this.setState({data: "error"});
                })
            }else this.setState({data: "error"});
        })
        .catch((error)=>{this.setState({data: "error"});})
    }

    buildSign(data){
        return (
            <div className="sign-container">
                <div className="sign-data">
                    <h1>{getName(data, this.props.translator)}</h1>
                    {renderSections(data, this.props.translator)}
                </div>
            </div>
        );
    }

    render(){
        if(this.state.data == null){
            return (
            <div className="sign-container">
                <div className="sign-data">
                    <h1>{this.props.translator.t("sign-fetch-loading")}</h1>
                </div>
            </div>
            )
        }else if (this.state.data == "error"){
            return (
                <div className="sign-container">
                    <div className="sign-data">
                        <h2>{this.props.translator.t("sign-fetch-error")}</h2>
                    </div>
                </div>
                )
        }else
            return this.buildSign(this.state.data);
    }

}