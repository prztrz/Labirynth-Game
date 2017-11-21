import React from 'react';
import ReactDOM from 'react-dom';
require('../css/app.scss')


document.addEventListener('DOMContentLoaded', function(){

 

    class Tile extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                shape: this.props.shape, // turn, straight, tShape
                rotation: this.props.rotation, // 0-4
                grid: [[],[],[]] //0 - brick 1- way
            }
            console.log('dwdwd')

        }

        componentDidMount() {
            this.buildTile();
        }

        componentWillReceiveProps() {
            console.log('willrecieve props:')
            this.setState({
                rotation: this.props.rotation
            }, this.buildTile());
            //this.buildTile();
           // console.log('ROTATION in STATE', this.state.rotation)
        }

        buildTile() {
            console.log('BUILD TILE: STATE.ROTATION')
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
        render(){
            const grid = [];

            this.state.grid.forEach(row => {
                let mappedRow = row.map((el,i) => {
                    return <div className="game-grid" style={{backgroundColor: `${el === 0 ? `rgba(255,0,0,1)` : `rgba(0,255,0,0.5)` }`}}>{el}</div>;
                })

                grid.push(mappedRow);
            })
            
            switch (this.state.shape) {
                case "straight":

                break;

                case "straight":
                break;

                case "straight":
                break;
            }
            return(
                <div className="game-tile clearfix">
                    {grid}
                </div>
            );
        }
    }

  class Row extends React.Component {
      render(){
          return(
              <div className="clearfix">
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
              </div>
          );
      }
  }

    class Board extends React.Component {
        render(){
            return(
                <div>
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                    <Row />
                </div>
            );
        }
    }

    class App extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                rot: 0
            }
        }

        componentDidMount() {
            this.interval = setInterval(() => {
                if (this.state.rot === 4) {
                    clearInterval(this.interval)
                }
                this.setState({rot: this.state.rot + 1})
            },2000)
        }
        render(){
            console.log('rotation', this.state.rot)
            return(
                <Tile shape="tShape" rotation={this.state.rot} />
            );
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});