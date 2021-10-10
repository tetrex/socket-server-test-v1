const getRandomValues = () => {
	return Math.floor(Math.random() * (99999 - 0 + 1)) + 0;
};

module.exports = { getRandomValues };
