// @flow

import React, { Component } from 'react'
import TodoCreateComponent from './todo-create.component'
import TodoListComponent from './todo-list.component'
import store from '../../stores/todo.store'

if (devMode) {
	var hot = require('react-hot-loader').hot
}

class TodoComponent extends Component<{}> {
	constructor(props: {}) {
		super(props)
	}

	render() {
		return (
			<div className="todo-component">
				<h3>Todo</h3>
				<hr />
				<TodoCreateComponent store={store} />
				<TodoListComponent store={store} />
			</div>
		)
	}
}

if (devMode) {
	if (typeof hot === 'function') {
		TodoComponent = hot(module)(TodoComponent) // eslint-disable-line
	}
}

export default TodoComponent
