import {BaseComponent} from "./BaseComponent";
import EarthType from "../logic/EarthType";
import {HPComponentKey} from "./HPComponent";
import {PositionComponentKey} from "./PositionComponent";

export type IDestroyableByEarthComponentState = {
	// all other EarthType destroy this object
	allowedEarthTypes: EarthType[]
}

export const DestroyableByEarthComponentKey = 'DestroyableByEarth'

export class DestroyableByEarthComponent extends BaseComponent<IDestroyableByEarthComponentState> {

	dependencies = [HPComponentKey, PositionComponentKey]

	constructor(public state: IDestroyableByEarthComponentState) {
		super()
	}
}