const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器2了');
	console.log('请求来自于', request.get('Host'));
	console.log('请求的地址', request.url);
	next()
})

app.post('/',(request,response)=>{
	
	console.log('收到了登录数据')
})

app.listen(5001,(err)=>{
	if(!err) console.log('服务器2启动成功了');
})
