import yargs from 'yargs';
import path from 'path';
import { publish, getRemotes } from './index';

const argv = yargs
  .usage('Usage: $0 <src> [options]')

  .example('gh-pages')

  .options({
    remote: {
      description: 'remote name',
      default: 'origin',
    },
    remoteUrl: {
      description: 'remote url for push',
    },
  })
  .help('help')
  .alias('help', 'h')
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
  .argv;

getRemotes()
  .then((remoteList) => {
    const remoteItem = remoteList.find((item) => item.name === argv.remote);

    if (!remoteItem) {
      throw new Error(`${argv.remote} is not available.`);
    }

    return publish({
      workDir: path.resolve(process.cwd(), argv._[0] || '.'),
      remote: argv.remote,
      remoteUrl: argv.remoteUrl || remoteItem.refs.push,
    });
  });

