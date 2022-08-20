import { Component, Fragment } from "react";
import { MdBabyChangingStation } from "react-icons/md";

export default class BabyChangingWidget extends Component{
    constructor(props){
        super(props);
    }

    check(data){
        if(data["changing_table"] == null) return false;
        return data["changing_table"] == "yes";
    }

    render(){
        let checkValue = this.check(this.props.data);
        if(checkValue == false)
            return (<Fragment/>);
        else{
            let icon = <MdBabyChangingStation color="#666" className="side-icon"/>;
            let statusText = this.props.translator.t("toilets-changing-station");
            return (<div className="side-container">
                {icon}<span className="side-status">{statusText}</span>
            </div>);
        }
    }
}