import React from 'react';
import '../Style/login.css';
import Modal from 'react-modal';



class login1 extends React.Component{
    constructor(){
        super();
        this.state = {
            loginmodalisopen :false
        }
    }
   
  
    render(){
        
        return(
            <div>
                <div className="modal" id="mymodal">
                        <div className="shri">
                            <div className="login">Login</div>
                            <div className="contain">
                                <input type="text" id="username" placeholder="username"/>
                                <input type="password" id="password" placeholder="password"/>
                            </div>
                            <div className="submit">
                                <input type="button" value="submit"/>
                            </div>
                            <div className="bottom">
                                <input type="checkbox" id="remember" checked="checked"/>
                                <label for="remember">Remember me</label>
                                
                            </div>   
                                
                            <div className="footer">forget password?</div>
            
                        </div>
                </div>
               
            </div>
        )
    }
}
export default login1;