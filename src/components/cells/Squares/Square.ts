import { View, html, on } from 'rune-ts';
import { pipe, range, map, toArray, find } from '@fxts/core';
import { type PlayerViewData } from '../Palyers/Player';

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

interface SquareViewData extends PlayerViewData {}
export class SquareView extends View<SquareViewData> {
    @on('click', '.square')
    private _click(e: MouseEvent) {
        this._updateState(e);
        this._checkWin(e);
    }

    private _updateState(e: MouseEvent) {
        const currentTarget = e.currentTarget as HTMLElement;
        if (currentTarget) {
            currentTarget.classList.add(this.data.player ? 'add_o' : 'add_x');
            this.data.player = !this.data.player;

            this.element().dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    private _checkWin(e: MouseEvent) {
        const progress = pipe(
            this.element().querySelectorAll('.square'),
            map((el) => (el.classList.contains('add_o') ? true : el.classList.contains('add_x') ? false : '')),
            toArray,
        );
        const currentPlayerState = !this.data.player;

        const isWin = pipe(
            winning_combinations,
            find(
                ([a, b, c]) =>
                    progress[a] === currentPlayerState &&
                    progress[b] === currentPlayerState &&
                    progress[c] === currentPlayerState,
            ),
        );

        if (isWin) {
            alert(`${currentPlayerState ? 'o' : 'x'} 승리`);
        }
    }

    override template() {
        return html`<div>
            <div class="squareWrap">
                ${pipe(
                    range(0, 9),
                    map((v) => html`<div class="square"></div>`),
                    toArray,
                )}
            </div>
        </div>`;
    }
}
