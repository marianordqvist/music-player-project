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
    async jwt({ token, account }): Promise<JWT | null> {
      if (account) {
        // First-time login, save the access_token, its expiry and the refresh_token
        return {
          ...token,
          accessToken: account.access_token,
          expires_at: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else if (!token || !token.expires_at) {
        // Handle case where token or expires_at is undefined
        return token || null;
      }

      if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        // Subsequent logins, but the access_token has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
              client_id: process.env.AUTH_SPOTIFY_ID!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          token.accessToken = newTokens.access_token;
          token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);
          // Some providers only issue refresh tokens once, so preserve if we did not get a new one
          if (newTokens.refresh_token) token.refresh_token = newTokens.refresh_token;
          return token;
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError";
          return token;
        }
      }
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
    error?: "RefreshTokenError";
    accessToken: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string;
    accessToken: string | undefined;
    expires_at: number | undefined;
    refresh_token: string | undefined;
    error: "RefreshTokenError" | undefined;
  }
}
