import {useState} from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/input";
import FormRowVertical from "../../ui/FormRow";
import {useLogin} from "./useLogin";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
const BgDiv=styled.div`
 width: max-content;
margin-left:-100px ;
`
function LoginForm() {
    const [email, setEmail] = useState("khizar@example.com");
    const [password, setPassword] = useState("123");
    const {login, isPending:isLoading} = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login({email, password});
    }


    return (
      <BgDiv>
        <Form onSubmit={handleSubmit}>
           
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button disabled={isLoading} size="large">
                    {!isLoading ? "Login" : <Spinner />}
                </Button>
            </FormRowVertical>
        </Form>
        </BgDiv>
    );
}

export default LoginForm;
