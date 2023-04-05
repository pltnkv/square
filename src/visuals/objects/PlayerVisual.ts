import * as PIXI from 'pixi.js'
import {DEBUG_SIZES, MAX_PLAYER_HP, TILE_SIZE} from 'consts'
import {applyPosition, applyPositionAndRotation} from "../../utils/moveUtils"
import BaseObjectVisual from "./BaseObjectVisual"
import {GameObject} from "../../logic/GameObject";
import {PlayerComponentKey} from "../../components/PlayerComponent";
import {HPComponentKey} from "../../components/HPComponent";


export default class PlayerVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const comp = object.require(PlayerComponentKey)

		const texture = PIXI.Texture.from('assets/bunny.png')
		const bunny = new PIXI.Sprite(texture)
		bunny.anchor.set(0.5)
		bunny.scale.set(1.4)
		bunny.x = 0
		bunny.y = 0
		bunny.tint = comp.state.tintColor

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
		applyPositionAndRotation(this.view, this.object)

		const comp = this.object.require(HPComponentKey)
		this.view.alpha = comp.state.hp / MAX_PLAYER_HP
	}
}
