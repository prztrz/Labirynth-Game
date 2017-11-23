import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from "./Grid.jsx";

class Tile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index:  this.props.index,
            shape: this.props.shape, // turn, straight, tShape
            rotation: this.props.rotation, // 0-4
            grid: [[],[],[]], //0 - brick 1- way
            initialX: this.props.initialX,
            initialY: this.props.initialY,
            tresure: this.props.treasure
        }

        this.isFirstInRow = false;
        this.isLastInRow = false;
        this.isFirstInCol = false;
        this.isLastInCol = false;

    }

    componentDidMount() {
        this.buildTile();
        //this.getPosition();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            index: nextProps.index,
            rotation: nextProps.rotation
        }, this.buildTile());
    }

    componentDidUpdate() {
        //this.getPosition();
    }

    // getPosition() {
    //     this.pos = ReactDOM.findDOMNode(this).getBoundingClientRect();
    //     this.leftBound = this.pos.x
    //     this.rightBound = this.pos.x + this.pos.width;
    //     this.topBound = this.pos.y
    //     this.bottomBound = this.pos.y + this.pos.height;

    //     if (this.rightBound === this.pos.width * 7 + this.state.initialX){
    //         this.isLastInRow = true;
    //     }
       
    //     if (this.leftBound === this.state.initialX) {
    //         this.isFirstInRow = true;
    //     }
        
    //     if(this.topBound === this.state.initialY) {
    //         this.isFirstInCol = true;
    //     }

    //     if (this.topBound === this.pos.height * 5 + this.state.initialY) {
    //         this.isLastInCol = true;
    //     }


        
    // }

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
        let pos = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.props.sendObstacles(this.state.index, pos, rows)
    }

    // locateObstacles() {
    //     this.upperLeftObstacle = {
    //         leftBound: this.leftBound + 1,
    //         rightBound: this.leftBound + 60-1,
    //         topBound: this.topBound + 1,
    //         bottomBound: this.topBound + 60-1
    //     }
    //     this.upperRightObstacle = {
    //         leftBound: this.leftBound + 121,
    //         rightBound: this.rightBound-1,
    //         topBound: this.topBound+1,
    //         bottomBound: this.topBound+60-1
    //     }
    //     this.lowerLeftObstacle = {
    //         leftBound: this.leftBound + 1,
    //         rightBound: this.leftBound + 60-1,
    //         topBound: this.bottomBound - 60 + 1,
    //         bottomBound: this.bottomBound -1
    //     }
    //     this.lowerRightObstacle = {
    //         leftBound: this.leftBound + 121,
    //         rightBound: this.rightBound-1,
    //         topBound: this.bottomBound - 60 + 1,
    //         bottomBound: this.bottomBound -1
    //     }

    //     if (this.state.grid[0][1] === 0) {
    //         this.upperMiddleObstacle = {
    //             leftBound: this.leftBound + 60 + 1,
    //             rightBound: this.leftBound + 120,
    //             topBound: this.topBound+1,
    //             bottomBound: this.topBound+60-1
    //         }
    //     }

    //     if (this.state.grid[1][0] === 0) {
    //         this.middleLeftObstacle = {
    //             leftBound: this.leftBound + 60 + 1,
    //             rightBound: this.leftBound + 120,
    //             topBound: this.topBound+1+60,
    //             bottomBound: this.topBound+120

    //         }
    //     }

    //     if (this.state.grid[1][2]===0) {
    //         this.middleRightObstacle = {
    //             leftBound: this.leftBound + 121,
    //             rightBound: this.rightBound-1,
    //             topBound: this.topBound+1+60,
    //             bottomBound: this.topBound+120
    //         }
    //     }

    //     if (this.state.grid[2][1]===0) {
    //         this.lowerMiddleObstacle = {
    //             leftBound: this.leftBound + 60 + 1,
    //             rightBound: this.leftBound + 120,
    //             topBound: this.bottomBound - 60 + 1,
    //             bottomBound: this.bottomBound -1,

    //         }
    //     }      
    // }

    render(){
        const grid = [];

        this.state.grid.forEach((row,j) => {
            let mappedRow = row.map((el,i) => {
                return <Grid background={el === 0 ? 'rgba(255,0,0,1)' : 'rgba(0,255,0,0.5)'} type={el} positionIndex={i+j*3} callCreateObstacleMap={this.createObstacleMap}/>;
            })

            grid.push(mappedRow);
        })
        
       
        return(
            <div className="game-tile clearfix">
                {grid}
            </div>
        );
    }
} //end of Tile

export {Tile}