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
                        <FilterButton backgroundColor="#617FE8"
                            text={this.props.translator.t("explore-filter-bar")}
                            propertyName={"bar"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#EFD062"
                            text={this.props.translator.t("explore-filter-beach-resort")}
                            propertyName={"beach_resort"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#ef9662"
                            text={this.props.translator.t("explore-filter-bnb")}
                            propertyName={"bnb"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#E090ED"
                            text={this.props.translator.t("explore-filter-monuments")}
                            propertyName={"historic"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#62efbb"
                            text={this.props.translator.t("explore-filter-hotel")}
                            propertyName={"hotel"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#ef6262"
                            text={this.props.translator.t("explore-filter-pizzeria")}
                            propertyName={"pizzeria"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#E89261"
                            text={this.props.translator.t("explore-filter-restaurant")}
                            propertyName={"restaurant"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#6c39e3"
                            text={this.props.translator.t("explore-filter-pub")}
                            propertyName={"pub"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#94E861"
                            text={this.props.translator.t("explore-filter-cafe")}
                            propertyName={"cafe"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#90CCED"
                            text={this.props.translator.t("explore-filter-ice-cream")}
                            propertyName={"icecream"}
                            trigger={this.props.trigger}/>
                        <FilterButton backgroundColor="#11aa22"
                            text={this.props.translator.t("explore-filter-pharmacy")}
                            propertyName={"pharmacy"}
                            trigger={this.props.trigger}/>
                    </div>
                    <div className="side-filters-container">
                        <FilterButton backgroundColor="#0FD5E1"
                            propertyName={"water"}
                            trigger={this.props.trigger}>
                                <MdLocalDrink size={25}/>
                        </FilterButton>
                        <FilterButton backgroundColor="#DD7429"
                            propertyName={"bus_stop"}
                            trigger={this.props.trigger}>
                                <MdDirectionsBus size={20}/>
                        </FilterButton>
                        <FilterButton backgroundColor="#3552B7"
                            propertyName={"toilet"}
                            trigger={this.props.trigger}>
                                <MdWc size={20}/>
                        </FilterButton>
                    </div>

                </div>
                
            </div>
        );
    }
}