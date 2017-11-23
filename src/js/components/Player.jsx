import React from 'react';
import ReactDOM from 'react-dom';


class Player extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            left: this.props.left,
            top: this.props.top,
            width: this.props.width,
            height: this.props.height
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
            <div style={{height: this.state.height + 'px', width: this.state.width + 'px', border: '1px solid blue', position: 'absolute', left: this.state.left + 'px', top: this.state.top + 'px', zIndex: '1'}} />
        );
    }
}

export {Player}