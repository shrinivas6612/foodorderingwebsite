import React from 'react';
import {withRouter} from 'react-router-dom';



class Menu extends React.Component{
    constructor(){
        super();
        this.state = {
            number:0
            
        }
    }
    handleremove=(event)=>{
        var value=0;
        const {number}= this.state;
        this.setState({number:0});
        this.props.orderchange(this.props.dish_name,this.props.cost,value);
    }
    handlequantitychange = (event,state) => {
         var value=event.target.value;
        const {number}= this.state;
        this.setState({[state]:event.target.value});
        this.props.orderchange(this.props.dish_name,this.props.cost,value);
    }
    
   
    render(){
        const {dish_name,cost} = this.props;
        const {number}=this.state;
        return(
            <div className="sub-pane">
                <div id="first" className="col-sm-8 col-md-8 col-lg-8">
                    <div className="side-panel">
                                
                        <img src={require('../Images/breakfast.jpg')} style={{width:'125px', height:'125px'}} />
                        <h3 style={{color: 'red', 'font-family': 'sans-serif'}}>{dish_name}</h3>
                        <p style={{color: 'dogger blue', 'font-weight': '400'}}>order as you like</p>
                        <div style={{color: 'dogger blue', 'font-weight': '600'}}>COST:<span style={{color: 'doggerblue', 'font-family': 'sans-serif'}}>{cost}</span></div>
                    </div>
                </div>
                <div id="second" className="col-sm-4 col-md-4 col-lg-4">
                    <label for="quantity" id="Detailslabel">quantity:</label>
                    <input type="number" min="0" max="100" class="form-control" id="quanti" value={number} onChange={(event)=>this.handlequantitychange(event,'number')}/>
                    <div class="row" id="remove"><button type="button" class="btn btn-primary" onClick={(event)=>this.handleremove(event)}>remove</button></div>
                </div>
            </div>
        )
    }
    
}
 export default withRouter(Menu);