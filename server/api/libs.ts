import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

interface Library {
  package: string;
  title: string;
  github: string;
  snippet: string;
}

export default defineEventHandler(async () => {
  const cwd = process.cwd();
  const rootDir = cwd.includes('.output') ? join(cwd, '..') : cwd;
  const libPath = join(rootDir, 'libs');
  const snpPath = join(rootDir, 'snippets');
  const files = readdirSync(libPath);

  const libs = files.map((file) => {
    const lib: Library = JSON.parse(readFileSync(`${libPath}/${file}`).toString());
    const snippet = readFileSync(`${snpPath}/${lib.snippet}`).toString();

    const snipLines = snippet.split('\n');
    const finalSnippet = [];
    let flag = false;
    for (const sLine of snipLines) {
      if (!flag && sLine.includes(`const exec = async`)) {
        flag = true;
        continue;
      } else if (flag && sLine.includes('Returning')) {
        flag = false;
        break;
      } else if (flag) {
        finalSnippet.push(sLine.substring(2));
      }
    }
    lib.snippet = finalSnippet.join('\n');
    return lib;
  });
  return { libs };
});
