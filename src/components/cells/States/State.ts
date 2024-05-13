import { html, View } from 'rune-ts';

export interface PlayerViewData {
    player :boolean
}


export class PlayerView extends View<PlayerViewData> {
    override template(){
        return html`<span class="player ${this.data.player ? 'on' : ''}"></span>`
    }
    change(){
        this.element().classList.toggle('on')
    }
}


