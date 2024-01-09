import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { Provider } from "react";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        
        GithubProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ] as Provider[],
    secret: process.env.GOOGLE_CLIENT_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    jwt:{
        encryption : true
    }
}
export default NextAuth(authOptions)