import { Component } from "react";
import { MdClose } from "react-icons/md";
import { getName } from "./libs/stringUtils";
import './info-pane.css';
import { displayWidgets, displayContactInfo } from "./libs/widgetUtils";

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
                        <p className="place-address">{`${this.props.data.properties["addr:street"].replace(`${undefined}`, "")} ${this.props.data.properties["addr:housenumber"]}`.replace(`${undefined}`, "")}</p>
                    )}
                </div>
                <div className="marker-info">
                    <div className="side-data">
                        {displayWidgets(this.props.data.properties, this.props.translator)}
                    </div>
                    <div className="contact-info">
                        {displayContactInfo(this.props.data.properties, this.props.translator)}
                    </div>
                    {/* <p style={{overflow: 'scroll', wordWrap: 'anywhere', width: '100%'}}>
                        {JSON.stringify(this.props.data)}
                    </p> */}
                </div>
            </div>
        );
    }
}