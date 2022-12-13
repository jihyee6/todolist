import React from 'react';
import { useSetRecoilState } from 'recoil';
import { categories, IToDo, toDostate } from '../atoms';

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDostate);
    const onClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        setToDos((oldTodos) => {
            const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
            const oldTodo = oldTodos[targetIndex];
            const newTodo = {text, id, category: name as any};
            return [
                ...oldTodos.slice(0,targetIndex),
                newTodo,
                ...oldTodos.slice(targetIndex+1)];
        })
    };
    return (
        <li>
            <span>{text}</span>
            {category !== categories.To_DO &&
                <button name={categories.To_DO} onClick={onClick}>Doing</button>}
            {category !== categories.DOING &&
                <button name={categories.DOING} onClick={onClick}>To Do</button>}
            {category !== categories.DONE &&
                <button name={categories.DONE} onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;