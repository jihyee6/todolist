import React from 'react';
import {useState} from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
    email: string;
    first_name: string;
    last_name: string;
    userName: string;
    password: string;
    password1: string;
    extraError?: string;
}

function HookForm(){
    const { register, handleSubmit ,formState:{errors} ,setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        }
    });
    const onValid = (data: IForm) => {
        if(data.password !== data.password1){
           return setError("password1", {message :"password are not the same"}, 
            {shouldFocus: true})//문제가 생긴곳으로 포커스 이동
        }
    }

    return (
        <div>
            <form 
                style={{display: "flex", flexDirection: "column"}} 
                onSubmit={handleSubmit(onValid)}
            >
                <input {...register("email",{
                        required:true,
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "only naver.com email allowed"
                        },
                    })} 
                        placeholder='email' 
                        type="text" />
                        <span>
                            {errors?.email?.message as string}
                        </span>
                <input {...register("first_name",{required:true, 
                    validate: {
                        noNico: (value) => 
                        value.includes("nico") ? "no nicos allowed": true,
                        noNick: (value) => 
                        value.includes("nick") ? "no Nicks allowed" :true
                    },
                        })} placeholder='First Name' type="text" />
                {errors?.first_name?.message as string}

                <input {...register("last_name",{required:true})} placeholder='Last Name' type="text" />
                {errors?.last_name?.message as string}

                <input {...register("userName",{required:true, minLength: 10})} placeholder='UserName' type="text" />
                {errors?.userName?.message as string}

                <input {...register("password",{required:true, minLength: 5})} placeholder='Password' type="text" />
                {errors?.password?.message as string}

                <input {...register("password1",{required:"passWord is required", minLength: {
                    value: 5,
                    message: "your password is too short."
                    }})} placeholder='Password1' type="text" />
                {errors?.password1?.message as string}

                <button>Add</button>
            </form>
        </div>
    );
}

export default HookForm();