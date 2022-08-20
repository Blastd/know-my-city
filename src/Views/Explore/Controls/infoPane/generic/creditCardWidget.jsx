import { Component, Fragment } from "react";
import { MdCreditCard, MdCreditCardOff } from "react-icons/md";

export default class CreditCardWidget extends Component{
    constructor(props){
        super(props);
    }

    check(data){
        if(data["payment:credit_cards"] !=null || data["payment:debit_cards"] != null || 
        data["payment:mastercard"] != null   || data["payment:visa"] != null){
            return (data["payment:credit_cards"] == "yes" || data["payment:debit_cards"] == "yes" || 
                data["payment:mastercard"] == "yes"   || data["payment:visa"] == "yes");
        }else
            return 0;
        
    }

    render(){
        let isAccepted = this.check(this.props.data);
        if(isAccepted != 0){
            let icon = isAccepted ? <MdCreditCard color="#208a21" className="side-icon"/> : <MdCreditCardOff color="#ebbd3f" className="side-icon"/>;
            let statusText = isAccepted ? this.props.translator.t("place-accept-card") : this.props.translator.t("place-not-accept-card");
            return (<div className="side-container">
                {icon}<span className="side-status">{statusText}</span>
            </div>);
        }else
            return (<Fragment/>);
    }
}