import { Fragment } from "react"
import CreditCardWidget from "../generic/creditCardWidget"
import FeeWidget from "../generic/feeWidget"
import OpeningWidget from "../generic/openingWidget"
import SeatingWidget from "../generic/seatWidget"
import BabyChangingWidget from "../toilets/babyChangingWidget"

function displayWidgets(data, translator){
    let widgets = genericWidgets(data, translator);
    if(data["amenity"] != null)
        return widgets.concat(amenityWidgets(data, translator))
    return widgets;
}

function amenityWidgets(data, translator){
    let tmp = [];
    switch(data.amenity){
        case "toilets":
                tmp.push(<BabyChangingWidget data={data} translator={translator}/>);
                break;
    }
    return tmp;
}

function genericWidgets(data, translator){
    return [
        <OpeningWidget data={data} translator={translator}/>,
        <FeeWidget data={data} translator={translator}/>,
        <CreditCardWidget data={data} translator={translator}/>,
        <SeatingWidget data={data} translator={translator}/>
    ];
}

export {displayWidgets, amenityWidgets, genericWidgets};