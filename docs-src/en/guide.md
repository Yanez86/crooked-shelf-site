# User guide

## Who can do what

| Role | What they can do |
|---|---|
| **Admin** | There is only one, and they run the site: campaigns (for anyone, choosing their Master), settings, users and how many campaigns each one can create, invites, themes, plugins, backups, world packages. In campaigns they have no extra powers: they are Master in the ones they run and a player in the ones they're invited to |
| **Game Master** | In their campaign creates and edits all pages, writes and sees secrets, manages categories, tags, maps, resources, calendar, world timeline and players |
| **Player** | Reads, creates pages, edits their own and those open to players, has their own sheet, adds events to the campaign timeline, uses boards |
| **Visitor** | Public pages only, if the Admin has turned on visitor access |

Game Master and Player aren't account roles: the campaign decides them. You're the Game Master of the campaigns you run and a player in those you're invited to, so the same person can run one campaign and play in another. There is only one Admin, usually whoever installed the wiki.

People join with an **invite**: the Master creates it in Campaign settings › Players, the Admin in Administration › Invites (for the campaign they're in, or for none). Each link works only once.

Anyone with an account, a player too, can **create their own campaigns** and be their Master.

## Campaigns

An installation can hold several campaigns. Each one is a wiki of its own: pages, folders, tags, maps, timelines, boards, resources, home page and calendar can't be seen from the others, and two campaigns can have pages with the same address.

- **Creating one**: profile menu › **Campaigns**, at the bottom under “New campaign”. You choose the name and you're its Master, whatever your role elsewhere. Everyone can run up to **3**, counting the ones given by the Admin; the Admin changes the limit person by person in Administration › Users, and from Administration › Campaigns creates campaigns for others, even beyond the limit. Each campaign has only one Master. It starts with the home page, the templates, the two timelines and the PCs folder.
- **The Campaigns panel** (profile menu) lists your campaigns with your role: “Enter” opens the campaign, “Manage” (only if you're its Master) opens its settings without entering it.
- **Campaign settings**: the page of one campaign, with its name as the title. The Master gets there from “Manage” or from the **Campaign settings** entry at the bottom of the left sidebar. Four tabs: **General** (name, overview, deletion), **Players** (invites, removal, sheet template), **Sessions** (turning the schedule on; then remote link, minimum rule, Stars & Wishes) and **Claude** (tokens and connectors).
- **Inviting players**: in Campaign settings › Players the Master creates a link. People without an account create one; people who have one join with it.
- **Switching campaigns**: from the top of the profile menu, or from the Campaigns panel. The choice is kept on the device. A link to a page opens in the campaign you're in.
- **Deleting one**: the Master deletes their own from Campaign settings › General, the Admin any of them from Administration › Campaigns (the red button next to Save), even the last one. The popup says what disappears and asks you to type the name again; Cancel, Esc or the X close it. Pages, maps, timelines, boards, resources and images disappear for everyone, and come back only by restoring a backup. Anyone left without campaigns can still sign in, and waits for an invite or creates one.
- You're Master only in your own campaigns; in the others you're a player, if invited. This applies to the Admin too: they only enter campaigns they run or are invited to, and see secrets only in their own. They manage the others from Administration › Campaigns without entering them, and can't appoint themselves Master of a campaign that already exists (they would see its secrets); of a new one they can.
- Export and world packages concern the campaign you're in; the backup the whole installation.

## Player sheets

Every campaign has the **PCs** folder (“PG” in Italian) with a **sheet** for each player: the page for their character, their notes, their stuff.

- **It's created on its own** when the player joins the campaign, with an invite or because the Master handed the campaign over to them. In older campaigns the folder and the sheets appear on the first visit, and a “PCs” folder that already existed becomes the sheets' folder.
- **The title** starts as the player's name, and they change it to their character's.
- **Visibility**: all the players see it; the player and the Master edit it. You can only choose between **Public** and **Players**, so the Master and the other players always see it.
- **Secrets**: the Master can hide a block of the sheet, even one the player wrote. The player no longer sees it and keeps editing the sheet: when they save, the block stays where it was. As long as there's a secret, only the Master can change the sheet's visibility.
- **Pages inside the sheet**: with **New page inside** (the player in theirs, the Master in all of them). The new page is **Personal**: notes the player keeps to themselves, which the Master doesn't see. It can be a board too.
- **It stays in its place**: the sheet doesn't change folder, doesn't become a template or the home page, can be reordered only within PCs and can't go to the trash while the player is at the table. The PCs folder can be renamed and moved, but not deleted; if the folder that contains it goes to the trash, PCs moves back up to the root.
- **Players who leave** the campaign disappear from “At the table”, but the sheet stays and the Master can delete it. If they come back, they find it again, even from the trash.
- **The sheet template** is “Player sheet” by default (character and notes). The Master edits it like any template or picks another one, or none, in **Campaign settings › Players**. It applies to new sheets. The D&D Beyond plugin adds “D&D sheet”, with the link to the character on the site.
- **At the table**: at the top of the home page's right-hand column are the Master and the players. A player's name leads to their sheet, with the character underneath. Visitors don't see the list.
- Sheets and the pages inside them aren't included in the world package (they belong to the table, not to the world), but they stay in the backup and in the Markdown export.

## Schedule

**Schedule**, at the bottom of the left sidebar, is the calendar of game sessions: one month per page and, underneath, the dates with their details. The Master and the players see it, visitors don't.

It's a **campaign option**, off in new campaigns: the Master turns it on in **Campaign settings › Sessions** with “Use sessions”. When it's off, the sidebar entry, its settings, the sessions on the home page and Stars & Wishes disappear, and `/schedule` doesn't open. Nothing is deleted: turning it back on brings everything back as it was.

- **The Master sets up an appointment** with “New appointment”: title, date, start and end (an end before the start is after midnight, e.g. 20:00–00:00), and whether the game is **in person** (and where), **remote** or both.
- **It repeats** every week, every 2 weeks or every month, until a date or with no end. “Every month” keeps the weekday: starting from the first Thursday, the first Thursday of every month. **Cancel this date** removes a single date; “Edit series” changes them all.
- **Players answer** for each date: in person, remote (if the appointment allows it) or “Can't make it”, and can change their mind.
- **The dates** under the calendar are compact cards: the title with the Master's pencil, when and the status, the place and the icon of the remote link. **Who's coming** is a row of faces, the Master first: the globe means remote, the cross “not coming”, the faded face “hasn't answered”. Hovering with the mouse shows name and character; tapping the row (or pressing Enter) opens the list of names.
- **The remote link** (Discord or other) is set by the Master in **Campaign settings › Sessions**, for everyone; an appointment can have its own. On the dates you see its icon (Discord's, for Discord) and the address when you hover over it.
- **The minimum rule**, also there: below a certain number of confirmed players the session is **off**. While there are more hours to go than the number chosen (24 by default) it's **tentative**, then it's off; with enough players it's **confirmed**. The Master doesn't count; with 0 there's no rule.
- Dates and times are the table's, with no time zones: the time at which a session goes off is the server's (`TZ`, see the installation guide).

### Stars & Wishes

After a session, two questions for those who were there: **What did you enjoy about this session?** and **What would you like to explore in the next session?** The Master turns it on in **Campaign settings › Sessions**.

- The questions go, once the session is over, to those who had answered “I'm in” (in person or remote). Canceled sessions, or ones called off, don't count.
- The player finds them in a popup **on the first page they open after the session**. “Later” (or the X) puts them off for a few hours. Answering is optional, and the answer is sent **only once**. The Master doesn't get them: the answers are for them.
- The questions close **on the day of the next session**; if there's none on the calendar, they stay open.
- The answers are read **only by the Master**, in Schedule, under the date. Turning Stars & Wishes off keeps them saved.

## The left sidebar

The whole wiki is reached from the left sidebar:

- at the top, the icons: **New page**, **New folder**, **New divider**, collapse all and expand all;
- the **tree**: categories are folders that open with a click (or Enter), holding subfolders and pages of every type, each with its own icon. Pages without a category are at the bottom. The folder of the open page opens by itself;
- **New folder** (the Master): the folder appears at the top of the tree with its name to type; Enter creates it, Esc drops it. It's renamed in **Categories** (`/categories`);
- **Reordering** (the Master): drag an entry before or after another one, or onto the middle of a row to put it inside. A page with entries inside has an arrow to open them. From the keyboard, on the row: **Alt** with the up and down arrows moves it, right puts it inside the entry above, left brings it back out. Entries never moved stay at the bottom, in alphabetical order;
- **New divider** (the three lines): a line at the bottom of the tree, to drag where you need it; it's removed with its small cross;
- **Trash**: hovering over a row shows the trash can, for whoever can delete that page (folders only for the Master). A folder goes there with everything it contains and comes back whole; pages nested in a deleted page, on the other hand, stay and move up to its folder;
- **Visibility** (the Master): next to the trash can, the icon showing who sees the page: globe Public, eye Players, crossed-out eye Game Master only, padlock Personal. Game Master only and Personal are always shown, the others when you hover over the row (always on the phone). Clicking it changes it; if the page contains others, you choose whether to change those too. “Personal” only applies to pages written by you. The home page is changed from its pencil.

The **home page** is the start page: from its pencil you write the introduction, with blocks, boxes, cover and icon. On the right, under the boxes, are the people at the table and the recently changed pages. It always sits at the top of the sidebar, can't be moved and can't be deleted. To choose another one, the Master checks **Home page** while editing a Public or Players page.

At the bottom of the sidebar are **Resources**, **Schedule** (if turned on) and **Trash**. Templates are used from “New page”. The other sections open from their address: Pages with filters (`/wiki`), Tags (`/tags`), Gallery (`/gallery`), Rules (`/rules`), Calendar (`/calendar`), Categories (`/categories`).

On the phone the header is a single line that stays in view: “Menu and pages” opens the sidebar (it closes with Esc, × or by tapping outside), the magnifying glass opens search. With a finger there are no trash cans on the rows: a page is deleted from its edit view, a folder from Categories. On the computer the arrow at the top of the sidebar hides it and brings it back, and the browser remembers; an identical arrow does the same with the pages' right-hand column. The centre takes the free space. To keep the sidebar closed on the computer too: Profile › “Left sidebar”. In the Profile the sidebar starts hidden, in Administration closed.

## Pages

Everything in the wiki is a **page**, with a `/wiki/…` address, a folder, tags, a visibility, the side column and versions. There are four types:

| Type | What it is | Who creates it |
|---|---|---|
| **Page** | Blank, or copied from a template | Anyone signed in |
| **Template** | A model to copy: blocks, side column and icon | Master |
| **Map** | An image with pins and layers, plus the text | Master |
| **Timeline** | Events in date order, plus the text | Master |

- **New page** asks where to start from: a **blank page** or a **template**. The Master also finds “New template”, “New map” and “New timeline”.
- **Templates**: the wiki starts with a few (NPC, Place, Faction, Session recap…), edited like any page. “Use this template” creates a copy. The Master turns a page into a template, and back, with “It is a template”; with “Copies are session reports” the copies get a number, a date and an entry in the campaign timeline. Changing a template doesn't change the pages already made.
- **Who sees it**: Public, Players, Game Master only or Personal (only you: for private notes).
- **Page options**: while editing, the button next to Cancel opens visibility, “Players can edit it too”, “It is a template”, “Home page” and the link to the versions. It closes with Esc or by clicking outside. With unsaved changes, the wiki asks before opening the versions.
- **Cover and icon**: while editing, “Add cover” (next to Save) chooses an image from the **Gallery**, a **Solid color** or a file to **Upload**. The icons on the side of the cover change it, reposition it (by dragging or with the arrows, Enter confirms), crop it and remove it. The page icon, to the left of the title, is chosen by clicking it.
- **Side column**: while editing, the “+” on the right adds it; it stays in view as you scroll. It holds boxes:
  - **Text**: a title and a short text (e.g. “Role: Innkeeper”), with `[[Page]]` and simple Markdown: `**bold**`, `*italic*`, `__underline__` and, on lines of their own, lists (`- item`, `1. item`);
  - **Image**: drag it onto the box or use “Choose an image”, with a heading (above) and a caption (below) if you like. “Crop” keeps only the part you choose: drag the frame or its corner, or use the arrows (with Shift you change the size). The crop is a new image; the original stays among the images.

  Boxes are reordered from the handle to the left of the title (with the mouse or a finger; near the edge the page scrolls) or with the arrows. The small cross removes a box; “Remove the column” removes the empty column. The first image is also the page's image, in the gallery and in link previews. Pages made from a template start with its boxes.
- **Versions**: the clock at the bottom of the page shows the previous versions, what changed, and restores them.
- **Trash**: deleted pages, maps and timelines too with their pins and events, are recovered from the Trash, which shows who created them and when and the last edit, and restores them or deletes them forever.

### Writing

| Type | You get |
|---|---|
| `## ` at the start of the line | heading |
| `- ` or `1. ` | list |
| `> ` | quote |
| `**word**` / `*word*` | bold / italic |
| `[[` | suggestions for linking another page |
| `[[Title|text]]` | link with different text |
| `@` and the name | rule suggestions (spells, monsters…) |
| `@spell[Fireball|ball of fire]` | rule with the text you want |
| `/` and the name | roll on a roll table (see below) |

From the editor toolbar you insert images (with a description for people who can't see them), tables and “Note”, “Tip” and “Warning” boxes.

The page is made of **blocks**: paragraphs, headings, images, tables, boxes. Hovering the mouse over a block shows, at its top right:

- the **plus**, which adds a **text** block or an **image** after it;
- on images, the **two arrows** for the size and “Crop”;
- the **eye**, only for the Master, which **hides** the block: it becomes a **Game Master secret**, which players don't see and can't find by searching. The same eye shows it again;
- the **trash can**, which deletes the block.

**Image size**: the two arrows choose **small** (a quarter of the column), **medium** (half), **large** (three quarters), as wide as the column or **original** (as far as it fits). Or drag the handle on the bottom right corner, in steps of 5%. From the keyboard, with the image selected, there's “Image size” in the toolbar. The file doesn't change, only how it's shown.

**Cropping images**: “Crop” works as in the side column (from the keyboard it's in the toolbar). The crop takes the image's place, and the image stays among the images; “Undo last action” puts it back.

**Hidden blocks** in the editor have the secrets background and the purple border, and consecutive ones look like a single box, with a padlock on the corner of the first one (screen readers read “Game Master secret”). On the page, consecutive ones sit in one box with the “Game Master secret” heading. From the keyboard, the eye in the toolbar hides or shows the blocks you're writing in or have selected, and the trash can deletes the block you're writing in. A block created from a hidden block (pressing Enter, with the plus, inserting an image or a table) is hidden too, and so is the pasted copy of a hidden block. The first toolbar button undoes the last action (Ctrl+Z).

**Pages with a secret**: anyone who can edit the page can edit it even if it contains hidden blocks. A player doesn't receive them, not even in the editor; when they save, each one goes back after the block that came before it (if they deleted it, after the nearest earlier block still there). The player can't hide blocks, and restoring an old version doesn't show them the secrets. Visibility, permissions and deletion of a page with a secret stay with the Master, even if the player wrote it.

From the keyboard: Tab enters the toolbar, the arrows move between commands, Esc leaves the editor.

A link to a page that doesn't exist is **dashed red**: clicking it creates the page. One to an existing page opens it in a popup over the page you started from, with buttons to open it full screen and to close. With Ctrl (Cmd on the Mac) it opens in a new tab. On the phone the page opens, and Back takes you to the previous one.

### Roll tables

A roll table is a table on the page that gives a random result, as in the rulebooks: “Shabby shop”, a d6, one shop per row.

- **Creating one** (the Master): the die in the editor toolbar, “New roll table”. The first row holds the die (d6) and the name; below, one row per face: the numbers in the first column (`3`, `4-6`, `01–05`), the result in the others, even with bold, `[[links]]` and `@rules`. An existing table becomes a roll table with “Roll table” among the table tools.
- **The dice**: d4, d6, d8, d10, d12, d20, d100 (or d%), d66 and dice added together like 2d6. On the d10 `0` counts as 10, on the d100 `00` counts as 100. With no numbers in the first column, every row has the same chance.
- **If something's wrong**, under the table tools it says what's missing, for example a number that's in no row, or in two.
- **Rolling on the page**: “Roll”, under the table, shows the result next to it without changing the page.
- **Rolling while you write**: type `/` and the table's name (`/shop` or `/shabby-shop`), choose and press Enter: the result goes into the text. With the cursor on the result, **Reroll** puts in another one and **Keep** turns it into normal text. Changing the table doesn't change pages already written.
- **Who uses them**: the Master creates them, whoever sees the page rolls. A hidden table can be found and rolled only by the Master. The table must be on the page, not in a box.
- They're part of the page text: they have versions, show up in search, and end up in the Markdown export and in the world package.

## Maps

A map is a page: the Master creates it with New page › “New map” and uploads the image. For a **pin**: “Add pin”, under the zoom, and a click on the map (from the keyboard, Enter puts it at the center of the view); then a popup asks for the details, Save creates it, Esc or the X drops it. A pin opens a page or another map (kingdom › city › building). A pin's page opens over the map: Esc, the X or a click outside close it, “Open the full page” opens it.

**Layers** group pins and are turned on and off from “Layers”. The **Base layer** is visible to everyone and takes the pins without another layer; “New layer” creates one with a name and a visibility, “Manage layers”, under the map, renames and deletes them. Players don't see a “Game Master only” layer. If you enter the map's real width, the ruler appears.

Under the map is the list of pins. The image, the scale and the map that contains this one are changed by editing the page; the “Description”, the page text, appears in a box above the map.

## Gallery

All the campaign's images, most recent first: covers, side column, page text, maps and resources. Under each one it says where it appears; clicking it opens it full size (← → to browse, Esc to close). They can be filtered by pages, maps or resources. Everyone sees only the images of what they can see.

## Resources

Images, music and other campaign files: handouts, portraits, background music. They open from **Resources**, at the bottom of the left sidebar, split into Images, Audio and Other files.

The Master uploads them with “Upload a resource”: images (PNG, JPEG, WebP or GIF, up to 25 MB), audio (MP3, OGG, WAV, FLAC or M4A) or other files, up to 90 MB. Without a title the file name is used. They choose who sees them: Public, Players or Game Master only.

Images also include those already used in the wiki (covers, side column, text, maps), each with its file name. The Master can change only the name (the extension stays); everything else is changed in the page that uses them.

Images and audio are viewed and played in the wiki, on the phone too; other files, PDFs included, are downloaded. A resource's detail page shows where it appears, and with the pencil the Master changes its title, description, visibility and file, or deletes it.

Resources are included in the backup, not yet in the world package.

## Timelines and calendar

A timeline is a page (New page › “New timeline”), and you can make as many as you like, of two types:

- **World**: history in date order, written by the Master (the wiki starts with the “World timeline”);
- **Campaign**: what happened at the table, in order of play date. Players add events too, and **session reports** go in on their own (the wiki starts with the “Campaign timeline”).

Events can be viewed as a list or on the timeline strip.

The **calendar** can be Gregorian, Harptos (Forgotten Realms), simple or invented (months, festivals, leap years, eras, “Today in the world”).

## Rules

The **Rules** page has 999 entries from the SRD 5.2 (in English) to search and cite. In pages `@spell[Fireball]` becomes a link to the rule's page, with the **i** button for the preview; with the **D&D Beyond** plugin turned on (Administration › Plugins) it leads to the D&D Beyond search instead. Each rule shows the pages that cite it, so your house rules stay connected.

## Boards

A board is a page: **New page › New board**, with the starting columns (one per line). It sits in the tree and has its own visibility: **Personal**, Players or Game Master only. Anyone who sees it adds and moves cards (with the arrows or by dragging), with `[[Page]]` and `@rules` too. Columns are managed by whoever can edit the page. Boards aren't included in the world package.

## Profile

At the top right are your icon, your name and your role in the campaign. The menu holds your campaigns (if more than one), **Profile**, **Campaigns**, **View as player** (the Master), **Administration** (the Admin) and **Log out**. On the phone only the icon stays at the top.

**Profile** and **Administration** open in a popup over the wiki (it closes with Esc, the X or by clicking outside); with Ctrl+click in another tab, on the phone as pages.

The **Profile** has three tabs:

- **Icon and name**: the name and the icon, from the page icons (a crown, a wizard hat, swords…) or an image (PNG, JPEG, GIF or WebP);
- **Reading and accessibility**: the preferences below;
- **Password**: change it, see the open sessions and close the ones on other devices.

If you're not signed in, you only get the reading preferences, saved in the browser.

## Reading and accessibility

In the **Profile** everyone chooses:

- theme: Automatic (Aria, or Aria at night if your system is dark), Aria, Aria at night, Neon, Vintage light, Vintage dark or the Admin's own. With Aria and Neon, on a large screen, the sidebar and the page panel run from top to bottom, with no boxes; the Vintage themes have the header at the top and the boxes;
- text up to 200%;
- the Atkinson Hyperlegible or OpenDyslexic font;
- wide spacing, reduced motion, language;
- left sidebar always open, or closed and opened with the button.

The whole wiki can be used from the keyboard and with screen readers; the colors meet WCAG 2.2 AA.

## Administration

- **Settings**: site name, default language, visitors. Below, the installed **version** compared with the latest on GitHub (“Up to date” or “Not up to date”), with links to what's new and to how to update.
- **Campaigns**: create them for anyone (even beyond the limit), choose their Master among all accounts, delete them.
- **Users**: how many campaigns each one can create (and how many they run), disabling and, for people who've forgotten their password, a reset link (valid for two days, once only). No roles are chosen here. At the bottom, **Hand over administration**: the Admin gives it to another active account and becomes a regular account, keeping their campaigns.
- **Invites**: links to join the site, one per person: they join as a player in the campaign you're in, or in none.
- **Themes**: copy a theme and change its colors; it saves only if the text stays readable. It can have a background image, behind the boxes, shown on wide screens. It's exported and imported as a file (colors only: the background travels with the world package).
- **Plugins**: turn installed plugins on and off; clicking one shows its purpose, instructions, author and contents (to create one: [plugins.md](plugins.md)).
- **Backup**: the full backup to download and the daily **automatic** one into a folder (even OneDrive, Google Drive or Dropbox), with the time, the copies to keep and an optional **password** that encrypts it and can't be recovered. See [installation.md](installation.md#automatic-backup).
- **World package**, **Export to Markdown**: see [installation.md](installation.md#backup-and-restore).
- **Log**: successful and failed sign-ins, role and password changes, invites, Claude tokens, consents, backups and exports from the last six months.
