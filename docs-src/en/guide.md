# User guide

## Who can do what

| Role | What they can do |
|---|---|
| **Admin** | Runs the site: creates campaigns for anyone and chooses their Master, settings, users (including how many campaigns each one can create), invites, themes, plugins, backups, world packages. In campaigns they have no extra powers: they are Master in the ones they run and a player in the ones they're invited to |
| **Game Master** | In their campaign: creates and edits all pages, writes and sees secrets, manages categories, tags, maps, resources, calendar, world timeline and players |
| **Player** | Reads, creates pages, edits their own and those open to players, has their own player sheet, adds events to the campaign timeline, uses boards |
| **Visitor** | Public pages only, and only if the Admin has turned on visitor access |

People join with an **invite**: the Master creates it in Campaign › Players, the Admin in Administration › Invites. Each link works only once.

Anyone with an account, a player too, can **create their own campaigns** and be their Master (see below).

## Campaigns

An installation can hold several campaigns. Each one is a wiki of its own: pages, folders, tags, maps, timelines, boards, resources, home page and calendar can't be seen from the others, and the same page can have the same address in two campaigns.

- **Creating one**: from the profile menu, **New campaign**: you choose the name and you're its Master, whatever your role in the others. Everyone can run up to **3** (the ones given by the Admin count too): the page tells you how many you have and your limit, which the Admin changes person by person in Administration › Users. The Admin can also create them for others from Administration › Campaigns › “New campaign”, with the name and the Master, even beyond the limit. Each campaign has only one Master; the same account can run more than one. It starts with the home page, the templates, the two timelines and the PCs folder.
- **The Campaign page**: the Master opens it from the profile menu. It has four tabs: **General** (name, options, deletion), **Players** (invites, removal, sheet template), **Sessions** (remote link, minimum rule, Stars & Wishes; only with the schedule turned on) and **Claude** (tokens and connectors).
- **Inviting players**: in Campaign › Players the Master creates an invite link. People without an account create one; people who already have one sign in and join the campaign with it.
- **Switching campaigns**: if you have more than one, you'll find them at the top of the profile menu. The choice is kept on the device. A link to a page opens in the campaign you're in.
- **Deleting one**: the Master deletes their own from the Campaign page, the Admin any of them from Administration › Campaigns (the red button next to Save), even the last one. The “Delete campaign” button opens a popup that says what disappears and asks you to type the name again to confirm; Cancel, Esc or the X close it without touching anything. Pages, maps, timelines, boards, resources and images disappear for everyone, and they come back only by restoring a backup. Anyone left without campaigns can still sign in: they wait for an invite or create one of their own.
- You are Master only in your own campaign: in the others you're a player, if you've been invited. This applies to the Admin too: they only enter the campaigns they run or are invited to, and see secrets only in their own. They manage the others from Administration › Campaigns without entering them, and can't appoint themselves Master of a campaign that already exists: another Admin does that. Of a new campaign, though, they can be the Master themselves.
- Export and world packages concern the campaign you're in; the backup covers the whole installation.

## Player sheets

Every campaign has the **PCs** folder (“PG” in Italian) and inside it a **sheet** for each player: the page where they keep their character, their notes, their stuff.

- **It's created on its own** when the player joins the campaign (with an invite, or when the Master hands the campaign over to someone else and becomes a player). In campaigns created before this version, the folder and the sheets appear on the first visit; a “PCs” folder that already existed becomes the PCs folder.
- **The title** is at first the player's name: they change it to their character's.
- **Who sees it and who edits it**: all the players see it; the player and the Master edit it. In the page options you can only choose between **Public** and **Players**: no Game Master only or Personal, so the Master always sees it, and so do the other players.
- **The Master's secrets**: in the sheet the Master can hide a block, even one the player wrote. The player no longer sees it and keeps editing their sheet: when they save, the hidden block stays where it was. As long as the sheet contains a secret, only the Master can change the sheet's visibility.
- **Pages inside the sheet**: the sheet has **New page inside** (the player in theirs, the Master in all of them). The new page starts out **Personal**: it's good for notes the player keeps to themselves, which not even the Master sees. You can also make a board.
- **It stays in its place**: the sheet doesn't change folder, doesn't become a template or the home page, and in the tree it can be reordered only within the PCs folder. It can't go to the trash while the player is at the table. The PCs folder can be renamed and moved, but not deleted; if the folder that contains it ends up in the trash, the PCs folder moves back up to the root.
- **Players who leave the campaign** no longer appear in the “At the table” list, but their sheet stays: the Master can delete it. If the player comes back, they find their sheet again, even from the trash.
- **The sheet template**: by default it's “Player sheet”, a generic one (the character and the notes), in the Templates tab. The Master edits it like any template, or picks another one in **Campaign › Players** (or none at all: a blank page). It applies to the sheets created from then on; the existing ones stay as they are. The D&D Beyond plugin brings the “D&D sheet” template, with the link to the character sheet on the site.
- **At the table**: on the home page, at the top of the right-hand column, are the Master and the players, with their profile icon. A player's name leads to their sheet, with the character's name underneath. Visitors without an account don't see the list.
- Sheets and the pages inside them aren't included in the world package: they belong to the table, not to the world. They stay in the backup and in the Markdown export.

