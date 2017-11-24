import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

class Arrow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: this.props.isActive,
            direction: this.props.direction,
            col: this.props.col,
            row: this.props.row,
            colClass: 'col-'+this.props.col
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive !== this.props.isActive) {
            this.setState({isActive: nextProps.isActive})
        }
    }

    callInsertTile = () => {
        if (this.state.isActive) {
            let isVertical;
            if (this.state.direction === 'up' || this.state.direction === 'down') {
                isVertical = true;
                this.props.insertTile(isVertical, this.state.direction, this.state.col);
            } else {
                this.props.insertTile(isVertical, this.state.direction, this.state.row);
            }
        }
    }

    render(){
        return(
            <span className={`${this.state.direction}-arrow ${typeof this.state.col === 'number' ? this.state.colClass : ''} `} style={{cursor: this.state.isActive ? 'pointer' : 'default', color: this.state.isActive ? '#28450f' : '#704b29'}} onClick={this.callInsertTile} >
                <FontAwesome name={'arrow-circle-' + this.state.direction}/>
            </span>
        );
    }
}

export {Arrow}