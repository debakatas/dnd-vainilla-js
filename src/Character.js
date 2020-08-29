import state, { resetState } from './state';
import { DOMList, magicText, lifeChange } from './DOM';

class Character {
    constructor() {
        resetState();
        this.lp = 100;
        this.dp = 5;

        state.character = this;
    }

    inflictDamage() {
        state.enemy.receiveDamage(this.dp);
        return new Promise((res) => setTimeout(res, 1000));
    }

    receiveDamage(damage) {
        this.lp -= damage;
        lifeChange();

        if (this.lp <= 0) {
            Character.die();
        }
    }

    static die() {
        DOMList.player.setAttribute('src', '');
        magicText(
            `El ${state.enemy.name} ha sido un enemigo formidable, nuestro heroe necesitaba inflingir ${state.enemy.lp} puntos de daño para continuar su rumbo.

            Has perdido querido bardo.
            `
        );
    }
}

export default Character;
