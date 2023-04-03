import * as PIXI from 'pixi.js'
import {FIELD_SIZE, TILE_SIZE} from 'consts'
import IState, {ICell, IPoint, ISpell} from 'logic/IState'
import BaseVisual from 'objects/BaseVisual'

export default class EffectsLayer extends BaseVisual {

	private view: PIXI.Container

	constructor() {
		super()
		this.view = new PIXI.Container()
	}

	showExplosion(pos: IPoint) {
		const textures = []
		for (let i = 0; i < 32; i++) {
			const id = String('00' + i).slice(-3)
			textures.push(PIXI.Texture.from(`assets/explosion/tile${id}.png`))
		}

		const explosion = new PIXI.AnimatedSprite(textures)
		explosion.animationSpeed = 0.2
		explosion.x = pos.x
		explosion.y = pos.y
		explosion.anchor.set(0.5)
		// bat.scale.set(0.75 + Math.random() * 0.5)
		explosion.gotoAndPlay(0)
		explosion.loop = false
		explosion.onComplete = () => {
			this.view.removeChild(explosion)
		}
		this.view.addChild(explosion)
		// bat.tint = 0xff0000
	}

	getView() {
		return this.view
	}

	// effectExplosion(i:number, j:number) {
	// 	const explosion = new PIXI.AnimatedSprite(explosionTextures);
	// 	explosion.gotoAndStop()
	// }

	update() {

	}
}
