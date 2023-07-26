import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Memo = () => {
  const [content, setContent] = useState();
  const [memoList, setMemoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/memo/${localStorage.getItem("userId")}`
        );
        setMemoList(response.data);
      } catch (error) {
        console.error("할 일 불러오기 오류 : ", error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    const userId = localStorage.getItem("userId");
    axios
      .post("http://localhost:8080/memo", {
        content,
        user: { userId },
      })
      .then(window.location.reload());
  };

  const handleDelete = async (memoNum) => {
    try {
      await axios
        .delete(`http://localhost:8080/memo/${memoNum}`)
        .then(window.location.reload());
    } catch (error) {
      console.error("할 일 삭제 오류:", error);
    }
  };

  return (
    <Wrap>
      <Form>
        <HeaderBox>
          <Title>오늘 할일</Title>
          <Logout
            onClick={() => {
              localStorage.removeItem("userId");
              window.location.href = "/";
            }}
          >
            로그아웃
          </Logout>
        </HeaderBox>
        <div>안녕하세요 {localStorage.getItem("userId")}님 꼭 지키시기 바랍니다.</div>
        <AddMemoBox>
          <MemoInput
            placeholder="할일을 적어주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></MemoInput>
          <AddButton>
            <span onClick={handleAdd}>+</span>
          </AddButton>
        </AddMemoBox>
        {memoList.map((item, key) => (
          <MemoListBox key={key}>
            <MemoList value={item.content} disabled></MemoList>
            <MinusButton>
              <span onClick={() => handleDelete(item.memoNum)}>-</span>
            </MinusButton>
          </MemoListBox>
        ))}
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 30%;
  margin: 0 auto;
  margin-top: 10%;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Logout = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: right;
  cursor: pointer;
`;

const Form = styled.div`
  margin: 0 auto;
`;

const AddMemoBox = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MemoInput = styled.input`
  width: 80%;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  border: 1px solid black;
  padding: 10px 11px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  border-bottom: 1px solid grey;
  margin-left: 7.5%;
  outline: none;
`;

const AddButton = styled.div`
  width: 10%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  > span {
    cursor: pointer;
  }
`;

const MemoListBox = styled.div`
  border: 1px solid grey;
  margin-top: 3%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

const MemoList = styled.input`
  background-color: white;
  color: black;
  width: 80%;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  border: 1px solid black;
  padding: 10px 11px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  border-bottom: 1px solid grey;
  margin-left: 7.5%;
  outline: none;
`;

const MinusButton = styled.div`
  width: 10%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  > span {
    cursor: pointer;
  }
`;
