#!/usr/bin/env -S bun run
import 'dotenv/config';
import { REST, Routes } from 'discord.js';

import syncAndBuild from "./sync-and-build.ts";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
const DISCORD_CLIENT = process.env.DISCORD_CLIENT as string;
const DISCORD_SERVER = process.env.DISCORD_SERVER as string;

const commands = [syncAndBuild].map((command) => command.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT, DISCORD_SERVER),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
