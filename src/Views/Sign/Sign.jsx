import { Component, Fragment } from "react";
import FullScreenGallery from "./FullscreenGallery";

import './sign.css';

import { getName, renderSections } from "./signUtils";

export default class Sign extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            isGalleryOpen: false,
            galleryIndex: 0,
            galleryImages: null,
        };
        this.downloadSign   = this.downloadSign.bind(this);
        this.buildSign      = this.buildSign.bind(this);
        this.openGallery    = this.openGallery.bind(this);
        this.closeGallery   = this.closeGallery.bind(this);
    }

    componentDidMount(){
        this.downloadSign();
    }

    openGallery(images, index){
        if(!this.state.isGalleryOpen)
        this.setState({
            isGalleryOpen: true,
            galleryImages: images,
            galleryIndex: index
        });
    }

    closeGallery(){
        if(this.state.isGalleryOpen)
        this.setState({isGalleryOpen: false});
    }

    downloadSign(){
        const signParam = new URLSearchParams(window.location.search);
        //Check for invalid params
        if(!signParam.has("name")) window.location.pathname = "/";
        fetch(`https://know-my-city-backend.herokuapp.com/getSign?name=${signParam.get('name')}`)
        .then(
        (response)=>{
            if(response.status == 200){
                response.json()
                .then((result)=>{
                    if(result.error != null)
                        this.setState({data: "error"});
                    else
                        this.setState({data: result});
                })
                .catch((error)=>{
                    this.setState({data: "error"});
                })
            }else this.setState({data: "error"});
        })
        .catch((error)=>{this.setState({data: "error"});})
    }

    buildSign(data){
        return (
        <Fragment>
            <div className="sign-container">
                <div className={`sign-data ${this.state.isGalleryOpen ? "gallery-open" : ""}`}>
                    <h1>{getName(data, this.props.translator)}</h1>
                    {renderSections(data, this.props.translator, this.openGallery, this.closeGallery)}
                    <h2></h2>
                </div>
            </div>
            {this.state.galleryImages !=null && <FullScreenGallery isOpen={this.state.isGalleryOpen} images={this.state.galleryImages} currentIndex={this.state.galleryIndex}
            close={this.closeGallery}/>}
        </Fragment>
        );
    }

    render(){
        if(this.state.data == null){
            return (
            <div className="sign-container">
                <div className="sign-data">
                    <h1>{this.props.translator.t("sign-fetch-loading")}</h1>
                </div>
            </div>
            )
        }else if (this.state.data == "error"){
            return (
                <div className="sign-container">
                    <div className="sign-data">
                        <h2>{this.props.translator.t("sign-fetch-error")}</h2>
                    </div>
                </div>
                )
        }else
            return this.buildSign(this.state.data);
    }

}