import { Actor, Color, vec, Vector } from 'excalibur';
import * as ex from 'excalibur';

export class MyComponent extends ex.Component<'customCollision'> {
  // Unique type name is required
  public readonly type = 'customCollision';

  public mydata: string = 'my custom data'
}