module.exports = {
	repositoryUrl: "https://github.com/alexraju01/Starlight.git",
	branches: [
		"main",
		{
			name: "4-style/css-to-tailwind",
			
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
				transform: (commit, context) => commit,
				groupBy: "type",
				commitGroupsSort: "title",
				commitGroupTitleMap: {
				  feat: "✨ Features",
				  fix: "🐛 Bug Fixes",
				  refactor: "🛠 Refactors",
				  upgrade: "📦 Upgrades",
				},
				commitsSort: ["scope", "subject"],
				noteGroupsSort: "title",
				notesSort: compareFunc,
			  },
			},
		  ]
		  ,
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
