import React,{Component} from 'react';

export default class ImageSlider extends Component{
    render(){
        return(
            <div id="mycarousel" className="carousel slide container-fluid" data-ride="carousel">
            <ul className="carousel-indicators">
                <li data-target="mycarousel" data-slide-to="0" className="active"></li>
                <li data-target="mycarousel" data-slide-to="1"></li>
                <li data-target="mycarousel" data-slide-to="2"></li>
                <li data-target="mycarousel" data-slide-to="3"></li>
                <li data-target="mycarousel" data-slide-to="4"></li>
                <li data-target="mycarousel" data-slide-to="5"></li>
            </ul>
            <div className="carousel-inner">
                <div className="item active">
                    <img src="images/library.jpeg" width="100%" height="100%" className="img-responsive mx-auto d-block"/>
                </div>
                <div className="item">
                    <img src="images/study.jpeg" width="100%" height="100%" className="img-responsive mx-auto d-block"/>
                </div>
                <div className="item">
                    <img src="images/create.jpeg" width="100%" height="100%" className="img-responsive mx-auto d-block"/>
                </div>
                <div className="item">
                    <img src="images/library1.jpeg" width="100%" height="100%" className="img-responsive mx-auto d-block"/>
                </div>
                <div className="item">
                    <img src="images/farewell.jpeg" width="100%" height="100%" className="img-responsive mx-auto d-block"/>
                </div>
            </div>
        </div>
        )
    }
}