import { Engine, Scene } from 'excalibur';
import * as ex from 'excalibur';
import {Resources} from '../resources';

class StartButton extends ex.ScreenElement {
  constructor() {
    super({
      x: 50,
      y: 50,
    })
  }

text = new ex.Text({
    text: 'Some Text Drawn Here\nNext line'
});

  onInitialize() {
    const tile = ex.Sprite.from(Resources.Sword);
    const group = new ex.GraphicsGroup({
      members: [
        {
          graphic : tile,
          pos: ex.vec(50,50)
        },
        {
          graphic: this.text,
          pos: ex.vec(100,50)
        }
      ]
    });
    this.graphics.add('group',group);
    this.graphics.use('group');
  }
}

/**
 * Managed scene
 */
export class Menu extends Scene {
  public onInitialize(engine: Engine) {
    engine.add(new StartButton())
  }
  public onActivate() {}
  public onDeactivate() {}
}