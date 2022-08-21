function getName(data, translator){
    let name = data.name[translator.t("lang")];
    if(name != null)
        return name;
    else 
        return data.name["it"];
}

function renderSections(data, translator){
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
                {/* Prints text */}
                <p className="section-text">{text}</p>
                {/* Prints images */}
                {data.sections[keyName].images !=null &&
                    renderImageList(data.sections[keyName])
                }
                
            </section>
        );
        sectionList.push(sectionTemp);
    });
    return sectionList;
}

function renderImageList(data){
    var imageList = [];
    data.images.forEach(imageData=>{
        var imageTemp = (
            <div class="section-image">
                <img src={imageData.url}/>
                <p>{imageData.attribution}</p>
            </div>
        );
        imageList.push(imageTemp);
    });
    return imageList;
}

export {getName, renderSections}