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
        }
    }
    
    toggleButton = () => {
        console.log('aaa')
        if (this.state.isButtonActive) {
            this.setState({
                isButtonActive: false
            })
        }else{
            this.setState({isButtonActive: true})
        }
    }
    render(){
        return(
            <div className="player-panel clearfix">
                <div className="player-pad">
                    <div className="pad-body clearfix">
                        <div className='col-1-3'>
                            <Rotator callRotateTile={this.props.callRotateTile}/>
                            <PadButton callToggleArrows={this.props.callToggleArrows} isActive={this.state.isButtonActive} callToggleButton={this.toggleButton}/>
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