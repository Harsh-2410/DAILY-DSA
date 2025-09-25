const { execSync } = require("child_process");
const fs = require("fs");

// --- Configure git author locally ---
execSync('git config user.name "Harsh-2410"');
execSync('git config user.email "harshankittiwary@gmail.com"');

// Helper: Convert date → IST ISO string
function toISTISOString(date) {
  const istOffset = 5.5 * 60 * 60000; // 5 hrs 30 mins offset
  return new Date(date.getTime() + istOffset).toISOString();
}

// Generate random commits between 1–15
function makeRandomCommits() {
  const numCommits = Math.floor(Math.random() * 15) + 1; // 1–15 commits
  const now = new Date();

  // Create random offsets (in minutes) within 24 hours
  let times = [];
  for (let i = 0; i < numCommits; i++) {
    const offsetMinutes = Math.floor(Math.random() * (24 * 60));
    const commitTime = new Date(now.getTime() + offsetMinutes * 60000);
    times.push(commitTime);
  }

  // Sort ascending so history looks natural
  times.sort((a, b) => a - b);

  // Make commits
  times.forEach((t, idx) => {
    const dateStr = toISTISOString(t); // IST commit time
    fs.appendFileSync("commits.txt", `Random commit #${idx + 1} at ${dateStr}\n`);

    execSync("git add commits.txt");
    execSync(`git commit -m "Random commit #${idx + 1} at ${dateStr}" --date="${dateStr}"`, {
      env: {
        ...process.env,
        GIT_AUTHOR_DATE: dateStr,
        GIT_COMMITTER_DATE: dateStr,
      },
    });

    console.log(`✅ Commit #${idx + 1} made at ${dateStr} (IST)`);
  });
}

makeRandomCommits();
