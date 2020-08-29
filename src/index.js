import { cambion, goblin, vampiro } from './enemies';
import Enemy from './Enemy';
import Character from './Character';
import state from './state';

const enemies = [goblin, cambion, vampiro];

const createEnemy = () => {
    const currentEnemy = new Enemy(enemies[0], () => {
        gameplay();
    });
    enemies.shift();
};

const win = () => {};

const gameplay = async () => {
    if (state.character.lp && enemies.length) {
        await state.character.inflictDamage();

        if (state.enemy) {
            await state.enemy.inflictDamage();

            if (!state.character.lp) return;
        }

        if (!state.enemy && enemies.length) {
            createEnemy();
        } else if (!state.enemy && !enemies.length) {
            win();
            return;
        }

        gameplay();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const player = new Character();
    createEnemy();
});
