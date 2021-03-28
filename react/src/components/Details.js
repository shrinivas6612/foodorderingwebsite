import React from 'react';
import '../Style/Details.css';
import '../Style/order.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import queryString from 'query-string';
import Menu from './menu';
import Modal from 'react-modal';

const orderstyles={
    overlay:{
        'background-color': 'rgba(0, 0, 0, 0.6)'
    },
    content : {
        width: '650px',
        height: '470px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
       ' box-shadow' : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
       'box-sizing': 'border-box',
       overflow:'hidden',
       border:'none',
       outline:'none',
       padding:'0',
      
        'z-index':'2'
        
    }
  };

class Details extends React.Component{
    constructor(){
        super();
        this.state = {
            restaurant:{},
            cuisine :[],
            dishes:[],
            modalorder:false,
            order:[],
            orderisopen:false,
            
        }
    }

    componentDidMount(){
        // const restID = this.props.location.pathname.split('/')[2]; 
        const queryParams = queryString.parse(this.props.location.search);
        const data1= queryParams.data;
        const temp=data1;
        const iob={
            "rest_id":String(data1)
        };
        axios({
            method:'POST',
            url:'http://localhost:9000/restbyid',
            headers: { 'Content-Type' : 'application/json'},
            data:iob,
            }).then(response => this.setState({restaurant:response.data.restaurant[0], cuisine :response.data.cuisine}))
            .catch(err => console.log(err));

            axios({
                method:'POST',
                url:'http://localhost:9000/dishbyid',
                headers: { 'Content-Type' : 'application/json'},
                data:iob,
                }).then(response => this.setState({dishes:response.data.dishes}))
                .catch(err => console.log(err))    
    }
    handleorder=()=>{
        const {order}=this.state;
        if(sessionStorage.getItem('IsloggedIn')=='true'){
            if(order.length==0){
                alert('no order selected.please select a order');
            }else{
                this.setState({orderisopen:true})
            }
        }else{
            alert('Please login to continue')
        }
    }
    placeorder=(event)=>{
        alert('order placed successfully');
        event.preventDefault();
        this.setState({orderisopen:false});
        
        sessionStorage.setItem('orderplaced',true);
        
    }
    orderchange=(dish_name,cost,value)=>{
        const {order}=this.state;
        var iob={
            dish:dish_name,
            cos:cost,
            quantity:value,
            total:value*cost
        };
        if(order.length>0){
            var a=order.findIndex(function(post,index){
                if(post.dish==dish_name)
                return true;
            });
            if(a==-1 && value!=0){
                order.push(iob);
            }
            if(a!=-1 && value!=0){
                order[a].quantity=value;
                order[a].total=value*cost;
            }
            if(a!=-1 && value==0){
                order.splice(a,1);
            }
        }
        if(order.length==0){
            order.push(iob);
        }
        
    }
    closeorder=()=>{
        this.setState({orderisopen:false})
    }
    
    
    render(){
        const { restaurant ,cuisine,dishes,orderisopen,order} = this.state;
      
        return(
            <div>
               {restaurant != null?
                    <div className="main">
                    <div class="Images"></div>
                    <div className="heading">{restaurant.name}</div><br/>
                    <div style={{display:'block'}}><div className="orderplacing" onClick={this.handleorder}>Place order</div></div>
                    <div>
                    <Modal
                        isOpen={orderisopen}
                        style={orderstyles}
                        onRequestClose={this.closeorder}
                    >
                       <div id="contai">
                            <div class="container">
                            <div id="titles">orders</div>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Quantity</th>
                                    <th>Cost each</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.map((item)=>{
                                return <tr>
                                    <td>{item.dish}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.cos}</td>
                                    <td>{item.total}</td>
                                </tr>
                                 })}
                                
                                </tbody>
                            </table>
                            <div><span id="Total">Total </span>&nbsp;&nbsp;&nbsp;<span id="tot">{order.reduce((totalValue,currentValue)=>{return (totalValue+currentValue.total);},0)}</span></div>
                            <br></br><div><button type="button" class="btn btn-primary" onClick={(event)=>this.placeorder(event)}>Proceed</button></div> 
                            </div>
                        </div>
                            
                    </Modal>
                    </div>
                     <div>
                         <Tabs>
                                 <TabList>
                                 <Tab><div className="tab">Dishes</div></Tab>
                                 <Tab><div className="tab">overview</div></Tab>
                                 <Tab><div className="tab">contact</div></Tab>
                                 </TabList>
                                 <TabPanel>
                                     <br></br><br></br>
                                 {dishes.map((item) =>{
                                 return <Menu dish_name={item.dish_name} cost={item.cost} orderchange={this.orderchange}/>
                                 })}
                                 </TabPanel>
                                 <TabPanel>
                                     <h5 className="shop"  id="shop1">About this place</h5>
                                     <h5 id="detail_restname">{restaurant.rest_name}</h5>
                                     <h6 className="shop">cuisine</h6>
                                    {cuisine.map((item) =>{
                                         return <p>{item.cus_name}</p>
                                     })}
                                     <h6 className="shop">Average Cost</h6>
                                     <p>Rs.{restaurant.avg}  for two people (approx.)</p>
                                 </TabPanel>
                                 <TabPanel>
                                     <h6 className="phonenumber">Phone Number</h6>
                                     <p>{restaurant.cont_no}</p>
                                     <h6 className="shop">Restaurant address</h6>
                                     <p>{restaurant.address}</p>
                                 </TabPanel>
                             </Tabs>
                     </div>   
                             
                 </div> : <div>{null}</div> 
               }     
                         
            </div>
        )
    }
}
export default Details;