async function myslp(users, addresses, message, convertAddress, axieInfinityApi, MessageEmbed) {
    if (users.includes(message.author.tag)) {
        const address = convertAddress(
            addresses[message.author.tag]
        );

        const { slp } = await axieInfinityApi(address);
        const embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle(`${message.author.username}'s SLP Count.`)
            .addFields(
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
        message.reply(
            "Sorry, you do not have access to this command."
        );
    }
}

module.exports = myslp