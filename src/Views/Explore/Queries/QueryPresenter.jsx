import { Component, Fragment } from "react";
import {Marker, Popup, GeoJSON, LayersControl} from 'react-leaflet';
import L from 'leaflet';
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
        this.state = {
            currentLayer: L.layerGroup(),
            updatedList: {
                bar:            queryBar,
                beach:          queryBeachResort,
                bnb:            queryBnB,
                bus:            queryBusStop,
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
            }
        };
        this.bindData = this.bindData.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    updateList(){
        if(this.props.load > 0)
            Object.keys(this.state.updatedList).forEach((itemName)=>{
                this.fetchData(itemName);
            });
    }

    componentDidMount(){
        console.log("Load once");
        this.updateList();
    }

    componentDidUpdate(){
        
    }

    render(){
        if (this.state.currentLayer != null) this.state.currentLayer.clearLayers();
        return (<Fragment>
                    {this.state.updatedList != null && this.props.queries != null && Object.keys(this.props.queries).map((itemName, index)=>{
                        var features = this.state.updatedList[itemName];
                        if(features != null)
                            if(this.props.queries[itemName] == true){
                                return <GeoJSON key={index} data={features} onEachFeature={this.bindData}/>;
                            }
                    })}
                </Fragment>);
    }

    fetchData(itemName){
        console.log("fetchCount");
        try{
            fetch(`https://know-my-city-backend.herokuapp.com/getFeatures?type=${itemName}`)
            .then((data)=>{
                data.json().then((jsonData)=>{
                    let newList = this.state.updatedList;
                    newList[itemName] = jsonData;
                    this.setState({updatedList: newList});
                }).catch((err)=>{throw 'Could not parse json data'});
            }).catch((err)=>{throw 'Could not get features';});
        }catch(err){
            console.error(`@${itemName}: ${err}`);
            return null;
        }
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