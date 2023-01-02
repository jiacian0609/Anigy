# Backend API 文件
## 總覽
- [GET `http://localhost:4000/api/posts`](#get-httplocalhost4000apiposts)
- [POST `http://localhost:4000/api/posts`](#post-httplocalhost4000apiposts)
- [GET `http://localhost:4000/api/posts/all`](#get-httplocalhost4000apipostsall)
- [GET `http://localhost:4000/api/posts/{post_id}`](#get-httplocalhost4000apipostspost_id)
- [PATCH `http://localhost:4000/api/posts/{post_id}`](#patch-httplocalhost4000apipostspost_id)
- [DELETE `http://localhost:4000/api/posts/{post_id}`](#delete-httplocalhost4000apipostspost_id)
- [GET `http://localhost:4000/api/filters`](#get-httplocalhost4000apifilters)
- [POST `http://localhost:4000/api/user/signUp`]
(#post-httplocalhost4000apiusersignUp)

## GET `http://localhost:4000/api/posts`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    }
}
```
### Reponse
#### 200
```json
{
    "data": [
        {
            "_id": "63b2cd433617b3abdfd667b2",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "age": "老",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
            "images": [],
            "neutered": true,
            "location": "台北市",
            "contact": "mobile",
            "contact_content": "0912345678",
            "status": "待領養",
            "other_info": null,
            "origin_url": null
        },
        {
            "_id": "63b2cd973617b3abdfd667c8",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "age": "老",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
            "images": [],
            "neutered": true,
            "location": "台北市",
            "contact": "email",
            "contact_content": "cy9815526@gmail.com",
            "status": "待領養",
            "other_info": null,
            "origin_url": null
        }
    ]
}
```
#### 500
```json
{
    "error": "取得使用者貼文失敗"
}
```

## POST `http://localhost:4000/api/posts`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    },
    "body": {
        "animal": "貓頭鷹", // 必填
        "breed": "短耳貓頭鷹", // 必填
        "age": "老", // 必填
        "sex": "M", // 必填
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", // 必填
        "images": null, 
        "neutered": true, // 必填
        "location": "台北市", // 必填
        "contact": "email",  // 必填
        "other_info": null, 
        "origin_url": null
    }
}
```
### Reponse
#### 200
```json
{
    "data": {
        "user_id": "63a5ca04a6955aef5e115744",
        "animal": "貓頭鷹",
        "breed": "短耳貓頭鷹",
        "age": "老",
        "sex": "M",
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
        "images": [],
        "neutered": true,
        "location": "台北市",
        "contact": "email",
        "contact_content": "cy9815526@gmail.com",
        "status": "待領養",
        "other_info": null,
        "origin_url": null,
        "_id": "63b2cd973617b3abdfd667c8"
    },
    "message": "新增貼文成功"
}
```
#### 400
```json
{
    "error": "請輸入必填欄位"
}
```
#### 403
```json
{
    "error": "請先登入以新增貼文"
}
```
#### 500
```json
{
    "error": "新增貼文失敗"
}
```

## GET `http://localhost:4000/api/posts/all`
### Reponse
#### 200
```json
{
    "data": [
        {
            "_id": "63b2cd433617b3abdfd667b2",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "age": "老",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
            "images": [],
            "neutered": true,
            "location": "台北市",
            "contact": "mobile",
            "contact_content": "0912345678",
            "status": "待領養",
            "other_info": null,
            "origin_url": null
        },
        {
            "_id": "63b2cd973617b3abdfd667c8",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "age": "老",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
            "images": [],
            "neutered": true,
            "location": "台北市",
            "contact": "email",
            "contact_content": "cy9815526@gmail.com",
            "status": "待領養",
            "other_info": null,
            "origin_url": null
        }
    ]
}
```
#### 500
```json
{
    "error": "取得全部貼文失敗"
}
```

## GET `http://localhost:4000/api/posts/{post_id}`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    }
}
```
### Reponse
#### 200
```json
{
    "data": {
        "_id": "63b2cd973617b3abdfd667c8",
        "user_id": "63a5ca04a6955aef5e115744",
        "animal": "貓頭鷹",
        "breed": "短耳貓頭鷹",
        "age": "老",
        "sex": "M",
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
        "images": [],
        "neutered": true,
        "location": "台北市",
        "contact": "email",
        "contact_content": "cy9815526@gmail.com",
        "status": "待領養",
        "other_info": null,
        "origin_url": null
    },
    "role": "WRITE"
}
```
#### 500
```json
{
    "error": "取得貼文失敗"
}
```

## PATCH `http://localhost:4000/api/posts/{post_id}`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    },
    "body": {
        "animal": "貓頭鷹", 
        "breed": "短耳貓頭鷹", 
        "age": "幼年", 
        "sex": "M", 
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", 
        "images": ["https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5"], 
        "neutered": true, 
        "location": "台北市", 
        "contact": "email", 
        "status": "已領養", 
        "other_info": null, 
        "origin_url": null
    }
}
```
### Reponse
#### 200
```json
{
    "message": "修改貼文成功"
}
```
#### 403
```json
{
    "error": "請先登入以修改貼文"
}
```
#### 500
```json
{
    "error": "修改貼文失敗"
}
```

## DELETE `http://localhost:4000/api/posts/{post_id}`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    }
}
```
### Reponse
#### 200
```json
{
    "message": "刪除貼文成功"
}
```
#### 403
```json
{
    "error": "請先登入以刪除貼文"
}
```
#### 500
```json
{
    "error": "刪除貼文失敗"
}
```

## GET `http://localhost:4000/api/filters`
### Reponse
#### 200
```json
{
    "data": {
        "ages": [
            "幼年",
            "年輕",
            "老"
        ],
        "animals": [
            {
                "animal": "貓",
                "breeds": [
                    "混種貓"
                ]
            },
            {
                "animal": "貓頭鷹",
                "breeds": [
                    "短耳貓頭鷹",
                    "貓頭鷹"
                ]
            }
        ],
        "locations": [
            "臺北市動物之家",
            "嘉義市",
            "台北市"
        ]
    }
}
```
#### 500
```json
{
    "error": "取得篩選欄位失敗"
}
```

## POST `http://localhost:4000/api/user/signUp`
### Request
```json
{
    "body" : {
        "username": "1234",
        "password": ,
        "email": "1234",
        "mobile": "1234",
    }
}
```
### Response
#### 200
```json
{
    "message": "Sign up successfully.",
    "jwt": token
}
```