import { html, on, View } from 'rune-ts';
import { SwitchView } from '../Ui/SwitchView';
import { ListView } from '../Ui/ListView';
import { each, pipe, zip } from '@fxts/core';
import { CheckableController } from '../Ui/CheckableController';

interface Setting {
    title: string;
    on: boolean;
}

export class SettingItemView extends View<Setting> {
    switchView = new SwitchView(this.data);

    override template() {
        return html`<div>
            <span class="title">${this.data.title}</span>
            ${this.switchView}
        </div>`;
    }
}

export class SettingListView extends ListView<Setting, SettingItemView> {
    override createItemView(item: Setting): SettingItemView {
        return new SettingItemView(item);
    }
}

export class SettingPage extends View<Setting[]> {
    listView = new SettingListView(this.data.map((setting) => ({ ...setting })));
    checkAll = new SwitchView({ on: false });
    getItemViewChecked = (setting: SettingItemView) => setting.data.on;
    setItemViewChecked = (setting: SettingItemView, bool: boolean) => setting.switchView.setOn(bool);

    CheckableController = new CheckableController(this);

    override template() {
        return html`<div>
            <div class="header">
                <h2>Settiing</h2>
                ${this.checkAll}
            </div>
            ${this.listView}
            <div>
                <div class="footer">
                    <button class="reset">Reset</button>
                </div>
            </div>
        </div>`;
    }

    @on('click', '.reset')
    private _reset() {
        const init = this.data;
        const currnet = this.listView.itemViews;
        pipe(
            zip(init, currnet),
            each(([{ on }, itemView]) => itemView.switchView.setOn(on)),
        );
    }
}
