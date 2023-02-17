import { colors } from "@/utils/ThemeConfig";
import styled from "styled-components";
import React from "react";
import Image from "next/image";

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Image
        priority
        src="/images/logo.svg"
        height={32}
        width={40}
        alt="todos"
      />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  background-color: ${colors.white};
  border-radius: 5px;
  flex-direction: column;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
  padding: 35px 30px;
`;

const ChildrenContainer = styled.div`
  padding-top: 25px;
`;

export default CardLayout;
