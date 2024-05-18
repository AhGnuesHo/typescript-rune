import { View } from 'rune-ts';
import type { ToggleView } from './ToggleView';
import type { ListView } from './ListView';

export interface CheckableViewInterface<IV extends View<object>> {
    checkAll: ToggleView;
    listView: ListView<object, IV>;
    getItemViewChecked(itemView: IV): boolean;
    setItemViewChecked(itemView: IV, bool: boolean): void;
}

export class CheckableController<IV extends View<object>> {
    constructor(public view: CheckableViewInterface<IV>) {
        this.view.checkAll.data.on = this.isCheckAll();
        this.view.checkAll.addEventListener('change', () => this._checkAll());
        this.view.listView.addEventListener('change', () => this.syncCheck());
    }

    private _checkAll() {
        const { on } = this.view.checkAll.data;
        this.view.listView.itemViews
            .filter((itemView) => this.view.getItemViewChecked(itemView) !== on)
            .forEach(
                (itemView) => this.view.setItemViewChecked(itemView, on),
                // setting.switchView.setOn(on)
            );
    }

    syncCheck() {
        this.view.checkAll.setOn(this.isCheckAll());
    }

    isCheckAll() {
        return this.view.listView.itemViews.every((itemView) => this.view.getItemViewChecked(itemView));
    }
}
