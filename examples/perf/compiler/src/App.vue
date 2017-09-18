<template>
  <div id="app">
    <ul>
      <li v-for="(todo, index) in todos" >
        {{ todo.title }}<button @click="removeTodo(index)" v-t="{ path: 'label' }"></button>
      </li>
    </ul>
  </div>
</template>

<script>
  const items = []
  for (let i = 1; i <= 1000; i++) {
    items.push({
      id: i,
      title: 'todo ' + i.toString()
    })
  }

  export default {
    name: 'app',
    data () {
      return {
        todos: items,
        nextTodoId: items.length
      }
    },
    methods: {
      addNewTodo () {
        const id = this.nextTodoId++
        this.todos.push({
          id,
          title: 'todo ' + id.toString()
        })
      },
      removeTodo (index) {
        this.todos.splice(index, 1)
      }
    }
  }
</script>
