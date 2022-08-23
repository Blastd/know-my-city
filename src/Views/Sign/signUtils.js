import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";
import { Fragment } from "react";
import ImageGallery from "./ImageGallery";

function getName(data, translator){
    let name = data.name[translator.t("lang")];
    if(name != null)
        return name;
    else 
        return data.name["it"];
}

function renderSections(data, translator, openGallery, closeGallery){
    var lang = translator.t("lang");
    var sectionList = [];
    Object.keys(data.sections).forEach(keyName => {
        var text = data.sections[keyName][lang];
        if(text == null)
            text = data.sections[keyName]["it"];
        var sectionTemp = (
            <section className="sign-section" key={keyName}>
                {/* Prints section title */}
                {data.sections[keyName].title !=null && (
                    <h2 className="section-title">{data.sections[keyName].title[translator.t("lang")]}</h2>
                )}

                {/* Prints images */}
                {data.sections[keyName].images !=null &&
                    //renderImageList(data.sections[keyName])
                    (<ImageGallery images={data.sections[keyName].images} open={openGallery} close={closeGallery}/>)
                }
                {/* Prints text */}
                <p className="section-text">{text}</p>
            </section>
        );
        sectionList.push(sectionTemp);
    });
    return sectionList;
}

export {getName, renderSections}