import * as PIXI from 'pixi.js'

export default class Scene {

	stage: PIXI.Container
	objectsLayer: PIXI.Container
	effectsLayer: PIXI.Container

	constructor(app: PIXI.Application) {

		this.stage = app.stage

		this.objectsLayer = new PIXI.Container()
		this.objectsLayer.y = 40
		app.stage.addChild(this.objectsLayer)

		this.effectsLayer =  new PIXI.Container()
		this.effectsLayer.y = 40
		app.stage.addChild(this.effectsLayer)

		// container.x = app.screen.width / 2
		// container.y = app.screen.height / 2

		// container.pivot.x = container.width / 2
		// container.pivot.y = container.height / 2
	}
}
