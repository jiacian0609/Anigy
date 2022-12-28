import axios from 'axios';

const hostname = 'http://localhost:4000/api';

export const api = {
    getAllPost() {
        return (
            axios.get(`${hostname}/posts/all`)
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
    getFilter() {
        return (
            axios.get(`${hostname}/filters`)
            .then(res => res.data)
            .catch(err => console.log(err))
        )
    },
};
  