# Backend API 文件
## 總覽
- [POST `http://localhost:4000/api/user/signUp`](#post-httplocalhost4000apiusersignUp)
- [POST `http://localhost:4000/api/user/signIn`](#post-httplocalhost4000apiusersignIn)
- [GET `http://localhost:4000/api/user`](#get-httplocalhost4000apiuser)
- [PATCH `http://localhost:4000/api/user`](#patch-httplocalhost4000apiuser)
- [GET `http://localhost:4000/api/posts`](#get-httplocalhost4000apiposts)
- [POST `http://localhost:4000/api/posts`](#post-httplocalhost4000apiposts)
- [GET `http://localhost:4000/api/posts/all`](#get-httplocalhost4000apipostsall)
- [GET `http://localhost:4000/api/posts/{post_id}`](#get-httplocalhost4000apipostspost_id)
- [PATCH `http://localhost:4000/api/posts/{post_id}`](#patch-httplocalhost4000apipostspost_id)
- [DELETE `http://localhost:4000/api/posts/{post_id}`](#delete-httplocalhost4000apipostspost_id)
- [GET `http://localhost:4000/api/filters`](#get-httplocalhost4000apifilters)

## POST `http://localhost:4000/api/user/signUp`
### Request
```
{
	"body" : {
		"username": <USERNAME>,
		"password": <PASSWORD>,
		"email": <EMAIL>,
		"mobile": <MOBILE>,
	}
}
```
### Response
#### 200
```
{
	"message": "註冊成功",
	"jwt": <JWT> 
}
```
#### 400
```
{
	"error": "使用者名稱已經使用過"
}
```
```
{
	"error": "Email 已經使用過"
}
```
#### 500
```
{
	"error": "註冊失敗"
}
```

## POST `http://localhost:4000/api/user/signIn`
### Request
```
{
	"body" : {
		"username": <USERNAME>,
		"password": <PASSWORD>
	}
}
```
### Response
#### 200
```
{
	"message": "登入成功",
	"jwt": <JWT>
}
```
#### 400
```
{
	"error": "使用者名稱不存在"
}
```
#### 403
```
{
	"error": "密碼錯誤"
}
```
#### 500
```
{
	"error": "登入失敗"
}
```

## GET `http://localhost:4000/api/user`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>" 
	}
}
```
### Response
#### 200
```
{
	"info": {
		"username": <USERNAME>,
		"email": <EMAIL>,
		"mobile": <MOBILE>
	},
	"message": "取得使用者資訊成功"
}
```
#### 403
```
{
	"error": "請先登入"
}
```
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"error": "取得使用者資訊失敗"
}
```

## PATCH `http://localhost:4000/api/user`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>"  
	},
	"body" : {
		"username": <USERNAME>,
		"email": <EMAIL>,
		"mobile": <MOBILE>
	}
}
```
### Response
#### 200
```
{
	"message": "修改使用者資訊成功"
}
```
#### 403
```
{
	"error": "請先登入"
}
```
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"message": "修改使用者資訊失敗"
}
```

## GET `http://localhost:4000/api/posts`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>"
	}
}
```
### Reponse
#### 200
```
{
	"data": [
		{
            "_id": "63b412529662d2c96c892b3f",
            "user_id": <USERID>,
            "animal": "狗",
            "breed": "混種狗",
            "age": "幼年",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031931.png?alt=media&token=61fe5507-2bfa-4c6a-8011-823c91a13f4a",
            "images": [],
            "neutered": false,
            "location": "嘉義市",
            "contact": "email",
            "contact_content": <EMAIL>,
            "status": "待領養",
            "other_info": "棕色外觀，身材瘦弱",
            "origin_url": null
        },
        {
            "_id": "63b412e99662d2c96c892ba0",
            "user_id": <USERID>,
            "animal": "狗",
            "breed": "臘腸狗",
            "age": "成年",
            "sex": "F",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9",
            "images": [
                "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
                "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
            ],
            "neutered": false,
            "location": "嘉義市",
            "contact": "mobile",
            "contact_content": <MOBILE>,
            "status": "待領養",
            "other_info": "腿很短，很可憐",
            "origin_url": null
		}
	]
}
```
#### 500
```
{
	"error": "取得使用者貼文失敗"
}
```

## POST `http://localhost:4000/api/posts`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>" 
	},
	"body": {
		"animal": "狗", // 必填
        "breed": "臘腸狗", // 必填
        "age": "成年", // 必填
        "sex": "F", // 必填
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9", // 必填
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
        ],
        "neutered": false, // 必填
        "location": "嘉義市", // 必填
        "contact": "mobile", // 必填
        "other_info": "腿很短，很可憐",
        "origin_url": null
	}
}
```
### Reponse
#### 200
```
{
	"data": {
		"user_id": <USERID>,
		"animal": "狗",
		"breed": "臘腸狗",
		"age": "成年",
		"sex": "F",
		"cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
        ],
		"neutered": false,
		"location": "嘉義市",
		"contact": "mobile",
		"contact_content": <MOBILE>,
		"status": "待領養",
		"other_info": "腿很短，很可憐",
		"origin_url": null,
		"_id": "63b412e99662d2c96c892ba0"
	},
	"message": "新增貼文成功"
}
```
#### 400
```
{
	"error": "請輸入必填欄位"
}
```
#### 403
```
{
	"error": "請先登入"
}
```
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"error": "新增貼文失敗"
}
```

## GET `http://localhost:4000/api/posts/all`
### Reponse
#### 200
```
{
	"data": [
		{
            "_id": "63b412529662d2c96c892b3f",
            "user_id": <USERID>,
            "animal": "狗",
            "breed": "混種狗",
            "age": "幼年",
            "sex": "M",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031931.png?alt=media&token=61fe5507-2bfa-4c6a-8011-823c91a13f4a",
            "images": [],
            "neutered": false,
            "location": "嘉義市",
            "contact": "email",
            "contact_content": <EMAIL>,
            "status": "待領養",
            "other_info": "棕色外觀，身材瘦弱",
            "origin_url": null
        },
        {
            "_id": "63b412e99662d2c96c892ba0",
            "user_id": <USERID>,
            "animal": "狗",
            "breed": "臘腸狗",
            "age": "成年",
            "sex": "F",
            "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9",
            "images": [
                "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
                "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
            ],
            "neutered": false,
            "location": "嘉義市",
            "contact": "mobile",
            "contact_content": <MOBILE>,
            "status": "待領養",
            "other_info": "腿很短，很可憐",
            "origin_url": null
		}
	]
}
```
#### 500
```
{
	"error": "取得全部貼文失敗"
}
```

## GET `http://localhost:4000/api/posts/{post_id}`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>" 
	}
}
```
### Reponse
#### 200
```
{
	"data": {
        "_id": "63b412e99662d2c96c892ba0",
        "user_id": <USERID>,
        "animal": "狗",
        "breed": "臘腸狗",
        "age": "成年",
        "sex": "F",
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
        ],
        "neutered": false,
        "location": "嘉義市",
        "contact": "mobile",
        "contact_content": <MOBILE>,
        "status": "待領養",
        "other_info": "腿很短，很可憐",
        "origin_url": null
	},
	"role": "WRITE"
}
```
#### 403
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"error": "取得貼文失敗"
}
```

