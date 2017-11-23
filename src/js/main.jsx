import React from 'react';
import ReactDOM from 'react-dom';

import{Board} from './components/Board.jsx'
require('../css/app.scss')


document.addEventListener('DOMContentLoaded', function(){
    
    class Header extends React.Component {
        render(){
            return(
                <header className="page-header">
                    <div className="container">
                        <div className="title">
                            <h1>Labirynth</h1>
                        </div>
                    </div>
                </header> 
            );
        }
    }

    class SectionGame extends React.Component {
        render(){
            return(
                <section className="section-game">
                    <div className="container clearfix">
                        <Board initialTop={231} initialLeft={283}/>
                    </div>
                </section>
            );
        }
    }

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
        <App />,
        document.getElementById('app')
    );
});