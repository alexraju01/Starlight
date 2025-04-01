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
				defaultRelease: false,
			},
		],
		[
			"@semantic-release/release-notes-generator",
			{
			  preset: "conventionalcommits",
			  presetConfig: {
				types: [
				  { type: "feat", section: "✨ Features" },
				  { type: "fix", section: "🐛 Bug Fixes" },
				  { type: "refactor", section: "🛠 Refactors" },
				  { type: "upgrade", section: "📦 Upgrades" },
				  { type: "chore", hidden: true },
				],
			  },
			  writerOpts: {
				transform: (commit, context) => {
				  const issues = [];
		  
				  // Create a link to the commit
				  if (commit.hash && context.repository && context.host) {
					const shortHash = commit.hash.substring(0, 7);
					const commitUrl = `${context.host}/${context.owner}/${context.repository}/commit/${commit.hash}`;
					commit.shortHash = shortHash;
					commit.commitUrl = commitUrl;
				  }
		  
				  // Format the message
				  commit.subject = `* ${commit.subject} (${commit.commitUrl})`;
		  
				  return commit;
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
