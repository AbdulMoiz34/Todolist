(() => {
    const todoInp = document.querySelector(".search-input");
    const todoForm = document.querySelector(".form");
    const todoListContainer = document.querySelector(".todo-list-container");

    const setInLS = () => {
        const prevList = localStorage.getItem("todos");
        const todos = prevList ? JSON.parse(prevList) : [];
        let val = todoInp.value;
        if (val.trim()) {
            todos.push(val);
            const updatedTodo = todos.filter((todo) => {
                if (todo) {
                    return todo;
                }
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodo));
            displayTodoList();
        } else {
            alert("please enter something.");
        }
        todoInp.value = "";
    }

    const displayTodoList = () => {
        const prevList = localStorage.getItem("todos");
        const todos = prevList ? JSON.parse(prevList) : [];
        console.log(todos);
        todoListContainer.innerHTML = "";
        todos.map((todo, index) => {
            if (!todo) return;
            const li = document.createElement("li");
            li.innerHTML = `${todo}
                <span class="delBtn">&times;</span>
                <button class="editBtn">Edit</button>`;
            todoListContainer.appendChild(li);

            li.querySelector(".delBtn").addEventListener("click", () => {
                li.remove();
                delete todos[index];
                localStorage.setItem("todos", JSON.stringify(todos));
            });

            li.querySelector(".editBtn").addEventListener("click", () => {
                const newTodo = prompt("Enter new Value.", todo);
                if (newTodo !== null && newTodo.trim()) {
                    todos[index] = newTodo;
                    localStorage.setItem("todos", JSON.stringify(todos));
                    displayTodoList();
                }
            });
        });
    }
    displayTodoList();
    todoForm.addEventListener("submit", e => { e.preventDefault(); setInLS() });
})();