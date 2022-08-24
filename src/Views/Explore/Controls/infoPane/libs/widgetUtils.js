import { Fragment } from "react"
import CreditCardWidget     from "../generic/creditCardWidget"
import FeeWidget            from "../generic/feeWidget"
import OpeningWidget        from "../generic/openingWidget"
import SeatingWidget        from "../generic/seatWidget"
import BabyChangingWidget   from "../toilets/babyChangingWidget"

import { MdPhone }          from "react-icons/md"
import { MdWeb }            from "react-icons/md"
import { MdMail }            from "react-icons/md"

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

function displayContactInfo(data, translator){
    var phonePanel = phoneWidget(data, translator);
    var webContacts = (
        <div className="contact-web">
            {websiteWidget(data, translator)}
            {emailWidget(data, translator)}
        </div>
    );
    return [
        phonePanel,
        webContacts
    ]
        
}

function emailWidget(data, translator){
    var emailWidgetItem = null;
    if(findOne(Object.keys(data), ["contact:email", "email"])){
        var rawData = data["email"] != null ? data["email"] : data["contact:email"];
        emailWidgetItem = (
            <div className="contact-panel">
                <h3><MdMail/>{translator.t("place-email")}</h3>
                <a key={rawData} href={`mailto:${rawData}`}>{rawData}</a>
            </div>
        );
    }
    return emailWidgetItem;
}

function websiteWidget(data, translator){
    var websiteWidget = null;
    if(findOne(Object.keys(data), ["contact:website", "website"])){
        var rawData = data["website"] != null ? data["website"] : data["contact:website"];
        var site = new URL(rawData);
        websiteWidget = (
            <div className="contact-panel">
                <h3><MdWeb/>{translator.t("place-website")}</h3>
                <a key={rawData} href={rawData}>{`${site.hostname}`.replace("www.", "")}</a>
            </div>
        );
    }
    return websiteWidget;
}

function phoneWidget(data, translator){
    var phonePanel = null;
    //data.phone != null || data["contact:mobile"] != null || data["contact:phone"] != null
    if(findOne(Object.keys(data), ["phone", "contact:mobile", "contact:phone"])){
        var tmpPhoneList = [];
        var rawData = data.phone != null ? data.phone : data["contact:mobile"] != null ? data["contact:mobile"] : data["contact:phone"];
        rawData.split(";").forEach(element => {
            var phoneNumber = `${element}`.replaceAll(" ", "-");
            tmpPhoneList.push(
                <a key={element} href={`tel:${phoneNumber}`}>{element}</a>
            );
        });
        phonePanel = (
            <div className="contact-phone">
                <h3><MdPhone/>{translator.t("place-call")}</h3>
                <div className="phone-numbers">
                    {tmpPhoneList}
                </div>
            </div>
        );
    }
    return phonePanel;
}

const findOne = (haystack, arr) => {
    return arr.some(v => haystack.includes(v));
};

export {displayWidgets, displayContactInfo};