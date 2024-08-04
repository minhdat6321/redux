import React from 'react'
import TodoAdd from './TodoAdd'
import TodoList from './TodoList'
import TodoFilterButtons from './TodoFilterButtons'

function Todo() {
  return (
    <div>
      <TodoAdd />
      <TodoList />
      <TodoFilterButtons />

    </div>
  )
}

export default Todo
