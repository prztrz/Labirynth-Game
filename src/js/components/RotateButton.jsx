import React from 'react';
import ReactDOM from 'react-dom';

class RotateButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position: this.props.position,
            isActive: this.props.isActive
        }
    }

    callRotateTile = () => {
        if (this.state.isActive){
            this.props.callRotateTile(this.props.position)
        }
    }
    render(){
        return(
            <div className={`rotate-button ${this.state.position}`} onClick={this.callRotateTile} style={{cursor: this.state.isActive ? 'pointer' : 'default'}}></div>
        );
    }
}

export {RotateButton}