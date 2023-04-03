import * as PIXI from 'pixi.js'
import {IBat, ITree} from 'logic/IState'
import {applyPosition} from "../../utils/moveUtils";
import BaseObjectVisual from "../BaseObjectVisual";

export default class TreeVisual extends BaseObjectVisual<ITree> {

	constructor(state: ITree) {
		super(state)

		const texture = PIXI.Texture.from('assets/tree.png')
		const tree = new PIXI.Sprite(texture)
		tree.anchor.set(0.5)
		tree.x = 0
		tree.y = 0
		tree.scale.set(0.45)

		this.view.addChild(tree)
	}

	update(turnTimePercent: number) {
		applyPosition(this.view, this.state)
	}
}