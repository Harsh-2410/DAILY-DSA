# GitHub Commit Bot 🚀

**⚠️ DISCLAIMER: This project is strictly for EDUCATIONAL PURPOSES only. Do not misuse this script.**

This Node.js script automates commits to a GitHub repository, generating commits for the past year, scheduling daily commits, and allowing complete reversal of commit history. It is intended to **learn Git automation and date-based commit generation**.

---

## Features

* Generates **daily commits** with **random timestamps** in ascending order.  
* Backfills the past **365 days** with random commits.  
* Randomizes **1–15 commits per day** for a natural-looking contribution graph.  
* Allows **reversing all commits**, creating a fresh repository state.  
* Supports **stopping daily auto-commits** at any time.  
* Logs all scheduled commit times for transparency.  

---

## Setup Instructions

1. **Clone your repository locally**

```bash
git clone <your-repo-url>
cd <your-repo-folder>
````

2. **Install dependencies**

```bash
npm install
```

*(Your `package.json` should list dependencies like `fs`, `child_process` etc.)*

---

## Usage

### 1. Backfill Past Year

Generates random commits for the past 365 days. Can **only be run once**:

```bash
node index.js --backfill
```

**Output Example:**

```
⏳ Backfilling past year with random commits...
🕒 Backfill for 9/24/2024:
   1. 9/24/2024, 09:12:35 AM
   2. 9/24/2024, 02:45:12 PM
✅ Backfilling completed!
```

---

### 2. Start Daily Auto Commits

Schedules daily commits automatically with random times in **ascending order**:

```bash
node index.js
```

**Output Example:**

```
▶️ Starting daily commit scheduler...
📅 Scheduling 6 commits for today...
🕒 Today's commit schedule:
   1. 9/24/2025, 09:12:35 AM
   2. 9/24/2025, 10:45:12 AM
   3. 9/24/2025, 12:03:50 PM
   4. 9/24/2025, 02:21:44 PM
   5. 9/24/2025, 05:30:11 PM
   6. 9/24/2025, 08:55:07 PM
✅ Commit made at 2025-09-24T09:12:35Z
...
```

Commits continue daily automatically.

---

### 3. Stop Daily Commits

Stop the daily commit scheduler immediately:

```bash
node index.js --stop
```

---

### 4. Reverse All Commits

Reset the repository to a **single initial commit** and push forcefully:

```bash
node index.js --reverse
```

**⚠️ Warning:** This permanently rewrites your repository history. Backup any important data before running.

---

## Notes

* All commits use Git's `--date` option to backdate commits.
* Commit times are randomized but sorted to appear natural.
* Backfill is **one-time only**; trying to run again shows a warning.
* Daily commits schedule automatically for future days.
* Keep a backup branch before using reverse mode.

---

## Commands Quick Reference

| Command                    | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `node index.js --backfill` | Backfill commits for past 365 days (one-time). |
| `node index.js`            | Start daily commit scheduler.                  |
| `node index.js --stop`     | Stop daily commit scheduler.                   |
| `node index.js --reverse`  | Reverse all commits and reset repo history.    |

**✅ Educational Use Only. Do not misuse this script on production repositories.**

