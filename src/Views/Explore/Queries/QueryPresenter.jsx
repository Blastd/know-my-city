import { Component, Fragment } from "react";
import {Marker, Popup, GeoJSON, LayersControl} from 'react-leaflet';
import L from 'leaflet';
import { useMap } from "react-leaflet";
import { iconMarker, generateIcon } from "../Controls/markerIcon";

import queryBar                 from './bar';
import queryBeachResort         from './beach_resort';
import queryBnB                 from './bnb';
import queryBusStop             from './bus_stop';
import queryCafe                from './cafe';
import queryHistoric            from './historic';
import queryHotel               from './hotel';
import queryIceCream            from './icecream';
import queryPharmacy            from './pharmacy';
import queryPizzeria            from './pizzeria';
import queryPub                 from './pub';
import queryRestaurant          from './restaurant';
import queryToilet              from './toilet';
import queryWater               from './water';

export default class QueryPresenter extends Component{
    constructor(props){
        super(props);
        this.state = {currentLayer: L.layerGroup()};
        this.bindData = this.bindData.bind(this);
    }

    componentDidUpdate(){
        
    }

    render(){

        if (this.state.currentLayer != null)
            this.state.currentLayer.clearLayers();

        let queriesList = {
            bar:            queryBar,
            beach_resort:   queryBeachResort,
            bnb:            queryBnB,
            bus_stop:       queryBusStop,
            cafe:           queryCafe,
            historic:       queryHistoric,
            hotel:          queryHotel,
            icecream:       queryIceCream,
            pharmacy:       queryPharmacy,
            pizzeria:       queryPizzeria,
            pub:            queryPub,
            restaurant:     queryRestaurant,
            toilet:         queryToilet,
            water:          queryWater
        };

        return (<Fragment>
                    {this.props.queries !==null && Object.keys(this.props.queries).map((itemName, index)=>{
                        var features = queriesList[itemName];
                        if(features != null)
                            return (this.props.queries[itemName] == true)?<GeoJSON key={index} data={features} onEachFeature={this.bindData}/>:null;
                        else return null;
                    })}
                </Fragment>);
    }

    bindData(feature, layer){
        if(feature.geometry.type === "Polygon"){
            var center = layer.getBounds().getCenter();
            var marker = L.marker(center);
            this.markerStylize(feature, marker);
            marker.addTo(this.state.currentLayer);
            this.state.currentLayer.addTo(this.props.map);
            
        }
        this.markerStylize(feature, layer);
    }

    markerStylize(feature, layer){
        layer.on("click", ()=>{this.props.markerInteraction(feature)})
        layer.options.icon = generateIcon(feature.properties);
        layer.options.fillColor= "#0066CC";
        layer.options.color = "#0066CC";
        layer.options.className = "structureMarker";
        layer.options.autoPanOnFocus = true;
    }

}