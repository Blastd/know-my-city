import { Component, Fragment } from "react";
import { MdAttachMoney } from "react-icons/md";

export default class FeeWidget extends Component{
    constructor(props){
        super(props);
    }

    check(data){
        if(data.fee == null || data["fee"] == "no") return 0;
        if(data["fee"] == "yes")
            return 1;
        else if(parseFloat(data["fee"]) != NaN)
            return 2;
        
    }

    render(){
        let isFeePresent = this.check(this.props.data);
        if(isFeePresent != 0){
            let icon = <MdAttachMoney color="#208a21" className="side-icon"/>;
            let statusText = isFeePresent == 1 ? this.props.translator.t("place-fee") : (`€${this.props.data} ${this.props.translator.t("place-fee-substring")}`);
            return (<div className="side-container">
                {icon}<span className="side-status">{statusText}</span>
            </div>);
        }else
            return (<Fragment/>);
    }
}