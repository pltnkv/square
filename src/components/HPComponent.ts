import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";

export type IHPComponentState = {
	hp: number
}

export const HPComponentKey = 'HP'
export class HPComponent extends BaseComponent<IHPComponentState> {

	constructor(public state: IHPComponentState,
				public onDamaged: (state: GameObject) => void,
				public onDestroyed: (state: GameObject) => void) {
		super()
	}
}
