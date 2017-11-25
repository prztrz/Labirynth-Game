import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class Grid represents single grid square on the game tile
 * 
 * @method render - renders the component, if the component receive this.props.tresure value other then null and 0, places treasure on the component.
 */
class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: this.props.type, //0-obstacle(wall) 1-way
            treasure: this.props.treasure,
            background: this.props.background,
            class: this.props.class
        }
    }

    componentWillReceiveProps(nextProps) {
        (this.state.treasure !== nextProps.treasure) ? this.setState({treasure: nextProps.treasure}) : null
    }

    render(){
        let treasure = (this.props.treasure !== null && this.props.treasure !== 0) ? this.props.treasure : '';
        return(
            <div className={'game-grid ' + this.state.class} style={{backgroundColor: this.state.background }}><h4>{treasure}</h4></div>
        );
    }
}

export {Grid}