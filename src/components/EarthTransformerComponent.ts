import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";
import EarthType from "../logic/EarthType";

export type IEarthTransformerComponentState = {
	earthType: EarthType
	impactDistance: number
}

export const EarthTransformerComponentKey = 'EarthTransformer'
export class EarthTransformerComponent extends BaseComponent<IEarthTransformerComponentState> {

	constructor(public state: IEarthTransformerComponentState) {
		super()
	}
}