
import React from 'react';
import '../Style/Header.css';
import '../Style/login.css';
import '../Style/sign.css';
import axios from 'axios';
import Modal from 'react-modal';
import '../Style/feedback.css';



const customStyles = {
    overlay:{
        'background-color': 'rgba(0, 0, 0, 0.6)'
    },
    content : {
        width: '350px',
        height: '420px',
        'background-color': 'rgba(248, 242, 242, 0.952)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
       ' box-shadow' : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        'box-sizing': 'border-box',
        padding:' 0 40px',
        border:'none',
       outline:'none',
        'z-index':'2'
        
    }
  };
  const signstyles={
    overlay:{
        'background-color': 'rgba(0, 0, 0, 0.6)'
    },
    content : {
        width: '760px',
        height: '600px',
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
  const feedstyles={
    overlay:{
        'background-color': 'rgba(0, 0, 0, 0.6)'
    },
    content : {
        width: '470px',
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
 

class Header extends React.Component{
    constructor(){
        super();
        this.state={
            modalIsOpen:false,
            signIsOpen:false ,
            feedback:false,
            FN:'',
            LN:'',
            email:'',
            pass:null,
            loginemail:'',
            loginpassword:null,
            IsloggedIn:false,
            success:null,
            phone:null,
            email1:'',
            comment:'',
            success1:null   
                    

        }
    }
    componentDidMount(){
        sessionStorage.setItem('IsloggedIn',false);
    }
    handlesigninchange=(event,state)=>{
        const {FN,LN,pass,email}=this.state;
       this.setState({[state] : event.target.value}) 
       
   } 
   handleloginchange=(event,state)=>{
    const {loginemail,loginpassword}=this.state;
   this.setState({[state] : event.target.value}) 
   
   }
   handlefeedchange=(event,state)=>{
   this.setState({[state] : event.target.value}) 
   
   }

   handledsignupsubmit=(event)=>{
    const {FN,LN,pass,email,success,signIsOpen}=this.state;
    const signobj={
        email:email,
        firstname:FN,
        lastname:LN,
        password:pass
    };
    axios({
        method :'POST',
        url : 'http://localhost:9000/signup',
        headers :{'content-type':'application/json'},
        data: signobj
    }).then(response=>{this.setState({success:response.data.status})}).catch()
    if(success==true){
        alert('You registered successfully');
    }else{
        alert('password strenght is weak or the email already please make changes');
    }
   
    event.preventDefault();
    this.setState({signIsOpen:false})
   }

   handleloginsubmit=(event)=>{
    const {loginemail,loginpassword,IsloggedIn,email1}=this.state;
    const loginobj={
        email:loginemail,
        password:loginpassword
    }
    axios({
        method :'post',
        url : 'http://localhost:9000/signin',
        headers :{'content-type':'application/json'},
        data: loginobj
    }).then(response=>{
        if(response.data.autheciation){
            alert('You logedin successfully');
            event.preventDefault();
            this.setState({modalIsOpen:false, IsloggedIn :response.data.autheciation,email1:response.data.rest_string[0].email});
            sessionStorage.setItem('IsloggedIn',response.data.autheciation)  ;
        }else{
            alert('user not present check your email and password');
            this.setState({
                email:'',
                password:null
            })
            event.preventDefault();
           
        }
    }).catch()
    
   }
   handlereset=()=>{
    const {FN,LN,pass,email}=this.state;
    this.setState({
            FN:'',
            LN:'',
            email:'',
            pass:null   

    })
   }
    handlelogin=()=>{
        const {modalIsOpen,IsloggedIn}=this.state;
        if(IsloggedIn){
            alert("you already loggedIn")
        }else{
            this.setState({modalIsOpen :true})
         }
        
       
   } 
   closelogin=()=>{
       const {modalIsOpen }= this.state;
       this.setState({modalIsOpen :false})
    
   }
   handlesign=()=>{
    const {modalIsOpen,IsloggedIn}=this.state;
    if(IsloggedIn){
        alert("please logout to create new account")
    }else{
        this.setState({signIsOpen: true})
    }
}

closesign=()=>{
this.setState({signIsOpen :false})
}
handlesignout=(event)=>{
    const {IsloggedIn}=this.state;
    var per;
    if(window.confirm('you wanna logout!!!')){
        per=1;
    }
    else{
        per=0;
    }
    if(per==1){
        this.setState({IsloggedIn:false});
    sessionStorage.setItem('IsloggedIn',false);
    alert('signout successfully');
    }
}
handlefeedsubmit=(event)=>{
    const {phone,email1,comment,success1}=this.state;
    const feedobj={
        email:email1,
        mobile:phone,
        comments:comment
    }
    axios({
        method :'POST',
        url : 'http://localhost:9000/feedback',
        headers :{'content-type':'application/json'},
        data: feedobj
    }).then(response=>{this.setState({success1:response.data.status})}).catch()
    if(success1==true){
        alert('Your feedback was taken succesfully');
        event.preventDefault();
        this.setState({feedback:false})
    }else{
        alert('email might be wrong');
    }
   
};
handlefeed=()=>{
    this.setState({feedback: true});
}
closefeed=()=>{
    this.setState({feedback:false});
};

   
    render () {
        const {modalIsOpen,signIsOpen,FN,LN,pass,email,IsloggedIn,feedback,email1}= this.state;
        
        let block={
            display:'block'
        }
        let none={
            display:'none'
        }
        
        return(
            <div>
                <div id="division1" className="container-fluid">
                        <div id="icon">S</div>
                        <div >
                        
                       
                        {IsloggedIn==true?
                        <div className="dropdown">
                                    <button className="dropbtn">Account</button>
                                    <div className="dropdown-content">
                                        <div className="content">Profile</div>
                                        <div className="content" onClick={(event)=>this.handlefeed(event)}>feedback</div>
                                        <div className="content" onClick={(event)=>this.handlesignout(event)} >signout</div>
                                    </div>
                        </div>:
                        <div>
                        <div id="account" className="right-part" onClick={this.handlesign} >Create Account</div>
                        <div  id="login" className="right-part" onClick={this.handlelogin}>login</div> 
                        
                        </div>
                        }
                        </div>
                </div>
                <div className="temp">
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        onRequestClose={this.closelogin}
                    >
                       
                            
                                <div className="login">Login</div>
                                <div className="contain">
                                    <input type="text" id="username" placeholder="Email" onChange={(event)=>this.handleloginchange(event,'loginemail')}/>
                                    <input type="password" id="password" placeholder="password" onChange={(event)=>this.handleloginchange(event,'loginpassword')}/>
                                </div>
                                <div className="submit">
                                    <input type="button" id ="submit" value="submit" onClick={this.handleloginsubmit} />
                                </div>
                                <div className="bottom">
                                    <input type="checkbox" id="remember" checked="checked"/>
                                    <label for="remember">Remember me</label>
                                    
                                </div>   
                                    
                                <div className="footer">forget password?</div>
                                <div className="signin" onClick={ this.handlesign}>Sign Up</div>
                            
                        
                    </Modal>
                    <Modal
                        isOpen={signIsOpen}
                        style={signstyles}
                        onRequestClose={this.closesign}
                    >
                            <div className="shr" id="image"></div>
                                <div className ="shrin">
                            
                                    <div className="login">Sign Up</div>
                        
                                    <div className="contai">
                                        <label for="email">Email</label>
                                        <input type="text" id="user" value={email} onChange={(event)=>this.handlesigninchange(event,'email')}/>
                                        <label for="fname">First Name</label>
                                        <input type="text" id="fName" value={FN} onChange={(event)=>this.handlesigninchange(event,'FN')}/>
                                        <label for="lname">Last Name</label>
                                        <input type="text" id="lName" value={LN} onChange={(event)=>this.handlesigninchange(event,'LN')}/>
                                        <label for="Password">Password</label>
                                        <input type="password" id="pass" value={pass}  onChange={(event)=>this.handlesigninchange(event,'pass')}/>
                                    </div>
                                    <div class="bottom">
                                        <input type="checkbox" id="remember" checked="checked"/>
                                        <label for="remember" className="remember">I agree to the Terms of user</label>
                                        
                                    </div>
                                    <div class="submit1">
                                        <input type="button" id="submi" className="submit" value="submit" onClick={this.handledsignupsubmit} />
                                        <input type="button" id="submi" className ="reset" value="reset" onClick={this.handlereset}/>
                                    </div>
                                   
                            </div>
                    </Modal>
                    <Modal
                        isOpen={feedback}
                        style={feedstyles}
                        onRequestClose={this.closefeed}
                    >
                         <div id="feedback">
                            <div class="container">
                                
                                    <div class="row" id="head">Feedback</div>
                                    <div class="row">
                                    <div class="form-group">
                                        <label for="usr" id="Detailslabel">Phone number:</label>
                                        <input type="number" min="0" max="10" class="form-control" id="DetailsName" onChange={(event)=>this.handlefeedchange(event,'phone')}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd" id="Phonelabel">email:</label>
                                        <input type="email" class="form-control" id="Phonenumber" value={email1} disabled/>
                                    </div>
                                    <div class="form-group">
                                        <label for="comment" id="addresslabel">comment:</label>
                                        <textarea class="form-control" rows="5" id="address" onChange={(event)=>this.handlefeedchange(event,'comment')}></textarea>
                                    </div>
                                    </div> 
                
                    
                                    <div class="row" id="footer"><button type="button" class="btn btn-primary" onClick={this.handlefeedsubmit}>submit</button></div>
                
                                </div>
                         </div>   
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Header;