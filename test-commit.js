const { execSync } = require("child_process");
const fs = require("fs");

// --- Configure git author ---
execSync('git config user.name "Harsh-2410"');
execSync('git config user.email "harshankittiwary@gmail.com"');

// Make a single commit immediately
function makeTestCommit() {
  const now = new Date();
  const dateStr = now.toISOString();

  fs.appendFileSync("commits.txt", `Test commit at ${dateStr}\n`);
  execSync("git add commits.txt");
  execSync(`git commit -m "Test commit at ${dateStr}" --date="${dateStr}"`);
  console.log(`✅ Test commit made at ${dateStr}`);
}

makeTestCommit();
