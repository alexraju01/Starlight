module.exports = {
  repositoryUrl: 'https://github.com/alexraju01/Starlight.git',
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'refactor', release: 'patch' },
          { type: 'upgrade', release: 'minor' },
        ],
        defaultRelease: false,
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'refactor', section: '🛠 Refactors' },
            { type: 'upgrade', section: '📦 Upgrades' },
            { type: 'improve', section: '🚀 Improvements' },
            { type: 'chore', hidden: true },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
