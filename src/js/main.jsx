import React from 'react';
import ReactDOM from 'react-dom';

import {Tile} from './components/Tile.jsx';
import {Grid} from "./components/Grid.jsx";
require('../css/app.scss')


document.addEventListener('DOMContentLoaded', function(){
    
    class Player extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                left: this.props.left,
                top: this.props.top,
                width: this.props.width,
                height: this.props.height
            }
        }

        componentWillReceiveProps(nextProps) {
            if (this.props.left !== nextProps.left) {
                this.setState({left: nextProps.left})
            }

            if (this.props.top !== nextProps.top) {
                this.setState({top: nextProps.top})
            }
        }

        
        render(){
            return(
                <div style={{height: this.state.height + 'px', width: this.state.width + 'px', border: '1px solid blue', position: 'absolute', left: this.state.left + 'px', top: this.state.top + 'px'}} />
            );
        }
    }

    class Board extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                tiles: [],
                playerTop: 70,
                playerLeft: 70,
                playerWidth: 30,
                playerHeight: 30,
            }
            this.obstacleMap = [];
        }

        componentWillMount() {
            document.addEventListener('keydown', this.movePlayer)
        }

        componentDidMount() {
            this.generateTiles();
        }

        getPlayerPosition(key) {
            let currPlayerPos = {leftBound: this.state.playerLeft, rightBound: this.state.playerLeft + this.state.playerWidth, topBound: this.state.playerTop, bottomBound: this.state.playerTop + this.state.playerHeight }

            let nextPlayerPos = {leftBound: currPlayerPos.leftBound-5, rightBound: currPlayerPos.rightBound + 5, topBound: currPlayerPos.topBound-5, bottomBound: currPlayerPos.bottomBound+5}
  

            // console.log(this.findTile(currPlayerPos.leftBound, currPlayerPos.rightBound, currPlayerPos.topBound, currPlayerPos.bottomBound))

            let currentTile = this.findTile(currPlayerPos.leftBound, currPlayerPos.rightBound, currPlayerPos.topBound, currPlayerPos.bottomBound);
          
            let currentMap = this.obstacleMap[currentTile];
            console.log(currentMap.upperMiddleObstacle)


            switch (key) {
                case 'ArrowUp':{
                    //nextPlayerPos = currPlayerPos.topBound - 5;
                    if (typeof currentTile === 'number') {
                        if (currentMap.upperMiddleObstacle.bottomBound > nextPlayerPos.topBound && currentMap.upperMiddleObstacle.leftBound < currPlayerPos.rightBound) {
                            console.log('Działa, bottomBonObst:',currentMap.upperMiddleObstacle.bottomBound, ' nexttopBondPlayer: ',nextPlayerPos.topBound,' leftbondObst: ', currentMap.upperMiddleObstacle.leftBound, ' rightBondPlayer:', currPlayerPos.rightBound  )
                        } else {
                            console.log('nie działa, bottomBonObst:',currentMap.upperMiddleObstacle.bottomBound, ' nexttopBondPlayer: ',nextPlayerPos.topBound,' leftbondObst: ', currentMap.upperMiddleObstacle.leftBound, ' rightBondPlayer:', currPlayerPos.rightBound  )
                        }
                    }
                }

                break;

                case 'ArrowDown': 
                    //nextPlayerPos = currPlayerPos.bottomBound + 5;
                break;

                case 'ArrowLeft':
                    //nextPlayerPos = currPlayerPos.leftBound - 5;
                break;

                case 'ArrowRight':
                    //nextPlayerPos = currPlayerPos.rightBound + 5;
                break;
            }


        }

        //sprawdza na którym tileu znajduje się obecnie player
        findTile(leftBound, rightBound, topBound, bottomBound) {
            let tilesRow = [];
            let tilesCol = [];
            let counter = 6;
            
            
            //iteracja po lewych krawędziach Tile!!
            for (let i = 1093; i >= 0 ; i-=182) {
                if (leftBound > i){
                    tilesCol.push(counter)
                    break;
                }  
                counter--; 
            }

            counter=0;
            //iteracja po prawych krawędziach Tile!!!
            for (let i = 182; i <=1275; i+=182) {
                if (rightBound < i){
                    tilesCol.push(counter)
                    break;
                }
                counter++
            }

            counter=4
            //iteracja po górnych krawędziach Tile!!!
            for (let i = 728; i >= 0 ; i-=182) {
                if (topBound > i){
                    tilesRow.push(counter)
                    break;
                }  
                counter--; 
            }

            counter = 0;
            //iteracja po dolnych krawędziach Tile!!!
            for (let i = 182; i <=910; i+=182) {
                if (bottomBound < i){
                    tilesRow.push(counter);
                    break;
                }
                counter++
            }
            
            //jeżeli player znajduje się w całości na jednym kwadracie w rzedzie to zrób jedną wartość
            if (tilesRow[0] === tilesRow[1]) {
                tilesRow = tilesRow[0]
            }

            if(tilesCol[0] === tilesCol[1]) {
                tilesCol = tilesCol[0]
            }

            if (typeof tilesRow === 'number' && typeof tilesCol === 'number') {
                    return (tilesCol + (tilesRow * 7));
            }

            if (typeof tilesCol === 'object') {
                    return[(tilesCol[0]+ (tilesRow*7)),(tilesCol[1]+(tilesRow*7))]

            }

            if (typeof tilesRow === 'object') {
                    return [(tilesCol + (tilesRow[0]*7)),(tilesCol + (tilesRow[1]*7))]
            }
        }

        locateObstacles = (tileIndex, tilePos, grid) => {
            let tile = {index: tileIndex}
            
            let tileLeftBound = tilePos.x
            let tileRightBound = tilePos.x + tilePos.width;
            let tileTopBound = tilePos.y
            let tileBottomBound = tilePos.y + tilePos.height;

            tile.upperLeftObstacle = {
                leftBound: tileLeftBound + 1,
                rightBound: tileLeftBound + 60-1,
                topBound: tileTopBound + 1,
                bottomBound: tileTopBound + 60-1
            }
            tile.upperRightObstacle = {
                leftBound: tileLeftBound + 121,
                rightBound: tileRightBound-1,
                topBound: tileTopBound+1,
                bottomBound: tileTopBound+60-1
            }
            tile.lowerLeftObstacle = {
                leftBound: tileLeftBound + 1,
                rightBound: tileLeftBound + 60-1,
                topBound: tileBottomBound - 60 + 1,
                bottomBound: tileBottomBound -1
            }
            tile.lowerRightObstacle = {
                leftBound: tileLeftBound + 121,
                rightBound: tileRightBound-1,
                topBound: tileBottomBound - 60 + 1,
                bottomBound: tileBottomBound -1
            }
    
            if (grid[0][1] === 0) {
                tile.upperMiddleObstacle = {
                    leftBound: tileLeftBound + 60 + 1,
                    rightBound: tileLeftBound + 120,
                    topBound: tileTopBound+1,
                    bottomBound: tileTopBound+60-1
                }
            } else {
                tile.upperMiddleObstacle = {
                    leftBound: 0,
                    rightBound: 0,
                    topBound: 0,
                    bottomBound: 0
                }
            }
    
            if (grid[1][0] === 0) {
                tile.middleLeftObstacle = {
                    leftBound: tileLeftBound + 60 + 1,
                    rightBound: tileLeftBound + 120,
                    topBound: tileTopBound+1+60,
                    bottomBound: tileTopBound+120
    
                }
            } else {
                tile.middleLeftObstacle = {
                    leftBound: 0,
                    rightBound: 0,
                    topBound: 0,
                    bottomBound: 0
                }
            }
    
            if (grid[1][2]===0) {
                this.middleRightObstacle = {
                    leftBound: tileLeftBound + 121,
                    rightBound: tileRightBound-1,
                    topBound: tileTopBound+1+60,
                    bottomBound: tileTopBound+120
                }
            } else {
                tile.middleRightObstacle = {
                    leftBound: 0,
                    rightBound: 0,
                    topBound: 0,
                    bottomBound: 0
                }
            }
    
            if (grid[2][1]===0) {
                this.lowerMiddleObstacle = {
                    leftBound: tileLeftBound + 60 + 1,
                    rightBound: tileLeftBound + 120,
                    topBound: tile.ottomBound - 60 + 1,
                    bottomBound: tile.ottomBound -1,
    
                }
            } else {
                tile.lowerMiddleObstacle = {
                    leftBound: 0,
                    rightBound: 0,
                    topBound: 0,
                    bottomBound: 0
                }
            }

            this.createObstacleMap(tile);
            
        }

        createObstacleMap(tile) {
            if (this.obstacleMap.length <= 34){
                if (!this.obstacleMap.some(currTile => currTile.index === tile.index)){
                    this.obstacleMap.push(tile);
                }
            } else {
                this.obstacleMap=[]
                this.obstacleMap.push(tile);
            }

        }

        movePlayer = (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    this.getPlayerPosition(e.key);
                    this.moveUp();
                break;
                
                case 'ArrowDown':
                    this.getPlayerPosition(e.key);
                    this.moveDown();
                break;

                case 'ArrowLeft':
                    this.getPlayerPosition(e.key);
                    this.moveLeft();
                break;

                case 'ArrowRight':
                    this.getPlayerPosition(e.key);
                    this.moveRight();
                break;

            }
        }

        moveUp = () => {
            this.setState({
                playerTop: this.state.playerTop - 5
            }) 
        }

        moveDown = () => {
            this.setState({
                playerTop: this.state.playerTop + 5
            }) 
        }

        moveLeft = () => {
            this.setState({
                playerLeft: this.state.playerLeft - 5
            })
            
        }

        moveRight = () => {
            this.setState({
                playerLeft: this.state.playerLeft + 5
            }) 
        }

        generateTileShapes() {
            let tileShapes = [];

            for (let i = 0; i < 14; i++) {
                tileShapes.push('tShape')
            }

            for (let i = 0; i < 8; i++) {
                tileShapes.push('straight')
            }

            for (let i = 0; i < 10; i++) {
                tileShapes.push('turn')
            }


            return tileShapes


        }

        generateTreasures() {
            let treasures = [];
            for (let i = 1; i <= 16; i++) {
                treasures.push(i);
            }


            treasures = this.shuffle(treasures);
            return treasures;
        }

        generateTiles() {
            let tiles = []
            let treasures = this.generateTreasures();

            this.generateTileShapes().forEach((tile, i) => {
                let currentTile;
                if (tile === 'tShape') {
                    currentTile = {
                        shape: 'tShape',
                        treasure: treasures.pop(),
                        rotation: Math.floor(Math.random()*3)
                        
                    }
                }

                if (tile === 'straight') {
                    currentTile = {
                        shape: 'straight',
                        treasure: 0,
                        rotation: Math.floor(Math.random()*3)
                    }
                }

                if (tile === 'turn') {
                    currentTile = {
                        shape: 'turn',
                        treasure: (treasures.length > 0) ? treasures.pop() : 0,
                        rotation: Math.floor(Math.random()*3)
                    }
                }



                tiles.push(currentTile);
            })

            tiles = this.shuffle(tiles)      

            this.setState({
                tiles: tiles
            })
        }

        shuffle(arr) {
            let j, x, i;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;        
            }

            return arr;
        }

        render(){


            let row1 = [];
            let row2 = [];
            let row3 = [];
            let row4 =[];
            let row5 =[];
            let index = 0;


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

            if (row1.length !== 0){
                row1.unshift({
                    shape: 'turn',
                    treasure: 'A',
                    rotation: 0,
                    eksperyment: ''
                })

                row1.push({
                    shape: 'turn',
                    treasure: 'B',
                    rotation: 1
                })

                row5.unshift({
                    shape: 'turn',
                    treasure: 'C',
                    rotation: 3
                })

                row5.push({
                    shape: 'turn',
                    treasure: 'D',
                    rotation: 2
                })
            }
            

            let tilesRow1 = row1.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} sendObstacles={this.locateObstacles}/>)

            let tilesRow2 = row2.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} sendObstacles={this.locateObstacles}/>)

            let tilesRow3 = row3.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} sendObstacles={this.locateObstacles}/>)

            let tilesRow4 = row4.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} sendObstacles={this.locateObstacles}/>)

            let tilesRow5 = row5.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} sendObstacles={this.locateObstacles}/>)



            return(
                <div className="game-panel">
                    <Player top={this.state.playerTop} left={this.state.playerLeft} width={this.state.playerWidth}height={this.state.playerHeight}/>
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