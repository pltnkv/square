import {BaseComponent} from "./BaseComponent"
import {Action} from "../logic/IState";

export type IPlayerComponentState = {
	id: number
	tintColor: number,
	lastAssignedMoveTime: number,
	lastSpellTime: number,
	moveAction?: Action
	prevAction?: Action

}
export const PlayerComponentKey = 'Player'
export class PlayerComponent extends BaseComponent<IPlayerComponentState> {

	constructor(public state: IPlayerComponentState) {
		super()
	}
}