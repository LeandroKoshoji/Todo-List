const inputForm = document.querySelector('.form-input')
const todoList = document.querySelector('.todo-list')
const searchForm = document.querySelector('.form-search')


const insetToDoIntoList = inputValue => {
    if(inputValue.length){
        todoList.innerHTML += 
            `<li data-todo="${inputValue}">
                <span>${inputValue}</span>
                <div class="icons">
                    <i class="fas fa-check check" data-check="${inputValue}"></i>
                    <i class="fas fa-trash-alt delete" data-trash="${inputValue}"></i>
                </div>
            </li>    
            `
    }
}

inputForm.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.todoInput.value.trim()

    insetToDoIntoList(inputValue)
    
    event.target.reset()
})

const removeToDoFromDOM = isDeleteIncluded => {
    if(isDeleteIncluded){
        const dataTrash = event.target.dataset.trash
        const dataTodo = document.querySelector(`[data-todo="${dataTrash}"]`)
        dataTodo.remove() 
    }
}

const addCheckedStyle = isCheckIncluded => {
    if(isCheckIncluded) {
        const dataCheck = event.target.dataset.check
        const dataTodo = document.querySelector(`[data-todo="${dataCheck}"]`)
        dataTodo.style.fontStyle = 'italic'
        dataTodo.style.textDecoration ='line-through'
    }
}

todoList.addEventListener('click', event => {
    const liClassList = event.target.classList
    const isCheckIncluded = Array.from(liClassList).includes('check')
    const isDeleteIncluded = Array.from(liClassList).includes('delete')

    addCheckedStyle(isCheckIncluded)
    removeToDoFromDOM(isDeleteIncluded)
})

const filterToDo = (todos, searchedValue) => {
    todos.forEach(li => {
        const checkToDoContent = !li.textContent.toLowerCase().includes(searchedValue)
        checkToDoContent ? li.style.display = 'none' :li.style.display = 'flex'
    })
}

searchForm.addEventListener('input', event => {
    const searchedValue = event.target.value.toLowerCase().trim()
    const todos = Array.from(todoList.children)

    filterToDo(todos, searchedValue)
})