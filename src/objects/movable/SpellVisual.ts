import * as PIXI from 'pixi.js'
import {ISpell} from 'logic/IState'
import {applyPositionAndRotation} from "../../utils/moveUtils";
import BaseObjectVisual from "../BaseObjectVisual"

export default class SpellVisual extends BaseObjectVisual<ISpell> {

	constructor(state: ISpell) {
		super(state)

		const g = new PIXI.Graphics()

		g.alpha = 0.6
		g.beginFill(0xe71d36)
		g.drawCircle(0, 0, state.size.width / 2)
		g.endFill()

		this.view.addChild(g)
	}

	update(turnTimePercent: number) {
		applyPositionAndRotation(this.view, this.state)
	}
}
