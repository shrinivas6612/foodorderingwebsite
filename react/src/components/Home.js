import React from 'react';
import '../Style/Home.css';
import Quicksearch from './Quicksearch';
import Wallpaper from './wallpaper';
import axios from 'axios';


class Home extends React.Component{
    constructor(){
        super();
        this.state= {
            locations:[],
            mealtypes :[]
        }
    }
    componentDidMount(){
        axios({
            method :'GET',
            url : 'http://localhost:9000/city',
            headers :{'Content-Type':'application/json'}
        }).then(response =>this.setState({locations :  response.data.city_name}))
        .catch(err => console.log(err))

        axios({
            method :'GET',
            url : 'http://localhost:9000/mealtype',
            headers :{'Content-Type':'application/json'}
        }).then(response =>this.setState({mealtypes : response.data.mealtype}))
        .catch(err => console.log(err))
    }
   
    render(){
        const {locations,mealtypes}= this.state;
        return(
            <React.Fragment>
           <Wallpaper locations ={locations}/>,
           <Quicksearch mealtypes={mealtypes}/>
           </React.Fragment>
        )
    }
}
export default Home;