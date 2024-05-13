import { html, View } from 'rune-ts';
export type RuneAlert = {
    name: string;
    message: string;
};
export class AlertView extends View<RuneAlert> {
    override template({ name }: RuneAlert) {
        return html` <button type="button">${name}</button>`;
    }

    override onRender() {
        this.element().addEventListener('click', () => {
            alert(this.data.message);
        });
    }
}
