# Installing Crooked Shelf

Crooked Shelf stays running on a computer (the "server") and you use it from the browser, even on your phone. The server can be your PC, a Raspberry Pi or a server rented on the internet.

All the data (database, images, plugins) lives in **a single folder**: that's all you need to back up.

## 1. With Docker (recommended)

You need [Docker](https://docs.docker.com/get-docker/) (on Windows and Mac: Docker Desktop).

```bash
git clone https://github.com/yanez86/crooked-shelf.git
cd crooked-shelf
docker compose up -d
```

Open **http://localhost:3000** and create the wiki and the administrator account. The page asks for the **setup code**, which you'll find in `docker compose logs`: that way you set it up, not whoever reaches the address first. You can choose the code yourself with `CS_SETUP_TOKEN`.

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

On a Raspberry Pi 4 or 5 with a 64-bit system (Raspberry Pi OS 64-bit) the steps are the same. The first build takes a few minutes.

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

To start it when the computer turns on: `systemd` (Linux), `pm2` or the Windows Task Scheduler.

## 3. On the internet, with HTTPS

From outside your home you need an always-on server with a public IP (a small VPS for a few euros a month) and a domain (e.g. `wiki.esempio.it`). `docker-compose.prod.yml` starts the wiki with [Caddy](https://caddyserver.com/), which handles HTTPS and renews the certificate on its own.

The server needs at least 2 GB of RAM (to build the image) and ports **80** and **443** open, in the provider's firewall and in the system's.

1. Where you bought the domain, create an **A** record (e.g. `wiki`) pointing to the server's IP.
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

Tips:

- turn on the provider's **server backups** and the wiki's [automatic backup](#automatic-backup), ideally encrypted and copied elsewhere with rclone; every now and then download a backup to a disk of your own;
- log in to the server with an SSH key and have the system install security updates (on Ubuntu: `apt install unattended-upgrades`).

If you already use another proxy (nginx, Caddy installed by hand…), `docker-compose.yml` still works: point the proxy to `localhost:3000` and remove the `#` from these lines:

```yaml
CS_ORIGIN: "https://wiki.esempio.it"
CS_TRUST_PROXY: "1"
```

Also change `"3000:3000"` to `"127.0.0.1:3000:3000"`, so the wiki answers only the proxy and nobody bypasses HTTPS. With an `https` address in `CS_ORIGIN` the wiki sends `Strict-Transport-Security` on its own. The proxy must pass `X-Forwarded-For` (and `X-Forwarded-Proto`), otherwise the limits on sign-in attempts are shared by all visitors together; if the headers don't add up, the wiki says so in the logs.

Access for visitors without an account is **off**: until you turn it on, only people with an invite get in.

## 4. Try it online for free, with Render

To try it without a server of your own there's [Render](https://render.com/), with `render.yaml` ready to go.

1. Sign in to Render with GitHub.
2. **New › Blueprint**, choose the repository and confirm.
3. When the build is done, open the `https://crooked-shelf-….onrender.com` address and create the wiki and the administrator account with the setup code you'll find in the Render logs (or the one you set yourself in `CS_SETUP_TOKEN` among the service's variables).

Every time `main` changes, Render publishes the new version on its own.

On the free plan:

- after 15 minutes without visits the wiki shuts down, and takes up to a minute to start again;
- **the data doesn't last**: every shutdown, restart or new version starts over from an empty wiki.

It's fine for trying it out, not for playing.

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

In Administration › Settings the wiki compares its version with the `package.json` of `main` on GitHub: it reads it when an Admin opens the page, at most once an hour, without sending anything about the wiki. With `CS_UPDATE_CHECK=0` it doesn't contact GitHub.

## Backup and restore

**Backup**: Administration › Backup › “Download backup”. The file contains the database, images and plugins, unencrypted: everything, including every campaign's secrets and the encrypted passwords. Keep it somewhere safe, on another disk.

### Automatic backup

In Administration › Backup the Admin turns on **automatic backup**: every day, at the chosen hour (the server's), the wiki saves a full backup in a folder and keeps the last 7 (or as many as you choose). If the computer is off at that hour, it starts when it's back on; if it fails, the wiki tries again every hour and reports it on the page and in the Log. There's also “Back up now”.

The files are named `crooked-shelf-backup-2026-11-05-030000.zip` (`.zip.enc` if encrypted). The wiki deletes only its own older backups, recognizing them by name, and doesn't touch other files. While a file is half-written it has a temporary name (`~crooked-shelf-backup-….tmp`).

**Getting them to the cloud.** The wiki doesn't connect to OneDrive, Google Drive or Dropbox: it writes to a folder, and if that's their app's folder, the app uploads it. The folder is chosen with `CS_BACKUP_DIR`; without it, backups go in `backups` in the data folder, which protects you from a mistake but not from a broken disk. The folder must exist: if it's missing (disk unplugged, folder not connected to Docker), the backup fails and the page says so.

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

  On Linux, the folder must be writable by the container's user: `sudo chown 1000:1000 /path/to/folder`. Only that user (and root) can read the backups.

- **On a server (VPS)** connect a folder as above (e.g. `/opt/crooked-shelf-backup:/backups`) and upload it with [rclone](https://rclone.org/), which works with Google Drive, OneDrive and many others. After `rclone config`, one line in `crontab -e` copies it every morning, skipping half-written files:

  ```bash
  30 4 * * * rclone copy /opt/crooked-shelf-backup drive:CrookedShelf --exclude "~*"
  ```

The old copies that the wiki deletes also disappear from the cloud (they usually end up in the OneDrive or Drive trash); `rclone copy`, on the other hand, doesn't delete anything.

**Encrypting automatic backups.** Unencrypted, anyone who gets to the file or to your cloud account can read every campaign's pages and secrets, the accounts and the log with IP addresses. That's why the Admin can choose a **backup password** (at least 12 characters; a phrase of four or five words is better): from then on automatic backups are `.zip.enc` files that open only with it.

- The password **isn't saved anywhere**: the wiki only keeps a key that locks the files and doesn't open them. Neither the wiki nor an unencrypted backup holds anything that opens the encrypted ones.
- **If you lose it, nobody can open the encrypted backups any more.** Keep it in a password manager or on paper somewhere safe. In Administration › Backup you can check that you remember it.
- Changing the password, the backups already made keep the old one. Turning off encryption, the next ones are unencrypted.
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

An encrypted backup (`.zip.enc`) is restored with the same commands: the tool asks for the password without showing it, or takes it from `CS_BACKUP_PASSWORD`. With a wrong password or a damaged file it doesn't touch anything. To open it without restoring it:

```bash
node tools/decrypt-backup.mjs crooked-shelf-backup-2026-11-05-030000.zip.enc
```

The previous database isn't deleted: it becomes `crooked-shelf.db.prima-del-ripristino-…`.

Other ways to take your data with you (Administration):

- **Export to Markdown**: all pages as text files, which you can open with Obsidian or any editor.
- **World package** (`.shelf`): maps, pages, house rules, templates, calendar and world timeline, to import into a campaign that already exists or into a new one, which also takes the package's home page.

## Security: what to know

- **The Admin owns the data.** In campaigns they don't run they don't see the secrets, but they can download the backup, create other Admins and appoint Game Masters: it's a courtesy between people who trust each other, not a barrier. Give the Admin role only to someone you would trust with the server.
- **Who gets in** is decided by invites: without one, nobody can sign up. Visitors without an account are turned on in Administration › Settings.
- **Limits**: 20 failed sign-in attempts every 10 minutes per address (and 5 per username), a cap on how many password hashes run at the same time, 60 image uploads every 10 minutes, and a storage quota for players. Images can be downloaded only by people who can see the page (or resource) that uses them; images that nobody has used for a day are deleted automatically.
- **Sessions**: they expire after 30 days without visits, and in any case 90 days after you sign in; from your Profile you can close the ones on other devices. A Claude token that has gone unused for 90 days stops working.
- **Forgotten password**: the Admin creates a reset link from Administration › Users, which is valid for two days and works only once.
- **Log**: Administration › Log lists sign-ins, role and password changes, invites, Claude tokens and backups from the last six months.
