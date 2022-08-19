function getName(data, translator){
    return new Promise((resolve)=>{
        if(data.name !=null) resolve(data.name);
        //Wikidata Name is recommended
        else if(data.wikidata) {
            var wikiLabel = getWikidataName(data.wikidata, translator);
            if(wikiLabel != null) wikiLabel.then((result)=>{resolve(result)});
        }
        else if(data.tourism) resolve(translator.t(`tourism-${data.tourism}`));
        else if(data.amenity != null) resolve(translator.t(`amenity-${data.amenity}`));
        else if(data.defensive_works != null) resolve(translator.t(`defensive_works-${data.defensive_works}`));
        else if(data.historic != null) resolve(translator.t(`historic-${data.historic}`));
    })
}
async function getWikidataName(id, translator){
    try{
        let response = fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&ids=${id}&format=json&origin=*`, {cache: "force-cache"});
        if((await response).status != 200) throw `Could not recover data ${(await response).status}`;
        const jsonData = await (await response).json();
        return jsonData.entities[id].labels[translator.t("lang")].value;
    }catch(error){
        console.warn(`Could not retreive name for Wikidata instance. ${error}`);
        return null;
    }
}

export {getName, getWikidataName}