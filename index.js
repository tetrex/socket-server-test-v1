const { Server } = require("socket.io");

const io = new Server({});

io.on("connection", (socket) => {
	console.log("connected NEW SOCKET : ", socket.id);
	socket.on("click", () => {
		console.log('click emit');
		socket.emit("response", "Click OK");
	});
	socket.on("test", () => {
		console.log('test emit');
		socket.emit("response", "TEST OK");
	});
	socket.on("data", (data) => {
		console.log('data emit', data);
		let { name, value } = JSON.parse(data);
		console.log(name, value);
		socket.emit("response", `did u pass ? name : ${name}   value : ${value}`);
	});
	socket.on("disconnect", (reason) => {
		console.log(reason);
		console.log(socket.id, "  :  Disconnected");
	});
});

io.listen(9977);
