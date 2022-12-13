import { atom, selector } from "recoil";

// type categories = "To_DO" | "DOING" | "DONE";
export enum categories {
    "To_DO" = "To_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface IToDo{
    text: string;
    category: categories;
    id: number;
}

export const categoryState = atom<categories>({
    key: "category",
    default : categories.To_DO,
})

export const toDostate = atom<IToDo[]>({
    key: "toDo",
    default:[],
})

export const toDoSelector = selector({
    key: "todoSelector",
    get: ({get}) => {
        const toDos = get(toDostate);
        const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
    }
})

// [ //toDos를 사용해서 category 이름이 같은것만 출력
//     toDos.filter((toDo) => toDo.category === "To_DO"),
//     toDos.filter((toDo) => toDo.category === "DOING"),
//     toDos.filter((toDo) => toDo.category === "DONE"),
// ]