(self["webpackChunksquare"] = self["webpackChunksquare"] || []).push([[179],{

/***/ 467:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/pixi.js/lib/pixi.es.js + 37 modules
var pixi_es = __webpack_require__(244);
// CONCATENATED MODULE: ./src/logic/Direction.ts
var Direction_Direction;
(function (Direction) {
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Up"] = 3] = "Up";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction_Direction || (Direction_Direction = {}));
/* harmony default export */ const logic_Direction = (Direction_Direction);

// CONCATENATED MODULE: ./src/UserInput.ts

const pressedKeys = new Set();
function init(ctrl) {
    window.addEventListener('keydown', e => {
        checkInputs(ctrl);
        pressedKeys.add(e.key);
    });
    window.addEventListener('keyup', e => {
        pressedKeys.delete(e.key);
    });
}
function checkInputs(ctrl) {
    Array.from(pressedKeys.values()).reverse().forEach((key) => {
        switch (key) {
            //player 0
            case 'ArrowUp':
                ctrl.onPlayerMove(0, logic_Direction.Up);
                break;
            case 'ArrowLeft':
                ctrl.onPlayerMove(0, logic_Direction.Left);
                break;
            case 'ArrowDown':
                ctrl.onPlayerMove(0, logic_Direction.Down);
                break;
            case 'ArrowRight':
                ctrl.onPlayerMove(0, logic_Direction.Right);
                break;
            case 'Shift':
                ctrl.onPlayerSpell(0);
                break;
            //player 1
            case 'w':
                ctrl.onPlayerMove(1, logic_Direction.Up);
                break;
            case 'a':
                ctrl.onPlayerMove(1, logic_Direction.Left);
                break;
            case 's':
                ctrl.onPlayerMove(1, logic_Direction.Down);
                break;
            case 'd':
                ctrl.onPlayerMove(1, logic_Direction.Right);
                break;
            case ' ':
                ctrl.onPlayerSpell(1);
                break;
        }
    });
}

// CONCATENATED MODULE: ./src/Scene.ts

class Scene {
    constructor(app, state) {
        this.state = state;
        this.stage = app.stage;
        this.cameraLayer = new pixi_es/* Container */.W2();
        app.stage.addChild(this.cameraLayer);
        this.bottomLayer = new pixi_es/* Container */.W2();
        // this.bottomLayer.y = 40
        this.cameraLayer.addChild(this.bottomLayer);
        this.objectsLayer = new pixi_es/* Container */.W2();
        // this.objectsLayer.y = 40
        this.cameraLayer.addChild(this.objectsLayer);
        this.effectsLayer = new pixi_es/* Container */.W2();
        // this.effectsLayer.y = 40
        this.cameraLayer.addChild(this.effectsLayer);
        // container.x = app.screen.width / 2
        // container.y = app.screen.height / 2
        // container.pivot.x = container.width / 2
        // container.pivot.y = container.height / 2
    }
    updateCamera() {
        this.cameraLayer.x = this.state.canvasPositionX;
        this.cameraLayer.y = this.state.canvasPositionY;
        this.cameraLayer.scale.set(this.state.canvasScale);
    }
}

// CONCATENATED MODULE: ./src/consts.ts
//colors:
//black 011627
//white fdfffc
//biruzoviy 2ec4b6
//red e71d36
//orange ff9f1c
/**
export const TILE_SIZE = 90
export const FIELD_SIZE = 10
export const GAME_TICK_DURATION_IN_MS = 140
export const TIME_BETWEEN_MOVES = 120
export const TIME_BETWEEN_SPELLS = 500
export const MAX_SPELL_CHARGES = 2
export const MAX_PLAYER_HP = 3
export const SPELL_LIFESPAN = 16
export const MAX_BAT_STEPS_IN_LINE = 30

export const PLAYER_SPEED = 30
export const SPELL_SPEED = 40
export const BAT_SPEED = 10
 */
const APP_WIDTH = 1200;
const APP_HEIGHT = 920;
const consts_TILE_SIZE = 90;
const GAME_TICK_DURATION_IN_MS = 30;
const TIME_BETWEEN_MOVES = 50;
const TIME_BETWEEN_SPELLS = 400;
const MAX_SPELL_CHARGES = 2;
const MAX_PLAYER_HP = 3;
const SPELL_LIFESPAN = 100;
const MAX_BAT_STEPS_IN_LINE = 30;
// export const PLAYER_SPEED = 30
const PLAYER_SPEED = 10;
const SPELL_SPEED = 20;
const BAT_SPEED = 4;
const DEBUG_SIZES = false;
const DEBUG_STATE = true;

// CONCATENATED MODULE: ./src/visuals/BaseVisual.ts
class BaseVisual {
    shouldUpdate() {
        return true;
    }
    getView() {
        throw new Error('Visual::getView not implemented');
    }
    update(turnTimePercent) {
        throw new Error('Visual::update mot implemented');
    }
}

// CONCATENATED MODULE: ./src/logic/EarthType.ts
var EarthType;
(function (EarthType) {
    EarthType["Regular"] = "Regular";
    EarthType["Lava"] = "Lava";
    EarthType["Forest"] = "Forest";
    EarthType["Magic"] = "Magic";
})(EarthType || (EarthType = {}));
/* harmony default export */ const logic_EarthType = (EarthType);

// CONCATENATED MODULE: ./src/visuals/GameFieldLayer.ts




class GameFieldLayer extends BaseVisual {
    constructor(state) {
        super();
        this.earthSprites = [];
        this.tilesType = {};
        this.state = state;
        this.view = new pixi_es/* Graphics */.TC();
        this.tilesType = {
            [logic_EarthType.Regular]: pixi_es/* Texture.from */.xE.from('assets/bg_regular.png'),
            [logic_EarthType.Lava]: pixi_es/* Texture.from */.xE.from('assets/bg_lava.jpg'),
            [logic_EarthType.Forest]: pixi_es/* Texture.from */.xE.from('assets/bg_forest.png'),
        };
        for (let j = 0; j < this.state.earthCells.length; j++) {
            this.earthSprites[j] = [];
            const row = this.state.earthCells[j];
            for (let i = 0; i < row.length; i++) {
                const tile = new pixi_es/* Sprite */.jy();
                tile.alpha = 0.5;
                tile.x = i * consts_TILE_SIZE;
                tile.y = j * consts_TILE_SIZE;
                this.earthSprites[j][i] = tile;
                this.view.addChild(tile);
                // borders
                this.view.beginFill(0xffffff);
                this.view.lineStyle(1, 0x011627, 0.2);
                this.view.drawRect(i * consts_TILE_SIZE, j * consts_TILE_SIZE, consts_TILE_SIZE, consts_TILE_SIZE);
                this.view.endFill();
            }
        }
    }
    update() {
        for (let j = 0; j < this.state.earthCells.length; j++) {
            const row = this.state.earthCells[j];
            for (let i = 0; i < row.length; i++) {
                const earthType = row[i].type;
                this.earthSprites[j][i].texture = this.tilesType[earthType];
            }
        }
    }
    getView() {
        return this.view;
    }
}

// CONCATENATED MODULE: ./src/visuals/EffectsLayer.ts


class EffectsLayer extends BaseVisual {
    constructor() {
        super(...arguments);
        this.view = new pixi_es/* Container */.W2();
    }
    showExplosion(pos) {
        const textures = [];
        for (let i = 0; i < 32; i++) {
            const id = String('00' + i).slice(-3);
            textures.push(pixi_es/* Texture.from */.xE.from(`assets/explosion/tile${id}.png`));
        }
        const explosion = new pixi_es/* AnimatedSprite */.Kg(textures);
        explosion.animationSpeed = 0.2;
        explosion.rotation = Math.PI * 2 * Math.random();
        explosion.x = pos.x;
        explosion.y = pos.y;
        explosion.anchor.set(0.5);
        // bat.scale.set(0.75 + Math.random() * 0.5)
        explosion.gotoAndPlay(0);
        explosion.loop = false;
        explosion.onComplete = () => {
            this.view.removeChild(explosion);
        };
        this.view.addChild(explosion);
        // bat.tint = 0xff0000
    }
    showFire(pos) {
        const textures = [];
        for (let i = 1; i < 9; i++) {
            textures.push(pixi_es/* Texture.from */.xE.from(`assets/fire/fire_${i}.png`));
        }
        const explosion = new pixi_es/* AnimatedSprite */.Kg(textures);
        explosion.animationSpeed = 0.2;
        explosion.x = pos.x;
        explosion.y = pos.y;
        explosion.anchor.set(0.5);
        explosion.scale.set(0.3);
        explosion.gotoAndPlay(0);
        explosion.loop = false;
        explosion.onComplete = () => {
            this.view.removeChild(explosion);
        };
        this.view.addChild(explosion);
    }
    getView() {
        return this.view;
    }
    // effectExplosion(i:number, j:number) {
    // 	const explosion = new PIXI.AnimatedSprite(explosionTextures);
    // 	explosion.gotoAndStop()
    // }
    update() {
    }
}

// CONCATENATED MODULE: ./src/components/BaseComponent.ts
const defaultDependencies = [];
class BaseComponent {
    constructor() {
        this.dependencies = defaultDependencies;
    }
}

// CONCATENATED MODULE: ./src/components/SpellCasterComponent.ts

const SpellCasterComponentKey = 'SpellCaster';
class SpellCasterComponent extends BaseComponent {
    constructor(state, onCreateSpell) {
        super();
        this.state = state;
        this.onCreateSpell = onCreateSpell;
    }
}

// CONCATENATED MODULE: ./src/components/MovableComponent.ts

const MovableComponentKey = 'Movable';
class MovableComponent extends BaseComponent {
    constructor(state, onMove) {
        super();
        this.state = state;
        this.onMove = onMove;
    }
}

// CONCATENATED MODULE: ./src/components/HPComponent.ts

const HPComponentKey = 'HP';
class HPComponent extends BaseComponent {
    constructor(state, onDamaged, onDestroyed) {
        super();
        this.state = state;
        this.onDamaged = onDamaged;
        this.onDestroyed = onDestroyed;
    }
    reduceHP(amount = 1) {
        if (amount <= 0) {
            throw new Error('amount must be > 0');
        }
        if (this.state.hp > 0) {
            this.state.hp -= amount;
            if (this.state.hp <= 0) {
                this.onDamaged();
                this.onDestroyed();
            }
            else {
                this.onDamaged();
            }
        }
    }
    kill() {
        if (this.state.hp > 0) {
            this.state.hp = 0;
            this.onDamaged();
            this.onDestroyed();
        }
    }
}

// CONCATENATED MODULE: ./src/components/SpellComponent.ts

const SpellComponentKey = 'Spell';
class SpellComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/components/EnemyComponent.ts

const EnemyComponentKey = 'Enemy';
class EnemyComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/components/SpellableComponent.ts

const SpellableComponentKey = 'Spellable';
class SpellableComponent extends BaseComponent {
}

// CONCATENATED MODULE: ./src/utils/mathUtils.ts


//////////////////////////////////////////////////////////////////////////////////////////
// CONVERT ONE TO ANOTHER
//////////////////////////////////////////////////////////////////////////////////////////
function cellToCoord(i) {
    return i * TILE_SIZE + TILE_SIZE / 2;
}
function positionToCell(point) {
    return {
        i: Math.floor(point.x / consts_TILE_SIZE),
        j: Math.floor(point.y / consts_TILE_SIZE)
    };
}
function cellToPosition(cell) {
    return {
        x: cell.i * consts_TILE_SIZE + consts_TILE_SIZE / 2,
        y: cell.j * consts_TILE_SIZE + consts_TILE_SIZE / 2
    };
}
//origin is center
function getBBFromPoint(point, width, height) {
    return {
        top: point.y - height / 2,
        bottom: point.y + height / 2,
        left: point.x - width / 2,
        right: point.x + width / 2,
    };
}
//todo same as getBBFromPoint
function posAndSizeToBoundingBox(pos, size) {
    return {
        top: pos.y - size.height / 2,
        bottom: pos.y + size.height / 2,
        left: pos.x - size.width / 2,
        right: pos.x + size.width / 2,
    };
}
function directionToRad(d) {
    if (d === logic_Direction.Down) {
        return 0;
    }
    if (d === logic_Direction.Up) {
        return Math.PI;
    }
    if (d === logic_Direction.Left) {
        return Math.PI / 2;
    }
    if (d === logic_Direction.Right) {
        return Math.PI * 3 / 2;
    }
    return 0;
}
/**
 * Returns normal vector by default
 */
function directionToVector(direction, value = 1) {
    if (direction === logic_Direction.Up) {
        return { x: 0, y: -value };
    }
    if (direction === logic_Direction.Down) {
        return { x: 0, y: value };
    }
    if (direction === logic_Direction.Left) {
        return { x: -value, y: 0 };
    }
    if (direction === logic_Direction.Right) {
        return { x: value, y: 0 };
    }
    throw 'unknown direction';
}
//////////////////////////////////////////////////////////////////////////////////////////
// OVERLAPS utils
//////////////////////////////////////////////////////////////////////////////////////////
function isBBsOverlaps(bb1, bb2) {
    if (bb1.left > bb2.right
        || bb1.right < bb2.left
        || bb1.top > bb2.bottom
        || bb1.bottom < bb2.top) {
        // no collision
        return false;
    }
    // collision detected
    return true;
}
function isPointInsideBB(point, bb) {
    if (point.x >= bb.left
        && point.x <= bb.right
        && point.y >= bb.top
        && point.y <= bb.bottom) {
        // no collision
        return true;
    }
    // collision detected
    return false;
}
//////////////////////////////////////////////////////////////////////////////////////////
// OPERATIONS ON VECTORS
//////////////////////////////////////////////////////////////////////////////////////////
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}
function addVectors(target, added, mutate = true) {
    if (mutate) {
        target.x += added.x;
        target.y += added.y;
        return target;
    }
    else {
        return {
            x: target.x + added.x,
            y: target.y + added.y
        };
    }
}
function multVector(target, value, mutate = true) {
    if (mutate) {
        target.x *= value;
        target.y *= value;
        return target;
    }
    else {
        return {
            x: target.x * value,
            y: target.y * value
        };
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
// OTHER UTILS
//////////////////////////////////////////////////////////////////////////////////////////
const directions = [logic_Direction.Up, logic_Direction.Down, logic_Direction.Left, logic_Direction.Right];
function getRandomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}
//This implementation simply moves one step at a time towards the destination by checking the relative position of the current cell and the destination, and incrementing or decrementing either the i or j coordinate accordingly. It adds each new cell to the path, and continues until the destination is reached.
//Note that this implementation does not take into account any obstacles or other constraints that might be present in the environment, and may not always find the shortest path. It is intended as a simple example and may not be suitable for all use cases.
function findPath(from, to) {
    const path = [];
    let current = from;
    while (current.i !== to.i || current.j !== to.j) {
        if (current.i < to.i) {
            current = { i: current.i + 1, j: current.j };
        }
        else if (current.i > to.i) {
            current = { i: current.i - 1, j: current.j };
        }
        else if (current.j < to.j) {
            current = { i: current.i, j: current.j + 1 };
        }
        else {
            current = { i: current.i, j: current.j - 1 };
        }
        path.push(current);
    }
    return path;
}
function getDirectionByCell(fromCell, toCell) {
    if (fromCell.i === toCell.i) {
        if (fromCell.j > toCell.j) {
            return logic_Direction.Up;
        }
        else {
            return logic_Direction.Down;
        }
    }
    else {
        if (fromCell.i > toCell.i) {
            return logic_Direction.Left;
        }
        else {
            return logic_Direction.Right;
        }
    }
}
function isEqual(a, b) {
    if (a === undefined || b === undefined) {
        return false;
    }
    if ('i' in a && 'j' in a && 'i' in b && 'j' in b) {
        return a.i === b.i && a.j === b.j;
    }
    // find out which one is point
    if ('x' in a && 'y' in a && 'x' in b && 'y' in b) {
        return a.x === b.x && a.y === b.y;
    }
    // find out which one is bounding box
    if ('top' in a && 'bottom' in a && 'left' in a && 'right' in a && 'top' in b && 'bottom' in b && 'left' in b && 'right' in b) {
        return a.top === b.top && a.bottom === b.bottom && a.left === b.left && a.right === b.right;
    }
    return false;
}
function findCellToTransform(centerCell, earthType, earthSells) {
    // todo cделать нормальное заполнение потом
    return getCellsAround(centerCell, 2, earthSells, earthType);
}
function getCellsAround(centerCell, offset, earthSells, earthType) {
    for (let j = -offset; j <= offset; j++) {
        for (let i = -offset; i <= offset; i++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const cell = earthSells[centerCell.j + j][centerCell.i + i];
            if (cell && cell.type !== earthType) {
                return {
                    i: centerCell.i + i,
                    j: centerCell.j + j
                };
            }
        }
    }
    return undefined;
}
function calcDistanceBetweenCells(from, to) {
    return Math.sqrt(Math.pow(from.i - to.i, 2) + Math.pow(from.j - to.j, 2));
}

// CONCATENATED MODULE: ./src/components/PositionComponent.ts


const PositionComponentKey = 'Position';
class PositionComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
        this.calcBoundingBox();
    }
    setPos(value) {
        const s = this.state;
        s.pos = value;
        this.calcBoundingBox();
    }
    setDirection(value) {
        const s = this.state;
        s.direction = value;
    }
    calcBoundingBox() {
        const s = this.state;
        s.boundingBox = posAndSizeToBoundingBox(this.state.pos, this.state.size);
    }
}

// CONCATENATED MODULE: ./src/components/ObstacleComponent.ts

const ObstacleComponentKey = 'Obstacle';
class ObstacleComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/components/EarthTransformerComponent.ts

const EarthTransformerComponentKey = 'EarthTransformer';
class EarthTransformerComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/components/DestroyableByEarthComponent.ts



const DestroyableByEarthComponentKey = 'DestroyableByEarth';
class DestroyableByEarthComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
        this.dependencies = [HPComponentKey, PositionComponentKey];
    }
}

// CONCATENATED MODULE: ./src/logic/GameLoopLogic.ts














/**
 * modify state only here
 */
function onGameTick(ctrl, state) {
    // LOGIC:
    // move or process all objects
    // create all new objects
    // check collisions
    // remove destroyed objects in "onGameTickCleanup"
    ////////////////////////////////////////////////
    // MOVE OR PROCESS
    ////////////////////////////////////////////////
    //toto iterate only over objects with MovableComponent
    state.objects.forEach(object => {
        var _a;
        // Move object
        const movable = object.as(MovableComponentKey);
        if (movable) {
            movable.onMove(object);
        }
        // Cast a spell
        const spellCaster = object.as(SpellCasterComponentKey);
        if (spellCaster && spellCaster.state.castSpell) {
            spellCaster.onCreateSpell(object);
            spellCaster.state.castSpell = false;
        }
        // check that object can exist on his type of earth
        const destroyableByEarthComponent = object.as(DestroyableByEarthComponentKey);
        if (destroyableByEarthComponent) {
            // todo может мне добавить кеш на основные функции поика? и сбрасывать его в конце каждого тика?
            const cell = positionToCell(object.require(PositionComponentKey).state.pos);
            const earthType = (_a = getEarthByCell(state.earthCells, cell)) === null || _a === void 0 ? void 0 : _a.type;
            if (earthType) {
                if (!destroyableByEarthComponent.state.allowedEarthTypes.includes(earthType)) {
                    object.require(HPComponentKey).reduceHP();
                }
            }
        }
        // transform earth
        const earthTransformer = object.as(EarthTransformerComponentKey);
        if (earthTransformer) {
            const centerCell = positionToCell(object.require(PositionComponentKey).state.pos);
            iterateEarthCellsFromCenter(state.earthCells, centerCell, earthTransformer.state.impactDistance, (cell) => {
                const distance = GameLoopLogic_calcDistanceBetweenCells(centerCell, cell) || 1; // prevent division by zero
                const impact = earthTransformer.state.impactDistance / distance;
                const earthType = earthTransformer.state.earthType;
                if (cell.impactingTransformers[earthType] === undefined) {
                    cell.impactingTransformers[earthType] = impact;
                }
                else {
                    // @ts-ignore
                    cell.impactingTransformers[earthType] += impact;
                }
            });
        }
    });
    // calculate types of earth cells
    const MIN_IMPACT = 0.2;
    iterateAllEarthCells(state.earthCells, (cell) => {
        let biggest = MIN_IMPACT;
        for (const tKey in cell.impactingTransformers) {
            const val = cell.impactingTransformers[tKey];
            if (val && val > biggest) {
                biggest = val;
                cell.type = tKey;
            }
        }
        // no impacting transformers
        if (biggest === MIN_IMPACT) {
            cell.type = logic_EarthType.Regular;
        }
        cell.impactingTransformers = {};
    });
    ////////////////////////////////////////////////
    // CREATE NEW OBJECTS
    ////////////////////////////////////////////////
    // spawn bats
    // if (state.bats.length < 1) {
    // if (state.bats.length < 3 && Math.random() > 0.8) {
    // ctrl.createBat()
    // }
    ////////////////////////////////////////////////
    // CHECK COLLISIONS
    ////////////////////////////////////////////////
    state.objects.forEach(object => {
        const spellComp = object.as(SpellComponentKey);
        if (spellComp) {
            //TODO iterate only over objects with position
            state.objects.forEach(object2 => {
                if (object === object2) { // ignore overlap with itself
                    return;
                }
                if (object2.has(SpellableComponentKey)) {
                    if (hasCollisionInObjects(object, object2)) {
                        tryReduceHP(object);
                        tryReduceHP(object2);
                    }
                }
            });
        }
        const enemyComp = object.as(EnemyComponentKey);
        if (enemyComp) {
            state.players.forEach(object2 => {
                if (hasCollisionInObjects(object, object2)) {
                    tryReduceHP(object);
                    tryReduceHP(object2);
                }
            });
        }
    });
}
function tryReduceHP(object) {
    const objectHPComp = object.as(HPComponentKey);
    if (objectHPComp) {
        objectHPComp.reduceHP();
    }
}
function hasCollisionsWithObstacles(object, targetPos, objects) {
    const posComp = object.require(PositionComponentKey);
    const targetBB = posAndSizeToBoundingBox(targetPos, posComp.state.size);
    for (let i = 0; i < objects.length; i++) {
        if (object !== objects[i] && objects[i].has(ObstacleComponentKey)) {
            const obj2PosComp = objects[i].require(PositionComponentKey);
            if (isBBsOverlaps(targetBB, obj2PosComp.state.boundingBox)) {
                return true;
            }
        }
    }
    return false;
}
function adjustPositionAfterTurn(pos, direction) {
    if (direction === Direction.Up || direction === Direction.Down) {
        pos.x = adjustCoord(pos.x);
    }
    if (direction === Direction.Left || direction === Direction.Right) {
        pos.y = adjustCoord(pos.y);
    }
}
function adjustCoord(val) {
    const remainder = val % TILE_SIZE;
    if (Math.abs(TILE_SIZE / 2 - remainder) < 30) {
        // center of current cell
        return (val - remainder) + TILE_SIZE / 2;
    }
    else {
        return val;
    }
}
function hasCollisionInObjects(obj1, obj2) {
    const pos1 = obj1.require(PositionComponentKey);
    const pos2 = obj2.require(PositionComponentKey);
    return isBBsOverlaps(pos1.state.boundingBox, pos2.state.boundingBox);
}
function iterateAllEarthCells(earthCells, callback) {
    for (let j = 0; j < earthCells.length; j++) {
        for (let i = 0; i < earthCells[j].length; i++) {
            const cell = earthCells[j][i];
            if (callback(cell)) {
                return;
            }
        }
    }
}
function iterateEarthCellsFromCenter(earthCells, centerCell, distance, callback) {
    for (let j = -distance; j <= distance; j++) {
        const row = earthCells[centerCell.j + j];
        if (row) {
            for (let i = -distance; i <= distance; i++) {
                const cell = row[centerCell.i + i];
                if (cell) {
                    if (callback(cell)) {
                        return;
                    }
                }
            }
        }
    }
}
function GameLoopLogic_calcDistanceBetweenCells(c1, c2) {
    return Math.abs(c1.i - c2.i) + Math.abs(c1.j - c2.j);
}
function getEarthByCell(earthCells, cell) {
    return earthCells[cell.j] && earthCells[cell.j][cell.i];
}

// CONCATENATED MODULE: ./src/components/PlayerComponent.ts

const PlayerComponentKey = 'Player';
class PlayerComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/utils/stateUtils.ts




////////////////////////////////////////////
// There is no function that change state
////////////////////////////////////////////
function applyPosition(view, object) {
    const comp = object.require(PositionComponentKey);
    view.x = comp.state.pos.x;
    view.y = comp.state.pos.y;
}
function applyPositionAndRotation(view, object) {
    const comp = object.require(PositionComponentKey);
    view.x = comp.state.pos.x;
    view.y = comp.state.pos.y;
    view.rotation = directionToRad(comp.state.direction);
}
function findEmptySell() {
    //TODO убедиться что в этой точке нет игроков
    return {
        x: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
        y: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
    };
}
function getPlayer(state, playerId) {
    return state.players.find(p => {
        const playerComp = p.require(PlayerComponentKey);
        return playerComp.state.id === playerId;
    });
}

// CONCATENATED MODULE: ./src/map.ts
const o = 'empty';
const p = 'player1';
const P = 'player2';
const t = 'tree';
const w = 'water';
const b = 'bat';
const v = 'volcano';
const MapEmpty = (/* unused pure expression or super */ null && (o));
const MapTree = t;
const MapWater = w;
const MapBat = b;
const MapVolcano = v;
const MapPlayer1 = p;
const MapPlayer2 = P;
/*
export const map1 = [
    [p, o, o, o, P, o, o, o, o, o],
    [o, o, t, o, o, o, o, t, t, b],
    [o, o, t, t, b, o, o, o, t, o],
    [o, o, o, t, t, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, t, t, t, o, o],
    [o, o, o, o, o, w, w, o, o, o],
    [o, o, b, o, w, w, t, o, o, o],
    [o, o, o, w, w, b, o, o, o, o],
    [o, o, w, w, w, o, o, o, o, o],
]
*/
const map1 = [
    [p, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
    [o, o, t, o, o, o, o, o, o, b, o, o, t, o, o],
    [o, o, t, t, o, o, o, o, o, o, o, o, o, o, o],
    [o, o, o, t, t, o, o, o, o, o, o, o, o, o, o],
    [o, o, o, b, o, o, o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, t, t, t, o, o, o, o, o, o, o],
    [o, o, o, o, o, w, w, o, o, o, o, o, P, o, o],
    [o, o, b, o, w, w, t, o, o, o, o, o, o, o, o],
    [o, o, o, w, w, b, o, o, o, o, o, o, o, o, o],
    [o, o, w, w, w, o, o, v, v, o, o, o, o, o, o],
    [o, o, w, w, w, o, o, v, v, v, v, o, o, o, o],
    [o, o, w, w, o, o, o, o, o, o, o, o, o, o, o],
    [o, o, w, o, o, o, o, o, o, o, o, o, o, o, o],
    [o, w, w, o, o, o, o, o, o, o, o, o, o, o, o],
];
// export const map1 = [
// 	[p, P, o],
// 	[o, o, o],
// 	[o, o, t],
// ]

// CONCATENATED MODULE: ./src/logic/MapBuilder.ts


function buildMap(map, ctrl) {
    for (let j = 0; j < map.length; j++) {
        const mapRow = map[j];
        for (let i = 0; i < mapRow.length; i++) {
            const cellValue = mapRow[i];
            const cell = { i, j };
            ctrl.objectFactory.setEarthType(cell, logic_EarthType.Regular);
            switch (cellValue) {
                case MapPlayer1:
                    ctrl.objectFactory.createPlayer(cell, 0, 0x2ec4b6);
                    break;
                case MapPlayer2:
                    ctrl.objectFactory.createPlayer(cell, 1, 0xfd4976);
                    break;
                case MapBat:
                    ctrl.objectFactory.createBat(cell);
                    break;
                case MapTree:
                    ctrl.objectFactory.createTree(cell);
                    break;
                case MapWater:
                    ctrl.objectFactory.createWater(cell);
                    break;
                case MapVolcano:
                    ctrl.objectFactory.createVolcano(cell);
                    ctrl.objectFactory.setEarthType(cell, logic_EarthType.Lava);
                    break;
                default:
                    // create nothing
                    break;
            }
        }
    }
    return {
        width: map[0].length,
        height: map.length
    };
}

// CONCATENATED MODULE: ./src/utils/debugUtils.ts

function addDebugView(view, comp) {
    const g = new pixi_es/* Graphics */.TC();
    g.lineStyle(1, 0xff9f1c, 0.8);
    g.drawRect(-comp.state.size.width / 2, -comp.state.size.height / 2, comp.state.size.width, comp.state.size.height);
    view.addChild(g);
}

// CONCATENATED MODULE: ./src/visuals/objects/BaseObjectVisual.ts






class BaseObjectVisual extends BaseVisual {
    constructor(object) {
        super();
        this.view = new pixi_es/* Container */.W2();
        this.object = object;
        if (DEBUG_SIZES) {
            const comp = object.as(PositionComponentKey);
            if (comp) {
                addDebugView(this.view, comp);
            }
        }
    }
    getView() {
        return this.view;
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.object);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/TreeVisual.ts



class TreeVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const texture = pixi_es/* Texture.from */.xE.from('assets/tree.png');
        const tree = new pixi_es/* Sprite */.jy(texture);
        tree.anchor.set(0.5);
        tree.x = 0;
        tree.y = 0;
        tree.scale.set(0.45);
        this.view.addChild(tree);
    }
    update(turnTimePercent) {
        applyPosition(this.view, this.object);
    }
}

// CONCATENATED MODULE: ./src/components/BatComponent.ts

const BatComponentKey = 'bat';
class BatComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/components/VisualComponent.ts

const VisualComponentKey = 'Visual';
class VisualComponent extends BaseComponent {
    constructor(state) {
        super();
        this.state = state;
    }
}

// CONCATENATED MODULE: ./src/logic/GameObject.ts
















class GameObject {
    constructor(ctrl) {
        this.ctrl = ctrl;
        this.components = new Map();
    }
    addComponent(key, comp) {
        this.components.set(key, comp);
    }
    has(key) {
        return this.components.has(key);
    }
    as(key) {
        return this.components.get(key);
    }
    require(key) {
        const comp = this.components.get(key);
        if (!comp) {
            throw new Error(`Require failed. Component "${key}" not found`);
        }
        return comp;
    }
    ////////////////////////////////////////////////
    //// HELPERS
    ////////////////////////////////////////////////
    addPositionComponent(cell, sizeScale = 0.8) {
        this.addComponent(PositionComponentKey, new PositionComponent({
            direction: logic_Direction.Down,
            pos: cellToPosition(cell),
            size: { width: consts_TILE_SIZE * sizeScale, height: consts_TILE_SIZE * sizeScale },
        }));
    }
    addVisual(visualClass) {
        const visual = new visualClass(this);
        //todo по хорошему рендер система тоже должна бегать по обхектам с визуалами
        // т.Е. массив this.visuals мы можем грохнуть
        this.addComponent(VisualComponentKey, new VisualComponent({ visual }));
        this.ctrl.visuals.push(visual);
        //todo рендерить только объекты во вьюпорте
        this.ctrl.scene.objectsLayer.addChild(visual.getView());
    }
    destroyObject() {
        const index = this.ctrl.state.objects.indexOf(this);
        if (index !== -1) {
            this.ctrl.state.objects.splice(index, 1);
            this.removeVisual();
        }
    }
    removeVisual() {
        const visualComp = this.as(VisualComponentKey);
        if (visualComp) {
            const index = this.ctrl.visuals.findIndex(v => v === visualComp.state.visual);
            if (index !== -1) {
                this.ctrl.visuals.splice(index, 1);
                const view = visualComp.state.visual.getView();
                view.parent.removeChild(view);
            }
        }
    }
}

// CONCATENATED MODULE: ./src/objects/TreeObject.ts









class TreeObject extends GameObject {
    constructor(ctrl, initCell) {
        super(ctrl);
        this.addPositionComponent(initCell);
        this.addComponent(ObstacleComponentKey, new ObstacleComponent({ cell: initCell }));
        this.addComponent(SpellableComponentKey, new SpellableComponent());
        this.addComponent(EarthTransformerComponentKey, new EarthTransformerComponent({
            earthType: logic_EarthType.Forest,
            impactDistance: 2,
        }));
        this.addComponent(DestroyableByEarthComponentKey, new DestroyableByEarthComponent({
            allowedEarthTypes: [logic_EarthType.Regular, logic_EarthType.Forest]
        }));
        this.addComponent(HPComponentKey, new HPComponent({
            hp: 3,
        }, () => {
            //todo how to run different animation depending on spell type
            this.ctrl.effects.showFire(this.require(PositionComponentKey).state.pos);
        }, () => {
            this.destroyObject();
        }));
        this.addVisual(TreeVisual);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/VolcanoVisual.ts



class VolcanoVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const texture = pixi_es/* Texture.from */.xE.from('assets/volcano.png');
        const tree = new pixi_es/* Sprite */.jy(texture);
        tree.anchor.set(0.5);
        tree.x = 0;
        tree.y = -5;
        tree.scale.set(0.2);
        this.view.addChild(tree);
    }
    update(turnTimePercent) {
        applyPosition(this.view, this.object);
    }
}

// CONCATENATED MODULE: ./src/objects/VolcanoObject.ts






class VolcanoObject extends GameObject {
    constructor(ctrl, initCell) {
        super(ctrl);
        this.addPositionComponent(initCell);
        this.addComponent(ObstacleComponentKey, new ObstacleComponent({ cell: initCell }));
        this.addComponent(SpellableComponentKey, new SpellableComponent());
        this.addComponent(EarthTransformerComponentKey, new EarthTransformerComponent({
            earthType: logic_EarthType.Lava,
            impactDistance: 4,
        }));
        this.addVisual(VolcanoVisual);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/WaterVisual.ts




class WaterVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const g = new pixi_es/* Graphics */.TC();
        g.beginFill(0x83E9FF);
        g.drawRect(-consts_TILE_SIZE / 2, -consts_TILE_SIZE / 2, consts_TILE_SIZE, consts_TILE_SIZE);
        g.endFill();
        this.view.addChild(g);
    }
    update(turnTimePercent) {
        applyPosition(this.view, this.object);
    }
}

// CONCATENATED MODULE: ./src/objects/WaterObject.ts



class WaterObject extends GameObject {
    constructor(ctrl, initCell) {
        super(ctrl);
        this.addPositionComponent(initCell, 1);
        this.addComponent(ObstacleComponentKey, new ObstacleComponent({ cell: initCell }));
        this.addVisual(WaterVisual);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/PlayerVisual.ts






class PlayerVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const comp = object.require(PlayerComponentKey);
        const texture = pixi_es/* Texture.from */.xE.from('assets/bunny.png');
        const bunny = new pixi_es/* Sprite */.jy(texture);
        bunny.anchor.set(0.5);
        bunny.scale.set(1.4);
        bunny.x = 0;
        bunny.y = 0;
        bunny.tint = comp.state.tintColor;
        // const style = new PIXI.TextStyle({
        // 	align: 'center',
        // 	fontFamily: 'Arial',
        // 	fontSize: 14,
        // 	fill: state.tintColor,
        // })
        // this.text = new PIXI.Text('', style)
        // this.text.y = -40
        // this.text.x = -20
        // bunny.addChild(this.text)
        this.view.addChild(bunny);
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.object);
        const comp = this.object.require(HPComponentKey);
        this.view.alpha = comp.state.hp / MAX_PLAYER_HP;
    }
}

