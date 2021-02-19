// fs 是用来读文件的
const fs = require("fs");

// 得到字符串
const usersString = fs.readFileSync("./db/users.json").toString();

// 得到数组
const usersArray = JSON.parse(usersString);

// 写数据库
const user3 = { id: 3, name: "tom", password: "yyy" };
usersArray.push(user3);
const string = JSON.stringify(usersArray);
fs.writeFileSync("./db/users.json", string);
