import { html, on, View } from 'rune-ts';
import { ListView } from '../Ui/ListView';
import { CheckView } from '../Ui/CheckView';
import { CheckListManager } from '../Ui/CheckListManager';

interface Todo {
    title: string;
    completed: boolean;
}
export class TodoItemView extends View<Todo> {
    private checkView = new CheckView({ on: this.data.completed });
    override template() {
        return html` <div>
            ${this.checkView}
            <span class="title">${this.data.title}</span>
            <button class="remove">x</button>
        </div>`;
    }

    @on('change')
    private _sync() {
        this.data.completed = this.checkView.data.on;
    }

    setCompleted(on: boolean) {
        this.data.completed = on;
        this.checkView.setOn(on);
    }
}

export class TodoListView extends ListView<Todo, TodoItemView> {
    createItemView(item: Todo): TodoItemView {
        return new TodoItemView(item);
    }
}

export class TodoPage extends View<Todo[]> {
    checkListManager = new CheckListManager(
        new CheckView({ on: false }),
        new TodoListView(this.data),
        (todo) => todo.data.completed,
        (todo, bool: boolean) => todo.setCompleted(bool),
    );

    override template() {
        return html`
            <div>
                <div class="header">
                    ${this.checkListManager.checkAllView}
                    <input type="text" />
                </div>
                ${this.checkListManager.listView}
            </div>
        `;
    }

    @on('keypress')
    private _keypress(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            const input = e.target as HTMLInputElement;
            this.checkListManager.listView.append({
                title: input.value,
                completed: false,
            });

            input.value = '';
        }
    }
}
