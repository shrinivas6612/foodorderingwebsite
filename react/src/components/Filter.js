import React from 'react';
import '../Style/Filter.css';
import axios from 'axios';
import queryString from 'query-string';

class Filter extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants :[],
            cuisines:[],
            location_id:[],
            totalrecords:undefined,
            mealtype:undefined,
            lcost:undefined,
            hcost :undefined,
            cuisine:[],
            sort:1,
            pagination:undefined,
            id:undefined,
            city:undefined
    }
}
    componentDidMount(){
        const queryParams = queryString.parse(this.props.location.search);
        const mealid= queryParams.mealid;
        const location1= queryParams.location1;
        const iob4={
            "city":location1
        }
       
        const filtobj={
            "mealtype": mealid
           
        }
        if(mealid != undefined){
            axios({
                method :'post',
                url : 'http://localhost:9000/rest_filter',
                headers :{'content-type':'application/json'},
                data: filtobj
            }).then(response =>this.setState({restaurants :  response.data.values,cuisines:response.data.cuisines,"mealtype":mealid, totalrecords: response.data.Totalpagin}))
            .catch(err => console.log(err))
            
            
            
        }
        if(location1 != undefined){
            axios({
                method :'post',
                url : 'http://localhost:9000/rest_filter',
                headers :{'Content-Type':'application/json'},
                data : iob4
            }).then(response =>this.setState({restaurants :  response.data.values ,cuisines:response.data.cuisines, "city":location1, totalrecords: response.data.Totalpagin}))
            .catch(err => console.log(err))
        }
        axios({
            method :'GET',
            url : 'http://localhost:9000/city',
            headers :{'content-type':'application/json'},
        }).then(response =>this.setState({location_id :  response.data.city}))
        .catch(err => console.log(err))
        
    }


    handlechange =(cuisineId)=>{
        const {mealtype,cuisine}= this.state;
        const {sort}=this.state;
         const  {city}=this.state;
         if (cuisine.indexOf(cuisineId) == -1) {
            cuisine.push(cuisineId);
        }
        else {
            var index = cuisine.indexOf(cuisineId);
            cuisine.splice(index, 1);
        }
        const iob1={
            "cuisine": cuisine.length>0 ? cuisine : undefined,
            "sort":sort,
            "mealtype":mealtype,
             "city":city
        };
        
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_filter',
            headers :{'Content-Type':'application/json'},
            data : iob1
        }).then(response =>this.setState({restaurants :  response.data.values, totalrecords: response.data.Totalpagin}))
        .catch(err => console.log(err))
    }
    pagination =(pagi)=>{
        const {mealtype}= this.state;
        const {cuisine} =this.state;
        const {lcost}=this.state;
        const {hcost}=this.state;
        const {sort}=this.state;
         const {city}=this.state;
        const iob1={
            "pagination" :pagi,
            "cuisine":cuisine.length>0 ? cuisine : undefined,
            "lcost":lcost,
            "hcost":hcost,
            "sort":sort, 
            "mealtype":mealtype,
             "city":city
        };
       
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_filter',
            headers :{'Content-Type':'application/json'},
            data : iob1
        }).then(response =>this.setState({restaurants :  response.data.values, totalrecords: response.data.Totalpagin}))
        .catch(err => console.log(err))
    }


    costchange = (lcos,hcos) =>{
        const {mealtype}= this.state;
        const {sort}=this.state;
        const {cuisine}= this.state;
         const {city}=this.state;
        const iob2={
            "lcost":Number(lcos),
            "hcost":Number(hcos),
            "sort":sort,
            "cuisine":cuisine.length>0 ? cuisine : undefined,
            "mealtype":mealtype,
            "city":city
        };
        
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_filter',
            headers :{'Content-Type':'application/json'},
            data : iob2
        }).then(response =>this.setState({restaurants :  response.data.values, "lcost":Number(lcos),
        "hcost":Number(hcos), totalrecords: response.data.Totalpagin}))
        .catch(err => console.log(err))
    }
    

    sortchange=(sortnum) =>{
        const {mealtype}= this.state;
        const {cuisine}= this.state;
        const {lcost}=this.state;
        const {hcost}=this.state;
         const {city}=this.state;
        const iob2={
            "sort":sortnum,
            "cuisine":cuisine.length>0 ? cuisine : undefined,
            "lcost":lcost,
            "hcost":hcost,
            "mealtype":mealtype,
             "city":city
        };
        
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_filter',
            headers :{'Content-Type':'application/json'},
            data : iob2
        }).then(response =>this.setState({restaurants :  response.data.values,sort:sortnum, totalrecords: response.data.Totalpagin}))
        .catch(err => console.log(err))
    }
    onidclick =(id)=>{
        const id1= 2
        this.props.history.push(`/Details/?data=${id}`)
    }
    handlelocation=(event)=>{
        var temp = event.target.value;
        const {mealtype}= this.state;
        const {cuisine}= this.state;
        const {lcost}=this.state;
        const {hcost}=this.state;
        const {sort}=this.state;
        const iob2={
            "sort":sort,
            "cuisine":cuisine.length>0 ? cuisine : undefined,
            "lcost":lcost,
            "hcost":hcost,
            "mealtype":mealtype,
            "city":temp
        };
        
        axios({
            method :'post',
            url : 'http://localhost:9000/rest_filter',
            headers :{'Content-Type':'application/json'},
            data : iob2
        }).then(response =>this.setState({restaurants :  response.data.values , "city":temp, totalrecords: response.data.Totalpagin}))
        .catch(err => console.log(err))
    }


    render(){
        const {restaurants,totalrecords,location_id,cuisines}= this.state;
        const arr =[];
        for(let i = 1; i <= totalrecords; i++) {
            arr.push(i);
            
        }
        return(
            <div>        
                        <div id="division2" className="container-fluid"><h1>Filter</h1></div>
                        <div id="division3" className="container-fluid">
                            <div id="subspace" className="row">
                                <div id="subdivision1" className="col-sm-4 col-md-4 col-lg-4">
                                    <div id="sidepage" >
                
                                        <h5 className="filters-head">Filters</h5>
                                        <div>
                                            <h6 className="filters-head">Select location</h6>
                                            <select id="loca"  onChange={(event) =>this.handlelocation(event)} >
                                                    <option hidden>select</option>
                                                    {location_id.map((item,index) =>{
                                                        return <option id="option" key={index} value={item.city_id}>{item.city_name}</option>
                                                    })}
                                    
                                            </select>
                                            
                                        </div><br></br>
                                        <div className="spacing">
                                            <div className="filters-head">Cuisine</div>
                                            <input type="checkbox"  onChange={() =>{this.handlechange(1)}}/>
                                            <label for="north indian">North Indian</label><br></br>
                                            <input type="checkbox"  onChange={() =>{this.handlechange(2)}}/>
                                            <label for="south indian">South Indian</label><br></br>
                                            <input type="checkbox"  onChange={() =>{this.handlechange(3)}}/>
                                            <label for="chinese">chinese</label><br></br>
                                            <input type="checkbox"  onChange={() =>{this.handlechange(4)}}/>
                                            <label for="fast food">Fast food</label><br></br>
                                            <input type="checkbox"  onChange={() =>{this.handlechange(5)}}/>
                                            <label for="Street food">Street food</label><br></br>
                                            
                                        </div><br></br>
                                    
                                    
                                    
                                        <div className="spacing">
                                            <div className="filters-head">Cost for two</div>
                                            <input type="radio" id="first" name="cost" onChange={() =>{this.costchange(0,500)}}/>
                                            <label for="first">Less than 500</label><br></br>
                                            <input type="radio" id="second" name="cost" onChange={() =>{this.costchange(501,1000)}}/>
                                            <label for="second">500 to 1000</label><br></br>
                                            <input type="radio"  id="third" name="cost" onChange={() =>{this.costchange(1001,1500)}}/>
                                            <label for="third">1000 to 1500</label><br></br>
                                            <input type="radio"  id="fourth" name="cost" onChange={() =>{this.costchange(1501,2000)}}/>
                                            <label for="fourth">1500 to 2000</label><br></br>
                                            <input type="radio"  id="fifth" name="cost" onChange={() =>{this.costchange(2001,10000)}}/>
                                            <label for="fifth">2000+</label><br></br>
                                        </div><br></br>
                                    
                                        <div className="spacing">
                                    
                                            <div className="filters-head">Sort</div>
                                            <input type="radio" id="sort1" name="sort" onChange={() =>{this.sortchange(1)}}/>
                                            <label for="sort1">Low to High</label><br></br>
                                            <input type="radio" id="sort2" name="sort" onChange={() =>{this.sortchange(-1)}}/>
                                            <label for="sort2">High to Low</label><br></br>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div id="subdivision2" className="col-sm-8 col-md-8 col-lg-8">
                                     {restaurants != undefined ? restaurants.map((item) =>{
                                         return <div id="main-panel" className="row"   onClick={() =>{this.onidclick(item.rest_id)}}>
                                         <div className="sub-panel">
                                             <div className="side-panel">
                             
                                                 <img src={item.thumb} style={{width:'100px', height:'100px'}} />
                                                 <h3 style={{color: 'red', 'font-family': 'sans-serif'}}>{item.rest_name}</h3>
                                                 <p style={{color: 'red', 'font-weight': '800'}}>{item.locality}</p>
                                                 <p>{item.address}</p>
                                             
                                             </div>
                                             <hr />
                                             <div className="side-panel1">
                                                 <div>CUISINE: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                 {(cuisines.filter(item1=>(item1.rest_id==item.rest_id))).map((item1)=>{
                                                     return <span style={{color: 'grey', 'font-family': 'sans-serif'}}>{item1.cus_name}&nbsp;&nbsp;</span> })}
                                                </div>
                                                 <div>COST FOR TWO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'grey', 'font-family': 'sans-serif'}}> {item.avg}</span></div>
                                             </div>
                                         </div>
                 
                                     </div>
                                     }):<div class="nodata">No Data found</div>}
                                    
                                    
                
                                    
                
                                    <div id="footer" className="row">
                                        <div className="foot">
                                            <a href="#">&laquo;</a>
                                            {arr.map((item)=>{
                                                return <a href="#" onClick={()=>{this.pagination(item)}}>{item}</a>
                                            })}
                                            <a href="#">&raquo;</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
    
        )
    }
}
export default Filter;