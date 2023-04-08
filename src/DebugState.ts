import IState, {IPoint} from 'logic/IState'
import {DEBUG_STATE} from "./consts";
import Controller from "./logic/Controller";
import {GameObject} from "./logic/GameObject";

export default class DebugState {

	offsetX: number = 0
	offsetY: number = 0
	div: Element | undefined
	mousePosition: IPoint | undefined

	constructor(canvas:HTMLElement) {
		if (DEBUG_STATE) {
			this.div = document.createElement('div')
			this.div.classList.add('debug-state')
			document.body.appendChild(this.div)

			document.body.addEventListener('mousemove', (e) => {
				this.mousePosition = {x: e.clientX, y: e.clientY}
			})

			this.offsetX = canvas.offsetLeft
			this.offsetY = canvas.offsetTop
		}
	}

	update(ctrl:Controller) {
		if(this.div && this.mousePosition) {
			const canvasPosX = ctrl.getScreenToCanvasX(this.mousePosition.x - this.offsetX)
			const canvasPosY = ctrl.getScreenToCanvasY(this.mousePosition.y - this.offsetY)
			const point = {x: canvasPosX, y: canvasPosY}
			const earthCellInfo = JSON.stringify(ctrl.getEarthCellByPoint(point),null, 2)
			const objectsInfo = ''//ctrl.getObjectsByPoint(point).map(o => this.stringify(o)).join('\n')

			this.div.innerHTML = `${earthCellInfo} \n ${objectsInfo}`
		}
	}

	private stringify(obj:GameObject):string {
		return JSON.stringify(obj, replacer, 2)
	}
}

function replacer(key: string, value: any) {
	if (key === 'components') {
		return Array.from((value as Map<string, any>).keys()).join()
	}
	if (key === 'field' && typeof value === 'object') {
		return '<...>'
	}
	return value
}
