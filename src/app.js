// @flow

import './styles/main'
import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './components/app.component'

const ROOT_ELEMENT: ?HTMLElement = document.getElementById('app')
if (ROOT_ELEMENT instanceof HTMLElement) {
	ReactDOM.render(<AppComponent />, ROOT_ELEMENT)
}
