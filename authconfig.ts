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
  },
});
