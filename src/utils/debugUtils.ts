import * as PIXI from 'pixi.js'
import {PositionComponent} from "../components/PositionComponent";

export function addDebugView(view: PIXI.Container, comp: PositionComponent): void {
	const g = new PIXI.Graphics()
	g.lineStyle(1, 0xff9f1c, 0.8)
	g.drawRect(-comp.state.size.width / 2, -comp.state.size.height / 2, comp.state.size.width, comp.state.size.height)
	view.addChild(g)
}
