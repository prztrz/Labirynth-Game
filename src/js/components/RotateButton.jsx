import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class RotateButton - represents the rotate control buttons
 * 
 * @method componentWillReceiveProps changes this.state.isActive
 * 
 * @method callRotateTile - if this.state.isActive is true runs this.props.callRotateTile method received with props from parent component
 */

class RotateButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position: this.props.position,
            isActive: this.props.isActive
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isActive: nextProps.isActive
        })
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