import axios from 'axios';

const hostname = 'http://localhost:4000/api';
const jwt = localStorage.getItem('JWT');

export const api = {
    getAllPost() {
        return (
            axios.get(`${hostname}/posts/all`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    getUserPost() {
        return (
            axios.get(`${hostname}/posts`, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    getPostDetail(post_id) {
        return (
            axios.get(`${hostname}/posts/${post_id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
    deletePost(post_id) {
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
    login(username, password) {
        return (
            axios.post("http://localhost:4000/api/user/signIn", {
                "username": username,
                "password": password
            })
            .then( (response) => {
                window.localStorage.setItem('JWT', response.data.JWT)
                window.location.href = "/"
            })
            .catch( (error) => {
                if(error.response.data === 'Username does not exist.')
                    window.alert('會員帳號不存在！')
                else if(error.response.data === 'Password is wrong :(')
                    window.alert('會員密碼錯誤！')
                else window.alert(error.response.data)
            })
        )
    },
    signup(email, username, password, phone) {
        return (
            axios.post("http://localhost:4000/api/user/signUp", {
                "email": email,
                "username": username,
                "password": password,
                "mobile": phone
            })
            .then( (response) => {
                window.localStorage.setItem('JWT', response.data.JWT)
                window.location.href = "/"
            })
            .catch( (error) => {
                console.log(error);
                if(error.response.data.error === 'Username exists.')
                    window.alert('會員帳號已存在！')
                else if(error.response.data.error === 'email exists.')
                    window.alert('信箱已存在！')
                else window.alert(error.response.data)
            })
        )
    },
    getInfo(jwt) {
        return (
            axios.get("http://localhost:4000/api/user/getInfo", { headers: { Authorization: 'Bearer ' + jwt } })
            .then(res => {
                console.log(res.data);
                const {username, email, mobile} = res.data.info
            })
        )
    },
    patchInfo(name, email, mobile, jwt) {
        return (
            axios.patch("http://localhost:4000/api/user/patchInfo", {
                "username": name,
                "email": email,
                "mobile": mobile
            }, { headers: { authorization: 'Bearer ' + jwt } })
            .then( (response) => {
                /*window.localStorage.setItem('JWT', response.data.JWT)
                window.location.href = "/"*/
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
                if (error.response.data.error === "Update Forbidden") {
                }
            })
        )
    }
};
  