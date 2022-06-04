import { Actor, Color, vec, Vector } from 'excalibur';
import { Resources } from '../resources';
import { spriteSheet, playerSpritesheet } from '../resources';
import * as ex from 'excalibur';

export class Enemy extends Actor {
    constructor() {
        super({
            pos: vec(150, 50),
            width: 25,
            height: 25,
            color: new Color(255, 255, 255),
            collisionType: ex.CollisionType.Fixed
        });
    }

    getRange(start: number, end: number) {
        let bla: number[] = [];
        while (start <= end) bla.push(start++);
        return bla;
      }

    onInitialize() {
        const idle = ex.Animation.fromSpriteSheet(playerSpritesheet,[1],100);
        const moving = ex.Animation.fromSpriteSheet(playerSpritesheet, this.getRange(1,6), 100);
        //moving.scale = new ex.Vector(2, 2);
        this.graphics.layers.create({ name: 'body', order: 2 });
        this.graphics.add("idle",idle);
        this.graphics.add("moving", moving);
        this.graphics.hide();
        //this.graphics.use("idle");
        this.graphics.layers.get('body').use('idle');
    }

    onPreUpdate(engine: ex.Engine, delta: number) {

    }
}