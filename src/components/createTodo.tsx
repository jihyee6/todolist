import React from 'react';
import {useForm} from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDostate } from '../atoms';

interface IForm{
    toDo: string;
}

function CreateTodo() {
    const setToDos = useSetRecoilState(toDostate);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) => {
        
        setToDos(oldToDos => [
            {text: toDo,id: Date.now(), category}, ...oldToDos])
        setValue("toDo","");
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",{
                    required: "Please Write a to do"
                })} placeholder={"write a to dos"} />
                <button>Add</button>
            </form>
        </>
    );
}

export default CreateTodo;