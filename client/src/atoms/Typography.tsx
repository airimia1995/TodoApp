import { colors } from "@/utils/ThemeConfig";
import styled from "styled-components";

const Title = styled.div`
  font-size: 22px;
  font-family: MarkProBold;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${colors.subtitleGrey};
`;

export { Title, Subtitle };

export default Title;
