import React from 'react';
import ReactDOM from 'react-dom';
import{Board} from './Board.jsx';

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {top: '', left: ''}
    }
    componentDidMount() {
        let top = ReactDOM.findDOMNode(this).getBoundingClientRect().y;
        let left = ReactDOM.findDOMNode(this).getBoundingClientRect().x;

        this.setState({
            top: top,
            left: left
        })
    }

    render(){
        return(
            <div className="container clearfix">
                <Board initialTop={Math.floor(this.state.top)+200} initialLeft={Math.floor(this.state.left)-8}/>
            </div>
        );
    }
}

class SectionGame extends React.Component {

    render(){

        return(
            <section className="section-game">
                <Container />
            </section>
        );
    }
}

export{SectionGame}