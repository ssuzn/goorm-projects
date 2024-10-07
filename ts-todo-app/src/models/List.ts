import storage from "../utils/storage";
import ListItem, { IListItem } from "./ListItem";

export interface IList {
    list: IListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: IListItem): void;
    removeItem(id: string): void;
}

// contructor에 private 붙이면 클래스 선언 내에서만 액세스 가능
export default class List implements IList {

    static instance = new List();

    private constructor (
        private _list: IListItem[] = [] // 기본값은 빈 배열
    ){ }

    get list(): IListItem[] {
        return this._list;
    }

    load(): void {
        // const storedList: string | null = localStorage.getItem('myList');

        // if (typeof storedList !== 'string') return;

        // // 데이터 있으면 parse로 객체 타입으로 변경
        // const parsedList: {
        //     _id: string,
        //     _item: string,
        //     _checked: boolean
        // }[] = JSON.parse(storedList);

        // localstorage wrapper 사용하여 변경
        const parsedList = storage.get<{
            _id: string,
            _item: string,
            _checked: boolean
        }[]>('myList')

        // listItem 인스턴스 객체 생성 => list 인스턴스 객체에 넣어주기
        // listItem 인스턴스 객체 생성
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._item,
                itemObj._checked
            )

            // list 인스턴스 객체에 넣어주기
            List.instance.addItem(newListItem);
        })
        
    }

    save(): void {
        // listItem 인스턴스 객체를 JSON.stringify로 문자열로 변환하여 저장
        // localStorage.setItem('myList', JSON.stringify(this._list));
        
        storage.set('myList', this._list);
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: IListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}
