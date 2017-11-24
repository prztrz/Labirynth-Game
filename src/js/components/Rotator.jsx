import React from 'react';
import ReactDOM from 'react-dom';

import { RotateButton } from "./RotateButton.jsx";

class Rotator extends React.Component {
    constructor(props){
        super(props);
        this.state = {isActive: this.props.isActive}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isActive: this.props.isActive
        })
    }
    render(){
        return(
            <div className="rotator">
                <div className="clearfix" style={{width: '176px', marginLeft: '70px'}}>
                    <div className="col-1-3">
                        &nbsp;
                    </div>
                    <div className="col-1-3">
                        <RotateButton position="up" callRotateTile={this.props.callRotateTile} isActive={this.props.isActive}/>
                    </div>
                    <div className="col-1-3">
                        &nbsp;
                    </div>
                </div>

                <div className="clearfix" style={{width: '176px', marginLeft: '70px'}}>
                    <div className="col-1-3">
                        <RotateButton position="left" callRotateTile={this.props.callRotateTile} isActive={this.props.isActive}/>
                    </div>
                    <div className="col-1-3">
                        &nbsp;
                    </div>
                    <div className="col-1-3">
                        <RotateButton position="right" callRotateTile={this.props.callRotateTile} isActive={this.props.isActive}/>
                    </div>
                </div>

                <div className="clearfix" style={{width: '176px', marginLeft: '70px'}}>
                    <div className="col-1-3">
                        &nbsp;
                    </div>
                    <div className="col-1-3">
                        <RotateButton position="down" callRotateTile={this.props.callRotateTile} isActive={this.props.isActive}/>
                    </div>
                    <div className="col-1-3">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export{Rotator}