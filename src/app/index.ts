import './style.styl';
import { SquareView } from '../components/cells/Squares/Square';
import { PlayerView } from '../components/cells/States/State';
import { html, View } from 'rune-ts';

interface HomeViewData{
    initPlayerState : boolean
}

export class HomeView extends View<HomeViewData> {
    private playerView = new PlayerView({
        player : this.data.initPlayerState});

    private squareView = new SquareView({
        player : this.data.initPlayerState
    });

    override template() {
        return html`<div>
            ${this.playerView}
            ${this.squareView}
        </div>`;
    }

     override onMount() {
        this.squareView.addEventListener('change',
            () => this.playerView.change())
    }
}

document.body.appendChild(new HomeView({initPlayerState : true}).render());
