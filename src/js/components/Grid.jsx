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
        let treasure = (this.state.treasure !== null && this.state.treasure !== 0) ? this.state.treasure : '';
        if (this.state.treasure === 'A') {
            return (<div className={'game-grid ' + this.state.class}> <div style={{backgroundImage: 'url(images/sprites/positions/start.png)', height: '60px', width: '60px', backgroundSize: '225%',     backgroundPositionX: '-45px', backgroundPositionY: '-8px'}}></div> </div>);
        } 
        
        if (this.state.treasure === 'D') {
            return (<div className={'game-grid ' + this.state.class}> <div style={{backgroundImage: 'url(images/sprites/positions/finish.png)', height: '60px', width: '60px', backgroundSize: '100%',     backgroundPosition: 'center'}}></div> </div>);
        }else{
            return(
                <div className={'game-grid ' + this.state.class} style={{backgroundColor: this.state.background }}><h4>{treasure}</h4></div>
            );
        }
    }
}

export {Grid}