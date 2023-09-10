# doc-chat-poc

**如果是 Windows 用户，请安装 Linux on Windows (WSL)**

https://learn.microsoft.com/zh-cn/windows/wsl/install
https://www.bilibili.com/video/BV1n14y1x7Y7/

## Angular-client

```
cd angular-client
npm i
npm run start
```

## Express-server

创建一个 `.env` 文件到 `express-server`

```
cd express-server
npm i
npm run dev
```

然后放 `http://localhost:3200/api/embeddingslookup`, 如果有结果就证明一切正常。
