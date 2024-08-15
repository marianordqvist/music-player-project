import NextAuth from "next-auth";
import spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    spotify({
      authorization: {
        params: {
          scope: "user-modify-playback-state playlist-modify-public",
        },
      },
    }),
  ],
  pages: { signIn: "/" },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access token to the token object right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.refreshToken = account.refresh_token; // Optional, if you need to handle refreshing tokens
        // token.expiresAt = Date.now() + account.expires_in * 1000; // Expiry time in milliseconds
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
