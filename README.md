## Set up TypeScript

This is an exercise for me to get familiar with using TypeScript in an application and what better way than with a Twitter bot!

I'm going to try make this bot with the same functionality as the previous **Twitter bot playground** in vanilla JS

First off install [TypeScript][tsdl]

```shell
npm i -g typescript
```

You can get familiar with it by taking a look at the [TypeScript in 5 minutes tutorial][tsin5] if you like, it's exactly where I started.

## Set up the Project

Ok, now we're good to go for setting up our Twitter bot!

Lets start small, so, first off we need to init the project with TypeScript and npm, so from a terminal:

```shell
npm init -y
tsc -init
```

That will set up our config files, if you take a look at the `tsconfig.json` there may be something that loosely resembles this:

```json
{
  "compilerOptions": {
    /* Basic Options */                       
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    // "lib": [],                             /* Specify library files to be included in the compilation:  */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
```

It goes on for another fifty or so lines but I thought for readability I'll just stick a small section of it here so you can get an idea of what it looks like.

This was a bit overwhelming to begin with but if you take a look at the [TypeScript node starter project][tsnst] you can take some guidance from there on what the `tsconfig.json` should look like, I have come up with this:

```json
{
  "compilerOptions": {
    "outDir": "./build",
    "allowJs": true,
    "target": "es5",
    "module": "commonjs"
  },
  "types": [
    "node",
    "dotenv"
  ],
  "include": [
    "./"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}
```

I won't pretend to know exactly what is going on here over and above the documentation supplied in the `tsconfig.json` comments, I know the `outDir` is where we want to keep our compiled `.js` files that the TypeScript compiler `tsc` will produce for us. These files are what we will be running in node.

Wow, all that talk and not even one line of line of code yet!

So, we have our package files `tsconfig.json` and `package.json` set up in out project, let's just make sure we can even TypeScript first! 

Create an `index.js` file:

```shell
touch index.ts
```

In our `index.ts` add a hello world console log:

```javascript
console.log('Hello TypeScript!')
```

Then from the terminal enter the `tsc` command to compile. This should create the JavaScript equivalent in the `build` folder, now if you take a look in there you'll see there's an `index.js` file, so we're happy now that the `tsc` will compile our `.ts` file into `.js` files!

<!-- LINKS -->
[tsdl]: https://www.typescriptlang.org/#download-links
[tsin5]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[tsnst]: https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter