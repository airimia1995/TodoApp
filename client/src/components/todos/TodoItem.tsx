import Checkbox from "@/atoms/Checkbox";
import styled from "styled-components";
import Image from "next/image";

const TodoItem = ({isFavorite}: any) => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Checkbox defaultChecked={isFavorite} checked={isFavorite} onChange={()=>{}}/>
        <Text>Check off first item</Text>
      </div>
      <Image
        priority
        src="/images/remove.svg"
        height={11}
        width={11}
        alt="remove"
      />
    </div>
  );
};

const Text = styled.div`
  font-family: MarkPro;
  font-size: 16px;
  margin-left: 14px;
`;

export default TodoItem;