// CONCATENATED MODULE: ./src/objects/PlayerObject.ts












class PlayerObject extends GameObject {
    constructor(ctrl, cell, id, tintColor) {
        super(ctrl);
        this.addComponent(PlayerComponentKey, new PlayerComponent({
            id,
            tintColor,
            lastAssignedMoveTime: 0,
            lastSpellTime: 0,
        }));
        this.addComponent(PositionComponentKey, new PositionComponent({
            direction: logic_Direction.Down,
            size: { width: consts_TILE_SIZE * 0.6, height: consts_TILE_SIZE * 0.8 },
            pos: cellToPosition(cell),
        }));
        this.addComponent(MovableComponentKey, new MovableComponent(undefined, (object) => {
            var _a;
            const playerComp = object.require(PlayerComponentKey);
            const positionComp = object.require(PositionComponentKey);
            if (playerComp.state.moveAction) {
                if (playerComp.state.moveAction.type === 'move') {
                    const speed = directionToVector(positionComp.state.direction, PLAYER_SPEED);
                    const newPos = addVectors(positionComp.state.pos, speed, false);
                    if (((_a = playerComp.state.prevAction) === null || _a === void 0 ? void 0 : _a.type) === 'turn') {
                        // adjustPositionAfterTurn(newPos, playerComp.state.prevAction.direction)
                    }
                    const collided = hasCollisionsWithObstacles(object, newPos, this.ctrl.state.objects);
                    if (!collided) {
                        positionComp.setPos(newPos);
                    }
                }
                else if (playerComp.state.moveAction.type === 'turn') {
                    positionComp.setDirection(playerComp.state.moveAction.direction);
                }
                playerComp.state.prevAction = playerComp.state.moveAction;
                playerComp.state.moveAction = undefined;
            }
        }));
        this.addComponent(HPComponentKey, new HPComponent({
            hp: MAX_PLAYER_HP,
        }, () => {
            //todo
        }, () => {
            //todo
        }));
        this.addComponent(SpellCasterComponentKey, new SpellCasterComponent({
            castSpell: false
        }, (object) => {
            this.ctrl.objectFactory.createSpell(object.require(PositionComponentKey));
        }));
        this.addComponent(SpellableComponentKey, new SpellableComponent());
        this.addVisual(PlayerVisual);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/BatVisual.ts



class BatVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const bat11 = pixi_es/* Texture.from */.xE.from('assets/bat21.png');
        const bat12 = pixi_es/* Texture.from */.xE.from('assets/bat22.png');
        // const bat21 = PIXI.Texture.from('assets/bat21.png')
        // const bat22 = PIXI.Texture.from('assets/bat22.png')
        const bat = new pixi_es/* AnimatedSprite */.Kg([bat11, bat12]);
        bat.animationSpeed = 0.1;
        bat.anchor.set(0.5);
        bat.scale.set(0.75 + Math.random() * 0.5);
        bat.tint = 0xff0000;
        bat.gotoAndPlay(0);
        this.view.addChild(bat);
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.object);
    }
}
//WTF?

