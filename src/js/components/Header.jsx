import React from 'react';
import ReactDOM from 'react-dom';

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

export {Header}