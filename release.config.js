module.exports = {
	repositoryUrl: "https://github.com/alexraju01/Starlight.git",
	branches: [
		"main",
		{
			name: "4-style/css-to-tailwind",
			prerelease: true,
		},
	],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "conventionalcommits",
				releaseRules: [
					{ type: "refactor", release: "patch" },
					{ type: "upgrade", release: "minor" },
				],
			},
		],
		[
			"@semantic-release/release-notes-generator",
			{
				preset: "conventionalcommits",
				writerOpts: {
					groupBy: "type",
					commitGroupsSort: "title",
					commitGroupTitleMap: {
						feat: "✨ Features",
						fix: "🐛 Bug Fixes",
						refactor: "🛠 Refactors",
						upgrade: "📦 Upgrades",
					},
				},
			},
		],
		"@semantic-release/changelog",
		"@semantic-release/github",
		[
			"@semantic-release/git",
			{
				assets: ["CHANGELOG.md", "package.json"],
				message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
	],
};
