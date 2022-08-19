import { Component } from "react";
import { MdBusAlert, MdClose, MdDirectionsBus, MdLocalDrink, MdTram, MdWc, MdYoutubeSearchedFor } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import OpeningWidget from "./openingWidget";
import './info-pane.css';

export default class InfoPane extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={"map-info-container" + " " +  (this.props.open?"dialog-open":"dialog-close")}>
                <div className="menu-header">
                    {this.props.data.properties.opening_hours !=null && (
                        <OpeningWidget openingStatus={this.props.data.properties.opening_hours} translator={this.props.translator}/>
                    )}
                    <h4>{this.props.data.properties.name}</h4>
                    <button className="menu-close" onClick={this.props.closeFilterMenu}>
                        <MdClose size={20}/>
                    </button>
                    {this.props.data.properties["addr:street"] != null && (
                        <p className="place-address">{`${this.props.data.properties["addr:street"]} ${this.props.data.properties["addr:housenumber"]}`}</p>
                    )}
                </div>
                <div className="marker-info">
                    <p style={{overflow: 'scroll', wordWrap: 'anywhere', width: '100%'}}>
                        {JSON.stringify(this.props.data)}
                    </p>
                </div>
            </div>
        );
    }
}