// CONCATENATED MODULE: ./src/objects/BatObject.ts











class BatObject extends GameObject {
    constructor(ctrl, cell) {
        super(ctrl);
        this.addComponent(BatComponentKey, new BatComponent({
            needToMove: false,
        }));
        this.addPositionComponent(cell);
        this.addComponent(MovableComponentKey, new MovableComponent(undefined, (object) => {
            const batComp = object.require(BatComponentKey);
            batComp.state.needToMove = false;
            const batPositionComp = object.require(PositionComponentKey);
            const batScanningAreaSize = consts_TILE_SIZE * 6;
            const batScanningArea = getBBFromPoint(batPositionComp.state.pos, batScanningAreaSize, batScanningAreaSize);
            const playerInAttackArea = this.ctrl.state.players.find(p => {
                return isPointInsideBB(p.require(PositionComponentKey).state.pos, batScanningArea);
            });
            if (playerInAttackArea) {
                batComp.state.needToMove = true;
                const batPos = batPositionComp.state.pos;
                const batCell = positionToCell(batPos);
                if (isEqual(batCell, batComp.state.lastProcessedCell)) {
                    // skip processing
                }
                else {
                    const playerPos = playerInAttackArea.require(PositionComponentKey).state.pos;
                    const playerCell = positionToCell(playerPos);
                    const path = findPath(batCell, playerCell);
                    if (path.length > 0) {
                        const nextCell = path[0];
                        const direction = getDirectionByCell(batCell, nextCell);
                        batPositionComp.setDirection(direction);
                        batComp.state.lastProcessedCell = batCell;
                    }
                }
            }
            if (batComp.state.needToMove) {
                const speed = directionToVector(batPositionComp.state.direction, BAT_SPEED);
                const newPos = addVectors(batPositionComp.state.pos, speed, false);
                const collided = hasCollisionsWithObstacles(object, newPos, this.ctrl.state.objects);
                if (!collided) {
                    batPositionComp.setPos(newPos);
                }
                else {
                    batComp.state.lastProcessedCell = undefined;
                }
            }
        }));
        this.addComponent(HPComponentKey, new HPComponent({
            hp: 1,
        }, () => {
            //todo
        }, () => {
            this.destroyObject();
        }));
        this.addComponent(EnemyComponentKey, new EnemyComponent({
            attackPoints: 1
        }));
        this.addComponent(SpellableComponentKey, new SpellableComponent());
        this.addVisual(BatVisual);
    }
}

