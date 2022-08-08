import React from "react";
//import isMobile from "../../Libraries/ScreenUtil";
import {MapContainer, TileLayer, /*Marker, Popup*/} from 'react-leaflet';
import {CRS} from 'leaflet';
import MapZoom from "./Controls/zoomButton";
import FilterMenu from "./Controls/filters/filterMenu";
import QueryPresenter from "./Queries/QueryPresenter";
import "leaflet/dist/leaflet.css";
import "./explore.css";
import InfoPane from "./Controls/infoPane/infoPane";

export default class Explore extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterMenuOpen: false,
            infoPaneOpen: true,
            query: null,
            currentSelection: null
        };
        this.infoPaneToggle     = this.infoPaneToggle.bind(this);
        this.filterMenuToggle   = this.filterMenuToggle.bind(this);
        this.closeFilterMenu    = this.closeFilterMenu.bind(this);
        this.filterUpdate       = this.filterUpdate.bind(this);
        this.closeInfoPane      = this.closeInfoPane.bind(this);
        this.featureInteract    = this.featureInteract.bind(this);
    }

    //Toggle opening of the filter menu
    filterMenuToggle(){
        this.setState({filterMenuOpen: !this.state.filterMenuOpen});
    }

    //Closes filter menu
    closeFilterMenu(){
        this.setState({filterMenuOpen: false});
    }

    //Occurs when a filter updates
    filterUpdate(newState){
        this.setState({query: {...this.state.query, ...newState}});
    }

    //Toggle opening of the marker informations
    infoPaneToggle(){
        this.setState({infoPaneOpen: !this.state.infoPaneOpen});
    }

    closeInfoPane(){
        this.setState({infoPaneOpen: false});
    }

    render(){
        let mapStyle = {
            height: 'calc(100vh - 15vh)',
            borderRadius: '20px 20px 0px 0px'
        };
        return (
            <div className="map-container">
                <MapContainer style={mapStyle} className="markercluster-map" crs={CRS.EPSG3857} center={[41.31921, 16.28153]} zoom={19} maxZoom={22} scrollWheelZoom={true} zoomControl={false}>
                    <MapZoom menuOpenToggle={this.filterMenuToggle}/>
                    <TileLayer
                        noWrap={false}
                        maxNativeZoom={19}
                        maxZoom={22}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <QueryPresenter markerInteraction={this.featureInteract} queries={this.state.query}/>
                </MapContainer>
                <FilterMenu closeFilterMenu={this.closeFilterMenu} open={this.state.filterMenuOpen} translator={this.props.translator} trigger={this.filterUpdate}/>
                {this.state.currentSelection !=null && <InfoPane closeFilterMenu={this.closeInfoPane} open={this.state.infoPaneOpen} data={this.state.currentSelection} translator={this.props.translator}/>}
            </div>
        );

        
    }

    featureInteract(feature){
        this.setState({currentSelection: feature});
    }

}