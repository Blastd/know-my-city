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
        if(feature.guest_house != null || ["guest_house", "hotel"].includes(feature.tourism)){
            if(feature.tourism == "guest_house")
                candidate = iconSet.lodgingBnb;
            else
                candidate = iconSet.lodgingHotel;
        } 
        //Ice cream
        if(feature.amenity == "ice_cream") candidate = iconSet.iceCream;
        //Bar (night)
        if(feature.amenity == "bar") candidate = iconSet.bar;

        if(feature.amenity == "cafe") candidate = iconSet.cafe;

        if(feature.amenity == "restaurant") candidate = iconSet.restaurant;

        if(feature.amenity == "pub") candidate = iconSet.barPub;

        if(["pizza"].includes(feature.cuisine)) candidate = iconSet.restaurantPizza;

        if((feature.cuisine == 'japanese' && feature["diet:pescetarian"] == "yes") || feature.cuisine == "sushi") candidate = iconSet.restaurantSushi;

        if(feature.shop == "pastry") candidate = iconSet.bakery;

        if(feature.leisure == "beach_resort") candidate = iconSet.beach;

        if(feature.amenity == "pharmacy") candidate = iconSet.pharmacy;

        if(feature.highway == "bus_stop") candidate = iconSet.bus;

        if(feature.amenity == "drinking_water") candidate = iconSet.drinkingWater;

        if(feature.amenity == "toilets") candidate = iconSet.toilet;
    }
    return candidate;
}

export { iconMarker, generateIcon };

