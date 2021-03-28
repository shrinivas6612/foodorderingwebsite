import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Filter from './components/Filter';
import Header from './components/Header';


const router =()=>{
    return(
        <BrowserRouter>
            <Header/>
            <Route exact path='/' component={Home} />
            <Route path='/filter' component={Filter} />
            <Route path='/details' component={Details} />
            
            
        </BrowserRouter>
    )
}
export default router;