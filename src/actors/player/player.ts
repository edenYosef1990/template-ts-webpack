import { Actor, Color, vec, Vector } from 'excalibur';
import { Resources } from '../../resources';
import { spriteSheet , playerSpritesheet } from '../../resources';
import * as ex from 'excalibur';

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255),
      collisionType: ex.CollisionType.Passive
    });
  }

  getRange(start: number, end: number) {
    let bla: number[] = [];
    while (start <= end) bla.push(start++);
    return bla;
  }

  sword : ex.Sprite;



  onInitialize() {

    const idle = ex.Animation.fromSpriteSheet(playerSpritesheet,[1],100);
    const moving = ex.Animation.fromSpriteSheet(playerSpritesheet, this.getRange(1,6), 100);
    this.sword = ex.Sprite.from(Resources.Sword);
    //moving.scale = new ex.Vector(2, 2);
    this.graphics.layers.create({ name: 'body', order: 2 });
    this.graphics.layers.create({ name: 'weapon', order: 1 });
    this.graphics.layers.get('weapon').offset = new Vector(30,5);
    this.graphics.add("idle",idle);
    this.graphics.add("moving", moving);
    this.graphics.add("sword", this.sword);
    this.graphics.hide();
    //this.graphics.use("idle");
    this.graphics.layers.get('body').use('idle');
    this.graphics.layers.get('weapon').use('sword');
    this.sword.rotation = Math.PI * 0.3;
  }

  func(vec : Vector){

    function getAngle(x : number, y : number) {
      var angle = Math.atan2(y, x);
      var degrees = 180 * angle / Math.PI;
      return (360 + Math.round(degrees)) % 360;
  }

    const diff = {
      x : (this.pos.x - vec.x),
      y : (this.pos.y - vec.y)
    };
    const angle = getAngle(diff.x,diff.y) + 165;
    //this.sword.rotation = angle * (Math.PI * 2 / 360);
    this.rotation = angle * (Math.PI * 2 / 360);
  }

  onPreUpdate(engine: ex.Engine, delta: number) {

    this.func(engine.input.pointers.primary.lastScreenPos);
    //this.sword.rotation += 0.01;
    // console.log(this.sword.rotation);

    if(
      !engine.input.keyboard.isHeld(ex.Input.Keys.Left) &&
      !engine.input.keyboard.isHeld(ex.Input.Keys.Right) &&
      !engine.input.keyboard.isHeld(ex.Input.Keys.Up) &&
      !engine.input.keyboard.isHeld(ex.Input.Keys.Down)
    ) {
      this.vel.x = 0;
      this.vel.y = 0;
      //this.graphics.use("idle");
      this.graphics.layers.get('body').use('idle');
      return;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.vel.x = -150;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      this.vel.x = 150;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      this.vel.y = 150;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      this.vel.y = -150;
    }
    this.graphics.layers.get('body').use('moving');
    //this.sword.rotation = 80;
  }
}