## PATCH `http://localhost:4000/api/posts/{post_id}`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>"
	},
	"body": {
		"animal": "狗", // 必填
        "breed": "臘腸狗", // 必填
        "age": "成年", // 必填
        "sex": "F", // 必填
        "cover_image": "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031934.png?alt=media&token=074f0076-e67c-4bd1-a2e3-8f2bf51321e9", // 必填
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031936.png?alt=media&token=fceb2c68-a55a-4df3-a4d0-a0113f0f55a5",
            "https://firebasestorage.googleapis.com/v0/b/wpproject-87b0b.appspot.com/o/202301031940.png?alt=media&token=05424686-665e-407b-8e69-4d390ee578a3"
        ],
        "neutered": false, // 必填
        "location": "嘉義市", // 必填
        "contact": "mobile", // 必填
		"status": "已領養", // 必填
        "other_info": "腿很短，很可憐",
        "origin_url": null
	}
}
```
		 
### Reponse
#### 200
```
{
	"message": "修改貼文成功"
}
```
#### 403
```
{
	"error": "請先登入"
}
```
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"error": "修改貼文失敗"
}
```

## DELETE `http://localhost:4000/api/posts/{post_id}`
### Request
```
{
	"headers": {
		"authorization": "Bearer <JWT>" 
	}
}
```
### Reponse
#### 200
```
{
	"message": "刪除貼文成功"
}
```
#### 403
```
{
	"error": "請先登入"
}
```
```
{
	"error": "請重新登入"
}
```
#### 500
```
{
	"error": "刪除貼文失敗"
}
```

## GET `http://localhost:4000/api/filters`
### Reponse
#### 200
```
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
```
{
	"error": "取得篩選欄位失敗"
}
```

