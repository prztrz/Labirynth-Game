import React from 'react';
import ReactDOM from 'react-dom';
require('../css/app.scss')


document.addEventListener('DOMContentLoaded', function(){

    class Grid extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                type: this.props.type, //0-brick 1-way
                positionIndex: this.props.positionIndex,
                background: this.props.background
            }
        }

        componentDidMount() {
            this.getPosition();
        }

        componentDidUpdate() {
            this.getPosition();
        }

        getPosition() {
            this.pos = ReactDOM.findDOMNode(this).getBoundingClientRect();          
        }
        render(){
            return(
                <div className="game-grid" style={{backgroundColor: this.state.background }}>{this.props.type}</div>
            );
        }
    }

 

    class Tile extends React.Component {
        constructor(props){
            super(props);
            this.state = {
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
            this.getPosition();
        }

        componentWillReceiveProps() {
            this.setState({
                rotation: this.props.rotation
            }, this.buildTile());
        }

        componentDidUpdate() {
            this.getPosition();
        }

        getPosition() {
            this.pos = ReactDOM.findDOMNode(this).getBoundingClientRect();
            this.leftBound = this.pos.x
            this.rightBound = this.pos.x + this.pos.width;
            this.topBound = this.pos.y
            this.bottomBound = this.pos.y + this.pos.height;

            if (this.rightBound === this.pos.width * 7 + this.state.initialX){
                this.isLastInRow = true;
            }
           
            if (this.leftBound === this.state.initialX) {
                this.isFirstInRow = true;
            }
            
            if(this.topBound === this.state.initialY) {
                this.isFirstInCol = true;
            }

            if (this.topBound === this.pos.height * 5 + this.state.initialY) {
                this.isLastInCol = true;
            }
            
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
        }

        locateObstacles() {
            this.upperLeftObstacle = {
                leftBound: this.leftBound + 1,
                rightBound: this.leftBound + 60-1,
                topBound: this.topBound + 1,
                bottomBound: this.topBound + 60-1
            }
            this.upperRightObstacle = {
                leftBound: this.leftBound + 121,
                rightBound: this.rightBound-1,
                topBound: this.topBound+1,
                bottomBound: this.topBound+60-1
            }
            this.lowerLeftObstacle = {
                leftBound: this.leftBound + 1,
                rightBound: this.leftBound + 60-1,
                topBound: this.bottomBound - 60 + 1,
                bottomBound: this.bottomBound -1
            }
            this.lowerRightObstacle = {
                leftBound: this.leftBound + 121,
                rightBound: this.rightBound-1,
                topBound: this.bottomBound - 60 + 1,
                bottomBound: this.bottomBound -1
            }

            if (this.state.grid[0][1] === 0) {
                this.upperMiddleObstacle = {
                    leftBound: this.leftBound + 60 + 1,
                    rightBound: this.leftBound + 120,
                    topBound: this.topBound+1,
                    bottomBound: this.topBound+60-1
                }
            }

            if (this.state.grid[1][0] === 0) {
                this.middleLeftObstacle = {
                    leftBound: this.leftBound + 60 + 1,
                    rightBound: this.leftBound + 120,
                    topBound: this.topBound+1+60,
                    bottomBound: this.topBound+120

                }
            }

            if (this.state.grid[1][2]) {
                this.middleRightObstacle = {
                    leftBound: this.leftBound + 121,
                    rightBound: this.rightBound-1,
                    topBound: this.topBound+1+60,
                    bottomBound: this.topBound+120
                }
            }

            if (this.state.grid[2][1]) {
                this.lowerMiddleObstacle = {
                    leftBound: this.leftBound + 60 + 1,
                    rightBound: this.leftBound + 120,
                    topBound: this.bottomBound - 60 + 1,
                    bottomBound: this.bottomBound -1,

                }
            }
        }

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


    class Board extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                tiles: []
            }
        }

        componentDidMount() {
            this.generateTiles();
        }
        generateTileShapes() {
            let tileShapes = [];

            for (let i = 0; i < 14; i++) {
                tileShapes.push('tShape')
            }

            for (let i = 0; i < 8; i++) {
                tileShapes.push('Straight')
            }

            for (let i = 0; i < 10; i++) {
                tileShapes.push('turn')
            }

            return tileShapes

        }

        generateTreasures() {
            let treasures = [];
            for (let i = 1; i <= 16; i++) {
                treasures.push[i];
            }

            return treasures;
        }

        generateTiles() {
            let tiles = []
            let treasures = this.generateTreasures();
            this.generateTileShapes().forEach(tile => {
                if (tile === 'tShape') {
                    let tile = {
                        shape: 'tShape',
                        treasure: treasures.splice(Math.floor(Math.random()*(treasures.length-1)),1),
                        rotation: Math.floor(Math.random()*3)
                    }
                }

                if (tile === 'straight') {
                    let tile = {
                        shape: 'straight',
                        treasure: 0,
                        rotation: Math.floor(Math.random()*3)
                    }
                }

                if (tile === 'turn') {
                    let tile = {
                        shape: 'turn',
                        treasure: (treasures.length > 0) ? treasures.pop() : 0,
                        rotation: Math.floor(Math.random()*3)
                    }
                }

                tiles.push(tiles);
            })

            tiles = this.shuffleTiles(tiles)      

            this.setState({
                tiles: tiles
            })
        }

        shuffleTiles(tiles) {
            let j, x, i;
            for (i = tiles.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = tiles[i];
                tiles[i] = tiles[j];
                tiles[j] = x;        
            }

            return tiles;
        }

        render(){
            let row1 = [];
            let row2 = [];
            let row3 = [];
            let row4 =[];
            let row5 =[];

            this.state.tiles.forEach((tile, i) => {
               if (i < 5) {
                   row1.push(tile);
               }

               if (i>= 5 && i<12) {
                   row2.push(tile);
               }

               if (i>=12 && i<19) {
                   row3.push(tile);
               }

               if (i>=19 && i<26) {
                   row4.push(tile)
               }

               if (i>=26 && i<31) {
                   row5.push(tile)
               }
            })

            row1.unshift({
                shape: 'turn',
                treasure: 'A',
                rotation: 0
            })

            row1.push({
                shape: 'turn',
                treasure: 'B',
                rotation: 1
            })

            row5.unshift({
                shape: 'turn',
                tresure: 'C',
                rotation: 3
            })

            row5.push({
                shape: 'turn',
                treasure: 'D',
                rotation: 2
            })

            console.log(row1, row2, row3, row4, row5)
          

            let tilesRow1 = row1.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0}/>)
            let tilesRow2 = row2.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0}/>)
            let tilesRow3 = row3.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0}/>)
            let tilesRow4 = row4.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0}/>)
            let tilesRow5 = row5.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0}/>)

            return(
                <div className="game-panel">
                    <div className='row clearfix'>{tilesRow1}</div>
                    <div className='row clearfix'>{tilesRow2}</div>
                    <div className='row clearfix'>{tilesRow3}</div>
                    <div className='row clearfix'>{tilesRow4}</div>
                    <div className='row clearfix'>{tilesRow5}</div>
                </div>
            );
        }
    }

//   class Row extends React.Component {
//       render(){
//           return(
//               <div className="clearfix">
//                 <Tile />
//                 <Tile />
//                 <Tile />
//                 <Tile />
//                 <Tile />
//                 <Tile />
//                 <Tile />
//               </div>
//           );
//       }
//   }

//     class Board extends React.Component {
//         render(){
//             return(
//                 <div>
//                     <Row />
//                     <Row />
//                     <Row />
//                     <Row />
//                     <Row />
//                 </div>
//             );
//         }
//     }

    class App extends React.Component {
        render(){
            return (
                <div>
                   <Board />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});