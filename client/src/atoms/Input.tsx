import { colors } from "@/utils/ThemeConfig";
import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.borderGrey};
  padding: 0 0 10px 0;
  font-family: MarkPro;
  font-size: 16px;
  &:focus {
    border-bottom: 1px solid ${colors.blue};
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: MarkPro;
    font-size: 16px;
    color: ${colors.grey};
  }
`;

export default Input;
