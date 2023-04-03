import * as PIXI from 'pixi.js'
import {DEBUG_SIZES, FIELD_SIZE, MAX_HP, TILE_SIZE} from 'consts'
import IState, {IMovableObject, ISpell} from 'logic/IState'
import BaseVisual from 'objects/BaseVisual'
import {addDebugView} from "../utils/debugUtils";
import {directionToRad} from "../utils/stateUtils"
import {applyPosition, applyPositionAndRotation} from "../utils/moveUtils";

export default class BaseObjectVisual<T extends IMovableObject> extends BaseVisual {

	protected state!: T
	protected view = new PIXI.Container()

	constructor(state: T) {
		super()
		this.state = state

		if (DEBUG_SIZES) {
			addDebugView(this.view, state)
		}
	}

	getView() {
		return this.view
	}

	update(turnTimePercent: number) {
		applyPositionAndRotation(this.view, this.state)
	}
}
