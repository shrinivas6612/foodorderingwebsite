
import React from 'react';
import {withRouter} from 'react-router-dom';



class Quicksearchitem extends React.Component{
    handclick = (Id) => {
        this.props.history.push(`/filter/?mealid=${Id}`)
    }
   
    render(){
        const {id,name,content,Image} = this.props;
        return(
            <div  className="col-sm-12 col-md-12 col-lg-4" style={{padding : '15px'}}  onClick={() => this.handclick (id)}>
                < div className="float">
                    <img src={Image} style={{width:'100px', height:'100px'}} />
                    <h4 >{name}</h4>
                    <p>{content}</p>
                </div> 
            </div>
        )
    }
    
}
 export default withRouter(Quicksearchitem);