import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { chalk } from 'zx';
import syncAndBuild from './sync-and-build';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(
    chalk.gray(new Date().toLocaleString()),
    chalk.green(`Ready! Logged in as ${readyClient.user.tag}`)
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === syncAndBuild.name) {
    await syncAndBuild.execute(interaction);
  }
});

client.login(DISCORD_TOKEN);
