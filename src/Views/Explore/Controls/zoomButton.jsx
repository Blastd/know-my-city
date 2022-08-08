import { useMap } from "react-leaflet";
import './controls.css';
import {MdZoomIn, MdZoomOut, MdMyLocation, MdLocationOff} from 'react-icons/md';
import MapFilterButton from "./filterButton";

export default function MapZoom(props) {

    const parentMap = useMap();

    var zoomIn = () =>{
        parentMap.zoomIn();
    };

    var zoomOut = () =>{
        parentMap.zoomOut();
    };

    var getMyLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position=>{
                parentMap.flyTo([position.coords.latitude, position.coords.longitude]);
            });
          }
    };

    return (
        <div className="map-zoom-container">
            <button className="map-zoom-button rounded-button" onClick={zoomIn}>
                <MdZoomIn size={32}/>
            </button>
            <button className="map-zoom-button rounded-button" onClick={zoomOut}>
                <MdZoomOut size={32}/>
            </button>
            <button className="map-zoom-button rounded-button" onClick={getMyLocation}>
                {navigator.geolocation ? <MdMyLocation size={32}/> : <MdLocationOff size={32}/>}
            </button>
            <MapFilterButton menuOpenToggle={props.menuOpenToggle}/>
        </div>
    )
}