import React from 'react';
import ReactDOM from 'react-dom';

import { Rotator } from "./Rotator.jsx";
import { PadButton } from "./PadButton.jsx";
import { Tile } from "./Tile.jsx";
import {InfoTable} from "./InfoTable.jsx";
import {HideButton} from "./HideButton.jsx";


/**
 * @class PlayerPanel represents the game control panel
 * 
 * @method toggleButton toggles the activity of confirm rotation and confirm position buttons
 * 
 * @method toggleRotator toggles the activity of rotate buttons
 * 
 */
class PlayerPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tile:this.props.tile,
            isButtonActive: true,
            isRotatorActive: true,
            buttonText: 'Confirm rotation',
            targets: this.props.targets,
            shifts: this.props.shifts,
            displayPad: true
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

    togglePad = () => {
        this.setState({
            displayPad: this.state.displayPad ? false : true
        })
    }

    render(){
        return(
            <div className="player-panel clearfix">
                <div className={`player-pad ${this.state.displayPad ? '' : 'hidden'}`}>
                <HideButton isActive={!this.state.displayPad} callTogglePad={this.togglePad}/>
                    <div className="pad-body clearfix">
                        <div className='col-1-3'>
                            <Rotator callRotateTile={this.props.callRotateTile} isActive={this.state.isRotatorActive}/>
                            <PadButton callToggleArrows={this.props.callToggleArrows} isActive={this.state.isButtonActive} callToggleButton={this.toggleButton} callToggleRotator={this.toggleRotator} text="Confirm rotation"/>
                            <PadButton callToggleArrows={this.props.callToggleArrows} isActive={!this.state.isButtonActive} callToggleButton={this.toggleButton} callToggleRotator={this.toggleRotator} callUpdateBoard={this.props.callUpdateBoard} text="Confirm position"/>
                        </div>
                        <div className='col-1-3'>
                            <div style={{clear:'both'}}><p>Next tile</p></div>
                            <div style={{float: 'left', width:'100px'}}>&nbsp;</div>
                            <Tile shape={this.state.tile.shape} treasure={this.state.tile.treasure} rotation={this.state.tile.rotation} index="last" sendObstacles={this.locateObstacles}/> 
                            
                        </div>
                        <div className='col-1-3'>
                            <InfoTable targets={this.state.targets} shifts={this.state.shifts}/>
                        </div>
                    </div>
                    <div className="copyright-info"><small>Przemysław Trzepiński &copy; 2017. <a href='https://opensource.org/licenses/MIT' target="_blank">MIT licence</a> - use it however you want, just don't claim you are an author, please!</small></div>
                </div>
            </div>
        );
    }
}

export {PlayerPanel}