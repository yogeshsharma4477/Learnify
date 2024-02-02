import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { Provider } from "react";
import axios from "axios";

const signInAPI = async (payload) => {
    try {
        console.log(payload, "payload ");

        const response = await axios.post(`${process.env.BACKEND_BASEPATH}/api/user/signIn`, payload);
        // console.log(response,"response")
        return response
    } catch (error) {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.error("Response data:", error.response.data);
        //     console.error("Response status:", error.response.status);
        //     console.error("Response headers:", error.response.headers);
        //   } else if (error.request) {
        //     // The request was made but no response was received
        //     console.error("No response received:", error.request);
        //   } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.error("Request error:", error.message);
        //   }

    }
}

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
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "lernify",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", value: "pival", placeholder: "username" },
                password: { label: "Password", type: "password", value: "pival", placeholder: "password" },
            },
            async authorize(credentials, req) {

                const user = { username: credentials?.username, password: credentials?.password }

                // let isValid = await signInAPI(user)
                // console.log(isValid,"isValid");
                const apiEndpoint = `${process.env.BACKEND_BASEPATH}/users/signup`
                console.log(JSON.stringify(user),"api end point ");
                try {
                    const apiResponse = await axios.post(apiEndpoint, JSON.stringify(user));
                    if(apiResponse.data.success){
                         console.log(apiResponse,"successsssssssssssssssssssssssssssss");
                         
                    }else{
                        return null
                    }
                } catch (error) {
                 console.log(error,"errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
                    
                }
               

                // if (isValid) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return null
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
                return null
            }
        })
    ] as Provider[],
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