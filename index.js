const { Server } = require("socket.io");
const { getRandomValues } = require("./Utils");

const io = new Server({});

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const randomValSend = async (socket) => {
	return new Promise(async (resolve, reject) => {
		console.log("in func");
		let val = getRandomValues();
		// await timer(3000);
		console.log("val", val);
		for (let i = 0; i <= val; i = i + 0.01) {
			//DEF speed here in ms
			await timer(200);
			console.log(i.toFixed(2));
			socket.emit("data", i.toFixed(2));
		}
		await timer(6000);
		resolve(true);
	});
};

io.on("connection", async (socket) => {
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
		console.log("in while");
		await randomValSend(socket);
	}
});

io.listen(9977, () => {
	console.log("[SERVER] Ready on : ", 9977);
});
