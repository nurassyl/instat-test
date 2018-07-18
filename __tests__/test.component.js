import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

class TestComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="test-component">
				<button
					onClick={this.toggle.bind(this)}
					ref={el => this.btn = el}
				>
					OK
				</button>
			</div>
		)
	}
	toggle() {
		this.btn.innerHTML = this.btn.innerHTML === 'Cancel' ? 'OK' : 'Cancel'
	}
}

test('<TestComponent />', () => {
	const wrapper = mount(<TestComponent />)
	expect(wrapper.find('button').text()).toEqual('OK')
	wrapper.find('button').simulate('click')
	expect(wrapper.find('button').text()).toEqual('Cancel')
	wrapper.find('button').simulate('click')
	expect(wrapper.find('button').text()).toEqual('OK')
})
