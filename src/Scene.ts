import * as PIXI from 'pixi.js'

export default class Scene {

	stage:PIXI.Container
	mainLayer: PIXI.Container

	constructor(app: PIXI.Application) {

		this.stage = app.stage

		const container = new PIXI.Container()
		this.mainLayer = container
		this.mainLayer.y = 40
		app.stage.addChild(container)

		// container.x = app.screen.width / 2
		// container.y = app.screen.height / 2

		// container.pivot.x = container.width / 2
		// container.pivot.y = container.height / 2
	}
}
