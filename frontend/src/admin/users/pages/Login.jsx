import { useContext, useState } from "react";
import Input from "../../../shared/components/form-elements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/utils/validators";
import Button from "../../../shared/components/form-elements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, inputHandler, setFormData] = useForm({
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
    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
            });
            if (response.status === 200) {
                const responseData = await response.json();
                console.log(responseData);
                auth.login();
                setIsLoading(false);
                navigate('/');
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message || 'Some error occured');
            setIsLoading(false);
        }
    };
    return (
        <div className="flex w-full h-screen justify-center place-items-center">
            {isLoading && <LoadingSpinner />}
            <form className="p-4" onSubmit={loginSubmitHandler}>
                <Input
                    label="Email"
                    id="email"
                    element="input"
                    type="text"
                    placeholder="Type email here"
                    errorText="Please enter valid email"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    initialValue={formState.inputs.email.value}
                    initialIsValid={formState.inputs.email.value}
                />
                <Input
                    label="Password"
                    id="password"
                    element="input"
                    type="password"
                    placeholder="Type password here"
                    errorText="Password cannot be blank"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValue={formState.inputs.password.value}
                    initialIsValid={formState.inputs.password.value}
                />
                <Button type="submit" disabled={!formState.isValid}>Submit</Button>
            </form>
        </div>
    );
};

export default Login;