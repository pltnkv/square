import {BaseComponent} from "./BaseComponent";

export type IHPComponentState = {
	hpMax: number
	hp: number
}

export const HPComponentKey = 'HP'

export class HPComponent extends BaseComponent<IHPComponentState> {

	constructor(state: Pick<IHPComponentState, 'hp'>,
				public onDamaged: () => void,
				public onDestroyed: () => void) {
		super();
		this.state = state as IHPComponentState
		(this.state.hpMax as number) = state.hp
	}

	reduceHP(amount: number = 1) {
		if (amount <= 0) {
			throw new Error('amount must be > 0')
		}
		if (this.state.hp > 0) {
			(this.state.hp as number) -= amount
			if (this.state.hp <= 0) {
				this.onDamaged()
				this.onDestroyed()
			} else {
				this.onDamaged()
			}
		}
	}

	kill() {
		if (this.state.hp > 0) {
			(this.state.hp as number) = 0
			this.onDamaged()
			this.onDestroyed()
		}

	}
}

