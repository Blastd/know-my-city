import { Component, Fragment } from "react";
import { MdWatchLater, MdSensorDoor } from "react-icons/md";
import opening_hours from 'opening_hours';

export default class OpeningWidget extends Component{
    constructor(props){
        super(props);
        this.check = this.check.bind(this);
    }

    check(){
        var status = new opening_hours(this.props.openingStatus);
        return status.getState();
    }

    render(){
        var currentState = this.check();
        let icon = currentState ? <MdWatchLater color="#208a21" className="side-icon"/> : <MdSensorDoor color="#ebbd3f" className="side-icon"/>;
        let statusText = currentState ? this.props.translator.t("place-open") : this.props.translator.t("place-closed");
        return (<div className="side-container">
            {icon}<span className="side-status">{statusText}</span>
        </div>);
    }
}