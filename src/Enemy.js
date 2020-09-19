import { DOMList, magicText, clearText } from './DOM';
import state from './state';
import Item from './Item';

class Enemy {
    constructor({ name, img, sound, lp, dp, desc }, callback) {
        this.name = name;
        this.lp = lp;
        this.dp = dp;
        this.desc = desc;
        this.img = img;

        DOMList.audio.setAttribute('src', sound);

        this.born(callback);
        state.enemy = this;
    }

    async born(callback) {
        await magicText(this.desc);
        await clearText();
        DOMList.enemy.setAttribute('src', this.img);
        DOMList.enemy.style.animationPlayState = 'running';
        DOMList.audio.play();
        if (callback) callback();
    }

    async inflictDamage() {
        await state.character.receiveDamage(this.dp);
    }

    receiveDamage(damage) {
        this.lp -= damage;

        DOMList.enemy.style.setProperty('--scale', 1);
        DOMList.enemy.style.setProperty('--inversion', 1);

        setTimeout(() => {
            DOMList.enemy.style.setProperty('--scale', 0.8);
            DOMList.enemy.style.setProperty('--inversion', 0);

            if (this.lp <= 0) {
                Item.create();
                Enemy.die();
            }
        }, 300);

        return new Promise((res) => {
            setTimeout(() => {
                res();
            }, 1000);
        });
    }

    static die() {
        DOMList.enemy.setAttribute('src', '');
        state.enemy = null;
    }
}

export default Enemy;
