import 'dotenv/config';
import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { $, within, chalk } from 'zx';

const ROOT_DIR = process.env.ROOT_DIR;

const SyncAndBuild = async () => {
  let logs = '';
  await within(async () => {
    $.verbose = false;
    $.cwd = `${ROOT_DIR}/quartz`;
    logs += await $`rclone sync -v --exclude "**/.*" "gdrive:Nonsense/Master Tracker" ${ROOT_DIR}/quartz/content`;
    logs += await $`npx quartz build`;
  });
  return logs;
};

const name = 'sync-and-build';
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription('Sync and build the Master Tracker website'),
  async execute(interaction: CommandInteraction) {
    console.log(
      chalk.grey(new Date().toLocaleString()),
      chalk.yellow(`Sync triggered by ${interaction.user.tag}...`)
    );
    await interaction.reply('Syncing and building the website...');
    try {
      const logs = await SyncAndBuild();
      console.log(
        chalk.gray(new Date().toLocaleString()),
        chalk.green('Sync and build complete!')
      );
      await interaction.editReply(`Sync and build complete! Logs:\n\`\`\`${logs}\n\`\`\`\nGo to https://master-tracker.retrocraft.ca/ to see the changes.`);
    } catch (p) {
      const logs = `Failure: \n\`\`\`${p}\`\`\` `;
      console.log(
        chalk.gray(new Date().toLocaleString()),
        chalk.red('Sync and build failed!')
      );
      await interaction.editReply(`Sync and build failed. ${logs}`);
    }
  },
};
