import * as PIXI from 'pixi.js'
import IState from 'logic/IState'
import BaseVisual from 'visuals/BaseVisual'

export default class PanelLayer extends BaseVisual {

	private state: IState
	private view: PIXI.Graphics

	constructor(state: IState) {
		super()
		this.state = state
		this.view = new PIXI.Graphics()
	}

	getView() {
		return this.view
	}

	update(turnTimePercent: number) {
		const MAX_LEN = 400

		this.view.clear()
		this.view.lineStyle(1, 0x011627, 1)
		this.view.drawRect(200, 10, MAX_LEN, 20)
		this.view.endFill()

		// this.view.beginFill(0xe71d36)
		// this.view.drawRect(200, 10, lerp(0, MAX_LEN, turnTimePercent), 20)
		// this.view.endFill()
	}
}
