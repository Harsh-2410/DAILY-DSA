const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const axios = require('axios');

const FILE_PATH = './data.json';
const USERNAME = 'your-github-username'; // 🔴 change this

async function getAccountCreationDate(username) {
    const url = `https://api.github.com/users/${username}`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'commit-bot' } });
    return res.data.created_at; // e.g. "2021-05-10T12:34:56Z"
}

async function makeCommits() {
    const createdAt = await getAccountCreationDate(USERNAME);

    // Parse in UTC to avoid timezone shift
    const createdDate = moment.utc(createdAt).add(1, 'day');
    const today = moment.utc();

    // Ensure at least 1 year of commits
    const minStart = moment.utc(today).subtract(1, 'year');
    const startDate = createdDate.isAfter(minStart) ? createdDate : minStart;

    const days = today.diff(startDate, 'days');
    console.log(`📅 Account created on: ${moment.utc(createdAt).format("YYYY-MM-DD")}`);
    console.log(`✅ Making commits for ${days} days (from ${startDate.format('YYYY-MM-DD')})`);

    const git = simpleGit();

    const makecommit = (n) => {
        if (n < 0) return git.push();

        const DATE = moment.utc(startDate).add(n, 'days');

        // Random number of commits per day (1–3)
        const commitsToday = Math.floor(Math.random() * 3) + 1;

        const doCommits = (count) => {
            if (count === 0) return makecommit(--n);

            // Pick a random time within the day
            const randomHour = Math.floor(Math.random() * 24);
            const randomMinute = Math.floor(Math.random() * 60);
            const commitDate = DATE.clone().hour(randomHour).minute(randomMinute);

            const data = { date: commitDate.format() };
            jsonfile.writeFile(FILE_PATH, data, () => {
                git.add([FILE_PATH])
                    .commit(commitDate.format(), { '--date': commitDate.toISOString() }, () => doCommits(count - 1));
            });
        };

        console.log(`📌 ${commitsToday} commit(s) on ${DATE.format('YYYY-MM-DD')}`);
        doCommits(commitsToday);
    };

    makecommit(days);
}

// 🔥 Reverse all commits: start repo fresh with a single initial commit
async function reverseAllCommits() {
    const git = simpleGit();
    await git.raw(['checkout', '--orphan', 'latest_branch']); // new orphan branch
    await git.raw(['add', '-A']);
    await git.commit('🔄 Reset history: fresh start');
    await git.raw(['branch', '-D', 'main']);  // delete old main
    await git.raw(['branch', '-m', 'main']);  // rename orphan to main
    await git.push('origin', 'main', ['--force']);
    console.log("✅ All commits have been reversed. Repo history wiped clean.");
}

// 🟢 Run the bot
const MODE = process.argv[2]; // "commit" or "reverse"

if (MODE === 'reverse') {
    reverseAllCommits().catch(err => console.error(err));
} else {
    makeCommits().catch(err => console.error(err));
}
