async function mystats(message, users, convertAddress, addresses, MessageEmbed, axieInfinityApi) {
	const user = message.author.tag;
	if (users.includes(user)) {
		const address = convertAddress(addresses[user]);

		const { slp, leaderboard } = await axieInfinityApi(address);
		const embed = new MessageEmbed()
			.setColor("AQUA")
			.setTitle(`${message.author.username}'s Stat`)
			.addFields(
				{
					name: "⚔️MMR",
					value: `${leaderboard.elo}`,
				},
				{
					name: "💯Win Rate",
					value: `${leaderboard.winRate}`,
				},
				{
					name: "🏆Rank",
					value: `${leaderboard.rank}`,
				},
				{
					name: ":dagger:Total Wins",
					value: `${leaderboard.winTotal}`,
				},
				{
					name: ":shield:Total Draws",
					value: `${leaderboard.drawTotal}`,
				},
				{
					name: ":skull:Total Loses",
					value: `${leaderboard.loseTotal}`,
				},
				{
					name: "Yesterday SLP",
					value: `${slp.yesterdaySLP} SLP`,
				},
				{
					name: "Today SLP",
					value: `${slp.todaySoFar} SLP`,
				},
				{
					name: "Average SLP",
					value: `${slp.average} SLP`,
				},
				{
					name: "Total SLP",
					value: `${slp.total} SLP`,
				}
			)
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	} else {
		message.reply("Sorry, you don't have access to this command.");
	}
}

module.exports = mystats