import state from './state';

export const DOMList = {
    text: 'text',
    enemy: 'active',
    lp: 'lp',
    audio: 'audio',
    item: 'item',
    player: 'player',
};

const SPEED = 10;

const letterByLetter = (str, resolve) => {
    if (!str.length) {
        resolve();
        return;
    }

    const [first, second] = str;
    const isSpace = first === ' ';
    DOMList.text.innerText += isSpace ? ` ${second}` : first;

    setTimeout(() => {
        letterByLetter(str.substr(isSpace ? 2 : 1), resolve);
    }, SPEED);
};

export const magicText = (str) => {
    DOMList.text.innerText = '';
    DOMList.text.style.opacity = 1;

    return new Promise((resolve, reject) => {
        letterByLetter(str, resolve);
    });
};

export const clearText = () => {
    DOMList.text.style.opacity = 0;

    return new Promise((resolve) => {
        DOMList.text.addEventListener('transitionend', () => {
            resolve();
        });
    });
};

const lifeChanger = (current, target) => {
    DOMList.lp.innerText = String(current).padStart(3, '0');

    if (current === target || current < 1) return;

    setTimeout(() => {
        lifeChanger(current - 1, target);
    }, SPEED);
};

export const lifeChange = () => {
    const initial = Number(DOMList.lp.innerText);
    const newLP = state.character.lp;

    lifeChanger(initial, newLP);
};

window.addEventListener('DOMContentLoaded', () => {
    Object.entries(DOMList).forEach(([key, value]) => {
        DOMList[key] = document.getElementById(value);
    });
});
