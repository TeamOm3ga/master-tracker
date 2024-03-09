#!/bin/zsh
rclone sync -v --exclude "**/.*" "gdrive:Nonsense/Master Tracker" /data/master-tracker/content
npx quartz build
