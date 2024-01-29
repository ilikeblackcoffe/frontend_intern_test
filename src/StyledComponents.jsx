import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  background-color: #f2f2f2;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const Modal = styled.div`
 margin-top: 20px;
 content: fit-content;
 
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchContainer = styled.div`
  margin-bottom: 1rem;
`;
