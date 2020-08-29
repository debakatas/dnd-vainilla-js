import { DOMList, magicText, clearText } from './DOM';
import state from './state';

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

    inflictDamage() {
        state.character.receiveDamage(this.dp);
        return new Promise((res) => setTimeout(res, 1000));
    }

    receiveDamage(damage) {
        this.lp -= damage;
        console.log(this.lp);
        if (this.lp <= 0) {
            Enemy.die();
        }
    }

    static die() {
        DOMList.enemy.setAttribute('src', '');
        state.enemy = null;
    }
}

export default Enemy;
