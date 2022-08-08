import { Component, Fragment } from "react";
import {Marker, Popup, GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import { iconMarker, generateIcon } from "../Controls/markerIcon";
import queryIceCream    from './ice_cream_fallback.json';
import queryBars        from './bar_fallback.json'      ;
import queryMonuments   from './touristic_fallback.json';
import queryHotels      from './hotels_fallback.json';

export default class QueryPresenter extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.bindData = this.bindData.bind(this);   
    }

    render(){
        // let elementsList = parseList(this.props.queries);
        // if(elementsList.length > 0)
        //     return(<Fragment>
        //         {elementsList.map((singleItem, i)=>{
        //             var finalCoordinates = singleItem.geometry.type=="Point"? singleItem.geometry.coordinates : center(singleItem.geometry.coordinates[0]);
        //             finalCoordinates = [finalCoordinates[1], finalCoordinates[0]];
        //             return (
        //             <Marker key={i} position={finalCoordinates} icon={iconMarker}>
        //                 <Popup>
        //                     {singleItem.properties.name + " @ " + singleItem.properties['addr:street']}
        //                 </Popup>
        //             </Marker>
        //             );
        //         })}
        //     </Fragment>);
        // else
        //     return (<Fragment/>);
        return (<Fragment>
                    {this.props.queries !==null && (
                        <Fragment>
                            {this.props.queries.hotels == true && (<GeoJSON data={queryHotels} onEachFeature={this.bindData}/>)}
                            {this.props.queries.monuments == true && (<GeoJSON data={queryMonuments} onEachFeature={this.bindData}/>)}
                            {this.props.queries.bar == true && (<GeoJSON data={queryBars} onEachFeature={this.bindData}/>)}
                            {this.props.queries.iceCream == true && (<GeoJSON data={queryIceCream} onEachFeature={this.bindData}/>)}
                        </Fragment>
                    )}
                </Fragment>);
    }

    bindData(feature, layer){
        layer.on("click", ()=>{this.props.markerInteraction(feature.properties)})
        layer.options.icon = generateIcon(feature.properties);
        layer.options.fillColor= "#0066CC";
        layer.options.color = "#0066CC";
        layer.options.className = "structureMarker"
    }

}