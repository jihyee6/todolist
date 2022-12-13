import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categories, categoryState, toDoSelector, toDostate } from '../atoms';
import CreateTodo from './createTodo';
import ToDo from './ToDo';




function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    
    return (
        <div>
            <h1>To Do</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value={categories.To_DO}>To Do</option>
                <option value={categories.DOING}>Doing</option>
                <option value={categories.DONE}>Done</option>
            </select>
            <CreateTodo/>
            
            <ul>
                {toDos.map(toDo => 
                    <ToDo key={toDo.id} {...toDo}/>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;