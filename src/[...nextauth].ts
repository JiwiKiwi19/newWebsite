import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Credentials = {
  username: string;
  password: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: Credentials | undefined) => {
        if (!credentials) {
          return null;
        }

        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});