---
title: "Hacking inline plugins into Obsidian"
date: 2023-07-03T19:00:00Z
tags: [Obsidian, Obsidian Inline Plugins]
description: >
  I made plugins for obsidian that are stored and developed right in the vault.
  It's not supposed to work this way, so achieving good results made me happy.
---

I have been using [Obsidian][obsidian] for a while now.
I mentioned it before, in [this post][so-2].

[obsidian]: https://obsidian.md/
[so-2]: /post/004-on-self-organization-02/

I wanted to make another post for the series on self-organization, but I was not satisfied with the content.
I don't know if I'll get back to it.

This time, however, I am presenting something more substantial.

## Necessary background

Since I wrote the last post on self-organization, I picked up [Templater][templater] and [Dataview][dataview] plugins.
I did some weird things with both of them, which they were clearly not designed for.

[templater]: https://github.com/SilentVoid13/Templater
[dataview]: https://github.com/blacksmithgu/obsidian-dataview

### Weird Dataview requests

For example, I generated a list of `<details><summary>...</summary>...</details>` blocks, each of which contained a list of links to notes with a certain tag.

![Screenshot of the list of links](/img/7/details-list.png)

<details>
<summary>How I made the <code>&lt;details&gt;</code> list</summary>

```
LIST WITHOUT ID
    "<details>"
    + "<summary>"
    + "<code>"
    + replace(tags, "s/", "")
    + ": " + length(rows) + "</code>"
    + "</summary>"
    + "<ul> <li>"
    + join(
        map(
            rows
            , (x) =>
                "<a class='internal-link' href='"
                + x.file.path
                + "'>"
                + default(x.title, x.file.name)
                + "</a>"
        )
        , "</li> <li>"
    )
    + "</li> </ul>"
    + "</details>"
FROM "journal"
WHERE length(filter(tags, (x) => startswith(x, "s/"))) != 0
SORT file.name DESC
FLATTEN tags
GROUP BY tags
WHERE startswith(tags, "s/")
SORT rows[0].file.name DESC
```

Yes, I had to use `<a ...>` instead of Dataview's links because it didn't work otherwise...

</details>

At some point I realized that the stuff that I am doing is already weird, and I should use better tools.
I didn't want to create a plugin, because I actually tried before, and the attempt frustrated me a lot.
So, instead, I wrote a DataviewJS script.

<details>
<summary>Source code (long but with comments and colored)</summary>

```js
// ====== //
// Config //
// ====== //

const notesSource = `"notes"`;

const specialTags = {
    "#draft": "Drafts",
    "#wiki": "Wiki pages",
    "#public": "Publications",
    "#person": "People",
    "#fixme": "Fix these",
    "#snapshot": "Snapshots",
    "#le": "Loose ends",
};

const seriesPrefix = "#s/";

const titleRegex = /^# (.*)$/m;

// ======= //
// Helpers //
// ======= //

// Link that uses the title of the file
async function tlink(page) {
    const file = page.file;
    // We want to pick up titles from the first (and hopefully only) h1
    // in the file.

    // Read the file
    const content = await dv.io.load(file.path);

    // Extract the h1
    const headerTitle = titleRegex.exec(content);

    // Use the title if it exists, otherwise try to use the title from frontmatter
    // TODO: remove support of frontmatter title
    const title = headerTitle ? headerTitle[1] : page.title || file.name;

    // Create the link
    return dv.fileLink(file.path, false, title);
}

// List of links to pages matching a query, sorted by filename, descending and
// using embedded file titles.
async function plist(query) {
    const source = `${query} and ${notesSource}`;
    const pagesRaw = dv.pages(source);
    const pages = pagesRaw.sort((e) => e.file.name, "desc");
    const links = await Promise.all(pages.map(tlink));

    return links;
}

// Convert Link into an html <a> element
function htmlLink(link) {
    const a = document.createElement("a");
    a.href = link.path;
    a.innerText = link.display;
    a.classList.add("internal-link");
    a.target = "_blank";
    a.rel = "noopener";
    return a;
}

// Render a list of links, but hidden in <details>.
// The summary says the number of links in the list.
async function renderDetails(name, links) {
    const c = dv.container;

    const d = c.createEl("details");

    const n = document.createElement("strong");
    n.innerText = name;

    const s = d.createEl("summary");
    s.style.userSelect = "none";
    s.appendChild(n);
    s.appendChild(document.createTextNode(`: ${links.length}`));

    const list = d.createEl("ul");
    for (let link of links) {
        const li = list.createEl("li");
        li.appendChild(htmlLink(link));
    }
}

// ============ //
// Acquire data //
// ============ //

const allNotes = dv.pages(notesSource);
const allTags = allNotes.file.tags;

const series = {};
for (let tag of allTags) {
    if (tag.startsWith(seriesPrefix)) {
        const s = tag.substring(3);
        series[s] = series[s] ? series[s] + 1 : 1;
    }
}
const seriesAlphabetical = Object.entries(series).sort((a, b) => a[0].localeCompare(b[0]));

// ====== //
// Render //
// ====== //

// TODO: replace with pages.groupBy(tags) and then filter out the groups?

dv.header(2, "By series");
for (let [s, num] of seriesAlphabetical) {
    const links = await plist(seriesPrefix + s);
    renderDetails(s, links);
}

dv.header(2, "With special tags");
for (let [tag, name] of Object.entries(specialTags)) {
    const links = await plist(tag);
    renderDetails(name, links);
}
```

