// @flow

import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import type { TodoType, TodoStoreType } from '../../stores/todo.store'

if (devMode) {
	var hot = require('react-hot-loader').hot
}

type PropsType = {
	store: TodoStoreType,
}

@observer
class TodoListComponent extends Component<PropsType> {
	constructor(props: PropsType) {
		super(props)

		setInterval(() => {
			console.log(toJS(props.store.getTodos)) // eslint-disable-line
		}, 5000)
	}

	render() {
		const listItems = this.props.store.todos.map((todo: TodoType, index: number) => (
			<li className="list-group-item todo-list-item" key={index}>
				<input
					className="todo-list-item__name form-control"
					type="text"
					defaultValue={todo.name}
					onChange={(e: Event) => this.changeTodoName(e, index)}
				/>
				<div className="todo-list-item__completed custom-control custom-checkbox">
					<input
						type="checkbox"
						className="custom-control-input"
						id={'completedCheckbox' + index}
						defaultChecked={todo.completed}
						onChange={(e: Event) => this.completeTodo(e, index)}
					/>
					<label className="custom-control-label" htmlFor={'completedCheckbox' + index}>
						Completed
					</label>
				</div>
			</li>
		))
		return (
			<div className="todo-list-component">
				{this.props.store.todos.length > 0 && (
					<div className="todo-list-component">
						<h5>List:</h5>
						<ul className="list-group">{listItems}</ul>
					</div>
				)}
			</div>
		)
	}

	changeTodoName(e: Event, index: number) {
		let target: EventTarget = e.target
		if (target instanceof HTMLInputElement) {
			this.props.store.changeName(index, target.value)
		}
	}

	completeTodo(e: Event, index: number) {
		let target: EventTarget = e.target
		if (target instanceof HTMLInputElement) {
			this.props.store.complete(index, target.checked)
		}
	}
}

if (typeof hot === 'function') {
	TodoListComponent = hot(module)(TodoListComponent) // eslint-disable-line
}

export default TodoListComponent
