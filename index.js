const { execSync } = require("child_process");
const fs = require("fs");

const STATE_FILE = "commit_state.json";

// ---------------- Utilities ----------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load state (for backfill tracking)
function loadState() {
  if (!fs.existsSync(STATE_FILE)) return {};
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ---------------- Git Operations ----------------
function makeCommit(commitTime) {
  const dateStr = commitTime.toISOString();
  execSync(`echo "Commit at ${dateStr}" >> commits.txt`);
  execSync("git add commits.txt");
  execSync(`git commit -m "Commit at ${dateStr}" --date="${dateStr}"`);
  console.log(`✅ Commit made at ${dateStr}`);
}

// ---------------- Daily Commits ----------------
function scheduleTodayCommits() {
  const commitCount = randomInt(1, 15);
  console.log(`📅 Scheduling ${commitCount} commits for today...`);

  const now = new Date();

  // Generate all random times for today
  const times = [];
  for (let i = 0; i < commitCount; i++) {
    const commitTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      randomInt(0, 23),
      randomInt(0, 59),
      randomInt(0, 59)
    );
    times.push(commitTime);
  }

  // Sort times in ascending order
  times.sort((a, b) => a - b);

  // Show all planned commit times
  console.log("🕒 Today's commit schedule:");
  times.forEach((t, i) => {
    console.log(`   ${i + 1}. ${t.toLocaleString()}`);
  });

  // Schedule commits
  for (const commitTime of times) {
    const delay = commitTime.getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => makeCommit(commitTime), delay);
    }
  }
}

// Run daily scheduling loop
function scheduleDaily() {
  scheduleTodayCommits();

  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 5
  );
  const msUntilMidnight = tomorrow.getTime() - now.getTime();

  setTimeout(() => scheduleDaily(), msUntilMidnight);
}

// ---------------- Backfill ----------------
function backfill() {
  const state = loadState();
  if (state.backfilled) {
    console.log("⚠️ Backfilling not possible: already done.");
    return;
  }

  console.log("⏳ Backfilling past year with random commits...");
  const now = new Date();

  for (let d = 365; d >= 1; d--) {
    const day = new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
    const commitCount = randomInt(0, 5); // random commits for natural look
    const times = [];

    for (let i = 0; i < commitCount; i++) {
      const commitTime = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        randomInt(0, 23),
        randomInt(0, 59),
        randomInt(0, 59)
      );
      times.push(commitTime);
    }

    // Sort and show commit times for the day
    times.sort((a, b) => a - b);
    if (times.length > 0) {
      console.log(`🕒 Backfill for ${day.toLocaleDateString()}:`);
      times.forEach((t, i) => {
        console.log(`   ${i + 1}. ${t.toLocaleString()}`);
        makeCommit(t);
      });
    }
  }

  state.backfilled = true;
  saveState(state);
  console.log("✅ Backfilling completed!");
}

// ---------------- Reverse Commits ----------------
function reverse() {
  console.log("⚠️ Reversing commits...");
  execSync("git checkout --orphan latest_branch");
  execSync("git add -A");
  execSync('git commit -m "🔄 Reset history: fresh start"');
  execSync("git branch -D main || true");
  execSync("git branch -m main");
  execSync("git push origin main --force");
  console.log("✅ Repo history wiped clean.");
}

// ---------------- Stop Auto Commits ----------------
function stop() {
  console.log("🛑 Stopping auto commits...");
  process.exit(0);
}

// ---------------- MAIN ----------------
const arg = process.argv[2];

switch (arg) {
  case "--backfill":
    backfill();
    break;
  case "--reverse":
    reverse();
    break;
  case "--stop":
    stop();
    break;
  default:
    console.log("▶️ Starting daily commit scheduler...");
    scheduleDaily();
}
