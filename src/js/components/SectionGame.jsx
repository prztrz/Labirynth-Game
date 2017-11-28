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

        console.log(top,left)

        this.setState({
            top: top,
            left: left
        })
    }

    render(){
        console.log('top,left',this.state.top, this.state.left)
        return(
            <div className="container clearfix">
                <Board initialTop={this.state.top+210} initialLeft={this.state.left}/>
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