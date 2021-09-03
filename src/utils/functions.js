export const Badge_Classe = "m-2 badge bg-";

export const Title_Classe = "badge mt-2 bg-";

export const Bookmark_Classe = "bi bi-bookmark";

export const handleRenderPhrase = (num) => {
    return num === 0
        ? "Никто не тусанёт"
        : [5, 6, 7, 8, 9, 10, 11, 12].find((el) => el === num)
        ? num + " человек тусанут"
        : [2, 3, 4].find((el) => el === num)
        ? num + " человека тусанёт"
        : num === 1
        ? num + " человек тусанёт"
        : "Весь этот коллектив";
};

export const handleRenderColor = (num) => {
    return num === 0 ? "danger" : "primary";
};
