var axios = require("axios").default;

function convertAddress(address) {
	address = address.split(":")[1];
	address = `0x${address}`;
	return address;
}

async function axieInfinityApi(address) {
	var options = {
		method: "GET",
		url: `https://axie-infinity.p.rapidapi.com/get-update/${address}`,
		params: {
			id: `${address}`,
		},
		headers: {
			"x-rapidapi-host": "axie-infinity.p.rapidapi.com",
			"x-rapidapi-key":
				"4939da0243mshb1a933087e14362p1c1b11jsn2a2ea53832d0",
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function slpPriceApi() {
	// const data = await fetch(
	// 	" "
	// );
	var axios = require("axios").default;
		
	var options = {
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/smooth-love-potion?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false",
	};
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

module.exports = { convertAddress, axieInfinityApi, slpPriceApi };
