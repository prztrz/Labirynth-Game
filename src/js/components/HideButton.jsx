import React from 'react';
import ReactDOM from 'react-dom';

class HideButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: this.props.isActive
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.isActive !== nextProps.isActive) {
            this.setState({
                isActive: nextProps.isActive
            })
        }
    }
    render(){
        return(
            <span className={`hide-button ${this.props.isActive ? 'active' : ''}`} onClick={this.props.callTogglePad}>{this.props.isActive ? 'Show pad' : 'Hide pad'}</span>
        );
    }
}

export {HideButton}