FROM node:latest

RUN bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)" --unattended
# npm create vue@latest
# chown -R 1001:1002 ./
