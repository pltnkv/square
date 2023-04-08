import {ICell} from "../logic/IState";
import {SpellableComponent, SpellableComponentKey} from "../components/SpellableComponent";
import {HPComponent, HPComponentKey} from "../components/HPComponent";
import {PositionComponent, PositionComponentKey} from "../components/PositionComponent";
import {GameObject} from "../logic/GameObject";
import Controller from "../logic/Controller";
import {MovableComponent, MovableComponentKey} from "../components/MovableComponent";
import {SPELL_LIFESPAN, SPELL_SPEED, TILE_SIZE} from "../consts";
import {addVectors, directionToVector} from "../utils/mathUtils";
import {SpellComponent, SpellComponentKey} from "../components/SpellComponent";
import SpellVisual from "../visuals/objects/SpellVisual";

export class SpellObject extends GameObject {
	constructor(ctrl: Controller, spellCasterPosition: PositionComponent) {
		super(ctrl)

		this.addComponent(SpellComponentKey, new SpellComponent({
			leftMoves: SPELL_LIFESPAN
		}))

		const shift = directionToVector(spellCasterPosition.state.direction, TILE_SIZE * 0.6)
		this.addComponent(PositionComponentKey, new PositionComponent({
			pos: addVectors({...spellCasterPosition.state.pos}, shift),
			size: {width: TILE_SIZE / 3, height: TILE_SIZE / 3},
			direction: spellCasterPosition.state.direction,
		}))

		this.addComponent(MovableComponentKey, new MovableComponent(undefined
			, (object) => {
				const positionComp = object.require(PositionComponentKey)
				const spellComp = object.require(SpellComponentKey)
				if (spellComp.state.leftMoves > 0) {
					spellComp.state.leftMoves--
					const speed = directionToVector(positionComp.state.direction, SPELL_SPEED)
					addVectors(positionComp.state.pos, speed)
					positionComp.calcBoundingBox()
				} else {
					// spell is dead
					this.require(HPComponentKey).state.hp = 0
				}
			}))

		this.addComponent(HPComponentKey, new HPComponent({
				hp: 1,
			},
			(object) => {
			},
			(object) => {
				const positionComp = object.require(PositionComponentKey)
				this.ctrl.effects.showExplosion(positionComp.state.pos)
				this.destroyObject()
			}
		))

		this.addComponent(SpellableComponentKey, new SpellableComponent())

		this.addVisual(SpellVisual)
	}
}
