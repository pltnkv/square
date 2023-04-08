import * as PIXI from 'pixi.js'
import {TILE_SIZE} from 'consts'
import IState, {IEarthCell} from 'logic/IState'
import BaseVisual from 'visuals/BaseVisual'
import EarthType from "../logic/EarthType";

export default class GameFieldLayer extends BaseVisual {

	private state: IState
	private view: PIXI.Graphics

	private earthSprites: PIXI.Sprite[][] = []
	private tilesType: { [key: string]: PIXI.Texture } = {}

	constructor(state: IState) {
		super()
		this.state = state
		this.view = new PIXI.Graphics()

		this.tilesType = {
			[EarthType.Regular]: PIXI.Texture.from('assets/bg_regular.png'),
			[EarthType.Lava]: PIXI.Texture.from('assets/bg_lava.jpg'),
			[EarthType.Forest]: PIXI.Texture.from('assets/bg_forest.png'),
		}

		for (let j = 0; j < this.state.earthCells.length; j++) {
			this.earthSprites[j] = []
			const row = this.state.earthCells[j]
			for (let i = 0; i < row.length; i++) {
				const tile = new PIXI.Sprite()
				tile.alpha = 0.5
				tile.x = i * TILE_SIZE
				tile.y = j * TILE_SIZE
				this.earthSprites[j][i] = tile
				this.view.addChild(tile)

				// borders
				this.view.beginFill(0xffffff)
				this.view.lineStyle(1, 0x011627, 0.2)
				this.view.drawRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
				this.view.endFill()
			}
		}
	}

	update() {
		for (let j = 0; j < this.state.earthCells.length; j++) {
			const row = this.state.earthCells[j]
			for (let i = 0; i < row.length; i++) {
				const earthType = row[i].type
				this.earthSprites[j][i].texture = this.tilesType[earthType]
			}
		}
	}

	getView() {
		return this.view
	}
}
