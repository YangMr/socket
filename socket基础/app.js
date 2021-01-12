//引入http模块
const http = require("http");

//引入fs读取文件模块
const fs = require("fs");

//创建服务器
const app = http.createServer((req,res)=>{
	
	//加载静态页面
	fs.readFile("./index.html",(error,data)=>{
		res.writeHead(200,{"Content-Type" : "text/html;charset=utf-8"});
		res.end(data)
	})
	
})

//引入socket.io模块
const io = require("socket.io")(app);

//监听客户端的连接
io.on("connection",(socket)=>{
	console.log("与客户端建立了连接");
	
	//服务器获取客户端广播的数据
	socket.on("addCart",(data)=>{
		//控制台输出接收到的客户端数据
		console.log(data)
		//谁发给我信息,我就把信息广播给谁
		// socket.emit("toClient","我是服务端的数据" + data.client)
		
		//谁发给我,我就广播给所有人
		io.emit("toClient","我是服务端的数据" + data.client)
	})
})

//设置监听的端口号
app.listen(3000)

/*

1. 使用socket.io
	1.1 安装socket.io模块
		npm install socket.io --save
		
	1.2 引入socket.io模块
		const io = require("socket.io")(app);

	1.3 监听客户端的连接
		io.on("connection",function(socket){
			console.log("与服务器建立连接");
		})

2. 在客户端使用socket.io进行通信
	2.1 引入http://localhost:3000/socket.io/socket.io.js文件
	
	2.2 和服务器建立连接
		const socket = io("http://localhost:3000/");
		
	2.3 将客户端的数据发送给服务端	
		//点击按钮
		btn.onclick = function(){
			//将客户端的数据发送给服务端
			socket.emit("addCart",{
				client : "我是客户端的数据"
			});
		}
	
3. 服务器给客户端发送数据
    3.1 服务器给客户端发送数据的方式有两种:
		socket.emit()     是谁给我信息,我就把信息广播给谁
		io.emit()		  io.emit表示广播(也就是群发),给所有连接服务器的客户端都广播数据
*/