# Backend API 文件
## 總覽
- [GET `http://localhost:4000/api/posts`](#get-httplocalhost4000apiposts)
- [POST `http://localhost:4000/api/posts`](#post-httplocalhost4000apiposts)
- [GET `http://localhost:4000/api/posts/all`](#get-httplocalhost4000apipostsall)
- [GET `http://localhost:4000/api/posts/{post_id}`](#get-httplocalhost4000apipostspost_id)
- [PATCH `http://localhost:4000/api/posts/{post_id}`](#patch-httplocalhost4000apipostspost_id)
- [DELETE `http://localhost:4000/api/posts/{post_id}`](#delete-httplocalhost4000apipostspost_id)
- [GET `http://localhost:4000/api/filters`](#get-httplocalhost4000apifilters)

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
```json
{
    "data": [
        {
            "_id": "63b2cd433617b3abdfd667b2",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "color": "紅",
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
            "color": "紅",
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

## POST `http://localhost:4000/api/posts`
### Request
```json
{
    "headers": {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiI2M2E1Y2EwNGE2OTU1YWVmNWUxMTU3NDQiLCJVc2VybmFtZSI6IkNpbmR5IiwiRW1haWwiOiJjeTk4MTU1MjZAZ21haWwuY29tIiwiTW9iaWxlIjoiMDkxMjM0NTY3OCIsImlhdCI6MTY3MjE1NzY3MywiZXhwIjoxNjcyMTY0ODczfQ.vi56hIgf04wXdWrIF20RsPgH6iejAU7nQdRF-VQX3U0" 
    },
    "body": {
        "animal": "貓頭鷹", 
        "breed": "短耳貓頭鷹", 
        "color": "紅", 
        "age": "老", 
        "sex": "M", 
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", 
        "images": null, 
        "neutered": true, 
        "location": "台北市", 
        "contact": null, 
        "status": "待領養", 
        "other_info": null, 
        "origin_url": null
    }
}
```
### Reponse
```json
{
    "data": {
        "user_id": "63a5ca04a6955aef5e115744",
        "animal": "貓頭鷹",
        "breed": "短耳貓頭鷹",
        "color": "紅",
        "age": "老",
        "sex": "M",
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5",
        "images": [],
        "neutered": true,
        "location": "台北市",
        "contact": null,
        "status": "待領養",
        "other_info": null,
        "origin_url": null,
        "_id": "63ab1fc72b48ef214c792c4c"
    },
    "message": "Add Success"
}
```

## GET `http://localhost:4000/api/posts/all`
### Reponse
```json
{
    "data": [
        {
            "_id": "63821f3e91031cd386cb8266",
            "user_id": "63a313fca9f8cad1c7f579cc",
            "animal": "貓",
            "breed": "混種貓",
            "color": "黃虎斑色",
            "age": "幼年",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/19903ac3-9ec5-402d-89b0-9fbf0e223644_org.jpg?alt=media&token=0d238a35-5f97-447a-8fb5-7d164d8ec3a3",
            "images": [],
            "neutered": false,
            "location": "臺北市動物之家",
            "contact": "",
            "status": "待領養",
            "other_info": "",
            "origin_url": "https://www.afurkid.com/Adoption/Details?id=78220",
        },
        {
            "_id": "63a5dc1acf63d387ba8da0c5",
            "user_id": "63a5ca04a6955aef5e115744",
            "animal": "貓頭鷹",
            "breed": "短耳貓頭鷹",
            "color": "紅",
            "age": "老",
            "sex": "M",
            "cover_image": null,
            "images": [],
            "neutered": null,
            "location": "台北市",
            "contact": null,
            "status": null,
            "other_info": null,
            "origin_url": null
        }
    ]
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
```json
{
    "data": {
        "_id": "63a5dc1acf63d387ba8da0c5",
        "user_id": "63a5ca04a6955aef5e115744",
        "animal": "貓頭鷹",
        "breed": "短耳貓頭鷹",
        "color": "紅",
        "age": "老",
        "sex": "M",
        "cover_image": null,
        "images": [],
        "neutered": null,
        "location": "台北市",
        "contact": null,
        "status": null,
        "other_info": null,
        "origin_url": null
    },
    "role": "WRITE"
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
        "color": "紅", 
        "age": "幼年", 
        "sex": "M", 
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", 
        "images": ["https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5", "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/97f79ba8-ab6e-4ffb-b58f-850b14bcb94a_org.jpg?alt=media&token=4a25b0e6-de88-4a65-abcf-9041ec195ed5"], 
        "neutered": true, 
        "location": "台北市", 
        "contact": null, 
        "status": "已領養", 
        "other_info": null, 
        "origin_url": null
    }
}
```
### Reponse
```json
{
    "message": "Update Success"
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
```json
{
    "message": "Delete Success"
}
```

## GET `http://localhost:4000/api/filters`
### Reponse
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

