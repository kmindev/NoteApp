import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export const SignUp = () => {
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState("");
  const [userPwChk, setUserPwChk] = useState("");

  const handleSubmit = async () => {
    if (userPw !== userPwChk) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    } else {
      await axios
        .post("http://localhost:8080/user/join", {
          userId,
          userPw,
        })
        .then((window.location.href = "/login"));
    }
  };

  return (
    <Wrap>
      <Form>
        <Title>회원가입</Title>
        <Input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></Input>
        <Input
          placeholder="비밀번호"
          value={userPw}
          type="password"
          onChange={(e) => setUserPw(e.target.value)}
        ></Input>
        <Input
          placeholder="비밀번호 확인"
          type="password"
          value={userPwChk}
          onChange={(e) => setUserPwChk(e.target.value)}
        ></Input>
        <ButtonBox>
          <SignUpButton onClick={handleSubmit}>가입하기</SignUpButton>
        </ButtonBox>
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

const SignUpButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid black;
  background-color: white;
  padding: 10px 11px;
  cursor: pointer;
  border-radius: 5px;
`;
