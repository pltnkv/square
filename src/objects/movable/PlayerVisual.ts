import * as PIXI from 'pixi.js'
import {DEBUG_SIZES, MAX_HP, TILE_SIZE} from 'consts'
import {IPlayer} from 'logic/IState'
import {applyPosition, applyPositionAndRotation} from "../../utils/moveUtils"
import BaseObjectVisual from "../BaseObjectVisual"


export default class PlayerVisual extends BaseObjectVisual<IPlayer> {

	constructor(state: IPlayer) {
		super(state)

		const texture = PIXI.Texture.from('assets/bunny.png')
		const bunny = new PIXI.Sprite(texture)
		bunny.anchor.set(0.5)
		bunny.scale.set(1.4)
		bunny.x = 0
		bunny.y = 0
		bunny.tint = state.tintColor

		// const style = new PIXI.TextStyle({
		// 	align: 'center',
		// 	fontFamily: 'Arial',
		// 	fontSize: 14,
		// 	fill: state.tintColor,
		// })

		// this.text = new PIXI.Text('', style)
		// this.text.y = -40
		// this.text.x = -20
		// bunny.addChild(this.text)

		this.view.addChild(bunny)
	}

	update(turnTimePercent: number) {
			applyPositionAndRotation(this.view, this.state)
		this.view.alpha = this.state.hp / MAX_HP
	}
}
