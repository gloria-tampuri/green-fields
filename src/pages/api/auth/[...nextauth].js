import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongo"


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
 session: {
      jwt: true,
    },
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],
secret:process.env.JWT_SECRET,
   callbacks: {
    redirect:async(url, baseUrl)=>{
      return url.startsWith(baseUrl)
      ? Promise.resolve(url)
      : Promise.resolve(baseUrl)
    },
      async signIn({ user, account, profile, email, credentials }) {
        if (!user?.role) {
          user.role = "USER";
        }
        return true;
      },
      async jwt(token, user, account, profile, isNewUser) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        if (user?.role) {
          token.role = user.role;
        }
        return token;
      },
      async session(session, token) {
        if (token?.accessToken) {
          session.accessToken = token.accessToken;
        }
        if (token?.role) {
          session.user.role = token.role;
        }
        return session;
      },
    },
})