const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = { 
       id: new Date().getTime(), // unique id
       text: '',
       complete: false
    }

    // 배열 처음에 새로운 아이템 추가
    todos.unshift(item);

    // 요소 생성하기
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl); // list element의 1번째 자식으로 itemEl 추가. 앞쪽으로 todo 추가됨

    inputEl.removeAttribute('disabled');
    inputEl.focus();     

    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div'); // div element element 생성
    itemEl.classList.add('item'); // class name 'item' 추가

    const checkboxEl = document.createElement('input'); // input element 생성
    checkboxEl.type = 'checkbox'; // type='checkbox'로 설정
    checkboxEl.checked = item.complete; // checkboxEl checked property를 item object complete property로 update

    if (item.complete) {
        itemEl.classList.add('complete'); // class name 'complete' 추가
    }

    const inputEl = document.createElement('input'); // input element 생성
    inputEl.type = 'text'; // type='text'로 설정
    inputEl.value = item.text; // input element value 설정
    inputEl.setAttribute('disabled', ''); // disabled attribute 추가

    const actionEl = document.createElement('div');
    actionEl.classList.add('actions');

    const editBtnSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
        <path fill="#000000" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
    </svg>
    `;
    const editBtnEl = document.createElement('button');
    editBtnEl.innerHTML = editBtnSVG;

    const removeBtnSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
        <path fill="#000000" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
    `;
    const removeBtnEl = document.createElement('button');
    removeBtnEl.innerHTML = removeBtnSVG;    


    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked; // checkboxEl checked property를 item object complete property로 update
        
        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }

        saveToLocalStorage();
    });
    
    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', ''); // disabled attribute 추가
        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value; // inputEl value를 item object text property로 update
    });

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled'); 
        inputEl.focus(); // inputEl focus
    });

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id); // todos array에서 item.id와 일치하는 todo item 제거

        itemEl.remove(); 
        saveToLocalStorage();
    });

    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.append(checkboxEl, inputEl, actionEl);

    return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos); // todos array를 JSON string으로 변환

    localStorage.setItem('my_todos', data); // localStorage에 todos data 저장
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos'); // localStorage에서 todos data 가져오기

    if (data) {
        todos = JSON.parse(data); // JSON string을 todos array로 변환
    }
}

function displayTodos() {
    loadFromLocalStorage(); // localStorage에서 todos data 로드

    for (let i = 0; i < todos.length; i++) { 
        const item = todos[i];
        const { itemEl } = createTodoElement(item); // createTodoElement() 함수로 item element 생성
        list.append(itemEl);
    }
}

displayTodos(); 