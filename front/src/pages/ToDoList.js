import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const ToDoList = () => {
  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([
    { id: 1, todo: "Todo 1" },
    { id: 2, todo: "Todo 2" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/todo/${localStorage.getItem("id")}`
        );
        setTodoList(response.data);
      } catch (error) {
        console.error("할 일 불러오기 오류 : ", error);
      }
    };
    fetchData();
  }, [todoList]);

  const handleAdd = () => {
    axios.post("http://localhost:8080/todo", {
      id: localStorage.getItem("id"),
      content: todo,
    });
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8080/todo/${todoId}`, {
        headers: {
          id: localStorage.getItem("id"),
        },
      });
      setTodoList((prevTodoList) =>
        prevTodoList.filter((item) => item.id !== todoId)
      );
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
              localStorage.removeItem("id");
              window.location.href = "/";
            }}
          >
            로그아웃
          </Logout>
        </HeaderBox>
        <AddTodoBox>
          <TodoInput
            placeholder="할일을 적어주세요"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></TodoInput>
          <AddButton>
            <span onClick={handleAdd}>+</span>
          </AddButton>
        </AddTodoBox>
        {todoList.map((item, key) => (
          <TodoListBox key={key}>
            <TodoList value={item.todo} disabled></TodoList>
            <MinusButton>
              <span onClick={() => handleDelete(item.id)}>-</span>
            </MinusButton>
          </TodoListBox>
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

const AddTodoBox = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TodoInput = styled.input`
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

const TodoListBox = styled.div`
  border: 1px solid grey;
  margin-top: 3%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

const TodoList = styled.input`
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
