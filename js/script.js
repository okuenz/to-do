export function createAppTitle() {
    const title = document.createElement("h1");
    title.textContent = "Список задач";
    return title;
}

export function createTodoItemForm(addTodoItem) {
    const form = document.createElement("form");
    form.className = "input-group mb-3";

    const input = document.createElement("input");
    input.className = "form-control";
    input.placeholder = "Введите новое дело";

    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.textContent = "Добавить дело";
    button.type = "submit";

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            input.value = "";
        }
    });

    return form;
}

export function createTodoList() {
    const list = document.createElement("ul");
    list.className = "list-group";
    return list;
}

export function createTodoItem(task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Удалить";
    deleteButton.onclick = function() {
        li.remove();
    };

    li.appendChild(deleteButton);
    return li;
}


// сохранение задач в localStorage
export function saveTasks(list) {
    const tasks = [];
    list.querySelectorAll("li").forEach(item => {
        tasks.push(item.firstChild.textContent);
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// функ для задач из localStorage
export function loadTasks(list, createTodoItem) {
    const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    tasks.forEach(task => {
        const todoItem = createTodoItem(task, list, () => saveTasks(list));
        list.appendChild(todoItem);
    });
}

// инициализация 
export function initTodoApp(container) {
    const appTitle = createAppTitle();
    const todoItemForm = createTodoItemForm((task) => {
        const todoItem = createTodoItem(task, todoList, () => saveTasks(todoList));
        todoList.appendChild(todoItem);
        saveTasks(todoList);
        
    });
    const todoList = createTodoList();

    container.appendChild(appTitle);
    container.appendChild(todoItemForm);
    container.appendChild(todoList);

    // загрузка задач из localStorage при инициализации
    loadTasks(todoList, createTodoItem);
}
