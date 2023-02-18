import { useCallback, useRef, useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Title, { Subtitle } from "@/atoms/Typography";
import Input from "@/atoms/Input";
import Button from "@/atoms/Button";
import Distance from "@/atoms/DistanceH";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ILogin } from "@/utils/types";

const Login = () => {
  const [authCredentials, setAuthCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onLogin = async () => {
    try {
      await signIn("credentials", {
        ...authCredentials,
        // redirect: false,
      });
    } catch (e) {}
  };

  const navigateToSignUp = useCallback(() => {
    router.push("/auth/signUp");
  }, [router]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILogin) => {
      setAuthCredentials((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  return (
    <Container>
      <Title>Welcome back!</Title>
      <Distance distance={6} />
      <Subtitle>Log in to continue.</Subtitle>
      <Distance distance={45} />
      <form className="d-flex flex-column" action="#">
        <Input
          type="email"
          id="email"
          value={authCredentials.email}
          placeholder="Email"
          onChange={(e) => onChange(e, "email")}
        />
        <Distance distance={29} />
        <Input
          autoComplete="off"
          type="password"
          value={authCredentials.password}
          id="password"
          placeholder="Password"
          onChange={(e) => onChange(e, "password")}
        />
        <Distance distance={22} />
        <Button isUnderlined isTextButton onClick={navigateToSignUp}>
          Don't have an account? Sign up.
        </Button>
        <Distance distance={52} />
        <Button type="button" className="" onClick={onLogin}>
          Log in
        </Button>
      </form>
      <Distance distance={28} />
    </Container>
  );
};

const Container = styled.div`
  width: 330px;
`;
export default Login;
export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/todos" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
