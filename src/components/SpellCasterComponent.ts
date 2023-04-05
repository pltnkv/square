import {BaseComponent} from "./BaseComponent";
import {GameObject} from "../logic/GameObject";

export type ISpellCasterComponentState = {
	castSpell:boolean
}

export const SpellCasterComponentKey = 'SpellCaster'
export class SpellCasterComponent extends BaseComponent<ISpellCasterComponentState> {

	constructor(public state: ISpellCasterComponentState,
				public onCreateSpell: (object: GameObject) => void) {
		super()
	}
}