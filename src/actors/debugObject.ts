import { Actor, Color, vec } from "excalibur";
import * as ex from 'excalibur';

export class DebugObject extends Actor {

    private currentAngle : number = 0;

    constructor() {
      super({
        pos: vec(300, 300),
        width: 25,
        height: 200,
        color: new Color(221, 160, 221),
        collisionType: ex.CollisionType.Passive
      });

      this.on('collisionstart' , () => {console.log("hello123!")});
    }

    onPreUpdate(engine: ex.Engine, delta: number) {
        this.rotation = (this.currentAngle) * (Math.PI * 2 / 360);
        this.currentAngle = (this.currentAngle + 0.3) % 360;
        this.vel.x = 0;
        this.vel.y = 0;
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        console.log("collision!123");
    }
}