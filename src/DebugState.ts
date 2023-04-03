import IState from 'logic/IState'
import {DEBUG_STATE} from "./consts";

export default class DebugState {

	div: Element | undefined

	constructor() {
		if (DEBUG_STATE) {
			this.div = document.createElement('div')
			this.div.classList.add('debug-state')
			document.body.appendChild(this.div)
		}

	}

	update(state: IState) {
		if (this.div) {
			this.div.innerHTML = JSON.stringify(state, replacer, 2)
		}
	}
}

function replacer(key: string, value: any) {
	if (key === 'visual') {
		return '<Visual...>'
	}
	if (key === 'field' && typeof value === 'object') {
		return '<...>'
	}
	return value
}
