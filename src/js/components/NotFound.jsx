import React from 'react';
import ReactDOM from 'react-dom';

import {Tile} from './Tile.jsx';

import	{Link}	from	'react-router';

class NotFound extends React.Component {
  

    render(){
        return(
            <section className='section-not-found'>
                <div className="container">
                    <header className='not-found-header'>
                        <h2>404</h2>
                        <p>Your pincess is propably in <Link to="/">another castle!</Link></p>
                    </header>
                </div>

                <footer className="not-found-footer">
                    <small>Przemysław Trzepiński &copy; 2017. <a href='https://opensource.org/licenses/MIT' target="_blank">MIT licence</a> - use it however you want, just don't claim you are an author, please!</small>
                </footer>
            </section>
        );
    }
}

export {NotFound}