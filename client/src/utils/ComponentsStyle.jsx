import styled from "styled-components";

export const AppendBTN = styled.button`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.alter === "true" ? "#888" : "none")};
  border: none;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out all;
  color: ${(props) => props.alter === "true" && "#fff"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.alter === "true" ? "#888" : "rgba(0,0,0,0.8)"};
    transform: scale(1.2);
    color: ${(props) => (props.alter === "true" ? "green" : "#fff")};
  }
`;
