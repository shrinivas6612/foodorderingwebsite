
import React from 'react';
import {Carousel} from 'react-responsive-carousel'; 



class caursol extends React.Component{
    render(){
        return(
            <div className="carousel">
            <Carousel>
                <Carousel.Item><img src={require('../Images/drinks.jpg')} style={{width:'100px',height:'100px'}}/></Carousel.Item>
                <Carousel.Item><img src={require('../Images/home.jpg')} style={{width:'100px',height:'100px'}}/></Carousel.Item>
                <Carousel.Item><img src={require('../Images/lunch.jpg')} style={{width:'100px',height:'100px'}}/></Carousel.Item>
                <Carousel.Item><img src={require('../Images/supper.jpg')} style={{width:'100px',height:'100px'}}/></Carousel.Item>
            </Carousel>
        </div>
        )
    }
}
export default caursol;