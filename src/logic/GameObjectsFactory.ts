import IState, {ICell} from 'logic/IState'
import {GameObject} from "./GameObject";
import Controller from "./Controller";
import {PositionComponent} from "../components/PositionComponent"
import EarthType from "./EarthType";
import {TreeObject} from "../objects/TreeObject";
import {VolcanoObject} from "../objects/VolcanoObject";
import {WaterObject} from "../objects/WaterObject";
import {PlayerObject} from "../objects/PlayerObject";
import {BatObject} from "../objects/BatObject";
import {SpellObject} from "../objects/SpellObject";

export default class GameObjectsFactory {

	constructor(private ctrl: Controller, private state: IState) {
	}

	private registerObject(object: GameObject): GameObject {
		this.state.objects.push(object)
		return object
	}

	setEarthType(cell: ICell, type: EarthType) {
		if (!this.state.earthCells[cell.i]) {
			this.state.earthCells[cell.i] = []
		}
		this.state.earthCells[cell.j][cell.i] = {
			...cell,
			type,
			impactingTransformers: {}
		}
	}

	////////////////////////////////////////////////////////////////
	// Objects creation
	////////////////////////////////////////////////////////////////

	createPlayer(cell: ICell, id: number, tintColor: number) {
		const object = this.registerObject(new PlayerObject(this.ctrl, cell, id, tintColor))
		this.state.players.push(object) // todo rethink
	}

	createBat(cell: ICell) {
		this.registerObject(new BatObject(this.ctrl, cell))
	}

	createSpell(spellCasterPosition: PositionComponent) {
		this.registerObject(new SpellObject(this.ctrl, spellCasterPosition))
	}

	createTree(cell: ICell) {
		this.registerObject(new TreeObject(this.ctrl, cell))
	}

	createVolcano(cell: ICell) {
		this.registerObject(new VolcanoObject(this.ctrl, cell))
	}

	createWater(cell: ICell) {
		this.registerObject(new WaterObject(this.ctrl, cell))
	}
}
