import * as items from './items';
import { DOMList } from './DOM';
import state from './state';

class Item {
    constructor({ name, health, image, damage }) {
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.image = image;
    }

    static create() {
        const item = new Item(Object.values(items)[Math.random > 0.5 ? 0 : 1]);
        DOMList.item.setAttribute('src', item.image);
        state.character.addItem(item);
    }

    static delete() {
        DOMList.item.setAttribute('src', '');
    }
}

export default Item;
