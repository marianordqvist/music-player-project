import NextAuth from "next-auth";
import spotify from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=streaming+user-read-private+user-modify-playback-state+user-read-playback-state+user-library-modify&response_type=code`,
    }),
  ],
  pages: { signIn: "/" },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}
