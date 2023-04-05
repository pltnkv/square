import {ICell, IPoint, ISize} from "../logic/IState";
import {BaseComponent} from "./BaseComponent";
import Direction from "../logic/Direction";
import {GameObject} from "../logic/GameObject";

export type IObstacleComponentState = {
	cell:ICell
}

export const ObstacleComponentKey = 'Obstacle'
export class ObstacleComponent extends BaseComponent<IObstacleComponentState> {

	constructor(public state: IObstacleComponentState) {
		super()
	}
}