import React from 'react';
import ReactDOM from 'react-dom';
import ReactFontAwesome from 'react-fontawesome';


import {Header} from './components/Header.jsx'
import{SectionGame} from './components/SectionGame.jsx';
require('../css/app.scss')


document.addEventListener('DOMContentLoaded', function(){
    class SectionPlayerPanel extends React.Component {
        render(){
            return(
                <section className="section-player-panel">
                    <div className="container"></div>
                </section>
            );
        }
    }

    class App extends React.Component {
        render(){
            return (
                <div>
                   <Header />
                   <SectionGame />
                   <SectionPlayerPanel />
                </div>
            )
        }
    }

    ReactDOM.render(
       <App/>,
        document.getElementById('app')
    );
});