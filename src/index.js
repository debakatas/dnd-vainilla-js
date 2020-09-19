import { cambion, goblin, vampiro } from './enemies';
import Enemy from './Enemy';
import Character from './Character';
import { pause, bool } from './utils';
import state from './state';
import { magicText } from './DOM';

let enemies = [goblin, cambion, vampiro];

const createEnemy = () => {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    const currentEnemy = new Enemy(enemies[randomIndex], async () => {
        await gameplay();
    });
    enemies = enemies.filter((e, index) => index !== randomIndex);
};

const win = () => {
    magicText(
        `
¡Felicidades caballero!
Has derrotado a feroces enemigos, y has sobrevido con ${state.character.lp} puntos de vida. Ha estado cerca.

Vuelve en otra ocasión para enfrentarte al mal.
`
    );
};

const fight = async () => {
    await state.character.inflictDamage();
    await pause();

    if (state.enemy) await state.enemy.inflictDamage();
};

const gameplay = async () => {
    await pause();
    const myCase = `${bool(state.enemy)}${bool(state.character.lp)}${bool(
        enemies.length
    )}`;

    switch (myCase) {
        case '111': {
            await fight();
            gameplay();
            break;
        }
        case '011': {
            createEnemy();
            break;
        }
        case '010': {
            win();
            break;
        }
        case '110': {
            await fight();
            gameplay();
            break;
        }
        default:
            break;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const player = new Character();
    createEnemy();
});
