import { useCallback, useRef, useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Title, { Subtitle } from "@/atoms/Typography";
import Input from "@/atoms/Input";
import Button from "@/atoms/Button";
import Distance from "@/atoms/DistanceH";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IRegister } from "@/utils/types";
import axiosInstance from "@/axios";

const Login = () => {
  const [registerCredentials, setRegisterCredentials] = useState<IRegister>({
    fullName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const signUp = async () => {
    try {
      await axiosInstance(null).post("/user", registerCredentials);
      navigateToLogin();
    } catch (e) {}
  };

  const navigateToLogin = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof IRegister) => {
      setRegisterCredentials((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

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
          value={registerCredentials.fullName}
          onChange={(e) => onChange(e, "fullName")}
        />
        <Distance distance={29} />
        <Input
          autoComplete="off"
          type="email"
          id="email"
          placeholder="Email"
          value={registerCredentials.email}
          onChange={(e) => onChange(e, "email")}
        />
        <Distance distance={29} />
        <Input
          autoComplete="off"
          type="password"
          id="password"
          placeholder="Password"
          value={registerCredentials.password}
          onChange={(e) => onChange(e, "password")}
        />
        <Distance distance={22} />
        <Button isUnderlined isTextButton onClick={navigateToLogin}>
          Do have an account? Sign in.
        </Button>
        <Distance distance={52} />
        <Button type="button" className="" onClick={signUp}>
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
export async function getServerSideProps(context: any) {
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
