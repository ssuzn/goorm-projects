export interface IListItem {
    id: string;
    item: string;
    checked: boolean;
}

export default class ListItem implements IListItem {
    
    constructor (
        // 클래스 내부에서만 사용할 필드이기 때문에 _ 처리
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false
    ) { }

    // 각 필드를 가져올 때 사용할 getter, setter
    get id(): string {
        return this._id;
    }

    // id를 업데이트 할 때 사용
    set id(id: string) {
        this._id = id;
    }

    get item(): string {
        return this._item;
    }
    set item(item: string) {
        this._item = item;
    }

    get checked(): boolean {
        return this._checked;
    }
    set checked(checked: boolean) {
        this._checked = checked;
    }
}