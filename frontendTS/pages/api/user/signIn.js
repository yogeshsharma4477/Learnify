import axios from 'axios'

export default async function SignIn(req, res) {
    try {
        const { username = "", password = "" } = req.body
        let url = `${process.env.BACKEND_BASEPATH}/users/login`
        const response = await axios.post(url,{username,password});
        console.log(response,"----yogesh--------",url,"url")
        return res.status(200).json({ data: response, message: true });
    } catch (error) {
        res.status(200).json({ results: error, message: "", success: false });
    }
}