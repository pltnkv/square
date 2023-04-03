(self["webpackChunksquare"] = self["webpackChunksquare"] || []).push([[179],{

/***/ 2:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/pixi.js/lib/pixi.es.js + 37 modules
var pixi_es = __webpack_require__(244);
// CONCATENATED MODULE: ./src/logic/Direction.ts
var Direction;
(function (Direction) {
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Up"] = 3] = "Up";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
/* harmony default export */ const logic_Direction = (Direction);

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

// CONCATENATED MODULE: ./src/consts.ts
//colors:
//black 011627
//white fdfffc
//biruzoviy 2ec4b6
//red e71d36
//orange ff9f1c
const TILE_SIZE = 90;
const FIELD_SIZE = 10;
const GAME_TICK_DURATION_IN_MS = 100;
const TIME_BETWEEN_MOVES = 80;
const TIME_BETWEEN_SPELLS = 500;
const MAX_SPELL_CHARGES = 2;
const MAX_HP = 3;
const SPELL_LIFESPAN = 16;
const MAX_BAT_STEPS_IN_LINE = 30;
const PLAYER_SPEED = 30;
const SPELL_SPEED = 40;
const BAT_SPEED = 10;
const DEBUG_SIZES = true;
const DEBUG_STATE = false;

// CONCATENATED MODULE: ./src/objects/BaseVisual.ts
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

// CONCATENATED MODULE: ./src/objects/GameFieldLayer.ts



class GameFieldLayer extends BaseVisual {
    constructor(state) {
        super();
        this.state = state;
        this.view = new pixi_es/* Graphics */.TC();
    }
    getView() {
        return this.view;
    }
    update() {
        this.view.clear();
        //create field
        for (let i = 0; i < FIELD_SIZE; i++) {
            for (let j = 0; j < FIELD_SIZE; j++) {
                this.view.beginFill(0xfdfffc);
                this.view.lineStyle(1, 0x011627, 1);
                this.view.drawRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                this.view.endFill();
            }
        }
    }
}

// CONCATENATED MODULE: ./src/objects/EffectsLayer.ts


class EffectsLayer extends BaseVisual {
    constructor() {
        super();
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

// CONCATENATED MODULE: ./src/objects/PanelLayer.ts


class PanelLayer extends BaseVisual {
    constructor(state) {
        super();
        this.state = state;
        this.view = new pixi_es/* Graphics */.TC();
    }
    getView() {
        return this.view;
    }
    update(turnTimePercent) {
        const MAX_LEN = 400;
        this.view.clear();
        this.view.lineStyle(1, 0x011627, 1);
        this.view.drawRect(200, 10, MAX_LEN, 20);
        this.view.endFill();
        // this.view.beginFill(0xe71d36)
        // this.view.drawRect(200, 10, lerp(0, MAX_LEN, turnTimePercent), 20)
        // this.view.endFill()
    }
}

// CONCATENATED MODULE: ./src/utils/mathUtils.ts

function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}
function addVectors(target, added) {
    target.x += added.x;
    target.y += added.y;
    return target;
}
function multVector(target, value) {
    target.x *= value;
    target.y += value;
    return target;
}
function getBoundingBoxFromObj(obj) {
    return {
        left: obj.pos.x - obj.size.width / 2,
        right: obj.pos.x + obj.size.width / 2,
        top: obj.pos.y - obj.size.height / 2,
        bottom: obj.pos.y + obj.size.height / 2,
    };
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

// CONCATENATED MODULE: ./src/utils/stateUtils.ts


////////////////////////////////////////////
// There is no function that change state
////////////////////////////////////////////
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
function findEmptySell() {
    //TODO убедиться что в этой точке нет игроков
    return {
        x: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
        y: Math.ceil(Math.random() * 5) * TILE_SIZE - TILE_SIZE / 2,
    };
}
const directions = [logic_Direction.Up, logic_Direction.Down, logic_Direction.Left, logic_Direction.Right];
function getRandomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}
function getPlayer(state, playerId) {
    return state.players.find(p => p.id === playerId);
}
function cellToCoord(i) {
    return i * TILE_SIZE + TILE_SIZE / 2;
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
    //run spell or move player
    state.players.forEach(player => {
        if (player.destroyed) {
            return;
        }
        if (player.moveAction) {
            if (player.moveAction.type === 'move') {
                const speed = directionToVector(player.direction, PLAYER_SPEED);
                addVectors(player.pos, speed);
            }
            else if (player.moveAction.type === 'turn') {
                // do nothing
            }
            player.moveAction = undefined;
        }
        if (player.fireSpell) {
            ctrl.createSpell(player);
            player.fireSpell = false;
        }
    });
    // move bats
    state.bats.forEach(bat => {
        if (bat.plannedStepInDirection > 0) {
            // do move
            bat.plannedStepInDirection--;
            // todo
            // const speed = getSpeedByDirection(bat.direction, BAT_SPEED)
            // addVectorPointWithMutation(bat.pos, speed)
        }
        else {
            //change direction
            bat.direction = getRandomDirection();
            // bat.plannedStepInDirection = Math.round(Math.random() * MAX_BAT_STEPS_IN_LINE)
            bat.plannedStepInDirection = MAX_BAT_STEPS_IN_LINE;
        }
    });
    //move spell
    state.spells.forEach(spell => {
        if (spell.leftMoves > 0) {
            spell.leftMoves--;
            const speed = directionToVector(spell.direction, SPELL_SPEED);
            addVectors(spell.pos, speed);
        }
    });
    ////////////////////////////////////////////////
    // CREATE NEW OBJECTS
    ////////////////////////////////////////////////
    // spawn bats
    if (state.bats.length < 1) {
        // if (state.bats.length < 3 && Math.random() > 0.8) {
        ctrl.createBat();
    }
    ////////////////////////////////////////////////
    // CHECK COLLISIONS
    ////////////////////////////////////////////////
    //check spell collision
    state.spells.forEach(spell => {
        state.players.forEach(player => {
            if (hasCollision(spell, player)) {
                spell.leftMoves = 0;
                reduceHP(player);
            }
        });
        state.bats.forEach(bat => {
            if (hasCollision(spell, bat)) {
                spell.leftMoves = 0;
                reduceHP(bat);
            }
        });
    });
    //check collision player with bats
    state.bats.forEach(bat => {
        state.players.forEach(player => {
            if (hasCollision(bat, player)) {
                reduceHP(bat);
                reduceHP(player);
            }
        });
    });
    ////////////////////////////////////////////////
    // CLEAN UP
    ////////////////////////////////////////////////
    state.spells = state.spells.filter(o => {
        const destroyed = o.leftMoves === 0;
        if (destroyed) {
            ctrl.removeVisual(o.visual);
        }
        return !destroyed;
    });
    state.bats = state.bats.filter(o => {
        const destroyed = o.hp === 0;
        if (destroyed) {
            ctrl.removeVisual(o.visual);
            ctrl.effects.showExplosion(o.pos);
        }
        return !destroyed;
    });
    state.players.forEach(o => {
        const destroyed = o.hp === 0;
        if (destroyed) {
            ctrl.removeVisual(o.visual);
            ctrl.effects.showExplosion(o.pos);
        }
    });
}
function hasCollision(obj1, obj2) {
    const box1 = getBoundingBoxFromObj(obj1);
    const box2 = getBoundingBoxFromObj(obj2);
    if (box1.left > box2.right || box1.right < box2.left || box1.top > box2.bottom || box1.bottom < box2.top) {
        // no collision
        return false;
    }
    // collision detected
    return true;
}
function reduceHP(obj) {
    if (obj.hp > 0) {
        obj.hp--;
    }
}

// CONCATENATED MODULE: ./src/utils/moveUtils.ts

function applyPosition(view, obj) {
    view.x = obj.pos.x;
    view.y = obj.pos.y;
}
function applyPositionAndRotation(view, obj) {
    view.x = obj.pos.x;
    view.y = obj.pos.y;
    view.rotation = directionToRad(obj.direction);
}

// CONCATENATED MODULE: ./src/utils/debugUtils.ts

function addDebugView(view, obj) {
    const g = new pixi_es/* Graphics */.TC();
    g.lineStyle(1, 0xff9f1c, 0.8);
    g.drawRect(-obj.size.width / 2, -obj.size.height / 2, obj.size.width, obj.size.height);
    view.addChild(g);
}

// CONCATENATED MODULE: ./src/objects/BaseObjectVisual.ts





class BaseObjectVisual extends BaseVisual {
    constructor(state) {
        super();
        this.view = new pixi_es/* Container */.W2();
        this.state = state;
        if (DEBUG_SIZES) {
            addDebugView(this.view, state);
        }
    }
    getView() {
        return this.view;
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.state);
    }
}

// CONCATENATED MODULE: ./src/objects/movable/SpellVisual.ts



class SpellVisual extends BaseObjectVisual {
    constructor(state) {
        super(state);
        const g = new pixi_es/* Graphics */.TC();
        g.alpha = 0.6;
        g.beginFill(0xe71d36);
        g.drawCircle(0, 0, state.size.width / 2);
        g.endFill();
        this.view.addChild(g);
    }
    update(turnTimePercent) {
        applyPositionAndRotation(this.view, this.state);
    }
}

// CONCATENATED MODULE: ./src/objects/movable/PlayerVisual.ts




class PlayerVisual extends BaseObjectVisual {
    constructor(state) {
        super(state);
        const texture = pixi_es/* Texture.from */.xE.from('assets/bunny.png');
        const bunny = new pixi_es/* Sprite */.jy(texture);
        bunny.anchor.set(0.5);
        bunny.scale.set(1.4);
        bunny.x = 0;
        bunny.y = 0;
        bunny.tint = state.tintColor;
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
        applyPositionAndRotation(this.view, this.state);
        this.view.alpha = this.state.hp / MAX_HP;
    }
}

// CONCATENATED MODULE: ./src/objects/movable/BatVisual.ts



class BatVisual extends BaseObjectVisual {
    constructor(state) {
        super(state);
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
        applyPositionAndRotation(this.view, this.state);
    }
}
//WTF?

// CONCATENATED MODULE: ./src/objects/movable/TreeVisual.ts



class TreeVisual extends BaseObjectVisual {
    constructor(state) {
        super(state);
        const texture = pixi_es/* Texture.from */.xE.from('assets/tree.png');
        const tree = new pixi_es/* Sprite */.jy(texture);
        tree.anchor.set(0.5);
        tree.x = 0;
        tree.y = 0;
        tree.scale.set(0.45);
        this.view.addChild(tree);
    }
    update(turnTimePercent) {
        applyPosition(this.view, this.state);
    }
}

// CONCATENATED MODULE: ./src/logic/Controller.ts












class Controller {
    constructor(scene) {
        this.visuals = [];
        this.scene = scene;
        const fieldSells = [];
        for (let i = 0; i < FIELD_SIZE; i++) {
            for (let j = 0; j < FIELD_SIZE; j++) {
                fieldSells.push({ i, j, type: undefined });
            }
        }
        this.state = {
            viewport: {
                changed: true,
                value: undefined,
            },
            field: fieldSells,
            players: [],
            spells: [],
            bats: [],
            trees: [],
            doCleanUp: false
        };
    }
    onGameStarted() {
        const panel = new PanelLayer(this.state);
        this.visuals.push(panel);
        this.scene.stage.addChild(panel.getView());
        const field = new GameFieldLayer(this.state);
        this.visuals.push(field);
        this.scene.mainLayer.addChild(field.getView());
        this.createPlayer(0, 0x2ec4b6, 0x2ec4b6);
        this.createPlayer(1, 0xfd4976, 0xfd4976);
        this.createBat();
        this.createBat();
        this.createBat();
        this.createTree({ i: 3, j: 3 });
        this.createTree({ i: 6, j: 6 });
        this.effects = new EffectsLayer();
        this.visuals.push(this.effects);
        this.scene.mainLayer.addChild(this.effects.getView());
    }
    //////////////////////////////////////////////////////////
    // CREATE OBJECTS
    //////////////////////////////////////////////////////////
    createPlayer(id, tintColor, nextStepColor) {
        const pos = id === 0 ? {
            x: TILE_SIZE / 2,
            y: TILE_SIZE / 2
        } : {
            x: TILE_SIZE * 3 + TILE_SIZE / 2,
            y: TILE_SIZE / 2
        };
        const playerState = {
            id,
            direction: logic_Direction.Down,
            destroyed: false,
            tintColor,
            nextStepColor,
            hp: MAX_HP,
            moveAction: undefined,
            visual: undefined,
            size: { width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8 },
            pos,
            fireSpell: false,
            lastAssignedMoveTime: 0,
            lastSpellTime: 0
        };
        this.state.players.push(playerState);
        const player = new PlayerVisual(playerState);
        playerState.visual = player;
        this.visuals.push(player);
        this.scene.mainLayer.addChild(player.getView());
    }
    createBat() {
        // create state
        const newBatState = {
            pos: findEmptySell(),
            size: { width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8 },
            plannedStepInDirection: 0,
            direction: logic_Direction.Down,
            hp: 1,
            visual: undefined
        };
        this.state.bats.push(newBatState);
        // create visual
        const batLayer = new BatVisual(newBatState);
        newBatState.visual = batLayer;
        this.visuals.push(batLayer);
        this.scene.mainLayer.addChild(batLayer.getView());
    }
    createSpell(player) {
        const shift = directionToVector(player.direction, TILE_SIZE / 3);
        const newSpell = {
            direction: player.direction,
            pos: addVectors(Object.assign({}, player.pos), shift),
            size: { width: TILE_SIZE / 3, height: TILE_SIZE / 3 },
            visual: undefined,
            leftMoves: SPELL_LIFESPAN
        };
        this.state.spells.push(newSpell);
        // create visual
        const spellLayer = new SpellVisual(newSpell);
        newSpell.visual = spellLayer;
        this.visuals.push(spellLayer);
        this.scene.mainLayer.addChild(spellLayer.getView());
    }
    createTree(cell) {
        const newTree = {
            direction: logic_Direction.Down,
            pos: { x: cellToCoord(cell.i), y: cellToCoord(cell.j) },
            size: { width: TILE_SIZE * 0.9, height: TILE_SIZE * 0.9 },
            visual: undefined,
            hp: 1
        };
        this.state.trees.push(newTree);
        // create visual
        const visual = new TreeVisual(newTree);
        newTree.visual = visual;
        this.visuals.push(visual);
        this.scene.mainLayer.addChild(visual.getView());
    }
    //////////////////////////////////////////////////////////
    // REMOVE OBJECTS
    //////////////////////////////////////////////////////////
    removeVisual(visual) {
        const index = this.visuals.findIndex(v => v === visual);
        if (index !== -1) {
            this.visuals.splice(index, 1);
            const view = visual.getView();
            view.parent.removeChild(view);
        }
    }
    //////////////////////////////////////////////////////////
    // GAME LOOP
    //////////////////////////////////////////////////////////
    onGameTick() {
        onGameTick(this, this.state);
    }
    onGameTickCleanup() {
    }
    // ##########################################
    // Inputs processing
    // ##########################################
    onPlayerMove(playerId, direction) {
        const player = getPlayer(this.state, playerId);
        const currentTime = Date.now();
        if (currentTime - player.lastAssignedMoveTime < TIME_BETWEEN_MOVES) {
            return;
        }
        player.lastAssignedMoveTime = currentTime;
        if (direction === player.direction) {
            player.moveAction = {
                type: 'move'
            };
        }
        else {
            player.moveAction = {
                type: 'turn',
                direction
            };
            //apply immediately
            player.direction = direction;
        }
    }
    onPlayerSpell(playerId) {
        const player = getPlayer(this.state, playerId);
        const currentTime = Date.now();
        if (currentTime - player.lastSpellTime < TIME_BETWEEN_SPELLS) {
            return;
        }
        player.lastSpellTime = currentTime;
        player.fireSpell = true;
    }
}

// CONCATENATED MODULE: ./src/Scene.ts

class Scene {
    constructor(app) {
        this.stage = app.stage;
        const container = new pixi_es/* Container */.W2();
        this.mainLayer = container;
        this.mainLayer.y = 40;
        app.stage.addChild(container);
        // container.x = app.screen.width / 2
        // container.y = app.screen.height / 2
        // container.pivot.x = container.width / 2
        // container.pivot.y = container.height / 2
    }
}

// CONCATENATED MODULE: ./src/DebugState.ts

class DebugState {
    constructor() {
        if (DEBUG_STATE) {
            this.div = document.createElement('div');
            this.div.classList.add('debug-state');
            document.body.appendChild(this.div);
        }
    }
    update(state) {
        if (this.div) {
            this.div.innerHTML = JSON.stringify(state, replacer, 2);
        }
    }
}
function replacer(key, value) {
    if (key === 'visual') {
        return '<Visual...>';
    }
    if (key === 'field' && typeof value === 'object') {
        return '<...>';
    }
    return value;
}

// CONCATENATED MODULE: ./src/controls.ts
function controls_init(app) {
    document.querySelector('#pause-button').addEventListener('click', () => {
        app.stop();
    });
    document.querySelector('#play-button').addEventListener('click', () => {
        app.start();
    });
}

// CONCATENATED MODULE: ./src/index.ts








const app = new pixi_es/* Application */.Mx({
    width: 1000, height: 1000, backgroundColor: 0x1099bb, resolution: 1,
});
document.body.appendChild(app.view);
const debug = new DebugState();
const scene = new Scene(app);
const ctrl = new Controller(scene);
ctrl.onGameStarted();
init(ctrl);
let prevTurnTime = Date.now();
app.ticker.add((delta) => {
    const curTime = Date.now();
    let turnOccurred = false;
    checkInputs(ctrl);
    if (curTime - prevTurnTime > GAME_TICK_DURATION_IN_MS) {
        turnOccurred = true;
        ctrl.onGameTick();
        prevTurnTime = curTime;
    }
    ctrl.visuals.forEach(o => {
        if (o.shouldUpdate()) {
            const turnTimePercent = (curTime - prevTurnTime) / GAME_TICK_DURATION_IN_MS;
            o.update(turnTimePercent);
        }
    });
    if (turnOccurred) {
        ctrl.onGameTickCleanup();
    }
    debug.update(ctrl.state);
});
controls_init(app);


/***/ })

},
0,[[2,666,244]]]);