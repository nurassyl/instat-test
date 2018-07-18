// @flow

import React, { Component } from 'react'
import TodoComponent from './todo.component/todo.component'

if (devMode) {
	var hot = require('react-hot-loader').hot
}

class AppComponent extends Component<{}> {
	constructor(props: {}) {
		super(props)
	}

	render() {
		return <TodoComponent />
	}
}

if (devMode) {
	if (typeof hot === 'function') {
		AppComponent = hot(module)(AppComponent) // eslint-disable-line
	}
}

export default AppComponent
