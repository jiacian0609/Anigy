import axios from 'axios';
import { toast } from "react-toastify";

const hostname = process.env.REACT_APP_API_HOSTNAME;

export const api = {
    getAllPost() {
        return (
            axios.get(`${hostname}/posts/all`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    getUserPost() {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.get(`${hostname}/posts`, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
        )
    },
    getPostDetail(post_id) {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.get(`${hostname}/posts/${post_id}`, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    createPost(body) {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.post(`${hostname}/posts`, body, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
        )
    },
    editPost(post_id, body) {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.patch(`${hostname}/posts/${post_id}`, body, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                if (err.response)
                    toast.error(err.response.data.error)
            })
        )
    },
    deletePost(post_id) {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.delete(`${hostname}/posts/${post_id}`, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    getFilter() {
        return (
            axios.get(`${hostname}/filters`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    signIn(username, password) {
        return (
            axios.post(`${hostname}/user/signIn`, {
                "username": username,
                "password": password
            })
            .then(res => res.data)
            .catch( (error) => {
                if (error.response)
                    toast.error(error.response.data.error);
                else toast.error(error);
            })
        )
    }, 
    signUp(email, username, password, phone) {
        return (
            axios.post(`${hostname}/user/signUp`, {
                "email": email,
                "username": username,
                "password": password,
                "mobile": phone
            })
            .then(res => res.data)
            .catch( (error) => {
                if (error.response)
                    toast.error(error.response.data.error);
                else toast.error(error);
            })
        )
    },
    getInfo() {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.get(`${hostname}/user/`, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res =>res.data)
        )
    },
    patchInfo(name, email, mobile) {
        const jwt = localStorage.getItem('JWT');
        return (
            axios.patch(`${hostname}/user/`, {
                "username": name,
                "email": email,
                "mobile": mobile
            }, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then( (response) => response.data)
            .catch( (error) => console.log(error))
        )
    }
};
  