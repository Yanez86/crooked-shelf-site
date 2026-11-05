# Claude

The Claude Code plugin brings a campaign into the conversation: who that character is, what happened in the last session, which pages talk about a place. Claude searches and reads the pages on its own and, if you allow it, writes them: a session recap, a new character, a correction.

Claude works on a campaign **only with its Master**: players can't connect it. It sees what the Master sees, secrets included, and does only what the Master can do.

## Installing

1. In the wiki, go into the campaign you're the Master of and open Campaign › Claude. Check “Claude can also write” only if you need it, then press “Create a token”. Copy the address and the token: the token is shown only once.
2. In Claude Code:

   ```bash
   claude plugin marketplace add Yanez86/crooked-shelf
   claude plugin install crooked-shelf@crooked-shelf
   ```

3. When Claude Code asks for them, enter the address and the token. The token stays in your computer's keychain.

The wiki must be reachable from the computer Claude Code runs on.

## As a connector, on claude.ai

From claude.ai (and the Claude apps) you add the wiki as a custom connector, without copying tokens:

1. In the wiki, go into the campaign you're the Master of and, from Campaign › Claude, copy the “Connector address for claude.ai”, for example `https://wiki.esempio.it/mcp/2`.
2. In Claude open Settings › Connectors › Add custom connector, name it after the campaign and paste the address. Leave the client ID and secret empty.
3. Claude opens the wiki: sign in, choose whether Claude can also write, then press “Allow”.

**One connector per campaign**, each with its own address: the token for one doesn't open the others. In each chat, turn on only the one for the campaign you're working on, so Claude doesn't carry a secret from one campaign into the pages of another.

The wiki must be reachable from the internet over HTTPS (see [Installation](installation.md)): Anthropic's servers connect to it, not your computer.

The connector has its own token, which doesn't replace the plugin's. Campaign › Claude shows which sites the campaign is connected from; “Revoke” closes them all, and to come back you just connect again from Claude.

## The token

- It works for one campaign only, and only as long as you're its Master. There's one plugin token per campaign: creating another one replaces the previous one.
- You revoke it from Campaign › Claude. It also stops working when you change your password, if the account is disabled, or if you're no longer the campaign's Master.
- By default it only reads: for it to write, it must be created with the box checked, and tokens created earlier stay read-only.
- It opens only the `/mcp` address: it can't be used to access the rest of the wiki.
- Unused for 90 days, it stops working by itself. Campaign › Claude shows when it was created and when it was last used.

Page text reaches Claude, and so Anthropic, like any content in a conversation. Create the token only if your group is fine with that.

## What it reads

Pages, with the side column and the list of pages that mention them. It doesn't read map pins, timeline events or board cards yet.

## What it writes

Only page text, in three ways:

| Tool | What it does |
|---|---|
| `create_page` | creates a page; unless you ask otherwise, only you can see it |
| `append_to_page` | adds text at the end; if you're the Master, also in hidden blocks (secrets) |
| `replace_text` | replaces a piece of text that appears only once |

It **can't** delete pages, change the title, visibility, permissions or folder of an existing page, touch templates, maps, timelines and boards, upload files, or reach settings, users, plugins, themes or backups: there's no tool for any of these.

The text goes through a converter that recognizes a fixed set of elements (headings, bold, italic, lists, quotes, links): HTML and code stay as text and are never run. The site's rules apply: a player edits only the pages they can edit on the site.

Every change leaves a version in the page's history, in your name: you can go back from there.

### Mind Claude Code's permissions

Claude Code asks for confirmation before every write, showing the text: it's best to leave it on, especially with the Master's token. Page text is written by all the participants, and a page could contain instructions meant to trick Claude, for example into copying a secret into a page the players can see. Claude is instructed not to follow them, but the confirmation is the check that stays in your hands.

## For developers

`src/routes/mcp/[[id=id]]/+server.ts` speaks MCP over HTTP, one message per request and with no session; the tools are in `src/lib/server/mcp.ts` and go through the same functions as the site. Anyone who adds a write tool must stick to page text: Claude never sends editor JSON, only Markdown that goes through `fromMarkdown`. The plugin is in `claude-plugin/`. To try it without installing it: `claude --plugin-dir claude-plugin`.

The connector is OAuth 2.1 with PKCE: `/.well-known/oauth-protected-resource/mcp/<id>` and `/.well-known/oauth-authorization-server` for discovery, `/oauth/register`, consent at `/oauth/authorize`, and `/oauth/token`, which issues an `api_tokens` token with the return site in `client`. The campaign comes from the `/mcp/<id>` address (the `resource` parameter), and `/mcp/<id>` accepts only tokens for that campaign. Registration is open to anyone, so it stores nothing and gives everyone the same client: what protects it is the consent page, which shows the site the token goes to (`src/lib/server/oauth.ts`); for a site that isn't Claude's (`claude.ai`, `claude.com`, `anthropic.com` or the local computer) it asks for an extra confirmation. Tokens have no refresh, like the plugin's, but they stop working after 90 days without use. `/oauth/token` is called by Claude's servers without an `Origin`: that's why the check on forms from other sites is in `hooks.server.ts` and not in SvelteKit.
