import { Component, Fragment } from "react";
import { MdWatchLater, MdSensorDoor } from "react-icons/md";
import opening_hours from 'opening_hours';

export default class OpeningWidget extends Component{
    constructor(props){
        super(props);
    }

    check(data){
        if(data["opening_hours"] != null){
            var status = new opening_hours(data.opening_hours);
            return status.getState();
        }else return 0;
    }

    render(){
        var currentState = this.check(this.props.data);
        if(currentState !== 0){
            let icon = currentState ? <MdWatchLater color="#208a21" className="side-icon"/> : <MdSensorDoor color="#ebbd3f" className="side-icon"/>;
            let statusText = currentState ? this.props.translator.t("place-open") : this.props.translator.t("place-closed");
            return (<div className="side-container">
                {icon}<span className="side-status">{statusText}</span>
            </div>);
        }
        return (<Fragment/>);
    }
}