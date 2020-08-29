const initialState = {
    enemy: null,
    item: null,
    character: null,
    playing: false,
};

const state = { ...initialState };

window.gameState = state;

export const resetState = () => {
    Object.entries(initialState).forEach(([key, value]) => {
        state[key] = value;
    });
};

export default state;
