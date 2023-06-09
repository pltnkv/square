import * as PIXI from 'pixi.js'
import BaseObjectVisual from "./BaseObjectVisual"
import {GameObject} from "../../logic/GameObject";
import {applyPositionAndRotation} from "../../utils/stateUtils";

export default class BatVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const bat11 = PIXI.Texture.from('assets/bat21.png')
		const bat12 = PIXI.Texture.from('assets/bat22.png')
		// const bat21 = PIXI.Texture.from('assets/bat21.png')
		// const bat22 = PIXI.Texture.from('assets/bat22.png')
		const bat = new PIXI.AnimatedSprite([bat11, bat12])

		bat.animationSpeed = 0.1
		bat.anchor.set(0.5)
		bat.scale.set(0.75 + Math.random() * 0.5)
		bat.tint = 0xff0000
		bat.gotoAndPlay(0)

		this.view.addChild(bat)

		this.createHPBarVisual(-30)
	}
}

//WTF?