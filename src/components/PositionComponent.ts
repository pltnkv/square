import {IBoundingBox, IPoint, ISize} from "../logic/IState";
import {BaseComponent} from "./BaseComponent";
import Direction from "../logic/Direction";
import {posAndSizeToBoundingBox} from "../utils/mathUtils";
import {RemoveReadonly} from "../utils/types";

export type IPositionComponentState = {
	readonly direction: Direction
	readonly pos: IPoint
	readonly size: ISize
	readonly boundingBox: IBoundingBox
}

export const PositionComponentKey = 'Position'
export class PositionComponent extends BaseComponent<IPositionComponentState> {

	constructor(state: Pick<IPositionComponentState, 'direction'|'pos'|'size'>) {
		super()
		this.state = state as any
		this.calcBoundingBox()
	}

	setPos(value:IPoint) {
		const s:RemoveReadonly<IPositionComponentState> = this.state
		s.pos = value
		this.calcBoundingBox()
	}
	setDirection(value:Direction) {
		const s:RemoveReadonly<IPositionComponentState> = this.state
		s.direction = value
	}

	calcBoundingBox() {
		const s:RemoveReadonly<IPositionComponentState> = this.state
		s.boundingBox = posAndSizeToBoundingBox(this.state.pos, this.state.size)
	}
}