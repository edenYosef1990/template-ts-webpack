import { ImageSource, SpriteSheet } from 'excalibur';
import sword from './images/sword.png';
import tiles from './images/tiles.png';
import * as ex from 'excalibur';
import excalibot from './images/excalibot.png';
import player_walk_strip6 from './images/player_walk_strip6.png';

const loader = new ex.Loader();

const Resources = {
    Sword: new ImageSource(sword),
    spriteSheet: new ImageSource(tiles),
    playerSpritesheet: new ImageSource(player_walk_strip6)
}
// frame 257
const spriteSheet = SpriteSheet.fromImageSource({
    image: Resources.spriteSheet,
    grid: {
        rows: 20,
        columns:20,
        spriteHeight: 16,
        spriteWidth: 16
    }
});

const playerSpritesheet = SpriteSheet.fromImageSource({
    image: Resources.playerSpritesheet,
    grid: {
        rows: 1,
        columns: 6,
        spriteHeight: 57,
        spriteWidth: 35
    }
})

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}


export { Resources , spriteSheet , loader , playerSpritesheet }
