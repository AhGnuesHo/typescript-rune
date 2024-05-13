import { View, html, on } from "rune-ts";
import { pipe, range, map, toArray} from '@fxts/core';
import {type PlayerViewData} from "../States/State"

interface  SquareViewData extends PlayerViewData{}
export class SquareView extends View<SquareViewData> {

   @on('click', '.square')
   private _click (e: MouseEvent) {
       const currentTarget = e.currentTarget as HTMLElement
       if(currentTarget){
           currentTarget.textContent = this.data.player ? 'o' : 'x';
           this.data.player = !this.data.player;

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



