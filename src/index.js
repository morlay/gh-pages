import rimraf from 'rimraf';
import git from 'simple-git';

export const cleanup = (workDir) =>
  rimraf.sync(`${workDir}/.git`);

export const getRemotes = () =>
  new Promise((resolve, reject) => {
    git(process.cwd())
      .getRemotes(
        true,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
  });

export const publish = (options = {}) => {
  cleanup(options.workDir);

  git(options.workDir)
    .init()
    .add('./**')
    .commit(options.commitMessage)
    .addRemote(options.remote, options.remoteUrl)
    .push(['--force', options.remote, 'master:gh-pages']);
};
