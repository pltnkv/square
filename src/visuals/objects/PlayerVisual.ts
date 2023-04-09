import * as PIXI from 'pixi.js'
import {DEBUG_SIZES, MAX_PLAYER_HP, TILE_SIZE} from 'consts'
import BaseObjectVisual from "./BaseObjectVisual"
import {GameObject} from "../../logic/GameObject";
import {PlayerComponentKey} from "../../components/PlayerComponent";
import {HPComponentKey} from "../../components/HPComponent";
import {applyPositionAndRotation} from "../../utils/stateUtils";


export default class PlayerVisual extends BaseObjectVisual {

	private moveAnimation = false
	private bunny:PIXI.Sprite

	texture:PIXI.Texture
	textureMove1:PIXI.Texture
	textureMove2:PIXI.Texture


	constructor(object: GameObject) {
		super(object)

		const comp = object.require(PlayerComponentKey)

		this.texture = PIXI.Texture.from('assets/bunny.png')
		this.textureMove1 = PIXI.Texture.from('assets/bunny_move-1.png')
		this.textureMove2 = PIXI.Texture.from('assets/bunny_move-2.png')
		const bunny = new PIXI.Sprite(this.texture)
		this.bunny = bunny
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

		this.createHPBarVisual(-30)
	}

	startMoveAnimation() {
		this.moveAnimation = true
	}

	stopMoveAnimation() {
		this.moveAnimation = false
	}

	private firstMoveTexture:boolean = false
	private timeFromLastUpdate:number = 0

	update(turnTimePercent: number) {
		super.update(turnTimePercent)

		const hpComp = this.object.require(HPComponentKey)
		this.view.alpha = hpComp.state.hp / MAX_PLAYER_HP

		const currentTime = Date.now()
		if(this.moveAnimation) {
			if(currentTime - this.timeFromLastUpdate > 80) {
				this.bunny.texture = this.firstMoveTexture ? this.textureMove1 : this.textureMove2
				this.firstMoveTexture = !this.firstMoveTexture
				this.timeFromLastUpdate = currentTime
			}
		}else {
			this.bunny.texture = this.texture
		}
	}
}
