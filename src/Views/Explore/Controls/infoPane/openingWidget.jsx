import { Component, Fragment } from "react";
import { MdWatchLater, MdSensorDoor } from "react-icons/md";
import opening_hours from 'opening_hours';

export default class OpeningWidget extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: new opening_hours(props.openingStatus)
        };
    }

    render(){
        let icon = this.state.status.getState() ? <MdWatchLater color="#208a21" className="opening-icon"/> : <MdSensorDoor color="#ebbd3f" className="opening-icon"/>;
        let statusText = this.state.status.getState() ? this.props.translator.t("place-open") : this.props.translator.t("place-closed");
        return (<Fragment>
            {icon}<span className="opening-status">{statusText}</span>
        </Fragment>);
    }
}