import { Component, Fragment } from "react";
import { MdChair } from "react-icons/md";

export default class SeatingWidget extends Component{
    constructor(props){
        super(props);
    }

    check(data){
        let yesOutValues = ["biergarten", "streetside", "balcony", "seasonal", "summer", "roof", "backyard", "pedestrian", "parklet", "veranda", "sidewalk;street", "only", "garden", "patio", "pedestrian_zone", "sidewalk", "terrace", "yes"];
        let yesInValues = ["tent", "terrace", "seasonal", "yes", "bar_table"]
        let noValues = ["no"];
        let inSeat  = data["indoor_seating"] != null && yesInValues.includes(data["indoor_seating"]);
        let outSeat = data["outdoor_seating"] != null && yesOutValues.includes(data["outdoor_seating"]);
        if(inSeat && outSeat) return 2;
        if(inSeat) return 1;
        if(outSeat) return 0;
        return -1;
    }

    setText(value){
        switch(value){
            case 0:
                return this.props.translator.t("place-out-seating");
            case 1:
                return this.props.translator.t("place-it-seating");
            case 2:
                return this.props.translator.t("place-both-seating");
        }
    }

    render(){
        let chairValues = this.check(this.props.data);
        if([0, 1, 2].includes(chairValues)){
            let icon = <MdChair color="#666" className="side-icon"/>;
            let statusText = this.setText(chairValues);
            return (<div className="side-container">
                {icon}<span className="side-status">{statusText}</span>
            </div>);
        }else
            return (<Fragment/>);
    }
}