// CONCATENATED MODULE: ./src/visuals/objects/SpellVisual.ts




class SpellVisual extends BaseObjectVisual {
    constructor(object) {
        super(object);
        const positionComponent = this.object.require(PositionComponentKey);
        const g = new pixi_es/* Graphics */.TC();
        g.alpha = 0.6;
        g.beginFill(0xe71d36);
        g.drawCircle(0, 0, positionComponent.state.size.width / 2);
        g.endFill();
        this.view.addChild(g);
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.object);
    }
}

// CONCATENATED MODULE: ./src/objects/SpellObject.ts









class SpellObject extends GameObject {
    constructor(ctrl, spellCasterPosition) {
        super(ctrl);
        this.addComponent(SpellComponentKey, new SpellComponent({
            leftMoves: SPELL_LIFESPAN
        }));
        const shift = directionToVector(spellCasterPosition.state.direction, consts_TILE_SIZE * 0.6);
        this.addComponent(PositionComponentKey, new PositionComponent({
            pos: addVectors(Object.assign({}, spellCasterPosition.state.pos), shift),
            size: { width: consts_TILE_SIZE / 3, height: consts_TILE_SIZE / 3 },
            direction: spellCasterPosition.state.direction,
        }));
        this.addComponent(MovableComponentKey, new MovableComponent(undefined, (object) => {
            const positionComp = object.require(PositionComponentKey);
            const spellComp = object.require(SpellComponentKey);
            if (spellComp.state.leftMoves > 0) {
                spellComp.state.leftMoves--;
                const speed = directionToVector(positionComp.state.direction, SPELL_SPEED);
                addVectors(positionComp.state.pos, speed);
                positionComp.calcBoundingBox();
            }
            else {
                // spell is dead
                this.require(HPComponentKey).kill();
            }
        }));
        this.addComponent(HPComponentKey, new HPComponent({
            hp: 1,
        }, () => { }, () => {
            const positionComp = this.require(PositionComponentKey);
            this.ctrl.effects.showExplosion(positionComp.state.pos);
            this.destroyObject();
        }));
        this.addComponent(SpellableComponentKey, new SpellableComponent());
        this.addVisual(SpellVisual);
    }
}