</details>

### Weird Templater scripts

I also made a few Templater scripts that would help me create new notes according to some rules.

<details>
<summary>Details about Templater</summary>

This one is short and simple, but it had siblings for different kinds of notes.
At some point I also had a script that would be a single entry-point for all of them, and that would ask me what kind of note I want to create.

```
<%*
let path = "/journal/" + tp.date.now("YYYY/YYYY-MM-DD-ddd-HH-mm-ss");
await tp.file.move(path);
-%>
---
title: "<% await tp.system.prompt('Title', '', true) %>"
tags:
- s/[<% await tp.system.prompt('Series', '', true) %>]
- incomplete
---

<% tp.file.cursor(1) %>

```

The experience with Templater was not very good.
Specifically, I was really annoyed by difficulties with moving and renaming files.
Especially that the default behavior is to ask you to rename the file after it's been opened, which is not what I want, as I already put it in the right place.

I also suffered a bit when I tried to make a template that would create a new note, insert a link to that note into the current note, and reveal the new note.

It's.... bad.

```
<%-*
let dateRegex = /\d{4}-\d{2}-\d{2}-[a-z]{3}-\d{2}-\d{2}-\d{2}/i;

let folder = "/notes/" + tp.date.now("YYYY");
let tfolder = app.vault.getAbstractFileByPath(folder)
let filename = tp.date.now("YYYY-MM-DD-ddd-HH-mm-ss");

let prompt = "Child note title:";
let title = await tp.system.prompt(prompt, "", true);

let thisPath = tp.file.path(true);
let thisFilename = thisPath.match(dateRegex)[0];

// If no match, throw
if (!thisFilename)
    throw new Error("Current filename does not match the regex.");

let childContent = `\
*[[${thisFilename}|Parent note]]*.

# ${title}
#draft
`;

await tp.file.create_new(childContent, filename, false, tfolder);

tR += `*Child note*: [[${filename}|${title}]]`;
-%>
```

And, oh, by the way, Templater can't just bind any template to a hotkey.
You have to either set up a "create note from template" hotkey, which will ask you to choose a template from a list, or set up a hotkey for a specific template, which would only work *when you have a note open*.

Also, to circumvent the problem with having to close the "rename the file" dialogue, I used the "intercept note creation" option in Templater, and was creating notes with Daily Notes core plugin, which had its own drawbacks.

</details>

Don't get me wrong, I am very grateful to the authors of these plugins.
I still use their API and I think they are very inspiring.
I just want to make things that don't give me the itch.

## Next step: inline plugins 💀

// To be written
