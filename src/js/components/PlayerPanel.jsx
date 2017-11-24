import React from 'react';
import ReactDOM from 'react-dom';

import { Rotator } from "./Rotator.jsx";
import { PadButton } from "./PadButton.jsx";
import { Tile } from "./Tile.jsx";
class PlayerPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tile:this.props.tile,
            isButtonActive: true,
            isRotatorActive: true,
            buttonText: 'Confirm rotation'
        }
    }
    
    toggleButton = () => {
        if (this.state.isButtonActive) {
            this.setState({
                isButtonActive: false,
            })
        }else{
            this.setState({isButtonActive: true})
        }
    }

    toggleRotator = () => {
        
        if (this.state.isRotatorActive) {
            this.setState({
                isRotatorActive: false,
            })
        }else{
            this.setState({isRotatorActive: true})
        }
    }

    render(){
        return(
            <div className="player-panel clearfix">
                <div className="player-pad">
                    <div className="pad-body clearfix">
                        <div className='col-1-3'>
                            <Rotator callRotateTile={this.props.callRotateTile} isActive={this.state.isRotatorActive}/>
                            <PadButton callToggleArrows={this.props.callToggleArrows} isActive={this.state.isButtonActive} callToggleButton={this.toggleButton} callToggleRotator={this.toggleRotator} text="Confirm rotation"/>
                            <PadButton callToggleArrows={this.props.callToggleArrows} isActive={!this.state.isButtonActive} callToggleButton={this.toggleButton} callToggleRotator={this.toggleRotator} callUpdateBoard={this.props.callUpdateBoard} text="Confirm position"/>
                        </div>
                        <div className='col-1-3'>
                            <Tile shape={this.state.tile.shape} treasure={this.state.tile.treasure} rotation={this.state.tile.rotation} index="last" sendObstacles={this.locateObstacles}/> 
                        </div>
                        <div className='col-1-3'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {PlayerPanel}