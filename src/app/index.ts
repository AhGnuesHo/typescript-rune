import './style.styl';
import { AlertView } from '../components/cells/Alerts/Alert';
import {  SquareView } from '../components/cells/Squares/Square';
import {  StateView } from '../components/cells/States/State';
import { html, View } from 'rune-ts';


interface HomeViewData{
    initPlayerState : boolean
}

export class HomeView extends View<HomeViewData> {
    private stateView = new StateView({playerState : this.data.initPlayerState});
    private squareView = new SquareView({
        playerState : this.data.initPlayerState,
        changeCurrentPlayer : this.stateView.changePlayer
    });

    override template() {
        return html`<div>
            ${this.stateView}
            ${this.squareView}
        </div>`;
    }
}


const homeView = new HomeView({initPlayerState : true});

document.body.appendChild(homeView.render());
