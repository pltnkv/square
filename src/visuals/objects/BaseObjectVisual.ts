import * as PIXI from 'pixi.js'
import {DEBUG_SIZES} from 'consts'
import BaseVisual from 'visuals/BaseVisual'
import {addDebugView} from "../../utils/debugUtils";
import {GameObject} from "../../logic/GameObject";
import {PositionComponentKey} from "../../components/PositionComponent";
import {applyPositionAndRotation} from "../../utils/stateUtils";

export default class BaseObjectVisual extends BaseVisual {

	protected object!: GameObject
	protected view = new PIXI.Container()

	constructor(object: GameObject) {
		super()
		this.object = object

		if (DEBUG_SIZES) {
			const comp = object.as(PositionComponentKey)
			if (comp) {
				addDebugView(this.view, comp)
			}
		}
	}

	getView() {
		return this.view
	}

	update(turnTimePercent: number) {
		applyPositionAndRotation(this.view, this.object)
	}
}
