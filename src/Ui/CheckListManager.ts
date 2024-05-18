import { View } from 'rune-ts';
import type { ToggleView } from './ToggleView';
import type { ListView } from './ListView';

export class CheckListManager<IV extends View<object>> {
    constructor(
        public checkAllView: ToggleView,
        public listView: ListView<object, IV>,
        private getItemViewChecked: (itemView: IV) => boolean,
        private setItemViewChecked: (itemView: IV, bool: boolean) => void,
    ) {
        this.checkAllView.data.on = this.isCheckAll();
        this.checkAllView.addEventListener('change', () => this._checkAll());
        this.listView.addEventListener('change', () => this.syncCheck());
    }

    private _checkAll() {
        const { on } = this.checkAllView.data;
        this.listView.itemViews
            .filter((itemView) => this.getItemViewChecked(itemView) !== on)
            .forEach((itemView) => this.setItemViewChecked(itemView, on));
    }

    syncCheck() {
        this.checkAllView.setOn(this.isCheckAll());
    }

    isCheckAll() {
        return this.listView.itemViews.every((itemView) => this.getItemViewChecked(itemView));
    }
}
