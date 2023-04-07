import * as PIXI from 'pixi.js'
import {TILE_SIZE} from 'consts'
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
		for (let i = 0; i < state.mapSize.height; i++) {
			for (let j = 0; j < state.mapSize.width; j++) {
				const tile = new PIXI.Sprite(texture)
				tile.alpha = 0.5
				tile.x = i * TILE_SIZE
				tile.y = j * TILE_SIZE
				this.view.addChild(tile)

				this.view.beginFill(0xfdfffc)
				this.view.lineStyle(1, 0x011627, 0.2)
				this.view.drawRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
				this.view.endFill()
			}
		}
	}

	getView() {
		return this.view
	}

	update() {
	}
}
