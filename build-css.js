const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const watch = process.argv.includes('--watch');
const tokensPath = path.join(__dirname, 'styles', 'tw-tokens.css').replace(/\\/g, '/');

function discoverBlocks() {
  const blocksDir = path.join(__dirname, 'blocks');
  if (!fs.existsSync(blocksDir)) return [];

  return fs.readdirSync(blocksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const { name } = entry;
      const js = path.join(__dirname, 'blocks', name, `${name}.js`);
      const devCss = path.join(__dirname, 'blocks', name, `${name}-dev.css`);
      const hasJs = fs.existsSync(js);
      const hasDev = fs.existsSync(devCss);
      if (!hasJs && !hasDev) return null;

      return {
        name,
        content: hasJs ? js.replace(/\\/g, '/') : undefined,
        input: hasDev ? devCss.replace(/\\/g, '/') : undefined,
        output: `./blocks/${name}/${name}.css`,
      };
    })
    .filter(Boolean);
}

function writeBlockEntry({ name, content, input }) {
  const sourceLine = content ? `@source "${content}";\n` : '';
  const extraImport = input ? `@import "${input}";\n` : '';
  const entry = `@import "tailwindcss/theme.css" prefix(tw) source(none);\n@import "tailwindcss/utilities.css" prefix(tw) source(none);\n@import "${tokensPath}";\n${sourceLine}${extraImport}`;
  const entriesDir = path.join(__dirname, 'styles', '.tw-entries');
  fs.mkdirSync(entriesDir, { recursive: true });
  const entryPath = path.join(entriesDir, `${name}.css`);
  fs.writeFileSync(entryPath, entry);
  return entryPath;
}

const fileMappings = [
  {
    name: 'styles',
    input: './styles/tailwind.css',
    output: './styles/styles.css',
  },
  ...discoverBlocks(),
];

fileMappings.forEach((mapping) => {
  const inputPath = mapping.name === 'styles'
    ? mapping.input
    : writeBlockEntry(mapping);
  const watchArg = watch ? '--watch' : '';
  const command = `npx @tailwindcss/cli -i "${inputPath}" -o "${mapping.output}" ${watchArg} --minify`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`Error compiling ${mapping.output}:`, error.message);
      if (stderr) {
        // eslint-disable-next-line no-console
        console.error(stderr);
      }
      return;
    }
    if (stdout) {
      // eslint-disable-next-line no-console
      console.log(stdout);
    }
    if (stderr) {
      // eslint-disable-next-line no-console
      console.error(stderr);
    }
    // eslint-disable-next-line no-console
    console.log(`Compiled ${mapping.output}`);
  });
});
