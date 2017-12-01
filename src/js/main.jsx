import React from 'react';
import ReactDOM from 'react-dom';
import ReactFontAwesome from 'react-fontawesome';

import	{	Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
}	from	'react-router';


import {Header} from './components/Header.jsx'
import{SectionGame} from './components/SectionGame.jsx';
import {MainMenu} from './components/MainMenu.jsx';
import {NotFound} from './components/NotFound.jsx'
require('../css/app.scss')


class Tutorial extends React.Component {
    render(){
        return(null);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    class App extends React.Component {
        render()	{
            return(	
                <Router	history={hashHistory}>
                        <Route	path='/' component={Header}>
                            <IndexRoute component={MainMenu}/>
                            <Route path='/game' component={SectionGame} />
                            <Route path='/tutorial' component={Tutorial} />
                            <Route	path='*' component={NotFound}/>
                        </Route>
                </Router>
            );
    }
}


    ReactDOM.render(
       <App/>,
        document.getElementById('app')
    );
});