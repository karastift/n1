# n1
## Note: The bot is not active or hosted anywhere for public use.
#### A discord bot written in Typescript. It uses the `discord.js` api.
#### The main focus is on the `prefix + move` command. After activation the bot moves users in the channels which have the same name as their activity

## General Usage:
#### 1. Create an application on https://discord.com/developers/applications and get a bot token.
#### 2. Add a `config.json` file in `src/`:
```json
{
  "token": "add your token here",
  "prefix": "#"
}
```
#### 3. Install the needed packages:
```
yarn
```
#### 4. Build:
```
yarn build
```
#### 5. Start the bot:
```
yarn start
```
#### 6. Invite the bot to your server.
#### 7. Activate the bot on your server:
```
prefix + moving start
```
#### 8. Create channels which have the name of the games you are playing.
## All commands:

#### Make the bot listen to your activities and move:
```
prefix + moving start
```
#### Make the bot stop listening to your activities and stop moving:
```
prefix + moving start
```
#### Get to know the listening status:
```
prefix + moving status
```
#### There is an option to configure in the code but it does not work at the moment:
```
prefix + moving configure
```
## Example:
    ExampleServer
    Talk: General
        O user_123
    Talk: Rainbow Six Siege

##### *user_123 starts playing Rainbow Six Siege*
##### *Bot notices the change of the activity and moves user_123 in the right channel*
    ExampleServer
        Talk: General
        Talk: Rainbow Six Siege
            O user_123
