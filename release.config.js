module.exports = {
	branches: ["main"],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "conventionalcommits",
				releaseRules: [
					{ type: "chore", scope: "deps", release: "patch" },
					{ type: "refactor", release: "patch" },
					{ type: "docs", release: false },
				],
			},
		],
		"@semantic-release/release-notes-generator",
		"@semantic-release/npm",
		"@semantic-release/github",
	],
};