// CONCATENATED MODULE: ./src/logic/GameObjectsFactory.ts






class GameObjectsFactory {
    constructor(ctrl, state) {
        this.ctrl = ctrl;
        this.state = state;
    }
    registerObject(object) {
        this.state.objects.push(object);
        //todo add dependencies for all existing components
        object.components.forEach((component, compKey) => {
            component.dependencies.forEach((dependencyComponentKey) => {
                if (!object.components.has(dependencyComponentKey)) {
                    throw new Error(`Component "${compKey}" depends on "${dependencyComponentKey}" but it is not added to object "${object.constructor.name}"`);
                }
            });
        });
        return object;
    }
    setEarthType(cell, type) {
        if (!this.state.earthCells[cell.i]) {
            this.state.earthCells[cell.i] = [];
        }
        this.state.earthCells[cell.j][cell.i] = Object.assign(Object.assign({}, cell), { type, impactingTransformers: {} });
    }
    ////////////////////////////////////////////////////////////////
    // Objects creation
    ////////////////////////////////////////////////////////////////
    createPlayer(cell, id, tintColor) {
        const object = this.registerObject(new PlayerObject(this.ctrl, cell, id, tintColor));
        this.state.players.push(object); // todo rethink
    }
    createBat(cell) {
        this.registerObject(new BatObject(this.ctrl, cell));
    }
    createSpell(spellCasterPosition) {
        this.registerObject(new SpellObject(this.ctrl, spellCasterPosition));
    }
    createTree(cell) {
        this.registerObject(new TreeObject(this.ctrl, cell));
    }
    createVolcano(cell) {
        this.registerObject(new VolcanoObject(this.ctrl, cell));
    }
    createWater(cell) {
        this.registerObject(new WaterObject(this.ctrl, cell));
    }
}

