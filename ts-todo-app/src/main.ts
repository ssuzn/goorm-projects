// 데이터 로드하고 화면에 데이터 그려주기
import List from "./models/List.ts";
import ListItem from "./models/ListItem.ts";
import ListTemplate from "./templates/ListTemplate.ts";

const initApp = () => {
  console.log("init!");

  const listInstance = List.instance;
  const listTemplateInstance = ListTemplate.instance;
  
  const itemForm = document.getElementById('form') as HTMLFormElement;
  itemForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault(); // submit 이벤트 발생 시 리프레사 되는 것 막아주기

    // 새 item Text
    const inputEl = document.getElementById('item-input') as HTMLInputElement;
    const newText = inputEl.value.trim(); // trim 으로 띄어쓰기 없애주기
    if (!newText.length) return; // text 없는 상태로 버튼 누르면 리턴
    inputEl.value = "";

    // 새 item ID
    // list가 비어있으면 id 1로 주고
    // list 비어있지 않으면 마지막 인덱스의 id에서 +1 로 부여
    const itemId: number = listInstance.list.length 
    ? parseInt(listInstance.list[listInstance.list.length - 1].id) + 1 
    : 1

    // new item 생성하기
    const newItem = new ListItem(itemId.toString(), newText);
    listInstance.addItem(newItem); // list에 item 추가

    listTemplateInstance.render(listInstance);
  })

  const clearItemsEl = document.getElementById("clear-items-btn") as HTMLButtonElement;
  clearItemsEl.addEventListener("click", () => {
    listInstance.clearList(); // list clear
    listTemplateInstance.render(listInstance); // render
  })

  // 초기 데이터 load하기
  listInstance.load();
  // 생성된 데이터 이용해서 화면에서 보여주기
  listTemplateInstance.render(listInstance);
}

initApp();