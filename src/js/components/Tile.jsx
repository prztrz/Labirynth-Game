import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from "./Grid.jsx";

class Tile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNewOnBoard: this.props.isNewOnBoard,
            isDisplayed: this.props.isDisplayed,
            left: this.props.left,
            top: this.props.top,
            index:  this.props.index,
            shape: this.props.shape, // turn, straight, tShape
            rotation: this.props.rotation, // 0-4
            grid: [[],[],[]], //0 - brick 1- way
            initialX: this.props.initialX,
            initialY: this.props.initialY,
            treasure: this.props.treasure
        }

    }

    componentDidMount() {
        this.buildTile();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            index: nextProps.index,
            rotation: nextProps.rotation,
            isNewOnBoard:nextProps.isNewOnBoard,
            isDisplayed: nextProps.isDisplayed,
            left: nextProps.left,
            top: nextProps.top
        }, this.buildTile());
    }


    buildTile() {
        const rows = [[],[],[]];
        switch (this.state.shape) {
            case "turn":{
                switch (this.state.rotation){
                    case 0: {
                       rows[0].push.apply(rows[0], [0,0,0]);
                       rows[1].push.apply(rows[1], [0,1,1]);
                       rows[2].push.apply(rows[2], [0,1,0]);
                       this.setState({
                           grid: rows
                       });
                    }
                    break;

                    case 1: {
                        rows[0].push.apply(rows[0], [0,0,0]);
                        rows[1].push.apply(rows[1], [1,1,0]);
                        rows[2].push.apply(rows[2], [0,1,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;

                    case 2: {
                        rows[0].push.apply(rows[0], [0,1,0]);
                        rows[1].push.apply(rows[1], [1,1,0]);
                        rows[2].push.apply(rows[2], [0,0,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;

                    case 3: {
                        rows[0].push.apply(rows[0], [0,1,0]);
                        rows[1].push.apply(rows[1], [0,1,1]);
                        rows[2].push.apply(rows[2], [0,0,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                }
            }
            break;
            //1-POZIOMO 2-PIONOWO
            case "straight": {
                if (this.state.rotation % 2 === 1) {
                    rows[0].push.apply(rows[0], [0,0,0]);
                    rows[1].push.apply(rows[1], [1,1,1]);
                    rows[2].push.apply(rows[2], [0,0,0]);
                    this.setState({
                        grid: rows
                    });
                } else {
                    rows[0].push.apply(rows[0], [0,1,0]);
                    rows[1].push.apply(rows[1], [0,1,0]);
                    rows[2].push.apply(rows[2], [0,1,0]);
                    this.setState({
                        grid: rows
                    });
                }
            }
            break;

            case "tShape": {
                switch(this.state.rotation) {
                    case 0: {
                        rows[0].push.apply(rows[0], [0,0,0]);
                        rows[1].push.apply(rows[1], [1,1,1]);
                        rows[2].push.apply(rows[2], [0,1,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;

                    case 1: {
                        rows[0].push.apply(rows[0], [0,1,0]);
                        rows[1].push.apply(rows[1], [1,1,0]);
                        rows[2].push.apply(rows[2], [0,1,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;

                    case 2: {
                        rows[0].push.apply(rows[0], [0,1,0]);
                        rows[1].push.apply(rows[1], [1,1,1]);
                        rows[2].push.apply(rows[2], [0,0,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;

                    case 3: {
                        rows[0].push.apply(rows[0], [0,1,0]);
                        rows[1].push.apply(rows[1], [0,1,1]);
                        rows[2].push.apply(rows[2], [0,1,0]);
                        this.setState({
                            grid: rows
                        });
                    }
                    break;
                }
            }

        }

        if(this.state.index !== 'last'){
            this.props.sendObstacles(this.state.index, rows)
        }
    }


    render(){
        const grid = [];
        this.state.grid.forEach((row,j) => {
            let mappedRow = row.map((el,i) => {
                let treasure = (i+j*3 === 4) ? this.state.treasure : null;
                return <Grid class={el === 0 ? 'brick' : 'way'} background={el === 0 ? 'gray' : 'rgba(0,255,0,0.5)'} type={el} treasure={(i+j*3 === 4) ? this.state.treasure : null}/>;
            })

            grid.push(mappedRow);
        })
        
        if (!this.state.isNewOnBoard){
            return(
                <div className="game-tile clearfix">
                    {grid}
                </div>
            );
        } else if (this.state.isDisplayed) {
            console.log('left, top',this.state.left, this.state.top)
            return(
                
                <div className="game-tile clearfix" style={{position: 'absolute', left: this.state.left + 'px', top: this.state.top + 'px'}}>
                    {grid}
                </div>
            );
        } else {
            return null;
        }
    }
} //end of Tile

export {Tile}