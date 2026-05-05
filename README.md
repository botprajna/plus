# AI API Web Starter

这是一个最小可运行的网页接入 AI API 示例。

## 本地运行

1. 安装依赖：

```bash
npm install
```

2. 复制环境变量文件：

```bash
copy .env.example .env
```

3. 编辑 `.env`，填入你的 API Key：

```env
OPENAI_API_KEY=你的_key
OPENAI_MODEL=gpt-4.1-mini
HOST=0.0.0.0
PORT=3000
```

4. 启动项目：

```bash
npm run dev
```

5. 打开：

```text
http://localhost:3000
```

## 公网访问

如果你有公网 IP，要让别人访问，通常还需要：

1. 服务监听 `0.0.0.0`
2. 路由器或云主机安全组放行 `3000` 端口
3. Windows 防火墙放行 Node.js 或端口 `3000`

外网访问地址通常是：

```text
http://你的公网IP:3000
```

如果你是在家用宽带下，很多情况下还要做端口转发。  
如果运营商拦截入站连接，直接公网 IP 也可能访问不到，这时可以改用 Nginx、Cloudflare Tunnel，或者把项目部署到云服务器。

## Git 协作开发流程

第一次初始化仓库：

```bash
git init
git add .
git commit -m "Initial AI web starter"
```

连接 GitHub 仓库：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

日常开发新功能：

```bash
git checkout -b feature/chat-ui
git add .
git commit -m "Improve chat UI"
git push -u origin feature/chat-ui
```

然后在 GitHub 上创建 Pull Request，请队友 review 后合并。

## 安全提醒

不要把 `.env` 提交到 Git。API Key 只能保存在服务端环境变量里，不能写进浏览器 JavaScript。
