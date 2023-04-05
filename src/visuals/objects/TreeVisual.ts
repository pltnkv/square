import * as PIXI from 'pixi.js'
import {applyPosition} from "../../utils/moveUtils";
import BaseObjectVisual from "./BaseObjectVisual";
import {GameObject} from "../../logic/GameObject";

export default class TreeVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const texture = PIXI.Texture.from('assets/tree.png')
		const tree = new PIXI.Sprite(texture)
		tree.anchor.set(0.5)
		tree.x = 0
		tree.y = 0
		tree.scale.set(0.45)

		this.view.addChild(tree)
	}

	update(turnTimePercent: number) {
		applyPosition(this.view, this.object)
	}
}