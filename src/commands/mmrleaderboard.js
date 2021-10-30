async function mmrleaderboard(roles, MessageEmbed, message, addresses, axieInfinityApi, convertAddress, userObjs) {
    if (roles.includes("Admin") | roles.includes("Moderator")) {
        const fields = [];
        const data = [];
        const embed = new MessageEmbed();
        embed.setColor("AQUA");
        embed.setTitle(`${message.guild.name}'s MMR Leaderboard`);
        embed.setTimestamp();
        Object.values(addresses).map((address) => {
            axieInfinityApi(convertAddress(address))
                .then(({ leaderboard }) => {
                    data.push([userObjs[address], leaderboard.elo]);
                    console.log(leaderboard);
                })
                .catch((error) => console.log(error));
        });
        setTimeout(() => {
            data.sort((a, b) => {
                return a[1] - b[1];
            });
            data.reverse();
            console.log(data);
            data.map((datum, index) => {
                fields.push({
                    name: `#${index + 1} ${datum[0]}`,
                    value: `Has ${datum[1]} MMR`,
                });
            });
            embed.addFields(fields);
            message.channel.send({ embeds: [embed] });
        }, 4000);
    } else {
        message.reply("You don't have access to use this command.");
    }
}

module.exports = mmrleaderboard