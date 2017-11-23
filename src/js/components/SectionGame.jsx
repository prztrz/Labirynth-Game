import React from 'react';
import ReactDOM from 'react-dom';
import{Board} from './Board.jsx';

class SectionGame extends React.Component {
    render(){
        return(
            <section className="section-game">
                <div className="container clearfix">
                    <Board initialTop={341} initialLeft={280}/>
                </div>
            </section>
        );
    }
}

export{SectionGame}