// CONCATENATED MODULE: ./src/logic/Controller.ts













class Controller {
    constructor(app) {
        this.visuals = [];
        this.state = {
            canvasScale: 1,
            canvasScaleInv: 1,
            canvasPositionX: 0,
            canvasPositionY: 0,
            mapSize: { width: 0, height: 0 },
            objects: [],
            players: [],
            earthCells: []
        };
        this.scene = new Scene(app, this.state);
        this.objectFactory = new GameObjectsFactory(this, this.state);
    }
    onGameStarted() {
        this.state.mapSize = buildMap(map1, this);
        const field = new GameFieldLayer(this.state);
        this.visuals.push(field);
        this.scene.bottomLayer.addChild(field.getView());
        this.effects = new EffectsLayer();
        this.visuals.push(this.effects);
        this.scene.effectsLayer.addChild(this.effects.getView());
        // const panel = new PanelLayer(this.state)
        // this.visuals.push(panel)
        // this.scene.stage.addChild(panel.getView())
    }
    //////////////////////////////////////////////////////////
    // GAME LOOP
    //////////////////////////////////////////////////////////
    onGameTick() {
        onGameTick(this, this.state);
        this.onCameraUpdate();
    }
    onCameraUpdate() {
        const playerObject = getPlayer(this.state, 1);
        const positionComp = playerObject.require(PositionComponentKey);
        const playerPosScreen = this.getCanvasToScreenPoint(positionComp.state.pos);
        const sceneSize = 900;
        const offsetForMovingBox = 200;
        const playersScreenBox = {
            top: offsetForMovingBox,
            left: offsetForMovingBox,
            right: sceneSize - offsetForMovingBox,
            bottom: sceneSize - offsetForMovingBox
        };
        const leftDiff = playersScreenBox.left - playerPosScreen.x;
        const rightDiff = playerPosScreen.x - playersScreenBox.right;
        const topDiff = playersScreenBox.top - playerPosScreen.y;
        const bottomDiff = playerPosScreen.y - playersScreenBox.bottom;
        if (leftDiff > 0) {
            this.state.canvasPositionX = -positionComp.state.pos.x * this.state.canvasScale + playersScreenBox.left;
        }
        if (rightDiff > 0) {
            this.state.canvasPositionX = -positionComp.state.pos.x * this.state.canvasScale + playersScreenBox.right;
        }
        if (topDiff > 0) {
            this.state.canvasPositionY = -positionComp.state.pos.y * this.state.canvasScale + playersScreenBox.top;
        }
        if (bottomDiff > 0) {
            this.state.canvasPositionY = -positionComp.state.pos.y * this.state.canvasScale + playersScreenBox.bottom;
        }
    }
    zoomIn() {
        this.state.canvasScale *= 1.1;
        this.updateZoom();
    }
    zoomOut() {
        this.state.canvasScale /= 1.1;
        this.updateZoom();
    }
    updateZoom() {
        this.state.canvasScaleInv = 1 / this.state.canvasScale;
        const playerObject = getPlayer(this.state, 1);
        const playerPosComp = playerObject.require(PositionComponentKey);
        this.state.canvasPositionX = -playerPosComp.state.pos.x * this.state.canvasScale + APP_WIDTH / 2;
        this.state.canvasPositionY = -playerPosComp.state.pos.y * this.state.canvasScale + APP_HEIGHT / 2;
    }
    // ##########################################
    // Inputs processing
    // ##########################################
    onPlayerMove(playerId, direction) {
        const playerObject = getPlayer(this.state, playerId);
        const playerComp = playerObject.require(PlayerComponentKey);
        const positionComp = playerObject.require(PositionComponentKey);
        const currentTime = Date.now();
        if (currentTime - playerComp.state.lastAssignedMoveTime < TIME_BETWEEN_MOVES) {
            return;
        }
        playerComp.state.lastAssignedMoveTime = currentTime;
        if (direction === positionComp.state.direction) {
            playerComp.state.moveAction = {
                type: 'move'
            };
        }
        else {
            playerComp.state.moveAction = {
                type: 'turn',
                direction
            };
        }
    }
    onPlayerSpell(playerId) {
        const playerObject = getPlayer(this.state, playerId);
        const playerComp = playerObject.require(PlayerComponentKey);
        const spellCasterComp = playerObject.require(SpellCasterComponentKey);
        const currentTime = Date.now();
        if (currentTime - playerComp.state.lastSpellTime < TIME_BETWEEN_SPELLS) {
            return;
        }
        playerComp.state.lastSpellTime = currentTime;
        spellCasterComp.state.castSpell = true;
    }
    // ##########################################
    // Utils
    // ##########################################
    getObjectsByPoint(point) {
        return this.state.objects.filter(obj => {
            const positionComp = obj.as(PositionComponentKey);
            if (positionComp) {
                return isPointInsideBB(point, positionComp.state.boundingBox);
            }
            else {
                return false;
            }
        });
    }
    getEarthCellByPoint(point) {
        try {
            const cell = positionToCell(point);
            return this.state.earthCells[cell.j][cell.i];
        }
        catch (e) {
            return undefined;
        }
    }
    getCanvasToScreenX(cnsX) {
        return cnsX * this.state.canvasScale + this.state.canvasPositionX;
    }
    getCanvasToScreenY(cnsY) {
        return cnsY * this.state.canvasScale + this.state.canvasPositionY;
    }
    getScreenToCanvasX(screenX) {
        return (screenX - this.state.canvasPositionX) * this.state.canvasScaleInv;
    }
    getScreenToCanvasY(screenY) {
        return (screenY - this.state.canvasPositionY) * this.state.canvasScaleInv;
    }
    getCanvasToScreenBB(canvasBB) {
        return {
            left: this.getCanvasToScreenX(canvasBB.left),
            right: this.getCanvasToScreenX(canvasBB.right),
            top: this.getCanvasToScreenY(canvasBB.top),
            bottom: this.getCanvasToScreenY(canvasBB.bottom),
        };
    }
    getCanvasToScreenPoint(canvasPoint) {
        return {
            x: this.getCanvasToScreenX(canvasPoint.x),
            y: this.getCanvasToScreenY(canvasPoint.y),
        };
    }
}

