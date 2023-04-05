import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";

export type ISpellComponentState = {
	leftMoves:number
}

export const SpellComponentKey = 'Spell'
export class SpellComponent extends BaseComponent<ISpellComponentState> {

	constructor(public state: ISpellComponentState) {
		super()
	}
}