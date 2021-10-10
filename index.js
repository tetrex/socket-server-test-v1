const { Server } = require("socket.io");
const { getRandomValues } = require("./Utils");

const io = new Server({});

io.on("connection", (socket) => {
	console.log("connected NEW SOCKET : ", socket.id);
	socket.emit("response", `connected : ${socket.id}`);
	socket.on("click", () => {
		console.log("click emit");
		socket.emit("response", "Click OK");
	});
	socket.on("test", () => {
		console.log("test emit");
		socket.emit("response", "TEST OK");
	});
	socket.on("data", (data) => {
		console.log("data emit", data);
		let { name, value } = JSON.parse(data);
		console.log(name, value);
		socket.emit("response", `did u pass ? name : ${name}   value : ${value}`);
	});
	socket.on("disconnect", (reason) => {
		console.log(reason);
		console.log(socket.id, "  :  Disconnected");
	});

	//inc i by 0.001
	while (true) {
		for (let i = 0; i < getRandomValues(); i = i + 0.1) {
			var delayInMilliseconds = 5000; //1 second
			setTimeout(function () {
				console.log("delay 5 sec");
			}, delayInMilliseconds);
			// console.log(i);
			socket.emit("data", i.toFixed(2));
		}
	}
});

io.listen(9977);
