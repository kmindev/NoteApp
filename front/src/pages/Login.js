import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Login = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        id,
        password,
      });

      if (response.data) {
        localStorage.setItem("id", id);
      } else {
        alert("입력하신 정보가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류: ", error);
    }
  };

  return (
    <Wrap>
      <Form>
        <Title>로그인</Title>
        <Input
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></Input>
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <ButtonBox>
          <LoginButton onClick={handleSubmit}>로그인</LoginButton>
        </ButtonBox>
        <SignUpButton>
          <Link to="/signup">아이디가 없으신가요?</Link>
        </SignUpButton>
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 15%;
  margin: 0 auto;
  margin-top: 15%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Form = styled.div`
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  border: 1px solid black;
  padding: 10px 11px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const ButtonBox = styled.div`
  width: 100%;
`;

const LoginButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid black;
  background-color: white;
  padding: 10px 11px;
  cursor: pointer;
  border-radius: 5px;
`;

const SignUpButton = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: right;
  margin: 20px 0px;
  > a {
    text-decoration: none;
    color: black;
  }
`;
