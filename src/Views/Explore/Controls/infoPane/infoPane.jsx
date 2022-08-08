import { Component } from "react";
import { MdBusAlert, MdClose, MdDirectionsBus, MdLocalDrink, MdTram, MdWc, MdYoutubeSearchedFor } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import './info-pane.css';

export default class InfoPane extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={"map-info-container" + " " +  (this.props.open?"dialog-open":"dialog-close")}>
                <div className="menu-header">
                    <h4>{this.props.data.name}</h4>
                    <button className="menu-close" onClick={this.props.closeFilterMenu}>
                        <MdClose size={20}/>
                    </button>
                </div>
                <div className="marker-info">

                </div>
            </div>
        );
    }
}