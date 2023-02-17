import { useCallback, useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Title, { Subtitle } from "@/atoms/Typography";
import Input from "@/atoms/Input";
import Button from "@/atoms/Button";
import Distance from "@/atoms/DistanceH";
import styled from "styled-components";
import { useRouter } from "next/router";

const Login = ({ providers }) => {
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();

  const onLogin = async () => {
    try {
      await signIn("credentials", {
        email: email.current,
        password: password.current,
        redirect: false,
      });
    } catch (e) {}
  };

  const navigateToLogin = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <Container>
      <Title>Welcome back!</Title>
      <Distance distance={6} />
      <Subtitle>Sign up to start using Simpledo today.</Subtitle>
      <Distance distance={43} />
      <form className="d-flex flex-column" action="#">
        <Input
          id="fullName"
          placeholder="Full name"
          onChange={(e) => (email.current = e.target.value)}
        />
        <Distance distance={29} />
        <Input
          autoComplete="off"
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => (password.current = e.target.value)}
        />
        <Distance distance={29} />
        <Input
          autoComplete="off"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <Distance distance={22} />
        <Button isUnderlined isTextButton onClick={navigateToLogin}>
          Do have an account? Sign in.
        </Button>
        <Distance distance={52} />
        <Button type="button" className="" onClick={onLogin}>
          Sign Up
        </Button>
      </form>
      <Distance distance={28} />
    </Container>
  );
};

const Container = styled.div`
  width: 390px;
`;
export default Login;
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
