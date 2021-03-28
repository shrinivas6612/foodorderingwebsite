
import React from 'react';
import Quicksearchitem from './Quicksearchitem';



class Quicksearch extends React.Component{
   
    render(){
        const {mealtypes} = this.props;
        
        return(
            <div>
                   
                    <div className="container" id="container" >
                            <div id="quicksearch" className="row">Quick search</div>
                            <div id="text2" className="row">Discover restaurants by type of meal</div>
                            <div id="column" className="row" >
                                {mealtypes.map((item)=>{
                                    return <Quicksearchitem id={item.meal_id} name={item.meal_name} content ={item.content} Image={item.meal_image} />
                                })}
                                
                                
                            </div>
                    </div>
            </div>
        )
    }
}
export default Quicksearch ;