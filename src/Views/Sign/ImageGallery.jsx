import { Component } from "react";
import {MdArrowBack, MdArrowForward} from 'react-icons/md';

export default class ImageGallery extends Component{
    constructor(props){
        super(props);
        this.imageInteract  = this.imageInteract.bind(this);
    }

    imageInteract(images, index){
        window.location.hash = "viewImage";
        this.props.open(this.props.images, index);
    }

    render(){
        var imageList = [];
        this.props.images.forEach(imageData=>{
            var indexNumber = this.props.images.indexOf(imageData)
            var nextKey = `image-view-${indexNumber}`;
            var imageTemp = (
                <div className="single-image" key={nextKey} id={nextKey}>
                    <img onClick={()=>this.imageInteract(this.props.images, indexNumber)} src={imageData.url}/>
                </div>
            );
            imageList.push(imageTemp);
        });
        return (
            <div className={`section-image`}>
                <div className="section-image-container">
                    {imageList}
                </div>
            </div>
        );
    }
}