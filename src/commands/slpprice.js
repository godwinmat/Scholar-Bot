const { slpPriceApi } = require("../botfunctions");

async function slpprice(message, MessageEmbed, defaultCurrency, args) {
	const [currency, amount] = args;
	const data = await slpPriceApi();
	const price = data.market_data.current_price;
	if (currency) {
		if (price[currency.toLowerCase()]) {
			const embed = new MessageEmbed();
			embed.setTitle("SLP Price");
			embed.setDescription(
				`SLP is ${
					(price[currency.toLowerCase()] * (amount ? amount : 1)).toFixed(4)
				} ${currency.toUpperCase()}`
			);
			message.channel.send({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed();
			embed.setTitle("Invalid currency short code.");
			embed.setDescription(
				"Examples of currency short codes are NGN, PHP, USD, CAD, EUR, HKD etc."
			);
			message.channel.send({ embeds: [embed] });
		}
	} else {
		const embed = new MessageEmbed();
		embed.setTitle("SLP Price");
		embed.setDescription(
			`SLP is ${price[defaultCurrency]} ${defaultCurrency.toUpperCase()}`
		);
		message.channel.send({ embeds: [embed] });
	}
}

module.exports = slpprice;
