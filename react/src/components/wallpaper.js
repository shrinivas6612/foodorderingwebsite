
import React ,{useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class wallpaper extends React.Component{
    constructor(){
        super();
        this.state={
            cityname:[],
            restList:[],
            option:[],
            option1:[],
            temp:[],
            txt :'',
            restaurant:{}
        }
    }
    componentDidMount(){
        axios({
            method :'GET',
            url : 'http://localhost:9000/city',
            headers :{'Content-Type':'application/json'}
        }).then(response =>this.setState({cityname :  response.data.city}))
        .catch(err => console.log(err))

        axios({
            method :'GET',
            url : 'http://localhost:9000/rest_name',
            headers :{'Content-Type':'application/json'},
        }).then(response =>{this.setState({restList :  response.data.restaurant})})
        .catch(err => console.log(err))
    }

     handlewall =(event)=>{ 
       const city_id = (event.target.value);
       this.props.history.push(`/filter/?location1=${city_id}`)
  
     }
     inputchange =(event,state)=>{
        const {option,text }= this.state;
        var name1 = event.target.value;
        if(name1==''){
            this.setState({option:[]})
        }else{
            const iob4 ={
                restaurant_string :event.target.value
            }
            axios({
                method :'POST',
                url : 'http://localhost:9000/rest_st',
                headers :{'Content-Type':'application/json'},
                data:iob4
            }).then(response =>{this.setState({option: response.data.rest_string })
            })
            .catch(err => console.log(err))
        }
        
       
    
     }
    handleres=(event)=>{
        const {restaurant}=this.state;
        var temp= event.target.value;
        const iob3={
            restaurant_name:temp
        }
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_id_s',
            headers :{'Content-Type':'application/json'},
            data : iob3
        }).then(response =>{this.setState({restaurant :  response.data.rest_name[0]})
          this.props.history.push(`/Details/?data=${response.data.rest_name[0].rest_id}`)
    })
        .catch(err => console.log(err))
        
        
    }
         
    render(){
        const {cityname,restList,option,text,option1}=this.state;
        const {locations}= this.props;
        
        
        return(
            <div>
                    <div className="image">
                            <div className="logo">S</div>
                            <div className="text1">Find the best restaurants, cafés, and bars</div>
                            <div className="search">
                                <select onChange={(event)=>{this.handlewall(event)}}>
                                    <option hidden>select</option>
                                    {cityname.map((item,index) =>{
                                        return <option key={index} value={item.city_id} class="optioncolor">{item.city_name}</option>
                                    })}
                                    
                                </select>
                            </div>
                            <div className="input">
                                <span className="search-bar-dropdown">
                                        <input type="text" id="location"  className="form-control" placeholder="Search" value={text} onChange={(event) =>{this.inputchange(event,text)}}/>
                                    
                                            <ul className="list-group"  >
                                            {option.map((item,index) =>{
                                                return <button type="button" key={index} id="danger" value={item.rest_name} className="list-group-item list-group-item-action" style={{backgroundImage:"url("+item.thumb+")"}} onClick={(event)=>{this.handleres(event)}}>{item.rest_name}</button>
                                            })}
                                            </ul>
                                        
                               </span>
                            </div>
                    </div>
                   
            </div>
        )
    }
}
export default withRouter(wallpaper);