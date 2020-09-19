import state, { resetState } from './state';
import { DOMList, magicText, lifeChange } from './DOM';

class Character {
    constructor() {
        resetState();
        this.lp = 100;
        this.dp = 5;
        this.item = null;

        state.character = this;
    }

    async inflictDamage() {
        await state.enemy.receiveDamage(this.dp);
    }

    receiveDamage(damage) {
        this.lp = Math.max(this.lp - damage, 0);

        DOMList.player.style.setProperty('--rotation', 300);
        DOMList.player.style.setProperty('--skew', 15);

        return new Promise((res) =>
            setTimeout(() => {
                lifeChange();

                DOMList.player.style.setProperty('--rotation', 0);
                DOMList.player.style.setProperty('--skew', 0);

                if (this.lp <= 0) {
                    Character.die();
                }

                res();
            }, 1000)
        );
    }

    addItem(item) {
        if (this.item) return;

        this.item = item;

        this.lp += item.health;
        this.dp += item.damage;
    }

    removeItem(item) {
        this.item.delete();

        this.lp += Math.ceil(item.damage / 2);
        this.dp -= item.damage;

        this.item = null;
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
