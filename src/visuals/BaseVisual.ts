import * as PIXI from "pixi.js";

export default abstract class BaseVisual {

	shouldUpdate():boolean {
		return true
	}

	getView():PIXI.DisplayObject {
		throw new Error('Visual::getView not implemented')
	}

	update(turnTimePercent:number):void {
		throw new Error('Visual::update mot implemented')
	}
}
