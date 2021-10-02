const { Server } = require("socket.io");

const io = new Server({});

io.on("connection", (socket) => {
	console.log("connected NEW SOCKET : ", socket.id);
	socket.on("click", () => {
		socket.emit("response", "Click OK");
	});
	socket.on("test", () => {
		socket.emit("response", "TEST OK");
	});
	socket.on("data", (data) => {
		let { name, value } = data;
		socket.emit("response", `did u pass ? name : ${name}   value : ${value}`);
	});
	socket.on("disconnect", (reason) => {
		console.log(reason);
		console.log(socket.id, "  :  Disconnected");
	});
});

io.listen(9977);
