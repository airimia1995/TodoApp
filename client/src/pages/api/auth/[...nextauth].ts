import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials: any, req) {
        const { email, password } = credentials
        const res = await fetch("http://localhost:3002/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const token = await res.json();
        if (res.ok && token) {
          return {
            id: token
          };
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, token }: any) {
      session['token'] = token.sub;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: 'secretKey'
}

export default NextAuth(authOptions)
