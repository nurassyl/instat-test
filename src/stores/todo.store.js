// @flow

import { observable, computed } from 'mobx'

// Type
type TodoType = {
	name: string,
	completed: boolean,
}

type TodoStoreType = {
	todos: Array<TodoType>,
	+createTodo: any,
	+changeName: any,
	+complete: any,
	+getTodos: Array<TodoType>,
	+isExists: any,
}

class Todo {
	@observable name = ''
	@observable completed = false

	constructor(value: string) {
		value = value.trim()
		this.name = value
		this.completed = false
	}
}

class TodoStore {
	@observable todos: Array<TodoType> = []

	createTodo(name: string): void {
		this.todos.push(new Todo(name))
	}

	changeName(index: number, value: string): void {
		this.todos[index].name = value
	}

	complete(index: number, value: boolean): void {
		this.todos[index].completed = value
	}

	isExists(name: string): boolean {
		if (_.find(this.todos, { name: name }) !== undefined) {
			return true
		} else {
			return false
		}
	}

	@computed
	get getTodos(): Array<TodoType> {
		return this.todos
	}
}

const store: TodoStoreType = new TodoStore()

export type { TodoType, TodoStoreType }
export default store
