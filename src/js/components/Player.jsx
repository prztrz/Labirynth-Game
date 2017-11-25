import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class Player -represents the player's sprite
 * 
 * @method componentWillReceiveProps -changes this.props.state.left and this.props.state.right depending on the values received with props - it changes the position of the player's sprite
 * 

 */


class Player extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            left: this.props.left,
            top: this.props.top,
            width: this.props.width,
            height: this.props.height,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.left !== nextProps.left) {
            this.setState({left: nextProps.left})
        }

        if (this.props.top !== nextProps.top) {
            this.setState({top: nextProps.top})
        }
    }

    
    render(){
        return(
            <div className='player' style={{height: this.state.height + 'px', width: this.state.width + 'px', position: 'absolute', left: this.state.left + 'px', top: this.state.top + 'px', zIndex: '1', backgroundImage: `url(./../../images/sprites/mario/1.png)`}} />
        );
    }
}

export {Player}