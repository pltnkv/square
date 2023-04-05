import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";

export const MovableComponentKey = 'Movable'
export class MovableComponent extends BaseComponent<undefined> {

	constructor(public state: undefined,
				public onMove: (object: GameObject) => void) {
		super()
	}
}