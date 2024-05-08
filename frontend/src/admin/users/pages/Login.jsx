// import { useContext, useState } from "react";
// import Input from "../../../shared/components/form-elements/Input";
// import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/utils/validators";
// import Button from "../../../shared/components/form-elements/Button";
// import { useForm } from "../../../shared/hooks/form-hook";
// import { AuthContext } from "../../../shared/context/auth-context";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../../../shared/components/LoadingSpinner";

// const Login = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState();
//     const auth = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [formState, inputHandler, setFormData] = useForm({
//             email: {
//                 value: '',
//                 isValid: false,
//             },
//             password: {
//                 value: '',
//                 isValid: false,
//             },
//         }, 
//         false
//     );
//     const loginSubmitHandler = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         try {
//             const response = await fetch('http://localhost:3000/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: formState.inputs.email.value,
//                     password: formState.inputs.password.value,
//                 }),
//             });
//             if (response.status === 200) {
//                 const responseData = await response.json();
//                 console.log(responseData);
//                 auth.login();
//                 setIsLoading(false);
//                 navigate('/');
//             } else {
//                 setIsLoading(false);
//             }
//         } catch (error) {
//             setError(error.message || 'Some error occured');
//             setIsLoading(false);
//         }
//     };
//     return (
//         <div className="flex w-full h-screen justify-center place-items-center">
//             {isLoading && <LoadingSpinner />}
//             <form className="p-4" onSubmit={loginSubmitHandler}>
//                 <Input
//                     label="Email"
//                     id="email"
//                     element="input"
//                     type="text"
//                     placeholder="Type email here"
//                     errorText="Please enter valid email"
//                     onInput={inputHandler}
//                     validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
//                     initialValue={formState.inputs.email.value}
//                     initialIsValid={formState.inputs.email.value}
//                 />
//                 <Input
//                     label="Password"
//                     id="password"
//                     element="input"
//                     type="password"
//                     placeholder="Type password here"
//                     errorText="Password cannot be blank"
//                     onInput={inputHandler}
//                     validators={[VALIDATOR_REQUIRE()]}
//                     initialValue={formState.inputs.password.value}
//                     initialIsValid={formState.inputs.password.value}
//                 />
//                 <Button type="submit" disabled={!formState.isValid}>Submit</Button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import { useContext, useState } from 'react';
import Input from '../../../shared/components/form-elements/Input';
import Button from '../../../shared/components/form-elements/Button';
import { useForm } from '../../../shared/hooks/form-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, inputHandler, setFormData] = useForm(
        {
            username: {
                value: '',
                isValid: false,
            },
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const signUpSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formState.inputs.username.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                auth.login();
                setIsLoading(false);
                navigate('/sign-in');
            } else {
                setError(responseData.message || 'Sign up failed');
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message || 'Some error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            {isLoading && <LoadingSpinner />}
            <form className="p-4" onSubmit={signUpSubmitHandler}>
                <Input
                    label="Username"
                    id="username"
                    element="input"
                    type="text"
                    placeholder="Enter your username"
                    errorText="Please enter a valid username"
                    onInput={inputHandler}
                    validators={[]}
                    initialValue={formState.inputs.username.value}
                    initialIsValid={formState.inputs.username.isValid}
                />
                <Input
                    label="Email"
                    id="email"
                    element="input"
                    type="email"
                    placeholder="Enter your email"
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                    validators={[]}
                    initialValue={formState.inputs.email.value}
                    initialIsValid={formState.inputs.email.isValid}
                />
                <Input
                    label="Password"
                    id="password"
                    element="input"
                    type="password"
                    placeholder="Enter your password"
                    errorText="Password must be at least 6 characters"
                    onInput={inputHandler}
                    validators={[]}
                    initialValue={formState.inputs.password.value}
                    initialIsValid={formState.inputs.password.isValid}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default Login;
