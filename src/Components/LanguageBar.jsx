import React from "react";
import './langStyle.css';

let acceptedLanguages = ["en-GB", "it-IT"];

export default class LanguageBar extends React.Component{
    constructor(props){
        super(props);

        let tempLanguage = acceptedLanguages.includes(window.navigator.language) ? window.navigator.language : acceptedLanguages[0];

        this.state = {
          currentLanguage: tempLanguage
        };
        this.clickMenu = this.clickMenu.bind(this);
        props.languageChanged(this.state.currentLanguage);
    }

    clickMenu(){
        let nextIndex = 0;
        if(this.state.currentLanguage === acceptedLanguages[nextIndex])
            nextIndex = 1;
        this.props.languageChanged(acceptedLanguages[nextIndex]);
        this.setState({currentLanguage: acceptedLanguages[nextIndex]});
    }
    render(){
        var currentFlag = "🇬🇧";
        if(this.state.currentLanguage === acceptedLanguages[1])
            currentFlag = "🇮🇹";
        return (<p className="language-bar"
            title={"Changes language to " + (this.state.currentLanguage === acceptedLanguages[1]? "🇬🇧" : "🇮🇹")}
            onClick={this.clickMenu}>
                {currentFlag}
                </p>);
    }
}