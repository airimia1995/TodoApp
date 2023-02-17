import Button from "@/atoms/Button";
import DistanceW from "@/atoms/DistanceW";
import styled from "styled-components";

const Filter = () => {
  return (
    <div className="d-flex">
      <Show>Show:</Show>
      <DistanceW distance={17} />
      <Button isTextButton>All</Button>
      <DistanceW distance={10} />
      <Button isTextButton>Completed</Button>
      <DistanceW distance={10} />
      <Button isTextButton>Incompleted</Button>
    </div>
  );
};

const Show = styled.div`
  color: rgba(31, 42, 75, 0.59);
  font-size: 14px;
  font-family: MarkProBold;
`;

export default Filter;
