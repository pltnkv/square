import {BaseComponent} from "./BaseComponent"

export type IBatComponentState = {
	plannedStepInDirection: number,
}
export const BatComponentKey = 'bat'
export class BatComponent extends BaseComponent<IBatComponentState> {

	constructor(public state: IBatComponentState) {
		super()
	}
}