import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  const { status } = useSession();
  return (
    <Container>
      {status === "authenticated" && (
        <Logout
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Logout>
      )}
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Logout = styled.div`
  font-family: MarkPro;
  font-size: 14px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  position: absolute;
`;

export default AppLayout;
