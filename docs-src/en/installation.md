# Installing Crooked Shelf

Crooked Shelf is a program that stays running on a computer (the "server") and that you use from your browser, even on your phone. The computer can be your PC, a Raspberry Pi at home or a server rented on the internet.

All the data (database, images, installed plugins) lives in **a single folder**: that is all you need to back up.

## 1. With Docker (recommended)

You need [Docker](https://docs.docker.com/get-docker/) (on Windows and Mac: Docker Desktop).

```bash
git clone https://github.com/yanez86/crooked-shelf.git
cd crooked-shelf
docker compose up -d
```

Open **http://localhost:3000**. The first time, you create the wiki and the administrator account: the page asks for the **setup code**, which you'll find in `docker compose logs` (it's there so that you are the one who sets up the wiki, not whoever reaches the address first). Alternatively, choose the code yourself with the `CS_SETUP_TOKEN` variable.

From other devices at home, use the computer's address, for example `http://192.168.1.20:3000`.

Useful commands:

| What | Command |
|---|---|
| Stop | `docker compose stop` |
| Restart | `docker compose start` |
| See the messages | `docker compose logs -f` |
| Update to a new version | `git pull` and then `docker compose up -d --build` |

The data lives in the Docker volume `crooked-shelf-data` and survives updates.

If Docker answers **"Too Many Requests"** during the build, use another copy of the Node image:

```bash
docker compose build --build-arg NODE_IMAGE=mirror.gcr.io/library/node:22-bookworm-slim
docker compose up -d
```

### Raspberry Pi

It works on a Raspberry Pi 4 or 5 with a 64-bit system (Raspberry Pi OS 64-bit): the steps are the same. The first build takes a few minutes.

## 2. Without Docker

You need [Node.js](https://nodejs.org/) 22.17 or newer.

```bash
git clone https://github.com/yanez86/crooked-shelf.git
cd crooked-shelf
npm ci
npm run build
npm start
```

The data goes in the `data` folder next to the program (you can change it with `CS_DATA_DIR`).

To have it start on its own when the computer turns on, you can use `systemd` (Linux), `pm2` or the Windows Task Scheduler.

## 3. On the internet, with HTTPS

To make the wiki reachable from outside your home, you need an always-on server with a public IP (for example a small VPS for a few euros a month) and a domain (e.g. `wiki.esempio.it`). The repository already has everything you need: `docker-compose.prod.yml` starts the wiki together with [Caddy](https://caddyserver.com/), which handles HTTPS and gets and renews the certificate on its own.

The server needs at least 2 GB of RAM (to build the image) and ports **80** and **443** open, both in the provider's firewall and in the system's.

1. On the site where you bought the domain, create an **A** record (e.g. `wiki`) pointing to the server's IP.
2. On the server, install Docker and download Crooked Shelf:

   ```bash
   curl -fsSL https://get.docker.com | sh
   git clone https://github.com/yanez86/crooked-shelf.git /opt/crooked-shelf
   cd /opt/crooked-shelf
   ```

3. Write the domain in the `.env` file:

   ```bash
   cp .env.example .env
   nano .env          # CS_DOMAIN=wiki.esempio.it
   ```

4. Start it:

   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

5. Open `https://wiki.esempio.it` and create the wiki and the administrator account with the setup code you'll find in `docker compose -f docker-compose.prod.yml logs crooked-shelf`.

The wiki isn't exposed directly: from outside, everything goes through Caddy, and `CS_ORIGIN` and `CS_TRUST_PROXY` are already set.

| What | Command |
|---|---|
| See the messages | `docker compose -f docker-compose.prod.yml logs -f` |
| Update to a new version | `git pull` and then `docker compose -f docker-compose.prod.yml up -d --build` |
| Stop | `docker compose -f docker-compose.prod.yml stop` |

Tips for a reliable wiki:

- turn on the **automatic server backups** offered by the provider and the wiki's [automatic backup](#automatic-backup), ideally encrypted and copied elsewhere with rclone; every now and then, also download the backup to a disk of your own;
- log in to the server with an SSH key and let the system install security updates on its own (on Ubuntu: `apt install unattended-upgrades`).

If you already use another proxy (nginx, Caddy installed by hand…), `docker-compose.yml` still works: point the proxy to `localhost:3000` and remove the `#` from these lines:

```yaml
CS_ORIGIN: "https://wiki.esempio.it"
CS_TRUST_PROXY: "1"
```

In that case, also change `"3000:3000"` to `"127.0.0.1:3000:3000"`: this way the wiki answers only the proxy, and nobody can reach it over `http`, bypassing HTTPS. With an `https` address in `CS_ORIGIN`, the wiki sends the `Strict-Transport-Security` header on its own; the proxy must pass `X-Forwarded-For` (and `X-Forwarded-Proto`), otherwise the limits on sign-in attempts are shared by all visitors together: the wiki points this out in the logs if the headers don't add up.

Access for visitors without an account is **off** by default: until you turn it on, only people who have received an invite can get into the wiki.

## 4. Try it online for free, with Render

To take a look at the wiki from outside your home without a server of your own, there's [Render](https://render.com/): the `render.yaml` file is ready to go.

1. Sign in to Render with GitHub.
2. **New › Blueprint**, choose the repository and confirm.
3. When the build is done, open the `https://crooked-shelf-….onrender.com` address and create the wiki and the administrator account with the setup code you'll find in the Render logs (or the one you set yourself in `CS_SETUP_TOKEN` among the service's variables).

Every time something changes on `main`, Render builds and publishes the new version on its own.

On the free plan:

- after 15 minutes without visits the wiki shuts down, and on the next visit it takes up to a minute to start again;
- **the data doesn't last**: every shutdown, restart or new version starts over from an empty wiki.

It's fine for trying it out, not for playing a campaign on: for that, use one of the options above.

## Settings

| Variable | Meaning | Default |
|---|---|---|
| `PORT` | port | `3000` |
| `HOST` | address to listen on | `0.0.0.0` |
| `CS_DATA_DIR` | data folder | `./data` (in Docker `/data`) |
| `CS_ORIGIN` | public address, e.g. `https://wiki.esempio.it` | — |
| `CS_TRUST_PROXY` | `1` behind a proxy that sends `X-Forwarded-*` | — |
| `CS_PLUGINS_BUNDLED` | folder of the bundled plugins | `./plugins` |
| `CS_UPDATE_CHECK` | `0` = don't check GitHub for a new version | — |
| `CS_SETUP_TOKEN` | the code for the first setup; without it, the wiki generates one and writes it in the logs | — |
| `CS_UPLOAD_QUOTA_MB` | image space for each player account (Game Masters and Admins have no limit) | `512` |
| `CS_PACK_MAX_MB` | maximum size, uncompressed, of a world package to import | `200` |
| `CS_BACKUP_DIR` | folder for automatic backups, e.g. your OneDrive folder (see [Automatic backup](#automatic-backup)); it must already exist | `<CS_DATA_DIR>/backups` |
| `TZ` | the table's time zone, e.g. `Europe/Rome`: it decides “today” and when an appointment is called off | the system's (`docker-compose.yml`: `Europe/Rome`) |

Without `CS_ORIGIN`, the wiki uses the address it is reached at, over `http`: that way it works right away on your local network.

In Administration › Settings, the wiki compares its version with the one in `package.json` on the `main` branch on GitHub. The server reads it only when an Admin opens the page, at most once an hour, and sends nothing about the wiki; with `CS_UPDATE_CHECK=0` it doesn't contact GitHub.

## Backup and restore

**Backup**: Administration › Backup › “Download backup”. The file contains the database, images and installed plugins, unencrypted: it contains everything, including every campaign's secrets and the encrypted passwords. Keep it on another disk, somewhere safe.

### Automatic backup

In Administration › Backup, the Admin turns on **automatic backup**: once a day, at the chosen hour (the server's time), the wiki saves a full backup in a folder and keeps only the most recent ones (7, unless you choose otherwise). If the computer is off at that hour, the backup starts as soon as it's back on; if it fails, the wiki tries again every hour and reports it on the page and in the Log. There's also the “Back up now” button.

The files are named `crooked-shelf-backup-2026-11-05-030000.zip` (or `.zip.enc`, if encrypted). The wiki deletes only its own older automatic backups, which it recognizes by their name: the other files in the folder stay where they are. Each file starts out with a temporary name (`~crooked-shelf-backup-….tmp`) and gets its real name only once the work is finished.

**Getting them to the cloud.** The wiki doesn't connect to OneDrive, Google Drive or Dropbox: it writes the backups to a folder, and if that's their app's folder, the app takes care of uploading them. The folder is chosen by whoever installs the wiki, with the `CS_BACKUP_DIR` variable; without it, backups go in `backups` inside the data folder, which protects you from a mistake but not from a broken disk. The folder must already exist: if it's missing (disk unplugged, folder not connected to Docker), the backup fails and the page says so.

- **Windows, without Docker** (PowerShell, from the Crooked Shelf folder):

  ```powershell
  mkdir "$env:USERPROFILE\OneDrive\Crooked Shelf"
  $env:CS_BACKUP_DIR = "$env:USERPROFILE\OneDrive\Crooked Shelf"
  npm start
  ```

  With Google Drive for desktop, the folder is usually `G:\My Drive\Crooked Shelf`.

- **Docker** (Docker Desktop on Windows and Mac too): in `docker-compose.yml`, remove the `#` from the backup lines and write the path of the folder on your computer, then run `docker compose up -d`:

  ```yaml
  volumes:
    - crooked-shelf-data:/data
    - "C:/Users/nome/OneDrive/Crooked Shelf:/backups"
  environment:
    CS_BACKUP_DIR: "/backups"
  ```

  On Linux, the folder must be writable by the container's user: `sudo chown 1000:1000 /path/to/folder`. The backups are readable only by that user (and by root), because they contain everything.

- **On a server (VPS)** there's no OneDrive app: connect a folder on the server as above (e.g. `/opt/crooked-shelf-backup:/backups`) and upload it with [rclone](https://rclone.org/), which can talk to Google Drive, OneDrive and many others. After setting it up (`rclone config`), one line in `crontab -e` copies it every morning, skipping files that are still half-written:

  ```bash
  30 4 * * * rclone copy /opt/crooked-shelf-backup drive:CrookedShelf --exclude "~*"
  ```

The old copies that the wiki deletes also disappear from the cloud (they usually end up in the OneDrive or Drive trash); `rclone copy`, on the other hand, doesn't delete anything.

**Encrypting automatic backups.** A backup contains everything, unencrypted: anyone who gets to the file, or to your cloud account, can read every campaign's pages and secrets, the accounts, and the log with IP addresses. That's why the Admin can choose a **backup password** (at least 12 characters; a phrase of four or five words is better): from then on, automatic backups are `.zip.enc` files that open only with that password.

- The password **isn't saved anywhere**: the wiki only keeps a key that locks the files, not one that opens them. Anyone who gets into the wiki, or reads an unencrypted backup, finds nothing that opens the encrypted ones.
- **If you lose it, the encrypted backups can no longer be opened**, by anyone. Write it in a password manager or on paper in a safe place. In Administration › Backup you can check that you remember it without changing anything.
- If you change the password, the backups already made keep the previous one. If you turn off encryption, the next backups go back to being unencrypted.
- The backup downloaded with “Download backup” is always unencrypted.

Technically: scrypt derives an X25519 key pair from the password, and the wiki keeps the public half; each backup has its own one-time key and is encrypted with AES-256-GCM, which detects whether the file has been altered or is incomplete. The format is described in `tools/backup-crypto.mjs`.

**Restore without Docker** (with the wiki stopped):

```bash
node tools/restore.mjs crooked-shelf-backup-2026-10-29.zip ./data --force
```

**Restore with Docker**, from the Crooked Shelf folder, with the backup file copied there (with `docker-compose.prod.yml`, add `-f docker-compose.prod.yml` after every `docker compose`):

```bash
docker compose stop
docker compose run --rm -v "$PWD:/backup" crooked-shelf node tools/restore.mjs /backup/crooked-shelf-backup-2026-10-29.zip /data --force
docker compose start
```

In PowerShell, write `"${PWD}:/backup"` instead of `"$PWD:/backup"`.

An encrypted backup (`.zip.enc`) is restored with the same commands: the tool asks for the password without showing it as you type (or reads it from the `CS_BACKUP_PASSWORD` variable). If the password is wrong or the file is damaged, it doesn't touch anything. To open an encrypted backup without restoring it, for example to look inside:

```bash
node tools/decrypt-backup.mjs crooked-shelf-backup-2026-11-05-030000.zip.enc
```

The database that was there before isn't deleted: it's renamed `crooked-shelf.db.prima-del-ripristino-…`.

Other ways to take your data with you (Administration):

- **Export to Markdown**: all pages as text files, which you can open with Obsidian or any editor.
- **World package** (`.shelf`): maps, pages, house rules, templates, calendar and world timeline, to import into another wiki: into a campaign that already exists, or into a new one created for the purpose, which also takes over the package's home page.

## Security: what to know

- **The Admin is whoever owns the data.** In campaigns they don't run, the interface doesn't show them the Game Master's secrets, but they can download the backup, create other Admin accounts and appoint Game Masters: it's a courtesy between people who trust each other, not a barrier. Give the Admin role only to someone you would trust with the server.
- **Who can get in** is decided by invites: without an invite, nobody can sign up. Visitors without an account are off until you turn them on in Administration › Settings.
- **Limits**: 20 failed sign-in attempts every 10 minutes per address (and 5 per username), a cap on how many password hashes run at the same time, 60 image uploads every 10 minutes, and a storage quota for players. Images can be downloaded only by people who can see the page (or resource) that uses them; images that nobody has used for a day are deleted automatically.
- **Sessions**: they expire after 30 days without visits, and in any case 90 days after you sign in; from your Profile you can close the ones on other devices. A Claude token that has gone unused for 90 days stops working.
- **Forgotten password**: the Admin creates a reset link from Administration › Users, which is valid for two days and works only once.
- **Log**: Administration › Log lists sign-ins, role and password changes, invites, Claude tokens and backups from the last six months.
