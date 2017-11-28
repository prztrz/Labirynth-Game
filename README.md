# Labirynth-Game
This is a simple logic game designed in react.js to present the author's skills and his learning progress.

#Demo
You can find and play the demo of this project on: https://prztrz.github.io/Labirynth-Game/index.html

#Rules
You need to help Mario with finding three random numbers displayed on your game pad among the numbers spreaded around the board and then go to castle. You can change the walls location on the board, by rotate your addition tile dispalyed on your pad. Confirm rotation with "confirm rotation" button, click one of green arrows on the board, and click "confirm position" button to shift-in the additional tile on the board. The last tile in the row or column you shifting-in the new tile will be shifted-out and will become your next additional tile. But remember: you can shift tile on board only 5 times - think smartly!
Game is over if you use all your 5 shifts and you will not be able to collected all three numbers and go to castle.
Game is win if you find all three numbers on the board and go to castle using no more than 5 tile shifts.

#Installation
To install the project on your computer, download it. You will need react and react-dom packages to properly edit the project. The project hass been created with sass css preprocessor, gulp, and webpack, therefore it will be usefull to install thesese packages as well.

Please learn a little bit about components:

* **Board.jsx** - the main component of the game - renders the all of the game components and control the game-flow
* **Arrow.jsx** - component representing green arrow for tile-shifting on the board
* **GameOver.jsx** - component representing the "Game Over" information, rendered when player's failure or succes is detected by the Board component
* **Tile.jsx** - component representing a single tile on the board. Tiles are generated and rendered by the board component when Board component is mounted and whenever the tile location is changed on the board
* **Grid.jsx** - component representing a single grid 60px x 60px square on the Tile component. Grids are generated and redered on the Tile component when Board component is mounted or whenever the parent Tile rotation state is changed
* **Player.jsx** - component representing player's sprite on the board. It's position is changing whenever the cursor arrows are pressed on the keyboard
* **PlayerPanel.jsx** - component representing game control panel with rotate buttons, next shifted-in tile and information about how many shift-left and which targets have been already captured by the player.
* **Rotator.jsx** - component representing rotate buttons on the player panel
* **RotateButton.jsx** - component representing single rotate button on the player panel
* **PadButton.jsx** - component representing the single red pad button on the player panel including "confirm rotation" and "confirm position" buttons
* **InfoTable.jsx** - component representing information table on the player panel - it contains information about how many shifts left to end the game, and which targets have been already captured by the player
* **Header.jsx** - component representing header of the website
* **SectionGame.jsx** - component representing section-game o nthe website, here's the board is rendered

#Technical guidance
The horizontal and vertical orientation in the game is possibile due to initialLeft and initialTop props received by the Board component. Default values are respectively 341 and 280 (in px by default), changing the board position on the website will require changing these props values.

The board is built up of 35 Tile components (counted from 0 to 34 from left to right from top to bottom row) placed in 5 rows each containing 7 tiles. Every tile consits of 9 Grid components placed in 3 rows each containing 3 grids. Every gris is 60px x 60px square of one of two types: 0 - obstacle (wall) 1 - way. The player's sprite cannot be located on obstacle grids while it can move freely on way grids. This feature is controlled by collision detection system - read below. 

## Collision detection system

In this game to type of collision detection are applied:
* *A priori* collision detection to prevent collision of player's sprite with obstacles (walls)
* *A posteriori* collision detection to detect collision with targets, player looks for and finish (castle) element

### *A priori* collision detection
*A priori* colision detection detects the collisions before they happen on the board. It prevents player sprite to walk onto the obstacles wall by denying its possibility to move in specified direction if the obstacle is the detected on next sprite's position in this direction. 

This system uses obstacle map which is an objects array in Board component. Every object contains an information about left, right, top, and bottom boundaries of all obstacle grids in subsequent tile. Obstacle map is updated whenever the tile rotation or tile placing on the board is changed.

The algorythm runs whenver an arrow key is pressed by player on the keyboard and depending on which arrow was pressed it checks which obstacle is possible to move on from this direction. then it checks which of these obstacles are located on the tile the player's sprite is currently located on. Subsequently the algorythm checks if the player's sprite is on height (if the left or right arrow is pressed) or on width (if the up or down arrow is pressed) of given obstacle and if so it checks if the next position (which is the current position + 5px) of given player's sprite boundary will be higher then critical obstacle boundary. If so it denies player's sprite move.

For example: if the sprite is located on the left side of obstacle, and player press right arrow, the algorythm detect if bottom boundary of the player's sprite is not higher than top boundary of the obstacle and if the top boundary of the sprite is not higher than bottom boundary of the obstacle. If on of these condition is true it means the player's sprite is on the height of obstacle. Then the algorythm will check if the next right boundary of the sprite (right boundary + 5px) is higher then the left boundary of the obstacle. If so the algorythm will deny the possibility of players sprite to change the location in this direction.

### *A posteriori* collision detection

*A posteriori* collision detection detects the collision after it happens. It allow to detect if the player's sprite is on one of the targets or finish grid (castle). Since the numbers and the finish gird are allways placed in the central grid of tile this algorythm simply checks if the player sprite is on height and on width of one of all central grids on the board. If so the algoryuthm check if the tile is the last tile on the board (which contains finish grid) or one of the tiles containing the targets, player is looking for. If the conditions are true, the collision is detected.

# Licence and Author

Copyright (c) 2017 Przemysław Trzepiński

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.