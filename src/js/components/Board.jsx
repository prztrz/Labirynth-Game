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
import {GameOver} from "./GameOver.jsx";


/**
 * @class Board redners the game board and controls game-flow
 * 
 * @method componentWillMount
 *  @listens 'click' @callback this.movePlayer
 * 
 * @method componenDidMount
 *      @callback this.generateTiles
 * 
 * @method toggleArrows - toggles activity of game arrows when confirm position and confim rotation buttons are clicked
 * 
 * @method updateBoard - Runned whenever the location of tiles is changed. Sets this.state.isGameOver to true (finishes the game) if player has no shifts left. If player has shifts the method updates game board: finds shifted-in tile position, then changes indexes of tiles objects from corresponding row or column in tiles array to create the row or column with new tile locations, subsequently removes last index from tiles array (representing current shifted-in tile) and pushes object representing shifted-out tile - to become next shifted-in tile. Switches out the shifted-in tile visibility when all actions are done.
 * 
 * @method getPlayerShift - If the current tile(s) the player's sprite is currently located on are within the shifted row or column changes the player's sprite position in corresponding direction. If the player's sprite is on the shifted-out tile, changes its position to locate it on shifted-in tile
 * 
 *      @param {number} firstTile - the number of first tile changing position in the row or column due to shifting new tile
 *      @param {number} lastTile - the number of last tile changing position in the row or column due to shifting new tile
 *      @param {string} direction - the direction of shifting-in new tile (left, right up down)
 *      @returns {number} player position after the shift
 * 
 * @method rotateTile - rotates the shifted-in tile
 *      @param {string} direction - direction of rotating sent by RotateButon component
 * 
 * @method insertTile - putsshifted in tile on the clicked game arrow and switches it visibility on
 *      @param {boolean} isVertical - true if the shifted-in tile is put on the vertical axis, 
 *      @param {string}direction - represent direction of shifting in tile 
 *      @param {number} multiplier - representing the value by which tile width is multiplied depending on the horizontal position of shifted-in tile
 * 
 * @method collisionControl - depending on pressed key checks if player sprites can make the corresponding move and disables it if the wall on the next player's sprite position is detected
 *      @param {string} key - represents pressed key
 * 
 * @method findTile - find the tile or tiles on which the player's sprite is currently located
 *      @param {number} leftBound - left position of left boundary of player's sprite object
 *      @param {number} rightBound - left position of right boundary of player's sprite object
 *      @param {number} topBound - top position of top boundary of player's sprite object
 *      @param {number} bottomBound - top position of bottom boundary of player's sprite object
 *      @returns the number or two numbers array representing the index or indexes of tiles array corresponding to the tile(s) the player's sprite is currently located on
 * 
 * @method checkPlayerOnTreasure - checks the collision of player's sprite with one of the treasures from this.state.targets array. If the collision is detected removes the treasure from its tile and from this.state.targets array.
 * 
 * @method isPlayerOnTargetTile - checks if the player's sprite is located on tile containing treasure from this.state.targets array
 *      @param {number} currentTile - number of tile the player's sprite is currently located on
 *      @returns {boolean} true is the player's sprite is located on tile containing the tresure from this.state.targets array
 * 
 * @method isPlayerOnCentralGrid - checks if the player's sprite is located on central grid component of current tile
 *      @param {number} leftBound - left position of left boundary of player's sprite object
 *      @param {number} rightBound - left position of right boundary of player's sprite object
 *      @param {number} topBound - top position of top boundary of player's sprite object
 *      @param {number} bottomBound - top position of bottom boundary of player's sprite object
 *      @returns {boolean} true if the player's sprite is located on central grid component of current tile the player's sprite is on
 * 
 * @method findTileObjectOnBoard - finds the number of specified tile object index from this.state.tiles array on the board - the number of tile on board is counted from 0 to 34 from left to right from top to bottom row.
 *      @param {number} currentTileObject - index of current tile object in this.state.tiles array
 *      @returns {number} - number of tile build on the board based on specified object in this.state.tiles.array
 * 
 * @method findCurrentTileIndexInArray  - Basing on the tile the player's sprite is currently located on finds the index of corresponding tile object in this.state.tiles array.
 *      @param {number} - index of tile object in the this.state.tiles array 
 * 
 * @method locateObstacles - creates object containing information about boundaries position of all obstacles (walls) in the tile depending on its grid
 *      @param {number} index - index of current tile the obstacles (walls) are being located on
 *      @param {array} grid - the array of current tile grid
 * 
 * @method createObstacleMap - returns this.obstacleMap array containing the objects generated by this.locateObstacles method - pushes the subsequent objects to the array and clears all object in the array if it its length exceeds the number of all tiles in the game
 *      @param {object} tile - object generated by this.createObstacleMap method
 * 
 * @method movePlayer - depending on pressed key runs this.collisionControl with appropriate parameter and if this.canPlayerMove is true runs method moving player's sprite in corresponding direction
 * 
 * @method moveUp - changes player's sprite top position by -5px and player's sprite image
 * 
 * @method moveDown - changes player's sprite top position by 5px and player's sprite image
 * 
 * @method moveLeft - changes player's sprite left position by -5px, player's sprite image and player's sprite Y-roation
 * @method moveRight - changes player's sprite left position by 5px, player's sprite image and player's sprite Y-roation
 * 
 * @method checkWin - checks if the player win the game by collecting all treasures from  this.state.targets array and being located on the finish gird - central grid of last tile on board
 * 
 * @method generateTileShapes 
 *      @returns array of strings representing the shapes of tiles in the game
 * 
 * @method generateTreasures
 *      @returns array of numbers representing indexes of treasures in the game
 * 
 * @method generateTiles - generate array of objects representing subsequent tiles in the game basing on arrays returned by this.generateTileShapes and this.generateTreasures methods
 * 
 * @method suffle - shuffle components in an array
 *      @param {array} arr
 * 
 * @method render - pushes 5 tile objects to first and last row of tiles and 7 tile objects to the other tiles then puts one special tile object at the begining and at the end of first and last rows of tiles. Subsequently generate <Tile /> components with props basing on tiles objects values.
 * @returns rendered board game composition or null if this.tiles array is empty.
 */
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boardKey: Math.random(),
            areArrowsActive: false,
            displayNewTile: false, //if true shifting-in tile is visible
            initialTop: this.props.initialTop, //initial top position of the board - necessary for proper tiles location
            initialLeft: this.props.initialLeft, //initial left position of the board - necessary for proper tiles location
            newTileLeft: 0,
            newTileTop: 0,
            newTileRotation: '',
            tiles: [], //Array of objects representing tiles on the board, created when Board component is mounted or updated
            playerTop: this.props.initialTop + 70,
            playerLeft: this.props.initialLeft + 70,
            playerWidth: 40,
            playerHeight: 40,
            playerImg: 1,
            playerRotate: 0,
            targets:[],
            targetTiles: [],
            shifts: 5,
            isGameOver: false,
            isWin: false,

        }
        this.obstacleMap = []; //Array of objects representing top and left positions of every obstacle (wall) on the board, created when Board component is mounted or updated
        this.canPlayerMove = true; //if false disables player's sprite ability to move
    }

    componentWillMount() {
        document.addEventListener('keydown', this.movePlayer)
        this.setState({targets: this.generateTargets()})

    }

    componentDidMount() {
        this.generateTiles()
        
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.movePlayer);
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.initialTop !== nextProps.initialTop) {
            this.setState({initialTop: nextProps.initialTop, playerTop: nextProps.initialTop + 70})
        } 
        if (this.state.initialLeft !== nextProps.initialLeft) {
            this.setState({initialLeft: nextProps.initialLeft, playerLeft: nextProps.initialLeft + 70 })
        }
    }
    toggleArrows = () => {
        this.state.areArrowsActive ? this.setState({areArrowsActive: false}) : this.setState({areArrowsActive: true})
    }

    updateBoard = () => {
        if (this.state.shifts === 0) {
            this.setState({isGameOver: true});
        }
        let tiles= this.state.tiles.slice();
        let toShift = tiles[tiles.length-1]
        let toUnshift;

        //shift on the upper arrows
        if (this.state.newTileTop === this.state.initialTop-180) {
            

            //first upper arrow
            if(this.state.newTileLeft === this.state.initialLeft+182) {
                let newPlayerTop = this.getPlayerShift(1,29,'down')
                toUnshift = tiles[26];
                toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                
                tiles.splice(26, 1, tiles[20]);
                tiles.splice(20, 1, tiles[13]);
                tiles.splice(13, 1, tiles[6]);
                tiles.splice(6, 1, tiles[0]);
                tiles.splice(0, 1, toShift);
                tiles.pop()

                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 416 ? 535 : this.state.playerLeft})
            }

            //second upper arrow
            if(this.state.newTileLeft === this.state.initialLeft+182*3) {
                let newPlayerTop = this.getPlayerShift(3,31,'down')
                    toUnshift = tiles[28];
                    toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                    
                    tiles.splice(28, 1, tiles[22]);
                    tiles.splice(22, 1, tiles[15]);
                    tiles.splice(15, 1, tiles[8]);
                    tiles.splice(8, 1, tiles[2]);
                    tiles.splice(2, 1, toShift);
                    tiles.pop()

                    tiles[tiles.length] = toUnshift;

                    this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 416 ? 905 : this.state.playerLeft})
            }

            //third upper arrow
            if(this.state.newTileLeft === this.state.initialLeft+182*5) {
                let newPlayerTop = this.getPlayerShift(5,33,'down')
                toUnshift = tiles[30];
                toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                
                tiles.splice(30, 1, tiles[24]);
                tiles.splice(24, 1, tiles[17]);
                tiles.splice(17, 1, tiles[10]);
                tiles.splice(10, 1, tiles[4]);
                tiles.splice(4, 1, toShift);
                tiles.pop()

                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 416 ? 1260 : this.state.playerLeft})
            }
        }
        
        //shift on lower arrows
        if (this.state.newTileTop === this.state.initialTop + 910) {

            //first lower arrow
            if(this.state.newTileLeft === this.state.initialLeft+182){
                let newPlayerTop = this.getPlayerShift(1,29,'up')
                toUnshift = tiles[0];
                toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                
                tiles.splice(0, 1, tiles[6]);
                tiles.splice(6, 1, tiles[13]);
                tiles.splice(13, 1, tiles[20]);
                tiles.splice(20, 1, tiles[26]);
                tiles.splice(26, 1, toShift);
                tiles.pop()

                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 1156 ? 540 : this.state.playerLeft})
            }

            //second lower arrow
            if(this.state.newTileLeft === this.state.initialLeft+182*3) {
                let newPlayerTop = this.getPlayerShift(3,31,'up')
                toUnshift = tiles[2];
                toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                
                tiles.splice(2, 1, tiles[8]);
                tiles.splice(8, 1, tiles[15]);
                tiles.splice(15, 1, tiles[22]);
                tiles.splice(22, 1, tiles[28]);
                tiles.splice(28, 1, toShift);
                tiles.pop()

                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 1156 ? 900 : this.state.playerLeft})
            }
            
            //third lower arrow
            if(this.state.newTileLeft === this.state.initialLeft+182*5) {
                let newPlayerTop = this.getPlayerShift(5,33,'up')
                toUnshift = tiles[4];
                toShift.rotation = (this.state.newTileRotation !== '') ? this.state.newTileRotation : toShift.rotation;
                
                tiles.splice(4, 1, tiles[10]);
                tiles.splice(10, 1, tiles[17]);
                tiles.splice(17, 1, tiles[24]);
                tiles.splice(24, 1, tiles[30]);
                tiles.splice(30, 1, toShift);
                tiles.pop()

                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerTop: newPlayerTop, playerLeft: newPlayerTop === 1156 ? 1260 : this.state.playerLeft})
            }
        }

        //shift on the left arrows
        if(this.state.newTileLeft === this.state.initialLeft-180) {

            //first left arrow
            if(this.state.newTileTop === this.state.initialTop + 182) {
                let newPlayerLeft = this.getPlayerShift(7,13,'right');

                toUnshift = tiles[11];
                tiles.splice(11,1, tiles[10]);
                for(let i = 10; i > 5; i--) {
                    tiles.splice(i, 1, tiles[i-1])
                }
                tiles.splice(5, 1, toShift);

                tiles.pop()
                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerLeft: newPlayerLeft, playerTop: newPlayerLeft === 360 ? 593 : this.state.playerTop })
            }

            //second left arrow
            if(this.state.newTileTop === this.state.initialTop + 182*3) {
                let newPlayerLeft = this.getPlayerShift(21,27,'right');
                toUnshift = tiles[25];
                tiles.splice(25,1, tiles[24]);
                for(let i = 24; i > 19; i--) {
                    tiles.splice(i, 1, tiles[i-1])
                }
                tiles.splice(19, 1, toShift);

                tiles.pop()
                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerLeft: newPlayerLeft, playerTop: newPlayerLeft === 360 ? 957 : this.state.playerTop })
            }
        }
        
        //shift on the right arrows
        if(this.state.newTileLeft === this.state.initialLeft + 1274) {

            //first right arrow
            if(this.state.newTileTop === this.state.initialTop + 182) {
                let newPlayerLeft = this.getPlayerShift(7,13,'left')

                toUnshift = tiles[5];
                tiles.splice(5,1, tiles[6]);
                for(let i = 6; i < 11; i++) {
                    tiles.splice(i, 1, tiles[i+1])
                }
                tiles.splice(11, 1, toShift);

                tiles.pop()
                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerLeft: newPlayerLeft, playerTop: newPlayerLeft ===  1454 ? 593 : this.state.playerTop})
            }

            //second right arrow
            if(this.state.newTileTop === this.state.initialTop + 182*3) {
                let newPlayerLeft = this.getPlayerShift(21,27,'left')                
                toUnshift = tiles[19];
                tiles.splice(19,1, tiles[20]);
                for(let i = 20; i < 25; i++) {
                    tiles.splice(i, 1, tiles[i+1])
                }
                tiles.splice(25, 1, toShift);

                tiles.pop()
                tiles[tiles.length] = toUnshift;

                this.setState({tiles: tiles, targetTiles: this.getTargetTiles(tiles), key: Math.random(), displayNewTile: false, boardKey: Math.random(), playerLeft: newPlayerLeft, playerTop: newPlayerLeft ===  1454 ? 954 : this.state.playerTop})
            }
        }

        this.setState({shifts: this.state.shifts-1})
    }

    getPlayerShift(firstTile, lastTile, direction) {  

        let currentTile = this.findTile(this.state.playerLeft, this.state.playerLeft + this.state.playerWidth, this.state.playerTop, this.state.playerTop + this.state.playerHeight);
        let shiftWidth = (direction === 'right' || direction ==='down') ? 60*3 : -60*3;
        let initialPosition = (direction === 'right' || direction === 'left') ? this.state.playerLeft : this.state.playerTop;

        if (direction === 'right' || direction === 'down') {
            if (typeof currentTile === 'number'){
                if (currentTile>=firstTile && currentTile < lastTile) {
                    if (direction==='right') {
                        return initialPosition + shiftWidth;
                    } else {
                        for (let i = lastTile-7; i>= firstTile; i -=7){
                            if (currentTile === i) {
                                return initialPosition + shiftWidth
                            }
                        }
                    }
                } else if (currentTile === lastTile) {
                        return direction === 'right' ? 360 : 416
                }
            } else if (currentTile[0]>=firstTile && currentTile[1] < lastTile) {
                if (direction === 'right'){
                    return initialPosition + shiftWidth;
                } else {
                    for (let i = lastTile-7; i>= firstTile; i -=7){
                        if (currentTile[0] === i) {
                            return initialPosition + shiftWidth
                        }
                    }
                }
            } else if (currentTile[1] === lastTile){
                    return direction === 'right' ? 360 : 416
                }
            return direction === 'right' ? this.state.playerLeft : this.state.playerTop
        }
        
        else if (direction === 'left' || direction === 'up') {
            if (typeof currentTile === 'number'){
                if (currentTile>firstTile && currentTile <= lastTile) {
                    if (direction === 'left'){
                        return initialPosition + shiftWidth;
                    } else {
                        for (let i = firstTile+7; i>= lastTile; i +=7){
                            if (currentTile === i) {
                                return initialPosition + shiftWidth
                            }
                        } 
                    }
                } else if (currentTile === firstTile) {
                    return direction === 'left' ? 1454 : 1156;
                } 
            } else if (currentTile[0]>firstTile && currentTile[1] <= lastTile) {
                if (direction === 'left') {
                    return initialPosition + shiftWidth;
                } else {
                    for (let i = firstTile+7; i>= lastTile; i +=7){
                        if (currentTile[1] === i) {
                            return initialPosition + shiftWidth
                        }
                    } 
                }
            } else if (currentTile[1] === firstTile){
                return direction === 'left' ? 1454 : 1156;
            }
            return direction === 'left' ? this.state.playerLeft : this.state.playerTop;
        }

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
            newTileRotation: tile.rotation,
            key: Math.random()
        })
    }

    insertTile = (isVertical, direction, multiplier) => {
        if (isVertical) {
            
            let top;
            direction === 'up' ?  top = 910 : top = -180;
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
                

                if (nextPlayerPos.topBound < this.state.initialTop+5) {
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
            
            if (nextPlayerPos.bottomBound > this.state.initialTop + 905) {
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

                if (nextPlayerPos.leftBound >  this.state.initialLeft + 1214) {
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

    checkPlayerOnTreasure() {
        let currentTile = this.findTile(this.state.playerLeft, this.state.playerLeft + this.state.playerWidth, this.state.playerTop, this.state.playerTop + this.state.playerHeight);

        if (this.isPlayerOnTargetTile(currentTile) && this.isPlayerOnCentralGrid(this.state.playerLeft, this.state.playerLeft + this.state.playerWidth, this.state.playerTop, this.state.playerTop + this.state.playerHeight)) {
            let targets = this.state.targets.slice();
            let tiles = this.state.tiles.slice();
            let currentTileIndex = this.findCurrentTileIndexInArray(currentTile);
            let currentTileObject = tiles[currentTileIndex];
            let capturedTreasure = currentTileObject.treasure;
            let capturedTreasureIndex = this.state.targets.indexOf(capturedTreasure);

            targets.splice(capturedTreasureIndex, 1)

            currentTileObject.treasure = 0;
            tiles.splice(currentTileIndex, 1, currentTileObject);

            this.setState({
                tiles: tiles,
                targetTiles: this.getTargetTiles(tiles),
                targets: targets,
                boardKey: Math.random(),
                key: Math.random()

            })
        }
    }

    isPlayerOnTargetTile(currentTile) {
        let targetTilesOnBoard = this.state.targetTiles.map(tile => this.findTileObjectOnBoard(tile));

        return targetTilesOnBoard.indexOf(currentTile) !== -1 


    }

    isPlayerOnCentralGrid(leftBound, rightBound, topBound, bottomBound) {
        let isOnWidth = false;
        let isOnHeight = false;
        for(let i = this.state.initialLeft+60; i <= (this.state.initialLeft+60)*7; i+=180 ) {
            if (leftBound >= i && rightBound <= i + 60) {
                isOnWidth = true;
            }
        }

        for (let j = this.state.initialTop+60; j <= (this.state.initialTop+60)*5; j+=180) {
            if (topBound >= j && bottomBound <= j+60) {
                isOnHeight = true;
            }
        }

        return (isOnHeight && isOnWidth);
    }

    findTileObjectOnBoard(currentTileObject) {
        if (currentTileObject <= 4) {
            return currentTileObject + 1
        }

        if (currentTileObject <= 25) {
            return currentTileObject + 2
        }

        return currentTileObject+3;
    }

    findCurrentTileIndexInArray (currentTile) {
        if (currentTile !== 0 && currentTile !==6 && currentTile !== 28 && currentTile !== 34) {
            if (currentTile < 6) {
                return currentTile - 1
            }

            if (currentTile <= 28) {
                return currentTile - 2
            }

            return currentTile-3;
        } else {
            return null
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

        this.checkPlayerOnTreasure(); 
        this.checkWin();
    }

    checkWin() {
        let currentTile = this.findTile(this.state.playerLeft, this.state.playerLeft + this.state.playerWidth, this.state.playerTop, this.state.playerTop + this.state.playerHeight);
        
            if (currentTile === 34 && this.isPlayerOnCentralGrid(this.state.playerLeft, this.state.playerLeft + this.state.playerWidth, this.state.playerTop, this.state.playerTop + this.state.playerHeight) && this.state.targets.length === 0) {
                this.setState({isWin: true})
            }
    }

    moveUp = () => {
        let img = (this.state.playerImg === 7) ? 1 : this.state.playerImg+1
        this.setState({
            playerTop: this.state.playerTop - 5,
            playerImg: img
        }) 
    }

    moveDown = () => {
        let img = (this.state.playerImg === 7) ? 1 : this.state.playerImg+1
        this.setState({
            playerTop: this.state.playerTop + 5,
            playerImg: img
        }) 
    }

    moveLeft = () => {
        let img = (this.state.playerImg === 7) ? 1 : this.state.playerImg+1
        this.setState({
            playerRotate: 180,
            playerImg: img,
            playerLeft: this.state.playerLeft - 5
        })
        
    }

    moveRight = () => {
        let img = (this.state.playerImg === 7) ? 1 : this.state.playerImg+1
        this.setState({
            playerLeft: this.state.playerLeft + 5,
            playerImg: img,
            playerRotate: 0
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

    generateTargets() {
        let target1 = Math.floor(Math.random()*16)+1
        let target2 = Math.floor(Math.random()*16)+1
        let target3 = Math.floor(Math.random()*16)+1

        while(target1 === target2) {
            target2 = Math.floor(Math.random()*16)+1;
        }

        while (target1 === target3 || target2 === target3) {
            let target3 = Math.floor(Math.random()*16)+1
        }

        return [target1, target2, target3];
    }

    generateTiles() {
        let tiles = []
        let targetTiles = [];
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
            tiles: tiles,
            targetTiles: this.getTargetTiles(tiles)
        })
    }

    getTargetTiles(tiles) {
        let targetTiles = tiles.map(tile => {
            if (this.state.targets.indexOf(tile.treasure) !== -1) {
                return tiles.indexOf(tile)
            }
        })

        return targetTiles.filter(tile => tile !== undefined)
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
        let key = this.state.boardKey;


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
                treasure: 0,
                rotation: 1,
                isDisplayed: true
            })

            row5.unshift({
                shape: 'turn',
                treasure: 0,
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

        if (this.state.tiles.length !== 0){       
            return(
                <div className="game-panel">
                    <GameOver isGameOver={this.state.isGameOver} isWin={this.state.isWin}/>
                    <Player top={this.state.playerTop} left={this.state.playerLeft} width={this.state.playerWidth}height={this.state.playerHeight} img={this.state.playerImg} rotate={this.state.playerRotate}/>
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
                    <Tile shape={this.state.tiles[this.state.tiles.length-1].shape} treasure={this.state.tiles[this.state.tiles.length-1].treasure} rotation={this.state.tiles[this.state.tiles.length-1].rotation} index="last" sendObstacles={this.locateObstacles} isNewOnBoard={true} isDisplayed={this.state.displayNewTile} left={this.state.newTileLeft} top={this.state.newTileTop} key={key++}/> 

                    <PlayerPanel tile={this.state.tiles[this.state.tiles.length-1]} callRotateTile={this.rotateTile} key={this.state.key} callToggleArrows={this.toggleArrows} callUpdateBoard={this.updateBoard} targets={this.state.targets} shifts={this.state.shifts}/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export {Board}