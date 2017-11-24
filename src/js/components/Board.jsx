import React from 'react';
import ReactDOM from 'react-dom';


import {Tile} from './Tile.jsx';
import {Grid} from "./Grid.jsx";
import{Player} from './Player.jsx';
import {Arrow} from "./Arrow.jsx";
import {PadButton} from "./PadButton.jsx"
import {RotateButton} from './RotateButton.jsx'
import {Rotator} from "./Rotator.jsx";
import { PlayerPanel } from "./PlayerPanel.jsx";

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            areArrowsActive: false,
            displayNewTile: false,
            initialTop: this.props.initialTop,
            initialLeft: this.props.initialLeft,
            newTileLeft: 0,
            newTileTop: 0,
            tiles: [],
            playerTop: this.props.initialTop + 70,
            playerLeft: this.props.initialLeft + 70,
            playerWidth: 30,
            playerHeight: 30,
        }
        this.obstacleMap = [];
        this.canPlayerMove = true;
    }

    componentWillMount() {
        document.addEventListener('keydown', this.movePlayer)
    }

    componentDidMount() {
        this.generateTiles();
    }

    toggleArrows = () => {
        console.log('pupek');
        this.state.areArrowsActive ? this.setState({areArrowsActive: false, key: Math.random()}) : this.setState({areArrowsActive: true, key:Math.random()})
    }

    rotateTile = (direction) => {
        let tiles = this.state.tiles.slice();
        let tile = tiles.pop();
        switch(direction) {
            case 'left':
                if (tile.rotation > 0) {
                    tile.rotation--
                } else {
                    tile.rotation = 3;
                }
            break;

            case 'right':
                if (tile.rotation < 3){
                    tile.rotation++
                } else {
                    tile.rotation = 0;
                }
            break;

            case 'up':
                tile.rotation += 2;
                if(tile.rotation === 4) {
                    tile.rotation = 0;
                } 
                if(tile.rotation === 5) {
                    tile.rotation = 1;
                }
            break;

            case 'down':
                tile.rotation -= 2;
                if(tile.rotation === -1) {
                    tile.rotation = 3;
                } 
                if(tile.rotation === -2) {
                    tile.rotation =2;
                }
            break;
                  
        }
        tiles.push(tile);

        this.setState({
            tiles: tiles,
            key: Math.random()
        })
    }

    insertTile = (isVertical, direction, multiplier) => {
        if (isVertical) {
            
            let top;
            direction === 'up' ?  top = 900 : top = -180;
            this.setState({
                newTileLeft: this.state.initialLeft + (182 * (multiplier-1)), 
                newTileTop: this.state.initialTop + top,
                displayNewTile: true,
                insertTile: true
            })
        } else {
            let left;
            direction === 'left'? left = 1274 : left = -180;
            this.setState({
                newTileLeft: this.state.initialLeft + left,
                newTileTop: this.state.initialTop + (182 * (multiplier-1)),
                displayNewTile: true,
                insertTile: true
            })
        }
    }

    collisionControl(key) {
        let currPlayerPos = {leftBound: this.state.playerLeft, rightBound: this.state.playerLeft + this.state.playerWidth, topBound: this.state.playerTop, bottomBound: this.state.playerTop + this.state.playerHeight }

        let nextPlayerPos = {leftBound: currPlayerPos.leftBound-5, rightBound: currPlayerPos.rightBound + 5, topBound: currPlayerPos.topBound-5, bottomBound: currPlayerPos.bottomBound+5}


        let currentTile = this.findTile(currPlayerPos.leftBound, currPlayerPos.rightBound, currPlayerPos.topBound, currPlayerPos.bottomBound);
        let currentMap;
        let mapOnRight;
        let mapOnLeft;
        let mapOnDown;
        let mapOnUp;
        let isBetweenHorizontalTiles = false;
        
        //jeżeli player znajduje się w całości na jendym tile
        if(typeof currentTile === 'number'){
            currentMap = this.obstacleMap[currentTile];
            mapOnRight = this.obstacleMap[currentTile+1];
            mapOnLeft = this.obstacleMap[currentTile-1];
            mapOnDown = this.obstacleMap[currentTile+7]
            mapOnUp = this.obstacleMap[currentTile-7]
        } else {
            //jeżeli player znajduje się na  sąsiadujących tilach
            currentMap = this.obstacleMap[currentTile[0]];
            //jeżeli tile sąsiadują w poziomie
            if (currentTile[1] - currentTile[0] === 1) {
                isBetweenHorizontalTiles = true;
            }
        }
        


        switch (key) {
            case 'ArrowUp':{
                

                if (nextPlayerPos.topBound < this.state.initialTop) {
                    this.canPlayerMove = false;
                }

                if (typeof currentTile !== 'number'){
                    if(isBetweenHorizontalTiles) {
                        if (currentMap.upperRightObstacle.bottomBound > nextPlayerPos.topBound && 
                            ((currPlayerPos.rightBound > currentMap.upperRightObstacle.leftBound && currPlayerPos.rightBound < currentMap.upperRightObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.upperRightObstacle.leftBound && currPlayerPos.leftBound < currentMap.upperRightObstacle.rightBound))) {
                            
                            this.canPlayerMove = false;
                        }
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.upperMiddleObstacle !== null) {
                    if (currentMap.upperMiddleObstacle.bottomBound > nextPlayerPos.topBound && 
                        ((currPlayerPos.rightBound > currentMap.upperMiddleObstacle.leftBound && currPlayerPos.rightBound < currentMap.upperMiddleObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.upperMiddleObstacle.leftBound && currPlayerPos.leftBound < currentMap.upperMiddleObstacle.rightBound))) {

             
                        this.canPlayerMove = false;
                        
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.upperLeftObstacle !== null) {
                    if (currentMap.upperLeftObstacle.bottomBound > nextPlayerPos.topBound && 
                        ((currPlayerPos.rightBound > currentMap.upperLeftObstacle.leftBound && currPlayerPos.rightBound < currentMap.upperLeftObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.upperLeftObstacle.leftBound && currPlayerPos.leftBound < currentMap.upperLeftObstacle.rightBound))) {

             
                        this.canPlayerMove = false;
                        
                    }
                }

                if (typeof currentTile === 'number' && currentMap.upperLeftObstacle !== null) {
                    if (currentMap.upperRightObstacle.bottomBound > nextPlayerPos.topBound && 
                        ((currPlayerPos.rightBound > currentMap.upperRightObstacle.leftBound && currPlayerPos.rightBound < currentMap.upperRightObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.upperRightObstacle.leftBound && currPlayerPos.leftBound < currentMap.upperRightObstacle.rightBound))) {
                        
                        this.canPlayerMove = false;
                    } 
                }

                if (typeof currentTile === 'number' && currentTile - 7 >= 0 && mapOnUp.lowerMiddleObstacle !== null) {
                    if (mapOnUp.lowerMiddleObstacle.bottomBound >= nextPlayerPos.topBound -5 && 
                        ((currPlayerPos.rightBound > mapOnUp.lowerMiddleObstacle.leftBound && currPlayerPos.rightBound < mapOnUp.lowerMiddleObstacle.rightBound) || (currPlayerPos.leftBound > mapOnUp.lowerMiddleObstacle.leftBound && currPlayerPos.leftBound < mapOnUp.lowerMiddleObstacle.rightBound))) {

             
                        this.canPlayerMove = false;
                        
                    } 
                }
            }

            break;

            case 'ArrowDown':
            
            if (nextPlayerPos.bottomBound > this.state.initialTop + 910) {
                this.canPlayerMove = false;
            }
                if (typeof currentTile !== 'number'){
                    if(isBetweenHorizontalTiles) {
                        if (currentMap.lowerRightObstacle.topBound < nextPlayerPos.bottomBound && 
                            ((currPlayerPos.rightBound > currentMap.lowerRightObstacle.leftBound && currPlayerPos.rightBound < currentMap.lowerRightObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.lowerRightObstacle.leftBound && currPlayerPos.leftBound < currentMap.lowerRightObstacle.rightBound))) {
                            
                            this.canPlayerMove = false;
                        } 
                    }
                }

                if (typeof currentTile === 'number' && currentMap.lowerMiddleObstacle !== null) {
                    if (currentMap.lowerMiddleObstacle.topBound < nextPlayerPos.bottomBound && 
                        ((currPlayerPos.rightBound > currentMap.lowerMiddleObstacle.leftBound && currPlayerPos.rightBound < currentMap.lowerMiddleObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.lowerMiddleObstacle.leftBound && currPlayerPos.leftBound < currentMap.lowerMiddleObstacle.rightBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.lowerLeftObstacle !== null) {
                    if (currentMap.lowerLeftObstacle.topBound < nextPlayerPos.bottomBound && 
                        ((currPlayerPos.rightBound > currentMap.lowerLeftObstacle.leftBound && currPlayerPos.rightBound < currentMap.lowerLeftObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.lowerLeftObstacle.leftBound && currPlayerPos.leftBound < currentMap.lowerLeftObstacle.rightBound))) {

             
                        this.canPlayerMove = false;
                        
                    }
                }

                if (typeof currentTile === 'number' && currentMap.lowerRightObstacle !== null) {
                    if (currentMap.lowerRightObstacle.topBound <= nextPlayerPos.bottomBound && 
                        ((currPlayerPos.rightBound > currentMap.lowerRightObstacle.leftBound && currPlayerPos.rightBound < currentMap.lowerRightObstacle.rightBound) || (currPlayerPos.leftBound > currentMap.lowerRightObstacle.leftBound && currPlayerPos.leftBound < currentMap.lowerRightObstacle.rightBound))) {
                        
                        this.canPlayerMove = false;
                    } 
                }

                if (typeof currentTile === 'number' && currentTile+7 <= 27 && mapOnDown.upperMiddleObstacle !==null) {
                    if (mapOnDown.upperMiddleObstacle.topBound < nextPlayerPos.bottomBound && 
                        ((currPlayerPos.rightBound > mapOnDown.upperMiddleObstacle.leftBound && currPlayerPos.rightBound < mapOnDown.upperMiddleObstacle.rightBound) || (currPlayerPos.leftBound > mapOnDown.upperMiddleObstacle.leftBound && currPlayerPos.leftBound < mapOnDown.upperMiddleObstacle.rightBound))) {

                        
                        this.canPlayerMove = false;
                    }
                      
                }
            break;

            case 'ArrowLeft':
                if (nextPlayerPos.leftBound < this.state.initialLeft) {
                    this.canPlayerMove = false;
                }
                
                if (typeof currentTile !== 'number'){
                    if(!isBetweenHorizontalTiles) {
                        if (currentMap.lowerLeftObstacle.rightBound >= nextPlayerPos.leftBound && ((currPlayerPos > currentMap.lowerLeftObstacle.topBound && currPlayerPos.topBound < currentMap.lowerLeftObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.lowerLeftObstacle.topBound && currPlayerPos.topBound < currentMap.lowerLeftObstacle.bottomBound))) {
                            
                                                        
                            this.canPlayerMove = false;
                            
                        } 

                    }
                }

                if (typeof currentTile === 'number' && currentMap.middleLeftObstacle !== null) {
                    if (currentMap.middleLeftObstacle.rightBound > nextPlayerPos.leftBound && ((currPlayerPos > currentMap.middleLeftObstacle.topBound && currPlayerPos.topBound < currentMap.middleLeftObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.middleLeftObstacle.topBound && currPlayerPos.topBound < currentMap.middleLeftObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.upperLeftObstacle !== null) {
                    if (currentMap.upperLeftObstacle.rightBound > nextPlayerPos.leftBound && ((currPlayerPos > currentMap.upperLeftObstacle.topBound && currPlayerPos.topBound < currentMap.upperLeftObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.upperLeftObstacle.topBound && currPlayerPos.topBound < currentMap.upperLeftObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.lowerLeftObstacle !== null) {
                    if (currentMap.lowerLeftObstacle.rightBound > nextPlayerPos.leftBound && ((currPlayerPos > currentMap.lowerLeftObstacle.topBound && currPlayerPos.topBound < currentMap.lowerLeftObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.lowerLeftObstacle.topBound && currPlayerPos.topBound < currentMap.lowerLeftObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                //możliwość przejśca na inny kafelek z prawej strony
                if (typeof currentTile === 'number' && (currentTile-1)%7 !== 0 && currentTile-1 >= 0 && mapOnLeft.middleRightObstacle !== null) {
         
                    if (mapOnLeft.middleRightObstacle.rightBound >= nextPlayerPos.leftBound - 10 && ((currPlayerPos > mapOnLeft.middleRightObstacle.topBound && currPlayerPos.topBound < mapOnLeft.middleRightObstacle.bottomBound) || (currPlayerPos.bottomBound > mapOnLeft.middleRightObstacle.topBound && currPlayerPos.topBound < mapOnLeft.middleRightObstacle.bottomBound))) {

                        this.canPlayerMove = false;
                       
                    } 
                }
            break;

            case 'ArrowRight':

                if (nextPlayerPos.leftBound >  this.state.initialLeft + 1274) {
                    this.canPlayerMove = false;
                }

                if (typeof currentTile !== 'number'){
                        if(!isBetweenHorizontalTiles) {
                            if (currentMap.lowerRightObstacle.leftBound < nextPlayerPos.rightBound && ((currPlayerPos > currentMap.lowerRightObstacle.topBound && currPlayerPos.topBound < currentMap.lowerRightObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.lowerRightObstacle.topBound && currPlayerPos.topBound < currentMap.lowerRightObstacle.bottomBound))) {
                                
                                                            
                            this.canPlayerMove = false;
                            
                        }
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.middleRightObstacle !== null) {
                    if (currentMap.middleRightObstacle.leftBound < nextPlayerPos.rightBound && ((currPlayerPos > currentMap.middleRightObstacle.topBound && currPlayerPos.topBound < currentMap.middleRightObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.middleRightObstacle.topBound && currPlayerPos.topBound < currentMap.middleRightObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.upperRightObstacle !== null) {
                    if (currentMap.upperRightObstacle.leftBound < nextPlayerPos.rightBound && ((currPlayerPos > currentMap.upperRightObstacle.topBound && currPlayerPos.topBound < currentMap.upperRightObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.upperRightObstacle.topBound && currPlayerPos.topBound < currentMap.upperRightObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                    } 
                }

                if (typeof currentTile === 'number' && currentMap.lowerRightObstacle !== null) {
                    if (currentMap.lowerRightObstacle.leftBound < nextPlayerPos.rightBound && ((currPlayerPos > currentMap.lowerRightObstacle.topBound && currPlayerPos.topBound < currentMap.lowerRightObstacle.bottomBound) || (currPlayerPos.bottomBound > currentMap.lowerRightObstacle.topBound && currPlayerPos.topBound < currentMap.lowerRightObstacle.bottomBound))) {

                        
                        this.canPlayerMove = false;
                        
                    } 
                }

                //możliwośc przejścia na nastepny kafele z lewej strony
                if (typeof currentTile === 'number' && (currentTile + 1)%6 !== 0 && currentTile+1 <= 34 && mapOnRight.middleLeftObstacle !== null) {
                    if (mapOnRight.middleLeftObstacle.leftBound <= nextPlayerPos.rightBound && ((currPlayerPos > mapOnRight.middleLeftObstacle.topBound && currPlayerPos.topBound < mapOnRight.middleLeftObstacle.bottomBound) || (currPlayerPos.bottomBound > mapOnRight.middleLeftObstacle.topBound && currPlayerPos.topBound < mapOnRight.middleLeftObstacle.bottomBound))) {
                        
                                                    
                        this.canPlayerMove = false;
                        
                    } 
                }
            break;
        }


    }

   

    //sprawdza na którym tileu znajduje się obecnie player
    findTile(leftBound, rightBound, topBound, bottomBound) {
        let tilesRow = [];
        let tilesCol = [];
        let counter = 6;
        
        
        //iteracja po lewych krawędziach Tile!!
        for (let i = (this.state.initialLeft + 1093); i >= this.props.initialLeft ; i-=182) {
            if (leftBound > i){
                tilesCol.push(counter)
                break;
            }  
            counter--; 
        }

        counter=0;
        //iteracja po prawych krawędziach Tile!!!
        for (let i = (this.state.initialLeft + 182); i <= this.state.initialLeft + 1275; i+=182) {
            if (rightBound < i){
                tilesCol.push(counter)
                break; 
            }
            counter++
        }

        counter=4
        //iteracja po górnych krawędziach Tile!!!
        for (let i = (this.state.initialTop + 728); i >= this.state.initialTop ; i-=182) {
            if (topBound > i){
                tilesRow.push(counter)
                break;
            }  
            counter--; 
        }

        counter = 0;
        //iteracja po dolnych krawędziach Tile!!!
        for (let i = (this.state.initialTop + 182); i <= this.state.initialTop +910; i+=182) {
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

    locateObstacles = (tileIndex, grid) => {
       
        let tile = {index: tileIndex}
        let upperLeftObstacle = null;
        let upperMiddleObstacle = null;
        let upperRightObstacle = null;
        let middleLeftObstacle = null;
        let middleRightObstacle = null;
        let lowerLeftObstacle = null;
        let lowerMiddleObstacle = null;
        let lowerRightObstacle = null;

        let multiplier;
        let horizontalMultiplier;
        
        
        if (tileIndex >= 0 && tileIndex < 7) {
            multiplier = 0
            horizontalMultiplier = tileIndex
        }

        if (tileIndex >= 7 && tileIndex < 14) {
            multiplier = 1
            horizontalMultiplier = tileIndex - 7

        }

        if (tileIndex >= 14 && tileIndex < 21) {
            multiplier = 2
            horizontalMultiplier = tileIndex - 14
        }

        if (tileIndex >= 21 && tileIndex < 28) {
            multiplier = 3
            horizontalMultiplier = tileIndex - 21
        }

        if (tileIndex >= 28 && tileIndex < 35) {
            multiplier = 4
            horizontalMultiplier = tileIndex-28;
        }

        upperLeftObstacle = {
            topBound:  this.state.initialTop + 180*multiplier,
            bottomBound: (this.state.initialTop + 60) + 180*multiplier,
            leftBound: this.state.initialLeft + 180*horizontalMultiplier,
            rightBound: (this.state.initialLeft + 60) + 180*horizontalMultiplier
        }

        upperRightObstacle = {
            topBound:  this.state.initialTop + 180*multiplier,
            bottomBound: (this.state.initialTop + 60) + 180*multiplier,
            leftBound: (this.state.initialLeft + 121) + 180*horizontalMultiplier,
            rightBound: (this.state.initialLeft + 180) + 180*horizontalMultiplier
        }

        lowerLeftObstacle = {
            topBound: (this.state.initialTop + 121) + 180*multiplier,
            bottomBound: (this.state.initialTop + 180) + 180*multiplier,
            leftBound: this.state.initialLeft + 180*horizontalMultiplier,
            rightBound: (this.state.initialLeft + 60) + 180*horizontalMultiplier
        }

        lowerRightObstacle = {
            topBound: (this.state.initialTop + 1 + 121) + 180*multiplier,
            bottomBound: (this.state.initialTop + 1 + 180) + 180*multiplier,
            leftBound: (this.state.initialLeft + 121) + 180*horizontalMultiplier,
            rightBound: (this.state.initialLeft + 180) + 180*horizontalMultiplier
        }

        grid[0].forEach((el, i) => {
            if (el === 0) {
                if (i === 1) {
                    upperMiddleObstacle = {
                        topBound:  this.state.initialTop + 180*multiplier,
                        bottomBound: (this.state.initialTop + 60) + 180*multiplier,
                        leftBound: (this.state.initialLeft + 61) + 180*horizontalMultiplier,
                        rightBound: (this.state.initialLeft + 120) + 180*horizontalMultiplier
                    }
                }
            }
        });

        grid[1].forEach((el,i) => {
            if (el === 0) {
                switch (i) {
                    case 0: {
                        middleLeftObstacle = {
                            topBound: (this.state.initialTop + 61) + 180*multiplier,
                            bottomBound: (this.state.initialTop + 120) + 180*multiplier,
                            leftBound: this.state.initialLeft + 180*horizontalMultiplier,
                            rightBound: (this.state.initialLeft + 60) + 180*horizontalMultiplier
                        }
                    }
                    break;

                    case 2:{
                        middleRightObstacle = {
                            topBound: (this.state.initialTop + 61) + 180*multiplier,
                            bottomBound: (this.state.initialTop + 120) + 180*multiplier,
                            leftBound: (this.state.initialLeft + 121) + 180*horizontalMultiplier,
                            rightBound: (this.state.initialLeft + 180) + 180*horizontalMultiplier
                        }
                    }
                    break;
                }
            }
        });

        grid[2].forEach((el, i) => {
            if (el === 0) {
                if (i === 1) {
                    lowerMiddleObstacle = {
                        topBound:  (this.state.initialTop + 121) + 180*multiplier,
                        bottomBound: (this.state.initialTop + 180) + 180*multiplier,
                        leftBound: (this.state.initialLeft + 61) + 180*horizontalMultiplier,
                        rightBound: (this.state.initialLeft + 120) + 180*horizontalMultiplier
                    }
                }
            }
        })
        
        tile.upperLeftObstacle = upperLeftObstacle;
        tile.upperMiddleObstacle = upperMiddleObstacle;
        tile.upperRightObstacle = upperRightObstacle;
        tile.middleLeftObstacle = middleLeftObstacle;
        tile.middleRightObstacle = middleRightObstacle;
        tile.lowerLeftObstacle = lowerLeftObstacle;
        tile.lowerMiddleObstacle = lowerMiddleObstacle;
        tile.lowerRightObstacle = lowerRightObstacle;

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
        e.preventDefault();
        switch(e.key) {
            case 'ArrowUp':
                this.collisionControl(e.key);
                this.canPlayerMove ? this.moveUp() : this.canPlayerMove = true;
            break;
            
            case 'ArrowDown':
                this.collisionControl(e.key);
                this.canPlayerMove ? this.moveDown() : this.canPlayerMove = true;
            break;

            case 'ArrowLeft':
                this.collisionControl(e.key);
                this.canPlayerMove ? this.moveLeft() : this.canPlayerMove = true;
            break;

            case 'ArrowRight':
                this.collisionControl(e.key);
                this.canPlayerMove ? this.moveRight() : this.canPlayerMove = true;
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
                    rotation: Math.floor(Math.random()*3),
                    isDisplayed: true
                    
                }
            }

            if (tile === 'straight') {
                currentTile = {
                    shape: 'straight',
                    treasure: 0,
                    rotation: Math.floor(Math.random()*3),
                    isDisplayed: true
                }
            }

            if (tile === 'turn') {
                currentTile = {
                    shape: 'turn',
                    treasure: (treasures.length > 0) ? treasures.pop() : 0,
                    rotation: Math.floor(Math.random()*3),
                    isDisplayed: true
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
        let key = 0;


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
                isDisplayed: true
            })

            row1.push({
                shape: 'turn',
                treasure: 'B',
                rotation: 1,
                isDisplayed: true
            })

            row5.unshift({
                shape: 'turn',
                treasure: 'C',
                rotation: 3,
                isDisplayed: true
            })

            row5.push({
                shape: 'turn',
                treasure: 'D',
                rotation: 2,
                isDisplayed: true
            })
        }
        

        let tilesRow1 = row1.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} isdisplayed={tile.isDisplayed} sendObstacles={this.locateObstacles}key={key++}/>)

        let tilesRow2 = row2.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} isdisplayed={tile.isDisplayed} sendObstacles={this.locateObstacles}key={key++}/>)

        let tilesRow3 = row3.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} isdisplayed={tile.isDisplayed} sendObstacles={this.locateObstacles}key={key++}/>) 

        let tilesRow4 = row4.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} isdisplayed={tile.isDisplayed} sendObstacles={this.locateObstacles}key={key++}/>)

        let tilesRow5 = row5.map(tile => <Tile shape={tile.shape} treasure={tile.treasure} rotation={tile.rotation} initialX={0} initialY={0} index={index++} isdisplayed={tile.isDisplayed} sendObstacles={this.locateObstacles}key={key++}/>)

        console.log(this.obstacleMap)
        if (this.state.tiles.length !== 0){       
            return(
                <div className="game-panel">
                    <Player top={this.state.playerTop} left={this.state.playerLeft} width={this.state.playerWidth}height={this.state.playerHeight}/>
                    <div className='row clearfix'>
                        <Arrow direction="down" col={2} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        <Arrow direction="down" col={4} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        <Arrow direction="down" col={6} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        {tilesRow1}
                    </div>
                    <div className='row clearfix'>
                        <Arrow direction="right" row={2} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        {tilesRow2}
                        <Arrow direction="left" row={2} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                    </div>
                    <div className='row clearfix'>{tilesRow3}</div>
                    <div className='row clearfix'>
                        <Arrow direction ="right" row={4} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        {tilesRow4}
                        <Arrow direction ="left" row={4} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>                
                    </div>
                    <div className='row clearfix'>
                        {tilesRow5}
                        <Arrow direction="up" col={2} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        <Arrow direction="up" col={4} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                        <Arrow direction="up" col={6} insertTile={this.insertTile} isActive={this.state.areArrowsActive}/>
                    </div>
                    <Tile shape={this.state.tiles[this.state.tiles.length-1].shape} treasure={this.state.tiles[this.state.tiles.length-1].treasure} rotation={this.state.tiles[this.state.tiles.length-1].rotation} index="last" sendObstacles={this.locateObstacles} isNewOnBoard={true} isDisplayed={this.state.displayNewTile} left={this.state.newTileLeft} top={this.state.newTileTop}/> 

                    <PlayerPanel tile={this.state.tiles[this.state.tiles.length-1]} callRotateTile={this.rotateTile} key={this.state.key} callToggleArrows={this.toggleArrows}/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export {Board}