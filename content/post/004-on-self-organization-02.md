---
title: "On self-organization, part 2: But how?"
date: 2022-12-23T17:00:00+00:00
tags: [Reflection, Organization]
toc: true
aliases:
- "004"
description: >
  Personal organization through note-taking and some extra thoughts on the topic.
---

{{< figure src=`/img/004/reintroduction.svg` alt=`An arrow with a loop in the middle, representing "reintroduction".` >}}


## Reintroduction

In the [previous part](/post/003-on-self-organization-01/) I have gone through some tools and approaches to self-organization.
The main focus was on note-taking, and now it is finally time to highlight some neat parts of it.

I have already more-or-less described the criteria that I want the note-taking system to satisfy, and why I need it, so here I'm going to talk about its **implementation details**.


### Purpose

{{< figure src=`/img/004/purpose.svg` alt=`A cloud with a question markn in the middle.` >}}

I hope this post may be an **inspiration** for somebody to start taking notes or improve their existing approach to that.
I also want to improve mine, and I think writing about it and listening to feedback is good for it.
It is also just fun to write about it and make illustrations :)

> Note:
> This is, after all, an opinion-centric post, and the experience described can be different for different people.


## Note vault

{{< figure src=`/img/004/vault.svg` alt=`An image of a folder and of a file joining together like puzzle pieces.` >}}

