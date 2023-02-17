import Button from "@/atoms/Button";
import DistanceW from "@/atoms/DistanceW";
import { TodoContext } from "@/contexts/TodoContext";
import { colors } from "@/utils/ThemeConfig";
import { FilterBy } from "@/utils/types";
import { useContext } from "react";
import styled from "styled-components";

const Filter = () => {
  const { setFilterBy, filterBy } = useContext(TodoContext);
  return (
    <div className="d-flex">
      <Show>Show:</Show>
      <DistanceW distance={17} />
      <Button
        onClick={() => {
          setFilterBy(FilterBy.All);
        }}
        isUnderlined={filterBy !== FilterBy.All}
        textColor={filterBy !== FilterBy.All ? colors.blue : ""}
        isTextButton
      >
        All
      </Button>
      <DistanceW distance={10} />
      <Button
        onClick={() => {
          setFilterBy(FilterBy.Completed);
        }}
        isUnderlined={filterBy !== FilterBy.Completed}
        textColor={filterBy !== FilterBy.Completed ? colors.blue : ""}
        isTextButton
      >
        Completed
      </Button>
      <DistanceW distance={10} />
      <Button
        onClick={() => {
          setFilterBy(FilterBy.Incompleted);
        }}
        isUnderlined={filterBy !== FilterBy.Incompleted}
        textColor={filterBy !== FilterBy.Incompleted ? colors.blue : ""}
        isTextButton
      >
        Incompleted
      </Button>
    </div>
  );
};

const Show = styled.div`
  color: rgba(31, 42, 75, 0.59);
  font-size: 14px;
  font-family: MarkProBold;
`;

export default Filter;
