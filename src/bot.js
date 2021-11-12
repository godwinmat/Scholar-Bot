require("dotenv").config();

var axios = require("axios").default;

const db = require("./firebase-config");

const {
	convertAddress,
	axieInfinityApi,
	slpPriceApi,
} = require("./botfunctions");
const addronin = require("./commands/addronin");
const deleteronin = require("./commands/deleteronin");
const mystats = require("./commands/mystats");
const myslp = require("./commands/myslp");
const help = require("./commands/help");
const mmrleaderboard = require("./commands/mmrleaderboard");
const slpleaderboard = require("./commands/slpleaderboard");
const slpprice = require("./commands/slpprice");

const {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} = require("firebase/firestore");

const { Client, Intents, MessageEmbed } = require("discord.js");

const userCollectionRef = collection(db, "user details");
const PREFIX = "?";
const defaultCurrency = "usd";
// const amount = 1

const ids = {};
let users = [];
const addresses = {};
const userObjs = {};

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});
client.on("ready", async () => {
	console.log(`${client.user.tag} is online`);
	const details = await getDocs(userCollectionRef);

	details.docs.map((doc) => {
		const username =
			doc._document.data.value.mapValue.fields["discord username"]
				.stringValue;
		const address =
			doc._document.data.value.mapValue.fields["ronin address"]
				.stringValue;
		ids[username] = doc._document.key.path.segments[6];
		addresses[username] = address;
		userObjs[address] = username.split("#")[0];
		users.push(username);
	});
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(PREFIX)) {
		const [cmdName, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);

		const guild = client.guilds.cache.get(message.guildId);
		const senderRoleIds = guild.members.cache.get(message.author.id)._roles;
		const roles = senderRoleIds.map((roleId) => {
			return guild.roles.cache.get(roleId).name;
		});
		switch (cmdName) {
			case "addronin":
				addronin(
					roles,
					args,
					client,
					addDoc,
					userCollectionRef,
					ids,
					addresses,
					userObjs,
					users,
					message
				);
				break;
			case "deleteronin":
				deleteronin(
					roles,
					args,
					client,
					users,
					ids,
					db,
					doc,
					deleteDoc,
					message,
					userObjs,
					addresses
				);
				break;
			case "mystats":
				mystats(
					message,
					users,
					convertAddress,
					addresses,
					MessageEmbed,
					axieInfinityApi
				);
				break;
			case "myslp":
				myslp(
					users,
					addresses,
					message,
					convertAddress,
					axieInfinityApi,
					MessageEmbed
				);
				break;
			case "mmrleaderboard":
				mmrleaderboard(
					roles,
					MessageEmbed,
					message,
					addresses,
					axieInfinityApi,
					convertAddress,
					userObjs
				);
				break;
			case "slpleaderboard":
				slpleaderboard(
					roles,
					MessageEmbed,
					message,
					addresses,
					axieInfinityApi,
					convertAddress,
					userObjs
				);
				break;
			case "help":
				help();
				break;
			case "slpprice":
				slpprice(message, MessageEmbed, defaultCurrency, args);
				
				break;
			default:
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
