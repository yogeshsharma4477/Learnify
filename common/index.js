// import { z } from 'zod'

// export const userSchema = z.object({
//     username: z.string().max(10),
//     password: z.number().min(6),
//     email: z.string().email(),
//     phone: z.string().length(10)
// });

//zod inference
// const SignupParams = z.infer < typeof signupInput >

export function isEvenNumber(number) {
    if (number % 2 == 0) {
        return true
    }
    return false
}

