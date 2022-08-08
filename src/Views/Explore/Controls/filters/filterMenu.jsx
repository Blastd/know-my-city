import { Component } from "react";
import { MdBusAlert, MdClose, MdDirectionsBus, MdLocalDrink, MdTram, MdWc, MdYoutubeSearchedFor } from "react-icons/md";
import FilterButton from "./filterButton";
import { MdWaterDrop } from "react-icons/md";
import './filter-menu.css';
import '../../Controls/controls.css';

export default class FilterMenu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={"map-filter-menu-container " + (this.props.open?"dialog-open":"dialog-close")}>
                <div className="menu-header">
                    <h4>{this.props.translator.t("explore-filters-menu-title")}</h4>
                    <button className="menu-close" onClick={this.props.closeFilterMenu}>
                        <MdClose size={20}/>
                    </button>
                    
                </div>
                <div className="menu-container">
                    <div className="menu-content">
                    <FilterButton backgroundColor="#EFD062"
                        text={this.props.translator.t("explore-filter-beach-resort")}
                        propertyName={"beachResort"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#E090ED"
                        text={this.props.translator.t("explore-filter-monuments")}
                        propertyName={"monuments"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#ED9090"
                        text={this.props.translator.t("explore-filter-hospitality")}
                        propertyName={"hotels"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#E89261"
                        text={this.props.translator.t("explore-filter-restaurant")}
                        propertyName={"restaurants"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#94E861"
                        text={this.props.translator.t("explore-filter-cafe")}
                        propertyName={"cafe"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#90CCED"
                        text={this.props.translator.t("explore-filter-ice-cream")}
                        propertyName={"iceCream"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#617FE8"
                        text={this.props.translator.t("explore-filter-bar")}
                        propertyName={"bar"}
                        trigger={this.props.trigger}/>
                    <FilterButton backgroundColor="#11aa22"
                        text={this.props.translator.t("explore-filter-pharmacy")}
                        propertyName={"pharmacy"}
                        trigger={this.props.trigger}/>
                    </div>
                    <div className="side-filters-container">
                        <FilterButton backgroundColor="#0FD5E1"
                            propertyName={"drinkingWater"}
                            trigger={this.props.trigger}>
                                <MdLocalDrink size={25}/>
                        </FilterButton>
                        <FilterButton backgroundColor="#DD7429"
                            propertyName={"bus"}
                            trigger={this.props.trigger}>
                                <MdDirectionsBus size={20}/>
                        </FilterButton>
                        <FilterButton backgroundColor="#3552B7"
                            propertyName={"toilets"}
                            trigger={this.props.trigger}>
                                <MdWc size={20}/>
                        </FilterButton>
                    </div>

                </div>
                
            </div>
        );
    }
}