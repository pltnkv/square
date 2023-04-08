import {BaseComponent} from "./BaseComponent"
import {ICell} from "../logic/IState";

export type IBatComponentState = {
	lastProcessedCell?: ICell
	needToMove: boolean
}
export const BatComponentKey = 'bat'

export class BatComponent extends BaseComponent<IBatComponentState> {

	constructor(public state: IBatComponentState) {
		super()
	}
}