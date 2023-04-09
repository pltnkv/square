import * as PIXI from 'pixi.js'
import BaseObjectVisual from "./BaseObjectVisual"
import {GameObject} from "../../logic/GameObject";
import {PositionComponentKey} from "../../components/PositionComponent";
import {applyPositionAndRotation} from "../../utils/stateUtils";

export default class SpellVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const positionComponent = this.object.require(PositionComponentKey)

		const g = new PIXI.Graphics()
		g.alpha = 0.6
		g.beginFill(0xe71d36)
		g.drawCircle(0, 0, positionComponent.state.size.width / 2)
		g.endFill()

		this.view.addChild(g)
	}
}
