import * as PIXI from 'pixi.js'
import IState from "./logic/IState";

export default class Scene {

	stage: PIXI.Container
	cameraLayer: PIXI.Container
	bottomLayer: PIXI.Container
	objectsLayer: PIXI.Container
	effectsLayer: PIXI.Container

	constructor(app: PIXI.Application, private state:IState) {

		this.stage = app.stage

		this.cameraLayer = new PIXI.Container()
		app.stage.addChild(this.cameraLayer)

		this.bottomLayer = new PIXI.Container()
		// this.bottomLayer.y = 40
		this.cameraLayer.addChild(this.bottomLayer)

		this.objectsLayer = new PIXI.Container()
		// this.objectsLayer.y = 40
		this.cameraLayer.addChild(this.objectsLayer)


		this.effectsLayer =  new PIXI.Container()
		// this.effectsLayer.y = 40
		this.cameraLayer.addChild(this.effectsLayer)

		// container.x = app.screen.width / 2
		// container.y = app.screen.height / 2

		// container.pivot.x = container.width / 2
		// container.pivot.y = container.height / 2
	}

	updateCamera() {
		this.cameraLayer.x = this.state.canvasPositionX
		this.cameraLayer.y = this.state.canvasPositionY
		this.cameraLayer.scale.set(this.state.canvasScale)
	}
}
