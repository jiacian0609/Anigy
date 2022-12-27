# Backend API 文件
## GET `http://localhost:4000/api/posts`
## POST `http://localhost:4000/api/posts`

## GET `http://localhost:4000/api/posts/all`

## GET `http://localhost:4000/api/posts/{post_id}`
## PATCH `http://localhost:4000/api/posts/{post_id}`
## DELETE `http://localhost:4000/api/posts/{post_id}`

## GET `http://localhost:4000/api/filters`
### Reponse
```JSON
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

