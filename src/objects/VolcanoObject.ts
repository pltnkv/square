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

export class VolcanoObject extends GameObject {
	constructor(ctrl: Controller, initCell: ICell) {
		super(ctrl)

		this.addPositionComponent(initCell)

		this.addComponent(ObstacleComponentKey, new ObstacleComponent({cell:initCell}))

		this.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addComponent(EarthTransformerComponentKey, new EarthTransformerComponent({
			earthType: EarthType.Lava,
			impactDistance: 4,
		}))

		this.addVisual(VolcanoVisual)
	}
}