// CONCATENATED MODULE: ./src/DebugState.ts

class DebugState {
    constructor(canvas) {
        this.offsetX = 0;
        this.offsetY = 0;
        if (DEBUG_STATE) {
            this.div = document.createElement('div');
            this.div.classList.add('debug-state');
            document.body.appendChild(this.div);
            document.body.addEventListener('mousemove', (e) => {
                this.mousePosition = { x: e.clientX, y: e.clientY };
            });
            this.offsetX = canvas.offsetLeft;
            this.offsetY = canvas.offsetTop;
        }
    }
    update(ctrl) {
        if (this.div && this.mousePosition) {
            const canvasPosX = ctrl.getScreenToCanvasX(this.mousePosition.x - this.offsetX);
            const canvasPosY = ctrl.getScreenToCanvasY(this.mousePosition.y - this.offsetY);
            const point = { x: canvasPosX, y: canvasPosY };
            const earthCellInfo = JSON.stringify(ctrl.getEarthCellByPoint(point), null, 2);
            const objectsInfo = ''; //ctrl.getObjectsByPoint(point).map(o => this.stringify(o)).join('\n')
            this.div.innerHTML = `${earthCellInfo} \n ${objectsInfo}`;
        }
    }
    stringify(obj) {
        return JSON.stringify(obj, replacer, 2);
    }
}
function replacer(key, value) {
    if (key === 'components') {
        return Array.from(value.keys()).join();
    }
    if (key === 'field' && typeof value === 'object') {
        return '<...>';
    }
    return value;
}

