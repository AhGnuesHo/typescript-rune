import { View, html, on } from "rune-ts";
import { pipe, range, map, toArray} from '@fxts/core';
import type { StateView, stateViewData } from '../States/State';

interface  SquareViewData extends stateViewData {
    changeCurrentPlayer : (player : boolean) => void;
}
export class SquareView extends View<SquareViewData> {
    private nextPlayer =  this.data.playerState;
   @on('click', '.square')
   private _click (e: MouseEvent) {
       const currentTarget = e.currentTarget as HTMLElement
       if(currentTarget){
           this.data.changeCurrentPlayer(this.nextPlayer);
           this.nextPlayer = !this.nextPlayer;
           currentTarget.textContent = this.nextPlayer ? 'o' : 'x';

           this.element().dispatchEvent(new Event('change', {bubbles : true}))
       }
   }

    override template() {
        return html`<div>
        <div class="squareWrap">
            ${pipe(
                range(0, 9),
                map((v) => html`<div class=square></div>`),
                toArray,
            )}
        </div>
        </div>`;
    }
}



