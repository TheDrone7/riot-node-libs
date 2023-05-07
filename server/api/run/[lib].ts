import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { inspect } from 'node:util';

interface Library {
  package: string;
  title: string;
  github: string;
  snippet: string;
}

export default defineEventHandler(async (event) => {
  const libName = event.context.params?.lib;
  if (!libName) return { error: 'No' };

  const cwd = process.cwd();
  const rootDir = cwd.includes('.output') ? join(cwd, '..') : cwd;
  const libPath = join(rootDir, 'libs');
  const snpPath = join(rootDir, 'snippets');
  const files = readdirSync(libPath);

  const libs = files.map((file) => {
    const lib: Library = JSON.parse(readFileSync(`${libPath}/${file}`).toString());
    return lib;
  });

  const lib = libs.find((l) => l.title === decodeURIComponent(libName));

  if (!lib) return { error: 'No' };

  const { default: libEval } = await import(`${snpPath}/${lib.snippet}`);
  const match = await libEval(process.env.RIOT_API_KEY);
  const output = inspect(match, {
    depth: 5,
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
    breakLength: 80,
    compact: false
  }).replaceAll(process.env.RIOT_API_KEY!, 'RGAPI_KEY');

  return { output };
});

