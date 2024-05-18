import './style.styl';
import { SquareView } from '../components/cells/Squares/Square';
import { PlayerView } from '../components/cells/Palyers/Player';
import { html, View, on } from 'rune-ts';
import { TodoPage } from '../components/TodoPage';
import { SettingPage } from '../components/SettingPage';

interface HomeViewData {
    initPlayerState: boolean;
}

export class HomeView extends View<HomeViewData> {
    private playerView = new PlayerView({
        player: this.data.initPlayerState,
    });

    private squareView = new SquareView({
        player: this.data.initPlayerState,
    });

    override template() {
        return html`<div>${this.playerView} ${this.squareView}</div>`;
    }

    override onMount() {
        this.squareView.addEventListener('change', () => this.playerView.change());
    }
}

const todos = [
    { title: '코딩', completed: true },
    { title: '식사', completed: true },
    { title: '회의', completed: true },
];

const settings = [
    { title: 'Wi-fi', on: false },
    { title: 'Bluetooth', on: true },
    { title: 'Airdrop', on: true },
];

// document.body.appendChild(new HomeView({initPlayerState : true}).render());
document.body.appendChild(new SettingPage(settings).render());
document.body.appendChild(new TodoPage(todos).render());
