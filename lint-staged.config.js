module.exports = {
   "**/*.(ts)": (filenames) => [
      // Type check all TypeScript files
      "yarn tsc --noEmit",
      // linting
      `yarn eslint --fix ${filenames.join(" ")}`,
      // run prettier
      `yarn prettier --write ${filenames.join(" ")}`,
   ],

   // Format MarkDown and JSON
   "**/*.(json)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,
};
