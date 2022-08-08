import './controls.css';
import {MdFilterAlt} from 'react-icons/md';

export default function MapFilterButton(props) {
    return (
        <button className="map-filter-button rounded-button" onClick={props.menuOpenToggle}>
            <MdFilterAlt size={32}/>
        </button>
    )
}