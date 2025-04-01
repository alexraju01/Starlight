module.exports = {
	repositoryUrl: "https://github.com/alexraju01/Starlight.git",
	branches: [
		"main",
		{
			name: "4-style/css-to-tailwind",
			
		},
	],
	// improve this
	
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
				  const shortHash = commit.hash?.substring(0, 7);
				  const repoUrl = context.repositoryUrl?.replace(/\.git$/, "") || "";
				  const commitUrl = commit.hash ? `${repoUrl}/commit/${commit.hash}` : "";
			  
				  const formattedSubject = commitUrl
					? `* ${commit.subject} (${commitUrl})`
					: `* ${commit.subject}`;
			  
				  return {
					...commit,
					subject: formattedSubject,
				  };
				},
			  }
			  
			  ,
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
