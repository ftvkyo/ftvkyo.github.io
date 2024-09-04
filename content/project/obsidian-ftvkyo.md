---
title: "Obsidian ftvkyo"
toc: true
description: >
    Plugin for [Obsidian.md](https://obsidian.md).
    Accomodates my workflow, has its own calendar with periodic notes, templates, and a file browser.
---

- Github repository: [ftvkyo/obsidian-ftvkyo](https://github.com/ftvkyo/obsidian-ftvkyo)
- Work started: *Jul 23, 2023*
    - Code was migrated from "Inline plugins" I made earlier

I have been using Obsidian for a while (since March 2021).
Finding a good workflow, a good approach to work and study is important for me, and it is an interesting challenge.
This project is the culmination of my efforts.


## Project goals & background

Some people who use note-taking applications these days say that their notes become their so-called "second brain".
It's fair to say that my goal is similar, I want a tool like that.

But this does not sound very specific.
People have different brains, people have different needs.
So what are the specific things that I need this tool for?

I think this can be expressed in terms of human *memory* and *how it's used*.
The tool should compensate the shortcomings of real memory, and there are surprisingly many examples where that could be helpful:

- Externalizing the [working memory][work-mem]
    - Helps switching between activities
    - Frees resources that would be occupied by the thoughts "at the back of your mind"
    - Helps being more rational and reasoning being more fair
    - Allows better introspection
- Recording recollections of events or feelings (externalizing [episodic memory][epi-mem])
    - Improves self-perception and reflection
    - Preserves things that may be forgotten with time
    - Amplifies the ability to focus on the present
- Learning things in an organized way and iteratively improving the process (externalizing [semantic memory][sem-mem])
    - Makes it easier to see connections between different concepts and domains
    - Creates a knowledge base that can be used as a reference in the future
    - Helps understanding and processing information by making the learner think how the info should be presented and organized

[work-mem]: https://en.wikipedia.org/wiki/Working_memory
[epi-mem]: https://en.wikipedia.org/wiki/Episodic_memory
[sem-mem]: https://en.wikipedia.org/wiki/Semantic_memory

Our biological brains have been evolving for quite a while.
They have some built-in mechanisms for storing and processing information.
The second brain does not have that benefit.

I see this as one of the reasons to pay attention to how this second brain is structured.
Moreover, just like our biological memory is dynamic (e.g. see how [Sleep and memory][sleep-and-mem] interact), the second brain does not have to be "just a bunch of text files" either.
It's entirely possible to automate some things and to create conventions that make the working process easier.

[sleep-and-mem]: https://en.wikipedia.org/wiki/Sleep_and_memory

And, most importantly, just like we can learn to utilize our biological brains better, we can also iteratively improve our second brains in response to changing needs.[^meta-learning]

[^meta-learning]: See [Meta-learning](https://en.wikipedia.org/wiki/Meta-learning)

With all that said, **the core goal of the project** is creating a synergy between the biological and digital brains, focusing on different types of memory and executive skills.
I have previously explored some of this under the [Organisation](/tags/organisation/) tag. [^self-org]

[^self-org]: My Time and Focus: [part 1](/post/my-time-and-focus-01/), [part 2](/post/my-time-and-focus-02/). More may follow (or already be there).


## Challenges

There is a number of challenges that make this project difficult and interesting.
Some of them are in the domain or the project, and others are in the project work itself.


### Domain challenges

To name a few:

- What kind of content should be written down?
- Should the notes get periodically reviewed? How often?
    - How to make sure the reviews are not forgotten?
    - How to make sure there is enough motivation and attention when the reviews happen?
- What should the directory, file and tag structure be like?

Answering this kind of questions is difficult.
It may be hard to know what you want and how you feel about something.
In such situations, "answering" becomes a process of trial and error which requires patience, motivation and periodic reflection.

The general advice in such situations is to start with *something*, improve it iteratively, and stop when it gets *good enough*.
But this won't always make things easier.
The project takes me out of a methaphorical low-energy pit, but it still has a cost, requires consistent effort, and has limits on how much it can help due to external factors.


### Project work challenges

It's easy to start a personal project to then abandon it later.
There are many reasons for why that could happen:[^side-proj]

- Life's demands taking over
- Interest decreasing
- The project being unrealistic, leading to a failure to "push" through it
- The goals being unclear, so the project never feels complete
- The perfectionism being out of control, leading to focus shifting to the wrong things

[^side-proj]: Comic [CommitStrip: Side-project](https://www.commitstrip.com/en/2014/11/25/west-side-project-story/?)

Compared to many other projects, this one is special because it is somewhat self-dependent --- the project itself is aimed at things that would make the development process easier.[^comp-boot]
This helps a lot with retention of motivation to continue working on the project.

[^comp-boot]: It reminds me of [Compiler bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(compilers))

Mitigating other factors that could stop the work on the project requires attention to approach:
- Setting realistic and clear goals beforehand
- Separating development into iterations, preventing feature creep
- Being mindful of the current focus and stopping work when things get "good enough"


## Achievements

Thoroughout the development process I made a lot of iterative adjustments to my workflow, and in turn, adjustments to the plugin.

Half a year after I started the project, the project has passed the following milestones:
- `0.0.1` / `pre-release-1`
- `0.0.2` / `pre-release-2`
- `0.1.0` --- the first release
    - `0.1.1`
- `0.2.0` --- a release with a focus on simplification

I'm glad I've reached the `0.1.0` version, it was made possible specifically by new skills I learned.
Without the skills, I would totally be able to *code* something like that, but I would struggle to be *happy* about it.

For each of these releases, I defined a set of requirements I wanted the project to satisfy and specified what tasks that would entail.
Afterwards, every month I decided how far I want to progress through these task lists, every week I picked up some of the tasks and scheduled them for specific days.
I've then successfully extended this system to other areas of my life.

This approach to scheduling is not new!
There are Obsidian plugins like [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) and [Calendar](https://github.com/liamcain/obsidian-calendar-plugin), and many people use them.
For me, however, high control over the plugin has been crucial for establishing a system that works, even if the result is similar to existing solutions.
That's because the process of trial and error improved my understanding of what things work, what things don't, and what things work but can't be justified.


### Features

Due to the experimental nature of the plugin, features can come and go.
For instance, with the `0.2.0` release I implemented a simple file tree instead of a complicated system of organizing and presenting notes by their tags I had in `0.1.0`.
The benefits of being able to specify multiple tags per note didn't outweigh the drawbacks of that approach.

The same way, I allowed the notes to have freeform filenames rather than using timestamps like `YYYYMMDD-HHmmss`.
Unfortunately, this means I can't use symbols like `:` and `?` in note titles.
At the same time, the logic got much simpler and future adjustments got easier.

The main features of the plugin are "Explore View" and "Plan Callout".


#### Explore View

Explore view combines a calendar and a file tree in one sidebar.
The calendar is centered around the week rather than being centered around the month, which I think is an interesting solution.
It supports opening existing notes and creating new notes from templates if they don't exist.
The calendar allows easy yearly, quarterly, monthly, weekly and daily planning.

{{< figure src=`/img/obsidian-ftvkyo/calendar.webp` caption=`Week-centric calendar with glowing text showing existing notes` >}}

The file tree is quite simple in `0.2.0`, but already has some interesting quirks.
For instance, if a note has `index: true` in its frontmatter, it will have a different icon in the file tree, and it will be sorted above the other notes in the same folder.

{{< details "File tree screenshot" >}}

{{< figure src=`/img/obsidian-ftvkyo/file-tree.webp` caption="File tree that highlights notes with `index: true` in their frontmatter and brings them up" >}}

{{< /details >}}


#### Plan Callout

Plan callout is a small extension built on top of [Obsidian Callouts](https://help.obsidian.md/Editing+and+formatting/Callouts).
It is the foundation of my daily time scheduling.
When a callout has the type `plan`, it allows specifying `@ HH:mm` as its title (where `HH` is hours, and `mm` is minutes), which defines the "starting time".
Then, in the body of the callout, any list items can specify the time they are going to take, and the plugin assumes 5 extra minutes of "buffer time" after each of these items.

These list items then receive tooltips that show when they start and finish.
Total time and the time of finishing are also displayed at the bottom of the callout.
This all together allows easy [timeblocking](https://en.wikipedia.org/wiki/Timeblocking) that is ready to be adjusted on the go.

This is an example of such a callout:

```markdown
> [!plan] `@ 17:15`
> - [x] `5m` OS shortcut settings
> - [x] `15m` debug alacritty
> - [x] `2h30m` website
> - [x] `20m` chats, planning
```

{{< figure src=`/img/obsidian-ftvkyo/plan-callout.webp` caption=`How the previous example of Plan Callout gets rendered` >}}

Another example, this is my monthly note template:

```markdown
# {{date:MMMM YYYY}}

![[{{date:YYYY-[Q]Q}}#Priorities]]

---

{{weeks:gggg-[W]ww:link,list}}

---

## Work

- [ ] …

## [[Org]]

- [ ] Review [[{{date:YYYY-[Q]Q}}]]

### [[Health]]

- [ ] …

### [[Learning]]

- [ ] …
```

## Lessons learned

- I can limit the scope of every development iteration and effectively decide the time when I should be done with it.
  This helps overcoming perfectionism and feature creep.
  In turn, this also helps with satisfaction, because the goals get more granular and it doesn't feel like the development is stuck.
- I know how to reliably plan my time throughout the day.
  This is an improvement from the time I wrote the first posts in the [Organisation](/tags/organisation/) tag.
- I know how to set long-term goals and identify tasks that would bring me closer to these goals.
  I can schedule these tasks for months, weeks, days, and my perception of time and of what I am capable of is more realistic.
- I learned a lot of interesting CSS, had some fun poking undocumented APIs, and I tried various interesting approaches to project and code structure.
- Working towards the goals got easier, and I can apply iterative approach even outside of project work.

There are always more things to learn, though.
For instance, my current workflow does not motivate me to write the journal or essay kind of notes, while I still like them.
So this is another thing to think about.

Additionally, independently of how much this tool helps me in my daily life, it does not magically increase the total amount of resources I have.
So, for sustainability, the resources that are freed by such an elaborate life management system might have to be reinvested into wellbeing rather than spent thoughtlessly.
