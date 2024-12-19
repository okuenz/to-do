
import { createAppTitle,  
    createTodoItemForm,  
    createTodoList,  
    createTodoItem, 
    initTodoApp } from '/js/script.js'; 
 
document.addEventListener('DOMContentLoaded', function () { 
    const app = document.getElementById('app'); 

    // initTodoApp для инициализации
    initTodoApp(app); 

    
    // задачи в списке
    addTodoItem("купить кота");
    addTodoItem("купить хлеб");
    addTodoItem("выгулять собаку");
})


