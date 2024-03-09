# Master Tracker 4.0

## Infrastructure

- Markdown files created by Omega members on Obsidian
- Files are synced to a shared Google Drive folder, triggered by a Discord bot
- Static site generated by Quartz
- Hosted by Retro on his server

## Docker Configuration

- Use the `nginx:alpine` image
- Link `./conf.d` to `/etc/nginx/conf.d`
- Link `./quartz/public` to `/usr/share/nginx/html`
