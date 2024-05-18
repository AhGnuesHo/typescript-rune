import { html, View } from 'rune-ts';

export interface PlayerViewData {
    player: boolean;
}

export class PlayerView extends View<PlayerViewData> {
    override template() {
        return html`<span class="player ${this.data.player ? 'add_o' : ''}">차례</span>`;
    }
    change() {
        this.element().classList.toggle('add_o');
    }
}
