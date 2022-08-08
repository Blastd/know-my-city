import L from 'leaflet';
import imgMarker from './map-marker.png';
import imgMarkerRetina from './map-marker-retina.png';
import * as iconSet from '../Queries/markers/markers';
import { icons } from 'react-icons/lib';

const iconMarker = new L.Icon({
    iconUrl: imgMarker,
    iconRetinaUrl: imgMarkerRetina,
    iconAnchor: null,
    shadowUrl: null,
    popupAnchor: new L.Point(0, -48),
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(48, 96),
    className: 'map-marker-icon'
});

function generateIcon(feature){
    //markerIcons.iconGroups[0].svgs['airport.svg'];
    var candidate = iconType(feature);
   
    return new L.Icon({
        iconUrl: candidate,
        iconAnchor: null,
        shadowUrl: null,
        popupAnchor: new L.Point(0, -48),
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(48, 48),
        className: 'map-marker-icon'
    });
}

function iconType(feature){
    var candidate = iconSet.marker;
    if(feature != null){
        //Historic
        if(feature.museum != null || feature.tourism == "museum") candidate = iconSet.museum;
        if(["bust", "statue"].includes(feature.artwork_type)) candidate = iconSet.monument;
        if(["mural"].includes(feature.artwork_type) || feature.tourism == "artwork") candidate = iconSet.artGallery;
        if(feature.historic == "memorial") candidate = iconSet.cemetery;
        if(feature.historic == "cannon" || feature.historic == "monument") candidate = iconSet.monument;
        //Hotels
        if(feature.guest_house != null || ["guest_house", "hotel"].includes(feature.tourism)) candidate = iconSet.lodging;
        //Ice cream
        if(feature.amenity == "ice_cream") candidate = iconSet.iceCream;
        //Bar (night)
        if(feature.amenity == "bar") candidate = iconSet.bar;

        if(feature.amenity == "cafe") candidate = iconSet.cafe;

        if(feature.shop == "pastry") candidate = iconSet.bakery;
    }
    return candidate;
}

export { iconMarker, generateIcon };

