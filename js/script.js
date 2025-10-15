//Selectors
const todoInput = document.querySelector( '.todo-input' );
const todoButton = document.querySelector( '.todo-button' );
const todoList = document.querySelector( '.todo-list' );
const filterOption = document.querySelector( '.filter-todo' );

//Event Listeners
document.addEventListener( 'DOMContentLoaded', getTodos );
todoButton.addEventListener( 'click', addTodo );
todoList.addEventListener( 'click', deleteOrCheck );
filterOption.addEventListener( 'click', filterTodo );

//Functions
function addTodo( e ) {
    e.preventDefault();
    console.log( e );
    //Create TODO div
    const todoDiv = document.createElement( 'div' );
    todoDiv.classList.add( "todo" );
    //Create li
    const newTodo = document.createElement( 'li' );
    newTodo.innerText = todoInput.value;
    newTodo.classList.add( "todo-item" );
    todoDiv.appendChild( newTodo );
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos( todoInput.value );
    //Create check mark button
    const completedButton = document.createElement( "button" );
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add( "completed-btn" );
    todoDiv.appendChild( completedButton );
    //Create trash button
    const trashButton = document.createElement( "button" );
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add( "trash-btn" );
    //Append todo to the todoList(ul)
    todoDiv.appendChild( trashButton );
    todoList.appendChild( todoDiv );
    //Clear Todo input value
    todoInput.value = "";
}

function deleteOrCheck( e ) {
    console.log( e.target )
    const item = e.target;
    //DELETE
    if ( item.classList[0] === 'trash-btn' ) {
        const todo = item.parentElement;
        //Animation
        todo.classList.add( 'fall' );
        removeLocalTodos( todo );
        todo.addEventListener( 'transitioned', function () {
            todo.remove();
        } )
    }
    //Check Mark
    if ( item.classList[0] === 'completed-btn' ) {
        const todo = item.parentElement;
        todo.classList.toggle( 'completed' );
    }
}

//Filter functionality
function filterTodo( e ) {
    const todos = Array.from( todoList.children );
    todos.forEach( function ( todo ) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if ( todo.classList.contains( 'completed' ) ) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if ( !todo.classList.contains( 'completed' ) ) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    } );
}

function checkLocalStorage( key ) {
    if ( localStorage.getItem( key ) === null ) {
        return [];
    } else {
        return JSON.parse( localStorage.getItem( key ) );
    }
}
function saveLocalTodos( todo ) {
    //Check if we already have items in localStorage
    let todos;
    todos = checkLocalStorage( 'todos');
    // if ( localStorage.getItem( `${items}`) === null ) {
    //     todos = [];
    // } else {
    //     todos = JSON.parse( localStorage.getItem( `${items}` ) );
    // }
    todos.push( todo );
    localStorage.setItem( 'todos', JSON.stringify( todos ) );
}

function getTodos() {
    //Check if we already have items in localStorage
    let todos;
    todos = checkLocalStorage( 'todos');
    todos.forEach( todo => {
        const todoDiv = document.createElement( 'div' );
        todoDiv.classList.add( "todo" );
        //Create li
        const newTodo = document.createElement( 'li' );
        newTodo.innerText = todo;
        newTodo.classList.add( "todo-item" );
        todoDiv.appendChild( newTodo );
        //Create check mark button
        const completedButton = document.createElement( "button" );
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add( "completed-btn" );
        todoDiv.appendChild( completedButton );
        //Create trash button
        const trashButton = document.createElement( "button" );
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add( "trash-btn" );
        //Append todo to the todoList(ul)
        todoDiv.appendChild( trashButton );
        todoList.appendChild( todoDiv );
    } )

}

function removeLocalTodos( todo ) {
    //Check if we already have items in localStorage
    let todos;
    todos = checkLocalStorage( 'todos');

    const todoIndex = todo.children[0].innerHTML;
    todos.splice( todos.indexOf( todoIndex ), 1 );
    localStorage.setItem( 'todos', JSON.stringify( todos ) );
}