## Schedule

At the bottom of the left sidebar, **Schedule** is the calendar of the campaign's game sessions: one month per page, and under the grid each date with its details. The Master and the players see it, visitors without an account don't.

The schedule is a **campaign option**: the Master turns it on and off in **Campaign › General**, under “Schedule”. In new campaigns it's off. When it's off, the sidebar entry, the Sessions tab of the Campaign page, the sessions on the home page and the Stars & Wishes questions disappear; the `/schedule` addresses don't open. Nothing is deleted: once it's turned back on, appointments, answers and settings come back as they were.

- **The Master sets up an appointment** with “New appointment”: title, date, start and end (an end before the start means after midnight, e.g. 20:00–00:00). They choose whether the game is **in person** (and where), **remote** or both.
- **Repeats** every week, every 2 weeks or every month, until a date or with no end. “Every month” is the same weekday in the same position: starting from the first Thursday, the first Thursday of every month. A single date is removed with **Cancel this date**; “Edit series” changes all the dates.
- **Players answer** for each date: in person, remote (only in the ways the appointment allows) or “Can't make it”. They can change their mind.
- **Dates this month**, under the calendar, are compact cards: the title and, at the top right, the Master's pencil to edit them; when, with the status; the place and the icon of the remote link. **Who's coming** is a row of faces, the Master first: the globe on the corner means remote, the cross “not coming”, the faded face “hasn't answered yet”. The name, with the character (the title of their sheet), appears when you hover the mouse over it; tapping the row (or pressing Enter) opens the list with all the names.
- **The remote link** (Discord or other) is set by the Master in **Campaign › Sessions** and applies to everyone; an appointment can have its own. On the dates you only see its icon, Discord's if it's a Discord link: the address appears when you hover over it.
- **The minimum rule**, also in Campaign › Sessions: below a certain number of confirmed players the session is **off**. While there are more hours to go than the number chosen (24 by default) it's **tentative**, then it's off; with enough players it's **confirmed**. The Master doesn't count. With 0 there's no rule.
- Dates and times are the table's, with no time zones: the time at which a session goes “off” is the server's (`TZ`, see the installation guide).

### Stars & Wishes

After a session, two questions for those who were there: **What did you enjoy about this session?** and **What would you like to explore in the next session?** It's turned on in **Campaign › Sessions** and stays off until the Master turns it on.

- The questions go to those who had answered “I'm in” (in person or remote), once the session is over. Sessions that were canceled, or called off by the minimum rule, don't count.
- The player finds them in a popup **on the first page they open after the session**, even if the wiki was already open. “Later” (or the X) puts them off for a few hours: they come back on the first page opened after that. Answering is optional. The Master doesn't get them: the answers are for them.
- The answer is sent **only once** and can't be changed afterwards.
- The questions close by themselves **on the day of the next session**. If there's none on the calendar, they stay open.
- The answers are read **only by the Master**, in Schedule, under the session date. Turning Stars & Wishes off hides them, but they stay saved.

## The left sidebar

