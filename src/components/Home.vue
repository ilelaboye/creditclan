<template>
    <div class="main">
        <div class="header" id="header"></div>
        <div class="body-wrapper">
            <div class="body-content">
                <div class="title d-flex justify-content-between align-items-center">
                    <h5>TODO</h5>
                    <img class="icon-moon" src="assets/img/icon-moon.svg" alt="" @click="toggleDarkMode()">
                    <img class="icon-sun" src="assets/img/icon-sun.svg" alt="" @click="toggleDarkMode()">
                </div>
                <div class="todo-form">
                    <form @submit.prevent="addTodo()">
                        <div class="input-wrapper">
                            <div class="circle"></div>
                            <input type="text" class="form-input" placeholder="Create a new todo" v-model="description">
                        </div>
                        <input type="submit" class="d-none">
                    </form>
                </div>
                <div class="todos">
                    <ul class="px-0" id="sortlist" >
                        <li class="todo-item" v-for="(todo,index) in totalTodos" :key="index">
                            <label class="check-todo">
                                <input type="checkbox" :checked="todo.completed" @change="toggleCompletedTodo(todo.id)">
                                <span class="checkmark"></span>
                            </label>
                            <div class="todo-content">
                                <p :class="todo.completed?'todo-completed':''">{{ todo.description }}</p>
                                <button class="todo-btn" @click="deleteTodo(todo.id)">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <p class="alert alert-info" v-if="todos.length < 1">No available todos</p>
                    <div class="todo-footer">
                        <span> {{ totalActiveTotal }} items left</span>
                        <div class="filter d-none d-lg-inline">    
                            <a href="" class="active" @click.prevent="setFilter('all')">All</a>
                            <a href="" @click.prevent="setFilter(false)">Active</a>
                            <a href="" @click.prevent="setFilter(true)">Completed</a>
                        </div>
                        <a href="javascript:void" @click.prevent="clearCompleted()"> Clear Completed</a>
                    </div>
                </div>

                <div class="filter-card d-flex d-lg-none mt-4">
                    <div class="filter-links">
                        <a href="" class="active">All</a>
                        <a href="">Active</a>
                        <a href="javascript:void" @click.prevent="">Completed</a>
                    </div>
                </div>
            </div>

            <p class="foot-note text-center">
                Drag and drop to reorder list
            </p>
        </div>
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'HomePage',
    computed:{
        ...mapState({
            todos: (context) => context.todos,
        }),
        totalActiveTotal: function() {
            var active = this.todos.filter(todo => todo.completed == false)
            return active.length;
        },
        totalTodos: function() {
            if(this.search == 'all') return this.todos

            return this.todos.filter(todo =>{
                return todo.completed == this.search
            })
        },
    },
    data(){
        return {
            checked:true,
            description: '',
            search:'all',
        }
    },
    methods: {
        setFilter(value){
            this.search = value
        },
        toggleCompletedTodo(id){
            this.$store.commit('toggleCompletedTodo', id)
            console.log(this.todos)
        },
        clearCompleted(){
            this.todos.forEach(todo=>{
                if(todo.completed){
                    this.todos.splice(
                        this.todos.findIndex((item)=> item.id == todo.id), 1
                    )
                }
            })
        },
        addTodo(){
            const todo = {
                description: this.description,
                id:Math.random().toString(36).slice(2),
                completed: false
            }
            this.$store.commit('addTodo', todo)
            this.description = ''
        },
        deleteTodo(id){
            this.$store.commit('deleteTodo', id)
        },
        toggleDarkMode(){
            document.body.classList.toggle('darkMode')
        }
    },
}
</script>

<style scoped>
    .filter-card{
        background:#fff;
        border-radius: 7px;
        width:100%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        justify-content: center;
        padding:20px 0;
    }
    .filter-card a{
        text-decoration: none;
        color: #80808069;
        margin-left: 15px;
        font-size: 17px;
    }
    .todo-completed{
        text-decoration: line-through;
        text-decoration-color: #80808069;
        color: #80808069;
    }
</style>
