import * as PIXI from 'pixi.js'
import BaseObjectVisual from "./BaseObjectVisual";
import {GameObject} from "../../logic/GameObject";
import {applyPosition} from "../../utils/stateUtils";

export default class VolcanoVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const texture = PIXI.Texture.from('assets/volcano.png')
		const tree = new PIXI.Sprite(texture)
		tree.anchor.set(0.5)
		tree.x = 0
		tree.y = -5
		tree.scale.set(0.2)

		this.view.addChild(tree)

		// this.view.addChild(this.createHPBarVisual())
	}
}