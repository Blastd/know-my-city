let en_gb = import("./translations/en-gb.json");
let it_it = import("./translations/it-it.json");

export default class Translator{
    constructor(language){
        switch(language.toLowerCase()){
            case "it-it":
                this.file = it_it.then(response=>this.file = response);
                break;
            default:
            case "en-gb":
                this.file = en_gb.then(response=>this.file = response);
                break;
        }
        this.t = this.t.bind(this);
    }

    translation(){
        return this.file;
    }

    t(name){
        return this.file[name];
    }
}