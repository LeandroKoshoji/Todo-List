const addTodoForm = document.querySelector('.add-todo-form')
const searchTodoForm = document.querySelector('.search-todo-form')
const showSearchInputButton = document.querySelector('.show-search-form-button')
const todoContainer = document.querySelector('.todo')


const insertTodoIntoDom = inputValue => {
    todoContainer.innerHTML += `
        <li class="todo-item">
            <i class="fas fa-check"></i>
            <span>${inputValue}</span> 
            <i class="fas fa-trash-alt"></i>
        </li>
        `
}

const searchTodo = (todos, inputValue) => {
    todos.forEach(li => {
        const isTodoNotIncludesSearchValue =      
            !li.innerText.toLowerCase().includes(`${inputValue}`)
    
            li.style.display = isTodoNotIncludesSearchValue ? 'none' : 'flex'
    })
}

const handleTodoButtons = clickedEl => {
    const isTrashButton = clickedEl.classList.contains('fa-trash-alt')
    const isCheckButton = clickedEl.classList.contains('fa-check')

    if(isTrashButton) {
        clickedEl.parentElement.remove('')
        return
    }

    if(isCheckButton) {
        clickedEl.nextElementSibling.style.textDecoration = 'line-through'
        clickedEl.nextElementSibling.style.fontStyle = 'italic'
        clickedEl.nextElementSibling.style.fontSize = '1rem'
        return
    }
}

addTodoForm.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.addTodo.value.trim()

    if(inputValue){
        insertTodoIntoDom(inputValue)
        addTodoForm.reset()
        return
    } 
})

searchTodoForm.addEventListener('input', event => {
    event.preventDefault()

    const todos = document.querySelectorAll('.todo-item')
    const inputValue = event.target.value.trim().toLowerCase()
    
    searchTodo(todos,inputValue)
})

todoContainer.addEventListener('click', event => {
    const clickedEl = event.target

    handleTodoButtons(clickedEl)
})

showSearchInputButton.addEventListener('click', ()=> {
    searchTodoForm.classList.toggle('invisible')   
})