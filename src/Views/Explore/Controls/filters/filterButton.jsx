import { Component } from "react";
import './filter-menu.css';

export default class FilterButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            enabled: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        var x = {};
        x[this.props.propertyName] = !this.state.enabled;
        this.props.trigger(x);
        this.setState({enabled: !this.state.enabled});
    }

    render(){
        return (
            <button className={"filter-button " + (this.state.enabled ? "filter-enabled" : "")} onClick={this.toggle}>
                {this.props.text}
                {this.props.children}
            </button>
        );
    }
}