I want my notes to be somewhat accessible and I don't want to be afraid to lose them in a fire or some other kind of accident.
Because of this, I store my notes in [Git](https://git-scm.com) and access them through [Obsidian](https://obsidian.md).
These things are just tools and not a requirement.
For example, the original [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten) (check it out) was designed for stacks of paper cards in cardboard boxes.

A nice benefit of this choice is that Git allows me to easily replicate my notes between all my devices and the internet (that is, synchronize them and have them decentralized).
At any moment I can pull my notes from the internet to my PC, laptop or even my phone.
If I want, I can also look at them through the web browser, although in that case, I lose Obsidian's niceness and the notes become simple [markdown](https://en.wikipedia.org/wiki/Markdown) files.

At the same time, since I did choose these tools, I had to come up with some kind of file structure aimed at better **accessibility**.
Since it all started with a simple paper journal, where I would "dump" what was on my mind, trying to make the notes represent what I experienced, I naturally decided to just make a new file for every date and put all text there.

The first structural change I made was adding some **tags** to my notes.
I think a general idea was not bad, but I never used these tags to access my notes, so I guess the implementation wasn't really good.

After ~1.5 years of writing notes like this, I decided I want to also have **separate sections** for notes not bounded by the date of writing and with better interconnectivity.
So this is what I got:

{{< figure src=`/img/004/structure.svg` alt=`A graph showing the structure of the note vault. Includes Journal, Wiki and Writing sections. Journal is further subdivided into Date, Reading and Topics subsections.` >}}


## Note vault sections

In the picture, you can see the aforementioned *journal*, *wiki* and *writing* sections.
In the journal section, you can see that notes can be grouped by date, by topics, and by what reading has made me write them.
There is more to it and I will tell you the details further in the post.

The words that I think describe the sections best are alphabetically ordered in a logical way, which is neat.

> Note:
> Previously, the names were *journal*, *knowledge base* and *essays*, but I changed them to be more fitting.
> I kept the original names in the first part.

On the topic of **accessibility**, here is a general "nice to have" requirement that is general for all the sections:

- Notes should be easily accessible so they are not being dead weight.
   This may include things such as:
    - *Useful* tag system;
    - Note indexing along with short note *summaries*;
    - Tracking the *last revision date* (to re-read the notes that haven't been touched for the longest time).
      By the way, NHS has it, you can see it on their pages;
    - Tracking *integration state* (for cases when notes require further work);


### Section one: Journal

> *Having some notes is generally better than having no notes at all.*

{{< figure src=`/img/004/journal.svg` alt=`A book with a big "J" on it.` >}}

[Journal/Diary](https://en.wikipedia.org/wiki/Diary) on Wikipedia.

This section, as I mentioned, is partially a legacy thing, I started journaling long before I started formalizing the framework of doing it.

It has quite **low standards**, which allows the notes to be incomplete and makes the note-taking barrier as low as it is reasonable to make it.
It is generally a good thing because I think that having some notes is generally better than having no notes at all (exceptions possible).

After some thinking, I made this list that describes the section pretty well:

1. There should be a way to journal, which means taking notes that can have arbitrary content and that are identified by the date they were taken.
2. Journal notes should be easily transferrable from other mediums (such as paper).
3. The content of existing journal notes should not shrink over time.
   They are intended to be a reflection of what was happening at the time of their writing.
   At the same time, correcting minor typos, and adding comments and/or clarifications is fine.


#### Journal "By date" note structure

Although these journal notes have the most complicated inner structure compared to all other types of notes I have, it's still quite simple.

{{< figure src=`/img/004/journal-note.svg` alt=`Structure of a journal "By date" note.` >}}

A basic note has its file name in the format `YYYY-MM-DD.md`, and sometimes I add an extra quantifier like that: `YYYY-MM-DD SUFFIX.md`, where `SUFFIX` is some topic that the note is dedicated to.
For example, a note written on 27 February 2022 would have the name `2022-02-27.md`, and if it was dedicated to a `meta` topic, its name would be `2022-02-27 meta.md`.

> Note: **Year, then the month, then day.**
> Why?
> Because then the alphabetic ordering will be equal to chronological ordering.

The contents of the note are also quite simple.
In markdown frontmatter (YAML metadata at the start of the file) I have the day of the week and had tags before I scrapped them.

Then there's a heading just stating the **time of writing**.
First, because I can write to the same note several times a day (if that happens, there will be multiple of those headings).
Second, because I found myself wondering about the time of writing of my notes that I digitalized (I manually typed in all my paper notes into my vault (and only finished a month ago (I am proud))).

Second-level headers are my **topic headers**.
Those can be, for example, `Work`, `Plans for tomorrow`, `Alice`, `Bob` etc.
I found headings to be more important than tags, to be honest.
They are not as useful in terms of search, because they can be slightly different from note to note, but they are *very important* for text structuring and writing on-point.

I also often take notes that are quite long, so it is sometimes very helpful to *create all the headings first* and only then populate the contents, extending the headings as needed along the way.
This way I don't have to worry about forgetting to write something.
That was a concern before headings were introduced, I would write a note mid-way and forget what else I wanted to "talk" about.


#### Topic splitting

{{< figure src=`/img/004/topic-split.svg` alt=`Illustrating of topic splitting. A series of main notes and a separate series of topic notes that were separated from the main notes.` >}}

Remember the separate type of journal notes that I called "grouped by topic" in the structure introduction?

This type of notes appeared when I understood that I keep including the same heading over and over in many different "by date" notes, so I decided that I can **"split"** this heading into a separate topic.
This would allow me to keep my "by date" notes shorter, and have the "on the topic" notes in a more continuous fashion.

For example, if I didn't do that, for a given note containing the heading, it would be a little difficult to find the previous note where I wrote on that matter, while if I split this topic into its group, it becomes *easy to see where this note is in the series of other notes* on this topic.

In the last picture, the first note in the topic-based notes is a note I call `_index` (underscore so it goes first in the list) that has links to the notes containing info on the topic before "the splitting".
It can also have links to the notes made after splitting, containing short summaries of them for even better access.
Like this:

```
# *redacted*

## Past

- [[/journal/daily/2022/2022-10-15#^459323 | Начало]]
- [[/journal/daily/2022/2022-10-28#^ef6452 | Не получилось на ПК под арчем]]
- [[/journal/daily/2022/2022-11-01#^dbaa0e | Нерешительность и неопределенность]]
- [[/journal/daily/2022/2022-11-04#^1dccbe | Перемещение *redacted* и тики]]
- [[/journal/daily/2022/2022-11-08#^edb6ce | Вывод *redacted*]]

## Series

- [[2022-11-14 | Мотивация и простейшее *redacted*]]
- [[2022-11-17 | Идеи и про планирование]]
- [[2022-11-19 | *redacted*]]
```

These are Obsidian-style links, by the way.
And you can see a cool feature of Obsidian -- [links to blocks](https://help.obsidian.md/How+to/Link+to+blocks).
Rather than creating a heading in the original text, it creates a "block" with a hex code and links to it like this: `[[something#^abcdef]]`.


### Wiki

Onwards!
This is my personal wiki space.
Notes about events, people or science are all great candidates to be included.
The easier the system can handle it, the better.
The [graph-like](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)) structure is inspired by aforementioned [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), although my approach is *less formal*.

I do encourage note **interlinking**, but I do not feel like Zettelkasten's recommendations fit my usage patterns.
For now, I kept this simple, and I will add or reformat things as I need.
Of course, the cost of editing lots of notes can be a big burden, but I feel like I need to learn my preference first and design **my** system by myself, possibly taking inspiration from other sources.
I will probably make an update on this matter if I get more good ideas.

{{< figure src=`/img/004/wiki-structure.svg` alt=`Structure of the wiki, showing hierachical relations between notes and additional links between related notes from different parts of the wiki.` >}}

As you can see, the general structure of the notes is [tree-like](https://en.wikipedia.org/wiki/Tree_(graph_theory)).
However, there are also connections about related things and just between things that remind me of each other.
I find the tree-like structure useful because of how easy it is to represent it in the file system.
This way I know where each note is located and I don't have too many unrelated files in the same directory.

Anyways, here are the simple requirements I had in mind when I just started filling in the wiki:

1. There should be a knowledge base, that is more effective than journal notes for its main purpose.
2. Data in the knowledge base can be altered as time passes, but the possible usefulness of older versions of information should be taken into account when changing something.


#### Wiki note structure

{{< figure src=`/img/004/wiki-note.svg` alt=`Structure of a wiki note.` >}}

This is not too different from the notes in the journal.
There is no "time" heading, and this one has a list of references.
They equally serve as a list of sources, but also as a list of *interesting related links* I would want to read again and possibly use to expand the notes further.

Most of the links lead to [Wikipedia](https://en.wikipedia.org).
Probably my favourite website at the moment.


### Writing

{{< figure src=`/img/004/writing-note.svg` alt=`Illustration of a writing note. Not really any structure.` >}}

The writing section is the simplest one.
You see, I want to have a section for **high-quality writing**, for something that can theoretically be published with little or no processing.
These posts themselves are written there first!

The file structure is arbitrary, and here's the single requirement I have:

1. There should be a way to compose data from journal notes, from the knowledge base and my brain into whole blocks of information -- essays.


## Conclusion: the full picture

It's time to wrap up the talk about the note-taking system, at least for now.
I've prepared an **awesome picture** describing the roles of the components of the system:

{{< figure src=`/img/004/everything.svg` alt=`Full picture of the parts of the current system, showing the roles of the components. Includes: Brain (agent, source of data, memory); Journal (written down experience, tracker, short-term memory); Wiki (associative and systematic storage, long-term memory); Writing (personal research).` >}}

Ask me questions if you have any, and tell me if you want me to cover something else, or something I've mentioned but in greater detail.
Let's move to some extras:


## Extras


### "Steamroller"

{{< figure src=`/img/004/steamroller.svg` alt=`Picture of a steamroller being pulled by a person. The steamroller flattens the surface under it.` >}}

> *It makes rough surfaces flat.*
> *But it is also really heavy.*

I think this can be a good analogy for some of the difficulties I have described before.
This "steamroller" allows you to *pave* the road, make it *flat*, easy to *walk* and *ride* on.
But it is also heavy.
You can, of course, pull it.
And you can use some fuel.

I won't say anything specific, I think everybody can find their own meaning in this if they want.
I think the value of the analogy, in this case, is not in illustrating something (and then somebody can tell you that it's a [leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction) anyway), but rather in how it can help somebody to think about a problem from a different perspective.
Don't think too much about it.


### Dedicated time

{{< figure src=`/img/004/dedicated-time.svg` alt=`An X axis representing time, some of the parts are colored in showing that that time is dedicated to something.` >}}

> *Time.*
> *Dedicated.*

This isn't some kind of secret, but I found that there were cases when I wanted to do something that I thought was important, but that I could not do under the pressure of all the other things I had to be doing.
For example, this happens often with my notes.

There is so much more I want to do about them, I want to be studying things and fill my wiki, I want to do personal research, I want to train my writing, and I want to share my thoughts with my friends.

But when there are other, more important *life*-things, I end up postponing my work on the notes.
And when some kind of [critical mass](https://en.wikipedia.org/wiki/Critical_mass) of disappointment accumulates, I only manage to dump some stuff in the notes, how I have been, what I've been doing, and then I come back to those *life*-things.

Because of this, I started trying to dedicate some time every week to taking notes, but also to other things related to it like personal research.
It doesn't work perfectly, because *life*-thigs don't go anywhere.
But it helps, and I will keep trying.
Maybe that could help you as well.


### To-do lists, choices and priorities

I've been working on improving my planning skills recently.
[To-do lists](https://en.wikipedia.org/wiki/Time_management#Task_list_organization) don't work too well for me, at least not digital ones.
Because of this, I got a proper paper planner where I put my big To-dos for the week.
The only categorization I implemented is "**work/self**", this way I can see the relation of time/effort I spend on one or the other.

Weekly planning works well so far, because that imposes some kind of **weekly deadline**, but doesn't lead to planning more than you can do in a day.
The average completion is still less than what is planned, but it is very easy to move the task to the next week when there's a need.
Also, this weekly style of planning allows you to *pick something that you want to be doing* at any time from a pretty good pool of options.

I like the feeling I get by doing it manually.
And if I don't complete something in the current week, I circle it and **rewrite** it for the next week.
I feel like this is important, at least for me.

So far I've been revising the list at the end of the week, on Sunday evening, and that's when I think about the next week's plans and fill everything in.

On top of this, I came up with an **activity choice map** for myself.
This is a simplified illustration of it:

{{< figure src=`/img/004/choice-map.svg` alt=`Choice map, a graph, separating things into useful, fun and a combination of them.` >}}

In real life, it takes a whole A5 page, in a quite compressed manner.
As you can see, it separates activities into **Fun** and **Useful** (not that they can't intersect).

I haven't been using this too much yet, but this kind of tool has already allowed me to know what options I have at all (I did include everything there, even mindless scrolling) by making them all explicit.
I hope this helps me avoid [procrastination](https://en.wikipedia.org/wiki/Procrastination) by providing more fitting activities if I'm not satisfied with what I'm doing.


## Bye

Thanks for reading!
I hope you liked it.