// CONCATENATED MODULE: ./src/controls.ts
function controls_init(app, ctrl) {
    document.querySelector('#pause-button').addEventListener('click', () => {
        app.stop();
    });
    document.querySelector('#play-button').addEventListener('click', () => {
        app.start();
    });
    document.querySelector('#zoom-in-button').addEventListener('click', () => {
        ctrl.zoomIn();
    });
    document.querySelector('#zoom-out-button').addEventListener('click', () => {
        ctrl.zoomOut();
    });
}

// CONCATENATED MODULE: ./src/index.ts







const app = new pixi_es/* Application */.Mx({
    width: APP_WIDTH, height: APP_HEIGHT, backgroundColor: 0x222222, resolution: 1,
});
document.body.appendChild(app.view);
const debug = new DebugState(app.view);
const ctrl = new Controller(app);
ctrl.onGameStarted();
init(ctrl);
let prevTurnTime = Date.now();
app.ticker.add((delta) => {
    const curTime = Date.now();
    checkInputs(ctrl);
    if (curTime - prevTurnTime > GAME_TICK_DURATION_IN_MS) {
        ctrl.onGameTick();
        prevTurnTime = curTime;
    }
    ctrl.visuals.forEach(o => {
        if (o.shouldUpdate()) {
            const turnTimePercent = (curTime - prevTurnTime) / GAME_TICK_DURATION_IN_MS;
            o.update(turnTimePercent);
        }
    });
    ctrl.scene.updateCamera();
    debug.update(ctrl);
});
controls_init(app, ctrl);


/***/ })

},
0,[[467,666,244]]]);