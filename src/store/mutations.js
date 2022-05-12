export default {
    addTodo(state, data){
        state.todos.push(data)
    },
    deleteTodo(state, data){
        state.todos.splice(
            state.todos.findIndex(item=> item.id == data), 1
        )
    },
    toggleCompletedTodo(state, id){
        state.todos.map(todo=>{
            if(todo.id == id){
                todo.completed = !todo.completed
            }
        })
    },
}