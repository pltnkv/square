import * as PIXI from 'pixi.js'
import {applyPosition} from "../../utils/moveUtils";
import BaseObjectVisual from "./BaseObjectVisual";
import {TILE_SIZE} from "../../consts";
import {GameObject} from "../../logic/GameObject";

export default class WaterVisual extends BaseObjectVisual {

	constructor(object: GameObject) {
		super(object)

		const g = new PIXI.Graphics()
		g.beginFill(0x83E9FF)
		g.drawRect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE)
		g.endFill()
		this.view.addChild(g)
	}

	update(turnTimePercent: number) {
		applyPosition(this.view, this.object)
	}
}