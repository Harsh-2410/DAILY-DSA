# GitHub Commit Bot 🚀 

**⚠️ DISCLAIMER: This project is strictly for EDUCATIONAL PURPOSES only. Do not misuse this script.**

This Node.js script automates commits to a GitHub repository based on your account creation date or at least 1 year back, with the option to reverse all commits. It can be used to understand Git automation and date-based commit generation.

---

## Features

* Fetches your GitHub account creation date using GitHub API.
* Ensures at least **1 year of daily commits** even if your account is newer.
* Randomizes **1–3 commits per day** to make contribution graphs appear natural.
* Allows **reversing all commits**, creating a fresh repository state.
* Generates commits with **random timestamps per day**.

---

## Setup Instructions

1. **Clone your repository locally**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install jsonfile moment simple-git axios
   ```

3. **Edit the script**

   * Open `index.js`.
   * Replace `const USERNAME = 'your-github-username';` with your GitHub username.

---

## Usage

### Generate Commits

Generates commits from your account creation date or at least 1 year back with randomized times and multiple commits per day:

```bash
node index.js commit
```

### Reverse All Commits

Wipes all commit history and starts fresh:

```bash
node index.js reverse
```

**⚠️ Warning:** This permanently rewrites repository history. Make sure to back up any important data.

---

## Notes

* All commits are backdated using Git's `--date` option.
* Random commit times make contribution graphs look more natural.
* Always keep a backup branch before running reverse mode.
* Execution requires Node.js installed on your system.

**✅ Educational Use Only. Do not misuse this script on production repositories.**
