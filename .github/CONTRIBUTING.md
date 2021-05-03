# Contributing to Transero

## Initial Steps

-   Fork this repository and clone it to your local machine.

-   Make sure you have `node` installed. [Download here](https://nodejs.org/en/) if you dont have `node`.

-   Install all packages with the `npm install` command in the project root.

-   Create a [Discord Account](https://discord.com/) if you don't have one.

-   Create an application in [Discord Developers Page](https://discord.com/developers/applications).

-   Create an `.env` file in the project root and add your own discord token based on this:

```env
DISCORD_TOKEN = YOUR_DISCORD_TOKEN
```

**Wooohooo you are setup**, here are some tips :

-   If you want to add a new command , make sure you write it in the `command.ts`

-   Then add the utilities / working file in `commandUtils` Folder

## Writing Bug Reports

**Clear Bug Reports** tend to have:

-   A quick summary and/or background
-   Be more specific
-   Give sample code if you can
-   What you expected would happen
-   What actually happens
-   Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

You can use also the issues template for ease!

## Running the Application

-   First you need to watch the `tsc` using `npm run watch`.

-   You can start on development mode using `npm run dev` in the project root.

-   Make sure you are upto date by writing `git pull` in command line or using a source control app.

-   Submit a [pull request](https://github.com/itstyonirwansyah/transero-bot/pulls).

## License

By contributing, you agree that your contributions will be licensed under its [MIT License](https://github.com/itstyonirwansyah/transero-bot/blob/master/LICENSE).
