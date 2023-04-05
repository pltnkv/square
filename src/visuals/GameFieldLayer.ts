import * as PIXI from 'pixi.js'
import {DEBUG_SIZES, FIELD_SIZE, TILE_SIZE} from 'consts'
import IState from 'logic/IState'
import BaseVisual from 'visuals/BaseVisual'

export default class GameFieldLayer extends BaseVisual {

	private state: IState
	private view: PIXI.Graphics

	constructor(state: IState) {
		super()
		this.state = state
		this.view = new PIXI.Graphics()

		const texture = PIXI.Texture.from('assets/bg_tile.png')

		//create field
		for (let i = 0; i < FIELD_SIZE; i++) {
			for (let j = 0; j < FIELD_SIZE; j++) {
				const tile = new PIXI.Sprite(texture)
				tile.alpha = 0.5
				tile.x = i * TILE_SIZE
				tile.y = j * TILE_SIZE
				this.view.addChild(tile)
			}
		}
	}

	getView() {
		return this.view
	}

	update() {

		this.view.clear()

		//create field
		for (let i = 0; i < FIELD_SIZE; i++) {
			for (let j = 0; j < FIELD_SIZE; j++) {
				this.view.beginFill(0xfdfffc)
				this.view.lineStyle(1, 0x011627, 1)
				this.view.drawRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
				this.view.endFill()
			}
		}
	}
}
