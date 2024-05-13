import { html, View } from 'rune-ts';

interface PlayerViewData {
    text :string
}

export interface stateViewData {
    playerState : boolean
}

export class PlayerView extends View<PlayerViewData> {
    override template(){
        return html`<span class="player">${this.data.text}</span>`
    }
}

export class StateView extends View<stateViewData>{
    override template(){
        return html`
        <div>${new PlayerView({
            text : `${this._formettedPlayer(this.data.playerState)} 차례`
        })}</div>
        `
    }

    _formettedPlayer(playerState : boolean){
        return playerState ? 'o' : 'x';
    }

    public changePlayer = (nextPlayer : boolean ) => {
        const elem = this.element();
        if(elem) {
            elem.replaceChildren(
                new PlayerView({
                    text : `${this._formettedPlayer(nextPlayer)} 차례`
                }).render()
            )
        }
    }
}

