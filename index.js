const { execSync } = require("child_process");
const fs = require("fs");

// --- Configure git author ---
execSync('git config user.name "Harshankit2410"');
execSync('git config user.email "harshankit2410@gmail.com"');

// Generate random commits between 1–15
function makeRandomCommits() {
  const numCommits = Math.floor(Math.random() * 15) + 1; // 1–15 commits
  const now = new Date();

  // Create random offsets within the same day (in minutes)
  let times = [];
  for (let i = 0; i < numCommits; i++) {
    const offsetMinutes = Math.floor(Math.random() * (24 * 60)); // within 24 hrs
    const commitTime = new Date(now.getTime() + offsetMinutes * 60000);
    times.push(commitTime);
  }

  // Sort ascending so commit history looks natural
  times.sort((a, b) => a - b);

  // Make commits
  times.forEach((t, idx) => {
    const dateStr = t.toISOString();
    fs.appendFileSync("commits.txt", `Random commit #${idx + 1} at ${dateStr}\n`);
    execSync("git add commits.txt");
    execSync(`git commit -m "Random commit #${idx + 1} at ${dateStr}" --date="${dateStr}"`);
    console.log(`✅ Commit #${idx + 1} made at ${dateStr}`);
  });
}

makeRandomCommits();
