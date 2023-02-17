import { useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  const email = useRef("");
  const password = useRef("");

  const onLogin = async () => { 
    try {
      await signIn("credentials", {
        email: email.current,
        password: password.current,
        redirect: false,
      })
    } catch(e) {

    }
  
  }
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="p-5 bg-white md:flex-1">

        <form action="#" className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-500"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoFocus
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-500"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              onClick={onLogin}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
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
