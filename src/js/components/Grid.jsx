import React from 'react';
import ReactDOM from 'react-dom';

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: this.props.type, //0-brick 1-way
            positionIndex: this.props.positionIndex,
            background: this.props.background
        }
    }

    componentDidMount() {
        this.getPosition();
    }

    componentDidUpdate() {
        this.getPosition();
    }

    getPosition() {
        this.pos = ReactDOM.findDOMNode(this).getBoundingClientRect();          
    }
    render(){
        return(
            <div className="game-grid" style={{backgroundColor: this.state.background }}>{this.props.type}</div>
        );
    }
}

export {Grid}