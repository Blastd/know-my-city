import { Component } from "react";
import { MdBusAlert, MdClose, MdDirectionsBus, MdLocalDrink, MdTram, MdWc, MdYoutubeSearchedFor } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import OpeningWidget from "./openingWidget";
import CreditCardWidget from "./creditCardWidget";
import { getName } from "./libs/stringUtils";
import './info-pane.css';
import SeatingWidget from "./seatWidget";

export default class InfoPane extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: ""
        };
    }

    componentDidUpdate(){
        getName(this.props.data.properties, this.props.translator).then((name)=>{
            if(this.state.name != name) this.setState({name: name});
        })
    }

    componentDidMount(){
        this.forceUpdate();
    }

    render(){
        return(
            <div className={"map-info-container" + " " +  (this.props.open?"dialog-open":"dialog-close")}>
                <div className="menu-header">
                    <h4>{this.state.name}</h4>
                    <button className="menu-close" onClick={this.props.closeFilterMenu}>
                        <MdClose size={20}/>
                    </button>
                    {this.props.data.properties["addr:street"] != null && (
                        <p className="place-address">{`${this.props.data.properties["addr:street"]} ${this.props.data.properties["addr:housenumber"]}`}</p>
                    )}
                </div>
                <div className="marker-info">
                    <div className="side-data">
                        {this.props.data.properties.opening_hours !=null && (
                            <OpeningWidget openingStatus={this.props.data.properties.opening_hours} translator={this.props.translator}/>
                        )}
                        <CreditCardWidget translator={this.props.translator} data={this.props.data.properties}/>    
                        <SeatingWidget translator={this.props.translator} data={this.props.data.properties}/>
                    </div>
                    {/* <p style={{overflow: 'scroll', wordWrap: 'anywhere', width: '100%'}}>
                        {JSON.stringify(this.props.data)}
                    </p> */}
                </div>
            </div>
        );
    }
}