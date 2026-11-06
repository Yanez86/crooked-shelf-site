# Claude

The Claude Code plugin brings a campaign into the conversation: who a character is, what happened in the last session, which pages talk about a place. Claude searches and reads the pages and, if you allow it, writes them: a recap, a new character, a correction.

**Only the campaign's Master** connects it, not the players. Claude sees what the Master sees, secrets included, and does only what the Master can do.

## Installing

1. In the wiki, go into the campaign you're the Master of and open Campaign settings › Claude. Check “Claude can also write” only if needed, then “Create a token”. Copy the address and the token: the token is shown only once.
2. In Claude Code:

   ```bash
   claude plugin marketplace add Yanez86/crooked-shelf
   claude plugin install crooked-shelf@crooked-shelf
   ```

3. When Claude Code asks for them, enter the address and the token. The token stays in your computer's keychain.

The wiki must be reachable from the computer Claude Code runs on.

## As a connector, on claude.ai

On claude.ai and in the Claude apps you add the wiki as a custom connector, without copying tokens:

1. In the wiki, go into the campaign you're the Master of and copy the “Connector address for claude.ai” from Campaign settings › Claude, for example `https://wiki.esempio.it/mcp/2`.
2. In Claude open Settings › Connectors › Add custom connector, name it after the campaign and paste the address. Leave the client ID and secret empty.
3. Claude opens the wiki: sign in, choose whether Claude can also write, then “Allow”.

**One connector per campaign**, each with its own address and a token that doesn't open the others. In each chat turn on only the one for the campaign you're working on, so Claude doesn't carry one campaign's secrets into another.

The wiki must be reachable from the internet over HTTPS (see [Installation](installation.md)): Anthropic's servers connect to it, not your computer.

The connector has its own token, separate from the plugin's. Campaign settings › Claude shows which sites the campaign is connected from; “Revoke” disconnects them all, and you connect again from Claude.

## The token

- It works for one campaign only, while you're its Master. There's one plugin token per campaign: creating another replaces the previous one.
- You revoke it from Campaign settings › Claude. It also stops working if you change your password, if the account is disabled or if you're no longer the Master.
- By default it only reads: to write it must be created with the box checked, and tokens created earlier stay read-only.
- It opens only the `/mcp` address: it can't be used to access the rest of the wiki.
- Unused for 90 days, it stops working. Campaign settings › Claude shows when it was created and when it was last used.

Page text reaches Claude, and so Anthropic, like everything that goes into a conversation. Create the token only if your group agrees.

## What it reads

Pages, with the side column and the list of pages that cite them, and the left sidebar tree (`wiki_tree`). It doesn't read map pins, timeline events or board cards yet.

## What it writes

Page text, the side column, tags and the order of the left sidebar:

| Tool | What it does |
|---|---|
| `create_page` | creates a page; unless you ask otherwise, only you see it |
| `append_to_page` | adds text at the end; if you're the Master, also in hidden blocks (secrets) |
| `replace_text` | replaces a piece of text that appears only once |
| `set_sidebar` | rewrites the text rows of the side column; images stay |
| `set_tags` | replaces a page's tags |
| `create_folder` | creates a folder (Master only) |
| `move` | moves pages, folders and dividers in the tree, as if dragging them (Master only) |
| `rename` | renames a page (the address stays) or a folder (Master only) |

It **can't** delete pages or folders, change visibility or permissions, touch templates, maps, timelines and boards, upload files, or reach settings, users, plugins, themes or backups: there's no tool for any of these. Moving a page to another folder doesn't change who sees it.

The text goes through a converter that recognizes a fixed set of elements (headings, bold, italic, lists, quotes, tables, links): HTML and code stay as text and are never run. The site's rules apply: a player edits only the pages they can edit on the site.

Every change leaves a version in the page's history, in your name: you can go back from there.

### Mind Claude Code's permissions

Claude Code asks for confirmation before every write, showing the text: leave it on. Pages are written by all the participants, and one could contain instructions meant to trick Claude, for example into copying a secret into a players' page. Claude is instructed not to follow them, but the confirmation remains your check.

## For developers


`src/routes/mcp/[[id=id]]/+server.ts` speaks MCP over HTTP, one message per request and with no session; the tools are in `src/lib/server/mcp.ts` and go through the same functions as the site. Anyone who adds a write tool must not touch visibility and permissions or delete: Claude never sends editor JSON, only Markdown that goes through `fromMarkdown` (side column values included) and plain text for tags. The plugin is in `claude-plugin/`. To try it without installing it: `claude --plugin-dir claude-plugin`.

The connector is OAuth 2.1 with PKCE: `/.well-known/oauth-protected-resource/mcp/<id>` and `/.well-known/oauth-authorization-server` for discovery, `/oauth/register`, consent at `/oauth/authorize`, and `/oauth/token`, which issues an `api_tokens` token with the return site in `client`. The campaign comes from the `/mcp/<id>` address (the `resource` parameter), and `/mcp/<id>` accepts only tokens for that campaign. Registration is open to anyone, so it stores nothing and gives everyone the same client: what protects it is the consent page, which shows the site the token goes to (`src/lib/server/oauth.ts`); for a site that isn't Claude's (`claude.ai`, `claude.com`, `anthropic.com` or the local computer) it asks for an extra confirmation. Tokens have no refresh, like the plugin's, but they stop working after 90 days without use. `/oauth/token` is called by Claude's servers without an `Origin`: that's why the check on forms from other sites is in `hooks.server.ts` and not in SvelteKit.
