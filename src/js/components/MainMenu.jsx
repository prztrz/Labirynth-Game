import React from 'react';
import ReactDOM from 'react-dom';

import {Tile} from './Tile.jsx';

import	{Link}	from	'react-router';

class MainMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeLink: 0
        }
    }

    componentWillMount() {
        document.addEventListener('keydown', this.switchActiveLink)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.switchActiveLink)
    }

    switchActiveLink = (e) => {
        let activeLink = this.state.activeLink;

        if (e.target !== document.querySelector('body')) {
            this.setState({
                activeLink: parseInt(e.target.dataset.order)
            })
        } else {        
            if (e.key === 'ArrowDown') {
                activeLink === 2 ? activeLink = 0 : activeLink +=1;

                this.setState({
                    activeLink: activeLink
                })
                
            }

            if (e.key === 'ArrowUp') {
                activeLink === 0 ? activeLink = 2 : activeLink -=1;

                this.setState({
                    activeLink: activeLink
                })
            }

            if (e.key === 'Enter') {
                this.goToOtherComponent();
            }
        }
    }

    goToOtherComponent() {
        switch (this.state.activeLink) {
            case 0:
                window.location.assign(window.location.toString() + 'game')  
            break;

            case 1:
                window.location.assign(window.location.toString() + 'tutorial') 
            break;

            case 2:
                window.location.assign(window.location.toString() + 'author') 
            break;
        }
    }

    render(){
        return(
            <section className='section-main-menu'>
                <div className="container">
                    <header className='main-menu-header clearfix'>
                        <Tile isNewOnBoard={false} isDisplayed={true} index="last" shape="turn" rotation={0} treasure="L" />
                        <Tile isNewOnBoard={false} isDisplayed={true} index="last" shape="tShape" rotation={0} treasure="O" />
                        <Tile isNewOnBoard={false} isDisplayed={true} index="last" shape="straight" rotation={1} treasure="G" />
                        <Tile isNewOnBoard={false} isDisplayed={true} index="last" shape="tShape" rotation={2} treasure="I" />
                        <Tile isNewOnBoard={false} isDisplayed={true} index="last" shape="turn" rotation={1} treasure="C" />
                    </header>
                    <nav className="main-menu-nav">
                        <ul>
                            <li className={this.state.activeLink === 0 && 'active'} onMouseEnter={this.switchActiveLink} data-order={0}><Link to='/game' data-order={0}>Start new game</Link></li>
                            <li className={this.state.activeLink === 1 && 'active'} onMouseEnter={this.switchActiveLink} data-order={1}><Link to="/tutorial" data-order={1}>Rules</Link></li>
                            <li className={this.state.activeLink === 2 && 'active'} onMouseEnter={this.switchActiveLink} data-order={2}><Link to="/tutorial" data-order={2}>Author</Link></li>
                        </ul>
                    </nav>
                </div>

                <footer className="main-menu-footer">
                    <small>Przemysław Trzepiński &copy; 2017. <a href='https://opensource.org/licenses/MIT' target="_blank">MIT licence</a> - use it however you want, just don't claim you are an author, please!</small>
                </footer>
            </section>
        );
    }
}

export {MainMenu}