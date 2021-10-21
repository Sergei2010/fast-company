export const Badge_Classe = "m-2 badge bg-";

export const Title_Classe = "badge mt-2 bg-";

export const Bookmark_Classe = "bi bi-bookmark";

export const handleRenderPhrase = (num) => {
    // eslint-disable-next-line multiline-ternary
    return num === 0
        // eslint-disable-next-line multiline-ternary
        ? "Никто не тусанёт"
        // eslint-disable-next-line multiline-ternary
        : [5, 6, 7, 8, 9, 10, 11, 12].find((el) => el === num)
        // eslint-disable-next-line multiline-ternary
        ? num + " человек тусанут"
        // eslint-disable-next-line multiline-ternary
        : [2, 3, 4].find((el) => el === num)
        // eslint-disable-next-line multiline-ternary
        ? num + " человека тусанёт"
        // eslint-disable-next-line multiline-ternary
        : num === 1
        // eslint-disable-next-line multiline-ternary
        ? num + " человек тусанёт"
        : "Весь этот коллектив";
};

export const handleRenderColor = (num) => {
    return num === 0 ? "danger" : "primary";
};
