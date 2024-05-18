import { View } from 'rune-ts';

export class ToggleView extends View<{ on: boolean }> {
    override onMount() {
        this.element().addEventListener('click', () => this._toggle());
    }

    private _toggle() {
        this.setOn(!this.data.on);
        this.element().dispatchEvent(new Event('change', { bubbles: true }));
    }

    setOn(on: boolean) {
        this.data.on = on;
        this.element().classList.toggle('on', on);
    }
}
