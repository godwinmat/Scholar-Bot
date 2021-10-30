async function slpleaderboard(roles, MessageEmbed, message, addresses, axieInfinityApi, convertAddress, userObjs) {
    if (roles.includes("Admin") | roles.includes("Moderator")) {
        const fields = [];
        const data = [];
        const embed = new MessageEmbed();
        embed.setColor("DARK_VIVID_PINK");
        embed.setTitle(`${message.guild.name}'s SLP Leaderboard`);
        embed.setTimestamp();
        
        Object.values(addresses).map((address) => {
            axieInfinityApi(convertAddress(address))
                .then(({ slp }) => {
                    data.push([userObjs[address], slp.total]);
                    console.log(slp);
                })
                .catch((error) => console.log(error));
        });
        console.log(data)
        setTimeout(() => {
            data.sort((a, b) => {
                return a[1] - b[1];
            });
            data.reverse();
            // console.log(data);
            data.map((datum, index) => {
                fields.push({
                    name: `#${index + 1} ${datum[0]}`,
                    value: `Has ${datum[1]} SLP`,
                });
            });
            embed.addFields(fields);
            message.channel.send({ embeds: [embed] });
        }, 4000);
        console.log("got to the end")
    } else {
        message.reply("You don't have access to use this command.");
    }
}

module.exports = slpleaderboard