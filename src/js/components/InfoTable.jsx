import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class InfoTable represents the table showing the number of shifts left and the treasures the player is looking for
 */

class InfoTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            targets: this.props.targets,
            shifts: this.props.shifts
        }
        this.seconds = 0;
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.targets !== nextProps.targets) {
            this.setState({
                targets: nextProps.targets
            })
            
        }
    }

    render(){
        let  targets = this.state.targets.slice()     
        let finishPrompt = ['Go', 'to', 'castle!']
        
        for (let i = 0; i<3; i++) {
            (typeof targets[i] !== 'number' )&& (targets[i] = finishPrompt[i])
        }
        return(
            <div className="pad-info-table">
                <div className='info-cell'>
                    Shifts: {this.state.shifts}
                </div>
                <div className="info-cell">
                    Find:
                </div>
                <div style={{textAlign: 'center'}}>
                    <span className="target" >{targets[0]}</span>
                    <span className="target">{targets[1]}</span>
                    <span className="target">{targets[2]}</span>
                </div>
           </div>
        );
    }
}

export {InfoTable}