import {BaseComponent} from "./BaseComponent"
import BaseVisual from "../visuals/BaseVisual"

export type IVisualComponentState = {
	visual: BaseVisual
}

export const VisualComponentKey = 'Visual'
export class VisualComponent extends BaseComponent<IVisualComponentState> {

	constructor(public state: IVisualComponentState) {
		super()
	}
}