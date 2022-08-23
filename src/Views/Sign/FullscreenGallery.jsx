import { TransformComponent, TransformWrapper } from "@pronestor/react-zoom-pan-pinch";
import { Component } from "react";
import {MdArrowBack, MdArrowForward} from 'react-icons/md';

export default class FullScreenGallery extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex: this.props.currentIndex
        }
        this.backInteract = this.backInteract.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.navigateFront = this.navigateFront.bind(this);
    }

    navigateBack(){
        this.setState({
            currentIndex: (this.state.currentIndex+1)%this.props.images.length
        });
    }

    navigateFront(){
        this.setState({
            currentIndex: this.state.currentIndex == 0 ? (this.props.images.length - 1) : (this.state.currentIndex - 1)
        });
    }

    backInteract(){
        if(window.location.hash == "")
            this.props.close();
    }

    getSnapshotBeforeUpdate(oldProps, oldState){
        if(oldProps.currentIndex !== this.props.currentIndex)
            this.setState({
                currentIndex: this.props.currentIndex
            });
        return null;
    }

    componentDidMount(){
        window.onhashchange = this.backInteract;
    }

    componentDidUpdate(){
        if(this.props.isOpen){
            //document.querySelectorAll(`.expanded #image-${this.props.currentIndex}`)[0].scrollIntoView({block: 'center'});
            setTimeout(()=>{
                document.querySelectorAll(`#image-${this.state.currentIndex}`)[0].scrollIntoView({behavior: "smooth"});
            }, 100);
        }
    }

    render(){
        var imageList = [];
        var i = 0;
        this.props.images.forEach(imageData=>{
            var nextKey = `image-${i}`;
            var imageTemp = (
                <div className="single-image" key={nextKey} id={nextKey}>
                    <TransformWrapper centerOnInit={true}>
                        <TransformComponent>
                            <img onClick={()=>this.imageInteract(this.props.images.indexOf(imageData))} src={imageData.url}/>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            );
            imageList.push(imageTemp);
            i++;
        });
        return (
            <div className={`section-image ${this.props.isOpen ? "expanded" : "closed" }`}>
                <div className="section-image-container">
                    {imageList}
                    
                </div>
                    <div className="gallery-navigation">
                        <button onClick={this.navigateFront}><MdArrowBack/></button>        
                        <p>{this.props.images[this.props.currentIndex].attribution}</p>
                        <button onClick={this.navigateBack}><MdArrowForward/></button>
                    </div>
            </div>
            );
    }
}