// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import type { TodoStoreType } from '../../stores/todo.store'

if (devMode) {
	var hot = require('react-hot-loader').hot
}

type PropsType = {
	store: TodoStoreType,
}

@observer
class TodoCreateComponent extends Component<PropsType> {
	name: ?HTMLInputElement

	constructor(props: PropsType) {
		super(props)
	}

	render() {
		return (
			<div className="todo-create-component">
				<h5>Create:</h5>
				<form>
					<div className="form-group">
						<input
							className="form-control"
							placeholder="Name"
							ref={el => {
								this.name = el
							}}
						/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={this.createTodo.bind(this)}>
						Create
					</button>
				</form>
			</div>
		)
	}

	createTodo(e: Event) {
		e.preventDefault()
		if (this.name instanceof HTMLInputElement) {
			let name: { value: string } = this.name
			if (name.value.trim() === '') {
				alert('Please, enter a name!')
			} else if (this.props.store.isExists(name.value)) {
				alert('The name is exists!')
			} else {
				this.props.store.createTodo(name.value)
			}
			name.value = ''
		}
	}
}

if (typeof hot === 'function') {
	TodoCreateComponent = hot(module)(TodoCreateComponent) // eslint-disable-line
}

export default TodoCreateComponent
