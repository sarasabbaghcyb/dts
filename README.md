
# librian-worker

This application is part of Librian.ai. It listens to messages on SQS queues and will perform tasks if any are detected.

## Prerequisites

1. A node version manager, like [nvm](https://formulae.brew.sh/formula/nvm)
2. Docker >= 3.9 - [Install docker engine](https://docs.docker.com/engine/install/)

### Setup

1. Set your node version to what is configured in `.nvmrc` with your preferred node version manager.

    - For `nvm`:
      ```shell
      nvm install
      ```

2. Install the dependencies `npm i`
3. Prettier should now be installed. Configure your IDE to use prettier and format on save.

### Starting the database

`docker compose up db` or `docker compose up db -d` (detached mode)

### Starting the project

1. Copy the `env.dev` to `.env`
2. Run `npm run dev` to start the project in development mode. This will watch for changes and restart the server
3. Alternatively, run `npm run build` and `npm run start`

