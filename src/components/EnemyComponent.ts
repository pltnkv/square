import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";

export type IEnemyComponentState = {
	attackPoints: number //todo implement
}

export const EnemyComponentKey = 'Enemy'
export class EnemyComponent extends BaseComponent<IEnemyComponentState> {

	constructor(public state: IEnemyComponentState) {
		super()
	}
}