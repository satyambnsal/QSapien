import React,{Component} from 'react';
import NavBar from './NavBar';
import HomePageHeading from './HomePageHeading';
import ImageSlider from './ImageSlider';

export default class Home extends Component{
    render(){
        var links=[
            {"linkTo":"login",text:"STUDENT"},
            {"linkTo":"#",text:"FACULTY"},
            {"linkTo":"#",text:"STAFF"},
            {"linkTo":"#",text:"ALUMINI"},
            {"linkTo":"#",text:"PARENTS"},
            {"linkTo":"#",text:"VISIT"},
            {"linkTo":"#",text:"DIRECTORY"},
            {"linkTo":"#",text:"SEARCH"}
        ];
        return(
            <div>
            <NavBar links={links} />
            <HomePageHeading />
            <ImageSlider />
            </div>
        )
    }
}