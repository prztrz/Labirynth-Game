import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class GameOver - represents 'Game Over' information
 * 
 * @method reload - reload page to play again
 *
 */

class GameOver extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isGameOver: this.props.isGameOver,
            isWin: this.props.isWin
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.isGameOver !== nextProps.isGameOver) {
            this.setState({isGameOver: nextProps.isGameOver})
        }

        if (this.state.iswin !== nextProps.isWin) {
            this.setState({iswin: nextProps.isWin})
        }
    }

    reload = (e) => {
        e.preventDefault();
        console.log(window.location.reload())
    }
    render(){
        if (this.state.isGameOver){
            return(
                <div className='game-over'>
                    <div className='box'>
                        <h2>Game Over</h2>
                        <p>You ran out of shifts!</p>
                        <p><a href='#' onClick={this.reload}>Try again?</a></p>
                    </div>
                </div>
            );
        }
        if (this.state.isWin) {
            return(
                <div className='game-over'>
                    <div className='box'>
                        <h2>You Win!</h2>
                        <p><a href='#' onClick={this.reload}>Try again?</a></p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export {GameOver}