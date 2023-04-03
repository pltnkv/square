import * as PIXI from 'pixi.js'

import {IMovableObject} from "../logic/IState";

export function addDebugView(view: PIXI.Container, obj: IMovableObject): void {
	const g = new PIXI.Graphics()
	g.lineStyle(1, 0xff9f1c, 0.8)
	g.drawRect(-obj.size.width / 2, -obj.size.height / 2, obj.size.width, obj.size.height)
	view.addChild(g)
}