The whole wiki is reached from the left sidebar (there's no longer a horizontal menu at the top):

- at the top, four tabs, each with its icon and its name underneath: **Pages** (the sheet of paper), **Tags** (the label: the tags in their color, with the number of pages; a click opens the pages with that tag, and the Master changes their name and color from “Tag names and colors”), **Resources** (the picture: images, audio and other files, see below) and **Templates** (the stacked sheets: all the templates, in title order);
- below, the icons: **New page**, **New folder** and **New divider** (or **Upload a resource**, in Resources; **New template**, in Templates), collapse all and expand all;
- the **tree**: categories are folders that open and close with a click (or with Enter from the keyboard); inside them are the subfolders and pages of every type (pages, maps, timelines, boards), each with its own icon. Pages without a category are at the bottom, at the root. The folder of the page you're reading opens by itself.
- **New folder** (the folder icon with the “+”, for the Master): the folder appears right away at the top of the tree, with its name to type; Enter creates it, Esc drops it. Folders are renamed in **Categories**, at `/categories`.
- **Reordering** (the Master): drag a folder or a page to put it before or after another one, or drop it in the middle of a row to nest it inside that folder or page. A page with entries inside it has an arrow to open them; the title leads to the page. From the keyboard, on the row: **Alt** and the up and down arrows move it, right puts it inside the entry above, left brings it back out. Entries that have never been moved stay at the bottom, in alphabetical order.
- **New divider** (the icon with three lines): adds a line at the bottom of the tree, to drag between one folder and another. It's deleted with its small cross.
- **Trash**: when you hover over a page or a folder, the trash can appears on the right of the row (it's shown to whoever can delete that page; for folders, only to the Master). A folder goes there with everything it contains and comes back whole from the **Trash**. Pages nested in a deleted page, on the other hand, stay and move up to its folder.
- **Visibility** (the Master): next to the trash can is the icon showing who can see the page: the globe for Public, the eye for Players, the crossed-out eye for Game Master only, the padlock for Personal. Game Master only and Personal are always shown; the others appear when you hover over the row (on the phone they're all shown). Clicking it lets you choose another level. If the page contains other pages (even inside its folders), you're asked whether to change them all or only that one. “Personal” only applies to pages written by you: other people's stay as they are. The home page doesn't have the icon: you change it from its pencil.

The **home page** is the site's start page, created along with the wiki: from its pencil you write the introduction, with blocks, boxes, cover and icon. On the right, under its boxes, are the people at the table (see Player sheets) and the recently edited and recently added pages. It always sits at the top of the left sidebar, outside the folders, and can't be moved. It can't be deleted and there's only one: to change it, the Master checks **Home page** while editing another page, which must be Public or Players. The previous one goes back to being a page like any other.

At the bottom of the sidebar, on every tab, there are always **Schedule** (if the campaign has it turned on) and the **Trash**. The other sections of the wiki (Pages, i.e. the list with filters, Tags, Gallery, Rules, Calendar, Categories) don't have a menu entry: they open from their address (`/wiki`, `/tags`, `/gallery`, `/rules`, `/calendar`, `/categories`).

On the phone the header is a single line that stays in view as you scroll: the button on the left (“Menu and pages”) opens the sidebar, which closes with Esc, with × or by tapping outside it; the magnifying glass opens search. With a finger, there are no trash cans next to the rows: a page is deleted from its edit view, a folder from Categories. On the computer, the arrow at the top of the sidebar hides it and the opposite arrow brings it back; the browser remembers your choice. An identical arrow, at the top of the pages' right-hand column when there is one, does the same with that column. The central panel takes up the space the columns leave free. If you prefer a wider page, you can keep the sidebar closed on the computer too (Profile › “Left sidebar”). In the Profile the sidebar starts out hidden and opens with the arrow; in Administration it's closed and opens with the button.

## Pages

Everything in the wiki is a **page**, in the tree on the left, with a `/wiki/…` address, a folder, tags, who can see it, the side column and the edit history. Pages come in four types:

| Type | What it is | Who creates it |
|---|---|---|
| **Page** | Blank, or copied from a template | Everyone who is signed in |
| **Template** | A page to copy: blocks, side column and icon decided by whoever writes it | Master |
| **Map** | An image with pins and layers, plus the page text | Master |
| **Timeline** | Events in date order, plus the page text | Master |

- **New page** asks where to start from: a **blank page** or one of the **templates**; below them, the Master also finds “New template”, “New map” and “New timeline”.
- **Templates**: when the wiki is created there are already a few (NPC, Place, Faction, Session recap…) in the **Templates** tab of the left sidebar. They're edited like any page: the structure (headings, boxes, secrets, side column, icon) is whatever you write. From the template's page, “Use this template” creates the copy; the Master can turn any page into a template (and vice versa) with the “It is a template” checkbox. The “Copies are session reports” checkbox turns the copies into session reports (number, date, entry in the campaign timeline). Changing a template doesn't change the pages already made from it.
- **Who sees it**: Public, Players, Game Master only, or Personal (only you: good for private notes).
- **Page options**: while you edit the page, the button next to Cancel opens the options: who sees it, “Players can edit it too”, “It is a template” and “Home page” (for those who can change them), and the link to the page versions. It closes with Esc or by clicking outside, and the choices apply even with the panel closed. If you have unsaved changes, the wiki asks you before opening the versions.
- **Cover and icon**: as in Notion, the top of the page can have a cover; the page icon sits to the left of the title. While you edit the page, the image icon next to Save and Cancel (“Add cover”) opens a panel: an image from the **Gallery**, a **Solid color** or a file to **Upload**. On the side of the cover, three small icons change it, reposition it (by dragging the image, or with the up and down arrows; Enter confirms) and remove it. The icon (the same one shown in the tree) is chosen by clicking it, to the left of the title.
- **Side column**: by default a page doesn't have one. While you edit the page, the “+” button on the right adds the column, which stays in view as you scroll the text; inside it you put boxes:
  - **Text**: a title and a short text (e.g. “Alignment: Chaotic good”); you can write `[[Page]]` there too;
  - **Image**: drag it from your computer onto the box or use “Choose an image”; if you like, write a heading (it goes above the image) and a caption (below it).

  To change the order, drag a box by the handle to the left of its title, with the mouse or a finger (near the edge of the screen the page scrolls by itself), or use the up and down arrows. The small cross removes a box; once it's empty, the column is removed with “Remove the column”. The first image is also the page's image: it appears in the gallery and in link previews. Pages made from a template start with the template's boxes.
- **Edit history**: from the clock icon at the bottom of the page you see the previous versions and what changed, and you can restore them.
- **Trash**: deleted pages (maps and timelines too, with their pins and events) can be recovered from the Trash: each row shows who created the page and when, the last edit, and the icons to restore it or delete it forever.

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

With the toolbar buttons you insert images (with a description for people who can't see them), tables and “Note”, “Tip” and “Warning” boxes.

**Image size**: on an image in the text, among the buttons at the top right, there are the two arrows: they make it **small** (a quarter of the text column), **medium** (half), **large** (three quarters), as wide as the column, or **original** (its own size, as far as it fits). Or drag the handle on the bottom right corner, with the mouse or a finger: the size changes in steps of 5%. From the keyboard, with the image selected, there's the “Image size” drop-down in the toolbar. The file stays as it is: only the way it's shown changes, on the page and in the editor.

The page is made of **blocks**: a paragraph, a heading, an image, a table, a box. When you hover the mouse over a block, these appear at its top right:

- the **plus**, which adds a **text** block or an **image** right after it;
- on images, the **two arrows**, which change their size (see above);
- the **eye**, only for the Master, which **hides** the block: it becomes a **Game Master secret**, which players don't see and can't find even by searching. The same eye shows it again;
- the **trash can**, which deletes the whole block.

In the editor a hidden block has the secrets background and the purple border on the left, and consecutive hidden blocks look like a single box; on the top left corner of the first one there's a padlock in a circle, which doesn't move the text (screen readers read “Game Master secret”). On the page, consecutive hidden blocks sit in a single box, with the “Game Master secret” heading. From the keyboard there's the eye in the toolbar, which hides (or shows) the blocks you're writing in or have selected, and the trash can in the toolbar, which deletes the block you're writing in. A new block starts out hidden if you create it from a hidden block: by pressing Enter, with the plus, or by inserting an image or a table. When you copy and paste a hidden block, the copy is hidden too. The first toolbar button undoes the last action (like Ctrl+Z).

**Pages with a secret**: anyone who can edit the page can still edit it even if the Master has hidden something in it. A player doesn't receive the hidden blocks, not even in the editor; when they save, each one goes back right after the block that came before it (if they deleted that block, after the nearest earlier block that's still there). The player can't hide blocks, and restoring an old version doesn't bring its secrets out. Visibility, permissions and deletion of a page with a secret stay with the Master, even if the player wrote the page.

From the keyboard: Tab takes you into the toolbar, the arrows move between commands, Esc leaves the editor.

A link to a page that doesn't exist is **dashed red**: clicking it creates the page.

A link to an existing page opens it in a popup, with all its content, while the page you started from stays underneath. At the top right are the buttons to bring it to the main screen and to close the popup. With Ctrl (Cmd on the Mac) it opens in a new tab instead. On the phone there's no popup: the page opens, and the Back button takes you back to the previous one.

### Roll tables

A roll table is a table on the page that gives you a random result, as in the rulebooks: “Shabby shop”, a d6, one shop per row.

- **Creating one** (the Master): the die in the editor toolbar, “New roll table”, adds a ready-made table. The first row holds the die (d6) and the name, which you fill in; below it, one row per face. The first column holds the die numbers (`3`, `4-6`, `01–05`), the others the result, even with bold, `[[links]]` and `@rules`. Rows and columns are added as in any table. An existing table becomes a roll table with the “Roll table” button among the table tools.
- **The dice**: d4, d6, d8, d10, d12, d20, d100 (or d%), d66 and several dice added together, like 2d6. On the d10 `0` counts as 10, on the d100 `00` counts as 100. With no numbers at all in the first column, every row has the same chance.
- **If something's wrong**: under the table tools it says whether the table is ready to roll or what's missing, for example a number that's in no row, or in two.
- **Rolling on the page**: under the table there's “Roll”. The result appears next to it, and the page doesn't change: every click is a new roll. It's good at the table, for improvising.
- **Rolling while you write**: on any page, type `/` and the table's name (`/shop`; `/shabby-shop` works too), choose the table and press Enter: the result goes into the text. While the cursor is on the result, **Reroll** appears under the toolbar, which puts in another result from the same table, and **Keep**, which turns it into normal text. On the page the result is text like any other, and changing the table doesn't change pages already written.
- **Who uses them**: the Master creates them; everyone who sees the page can roll. A hidden table (Game Master secret) can be found and rolled only by the Master. The table must be on the page itself, not inside a box.
- Roll tables are part of the page text: they have versions, show up in search, and end up in the Markdown export and in the world package.

## Maps

A map is a page: the Master creates it with New page › “New map”, uploads the image and adds the **pins**: with “Add pin”, below the zoom buttons, and a click on the map. From the keyboard, Enter on “Add pin” creates the pin at the center of the view. The pin is placed and a popup asks for its details: Save creates it, Esc or the X at the top right drops it. A pin can open a page or another map (kingdom › city › building). When you click a pin linked to a page (or press Enter on it), the page opens as an overlay, on top of the map: Esc, the X or a click outside closes it, and “Open the full page” takes you to the actual page.

**Layers** group pins and are turned on and off from the “Layers” button, under “Add pin”: there's always the **Base layer**, visible to everyone, where every pin goes unless you choose another layer for it; “New layer” in the same list creates another one, with its name and visibility; “Manage layers”, under the map, renames and deletes them; a “Game Master only” layer is invisible to players. If you enter the map's real width, a ruler appears for measuring distances.

All the pins are also in the list under the map. The image, the scale and the map that contains this one are changed by editing the page; the “Description” you write there, which is the page text, appears in a box above the map.

## Gallery

All the campaign's images in one place: page images (covers and side column), images inserted in the text, maps and resources, most recent first. Under each image it says where it appears; clicking it opens it full size (← → arrows to browse, Esc to close). You can view all of them, only page images, only maps or only resources. Everyone sees only the images of the pages, maps and resources they can see.

## Resources

Images, music and other campaign files: handouts, portraits, background music for sessions. They're in the **Resources** tab of the tree on the left, split into Images, Audio and Other files, and on the Resources page of the sidebar.

The Master uploads them with “Upload a resource”: images (PNG, JPEG, WebP or GIF, up to 25 MB), audio (MP3, OGG, WAV, FLAC or M4A) or any other file, up to 90 MB. If they don't write a title, the file name is used. As with maps, they choose who sees them: Public, Players or Game Master only.

Images also include all those used in the wiki, i.e. covers, side columns, page text and maps, without having to upload them again: everyone sees only the ones they can see. They appear with their file name; their detail page says where they appear, and with the pencil the Master can change only the name (the file extension stays); everything else is changed in the page that uses them.

Images are viewed and audio is played right in the wiki, even on the phone; other files (PDFs included) are downloaded. Clicking a resource opens its detail page: with the pencil at the top right, the Master changes its title, description, visibility and file, or deletes it.

Resources are included in the backup, but not yet in the world package.

## Timelines and calendar

A timeline is a page, and you can make as many as you like (New page › “New timeline”). Each one is one of two types:

- **World**: history, in order of in-world date, written by the Master (when the wiki is created there's already the “World timeline”);
- **Campaign**: what happened at the table, in order of play date; players add events too, and **session reports** appear on their own (there's already the “Campaign timeline”).

Events can be viewed as a list or on the timeline strip; each one belongs to its own timeline.

- **Calendar**: Gregorian, Harptos (Forgotten Realms), simple or invented (months, festivals, leap years, eras, “Today in the world”).

## Rules

The **Rules** page: 999 entries from the SRD 5.2 (in English) to search and cite. In pages, `@spell[Fireball]` becomes a link to the rule's page, with the **i** button for the preview. If you turn on the **D&D Beyond** plugin (Administration › Plugins), the link leads to the D&D Beyond search instead. Each rule shows the pages that cite it: your house rules stay connected.

## Boards

Boards are pages: **New page › New board**, with the starting columns (one per line). They sit in the tree like the other pages and have their own visibility: **Personal** (only you), Players, Game Master only. Anyone who sees the board can add and move cards (with the arrows or by dragging them); in the text you can use `[[Page]]` and `@rules`. Columns are added, renamed, moved and deleted by whoever can edit the page. Boards aren't included in the world package.

## Profile

At the top right is your profile: your icon, your name and your rank in the campaign (Game Master or Player). Clicking it opens the menu with your campaigns (if you have more than one), **Profile**, **Campaign** (for the Master), **New campaign**, **Administration** (only for the Admin) and **Log out**; on the phone only the icon stays at the top, and your name and rank can be read in the menu.

**Profile** and **Administration** open in a popup over the wiki, with the sections in a bar on the left: you close it with Esc, with the X or by clicking outside, and underneath you find the page you were reading. With Ctrl+click they open as pages, in another tab. On the phone they open directly as pages.

The **Profile** has three tabs:

- **Icon and name**: the display name and the icon, chosen from the page icons (a crown, a wizard hat, swords…) or an uploaded image (PNG, JPEG, GIF or WebP);
- **Reading and accessibility**: the preferences below;
- **Password**: change it, see how many sessions are open and close the ones on other devices.

If you're not signed in, you only get the reading preferences, saved in the browser.

## Reading and accessibility

In the **Profile** everyone chooses:

- theme: Automatic (the default: Aria, or Aria at night if your system is dark), Aria, Aria at night, Neon, Vintage light, Vintage dark (or the ones created by the Admin). With Aria and Neon, on a large screen, the left sidebar and the page panel run from top to bottom and the page has no boxes; the two Vintage themes have the classic shape, with the header at the top and the boxes;
- text size up to 200%;
- the Atkinson Hyperlegible or OpenDyslexic font;
- wide spacing, reduced motion, language;
- left sidebar always open, or closed and opened with the button at the top.

The whole wiki can be used from the keyboard and with screen readers; the colors meet WCAG 2.2 AA.

## Administration

- **Settings**: site name, default language and visitors. Below them is the installed **version**, compared with the latest one on GitHub: “Up to date” or “Not up to date”, with links to what's new and to how to update.
- **Campaigns**: create them for anyone (even beyond their limit), choose their Master, delete them.
- **Users**: roles, how many campaigns each one can create (next to it, how many they run), disabling accounts and, for people who have forgotten their password, a reset link (valid for two days, once only).
- **Invites**: links to join the site, one per person.
- **Themes**: copy a theme and change its colors; it saves only if the text stays readable. A theme can have a background image, which sits behind the boxes and shows only on wide screens. Export and import as a file (colors only: the background travels with the world package).
- **Plugins**: turn installed plugins on and off; clicking one opens a window with its purpose, instructions, author and contents (to create one, see [plugins.md](plugins.md)).
- **Backup**: the full backup to download and the daily **automatic backup** into a folder (even your OneDrive, Google Drive or Dropbox folder, which takes it to the cloud), with the time, the number of copies to keep and, if you like, a **password** that encrypts it. The page explains what's in a backup; the password can't be recovered. See [installation.md](installation.md#automatic-backup).
- **World package**, **Export to Markdown**: see [installation.md](installation.md#backup-and-restore).
- **Log**: successful and failed sign-ins, role and password changes, invites, Claude tokens, consents, backups and exports from the last six months.
