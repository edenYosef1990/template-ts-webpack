import { Engine, Loader, DisplayMode, Physics } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { loader } from './resources';
import { Menu } from './scenes/menu';
import { Enemy } from './actors/enemy';
import { DebugObject } from './actors/debugObject';

/**
 * Managed game class
 */
class Game extends Engine {
  private debugUbject : DebugObject;
  private enemy: Enemy;
  private player: Player;
  private levelOne: LevelOne;
  private menu: Menu;

  constructor() {
    super({ displayMode: DisplayMode.FitScreen });
  }

  public start() {

    // Create new scene with a player
    
    this.debugUbject = new DebugObject();
    this.menu = new Menu();
    this.levelOne = new LevelOne();
    this.player = new Player();
    this.enemy = new Enemy();
    this.levelOne.add(this.player);
    this.levelOne.add(this.enemy);
    this.levelOne.add(this.debugUbject);

    //this.player.addComponent()

    game.add('menu', this.menu)
    game.add('levelOne', this.levelOne);

    // Automatically load all default resources

    return super.start(loader);
  }
}

Physics.useRealisticPhysics();
const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});
