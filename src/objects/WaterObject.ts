import {ICell} from "../logic/IState";
import {ObstacleComponent, ObstacleComponentKey} from "../components/ObstacleComponent";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";
import {EarthTransformerComponent, EarthTransformerComponentKey} from "../components/EarthTransformerComponent";
import EarthType from "../logic/EarthType";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {PositionComponentKey} from "../components/PositionComponent";
import TreeVisual from "../visuals/objects/TreeVisual";
import {GameObject} from "../logic/GameObject";
import Controller from "../logic/Controller";
import VolcanoVisual from "../visuals/objects/VolcanoVisual";
import WaterVisual from "../visuals/objects/WaterVisual";

export class WaterObject extends GameObject {
	constructor(ctrl: Controller, initCell: ICell) {
		super(ctrl)

		this.addPositionComponent(initCell, 1)

		this.addComponent(ObstacleComponentKey, new ObstacleComponent({cell:initCell}))

		this.addVisual(WaterVisual)
	}
}
