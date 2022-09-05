const express = require('express')
const app = express()

app.use((request, response, next) => {
	console.log('有人请求服务器1了');
	console.log('请求来自于',request.get('Host'));
	console.log('请求的地址',request.url);
	next()
})

app.get('/', (request, response) => {
	const personal = {
		id: "022020208",
		name: "吴双",
		email: "2571219329@qq.com",
		department: "计算机科学与工程学院",
		class: "人工智能201",
		role: "学生"
	}
	response.send(personal)
})

app.listen(5000, (err) => {
	if (!err) console.log('服务器1启动成功了');
})
