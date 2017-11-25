import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class PadButton represents the game-flow control button
 * 
 * @method componentWillReceiveProps changes state.isActive and state.text
 * 
 * @method handleClick - if this.state isActive is true runs callToggleArrows() callToggleButton, callToggleRotator and callUpdateBoard methods received in props from parent components
 * 
 */

class PadButton extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isActive: this.props.isActive,
            text: this.props.text
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({isActive: nextProps.isActive, text: nextProps.text})
    }

    handleClick = () => {
        if(this.state.isActive) {
            this.props.callToggleArrows();
            this.props.callToggleButton();
            this.props.callToggleRotator();
            if(this.props.callUpdateBoard) {
                this.props.callUpdateBoard()
            }
        }
    }
    
    render(){
        return(
            <div className="btn" style={{color:(!this.state.isActive)&&'#662323'}}><span onClick={this.handleClick} style={{cursor: this.state.isActive ? 'pointer' : 'default', backgroundColor: (!this.state.isActive)&&'#662323', boxShadow: (!this.state.isActive)&&'0 0 0 0'}}></span> {this.state.text
            }</div>
        );
    }
}
export{PadButton}