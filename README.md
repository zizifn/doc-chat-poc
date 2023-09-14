# doc-chat-poc

**如果是 Windows 用户，请安装 Linux on Windows (WSL)**

微软官方教程：
https://learn.microsoft.com/zh-cn/windows/wsl/install

B 站 UP 主教程：
https://www.bilibili.com/video/BV1n14y1x7Y7/

**请注意：在 WSL 或 Linux 中，为了使依赖包"sqlite-vss"能够正常工作还需要执行下列安装：**

```
sudo apt-get update
sudo apt-get install -y libgomp1 libatlas-base-dev liblapack-dev
```

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

然后访问 `http://localhost:3200/api/embeddingslookup`, 如果有结果就证明一切正常。

### more info

如果你想知道数据库中的数据，访问如下 URL

http://localhost:3200/api/tables/vss_chat_content

http://localhost:3200/api/tables/chat_content

删除所有数据库。
http://localhost:3200/api/delete
