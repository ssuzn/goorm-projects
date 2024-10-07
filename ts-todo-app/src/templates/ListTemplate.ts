import List from "../models/List";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: List): void;
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;

    // 싱글톤 적용
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("list") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }

    render(fullList: List): void {
        this.clear(); // 원래 있던 HTML 지워주고 시작

        fullList.list.forEach((item) => {
            const liEl = document.createElement("li") as HTMLLIElement;
            liEl.className = "item";

            const checkEl = document.createElement("input") as HTMLInputElement;
            checkEl.type = "checkbox";
            checkEl.checked = item.checked;
            checkEl.id = item.id;
            liEl.append(checkEl); // check는 liEl 안에 들어있음

            checkEl.addEventListener("change", () => {
                item.checked = !item.checked;
                fullList.save(); // fullList가 List의 인스턴스이므로 save()로 로컬 스토리지에 저장 
            })

            const labelEl = document.createElement("label") as HTMLLabelElement;
            labelEl.htmlFor = item.id;
            labelEl.textContent = item.item;
            liEl.append(labelEl);

            const buttonEl = document.createElement("button") as HTMLButtonElement;
            buttonEl.textContent = "X";
            buttonEl.className = "button";
            liEl.append(buttonEl);

            buttonEl.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList); // 삭제하고 render() 함수를 다시 호출
            })

            this.ul.append(liEl); // ul 안에 liEl 넣어주기
        })
    }
 }