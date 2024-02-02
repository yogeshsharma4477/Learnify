import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { Provider } from "react";
import axios from "axios";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        // GithubProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
    //     CredentialsProvider({
    //         name: "lernify",
    //         credentials: {
    //             username: { label: "Username", type: "text", value: "pival", placeholder: "username" },
    //             password: { label: "Password", type: "password", value: "pival", placeholder: "password" },
    //         },
    //         async authorize(credentials, req) {

    //             const user = { username: credentials?.username, password: credentials?.password }
    //             const apiEndpoint = `${process.env.BACKEND_BASEPATH}/users/login`
    //             console.log(JSON.stringify(user), "api end point ");
    //             try {
    //                 const apiResponse = await axios.post(apiEndpoint, user);
    //                 if (apiResponse.data.success) {
    //                     console.log(apiResponse.data.data,"======================================");
    //                     return apiResponse?.data?.data
    //                 } else {
    //                     return null
    //                 }
    //             } catch (error) {
    //                 console.log(error, " next auth error");
    //                 return null
    //             }
    //         }
    //     })
    ],
    // ] as Provider[],
    // pages: {
    //     signIn: '/login', // Specify the custom login page
    //   },
    secret: process.env.GOOGLE_CLIENT_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    jwt: {
        encryption: true
    }
}
export default NextAuth(authOptions)