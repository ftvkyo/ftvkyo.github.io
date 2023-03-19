---
title: "Website overhaul"
date: 2023-03-19T14:00:00Z
tags: [Meta]
---

I have done a major overhaul of the website.

The primary focus was on styling.
I was not satisfied with the original theme ([Cayman][cayman]) and wanted to change it.
The problem was not in the look of the theme, but in how much tweaking I wanted to do, so it was easier to just make a new theme of my own.

[cayman]: https://github.com/zwbetz-gh/cayman-hugo-theme

I have also changed the way the website is built.
I used to have the website sources in a public Github repository and the deployments were done with a Github Action, to a `gh-pages` branch in the same repo.
I have moved the sources of the website to a separate repository and the deployments are set up to update `gh-pages` in the original repository.

Let's look into the details.

## Presentation changes

I don't use any component libraries for styling.
I have written some SCSS and I'm pretty satisfied with its structure.
There are still some tweaks I want to make.
In particular, although I have already done some [Semantic HTML][semantic]-ing, I want to go even further on accessbility.

[semantic]: https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements

### Language selection

I implemented a menu for language selection, you can see it in the top-left corner (if I haven't removed it by the time you read this).
The language selector uses JavaScript.
Implementing a `noscript` fallback is one of the things I might do later.

Currently available languages are, as before, English and Russian.
I write for English first, and then (sometimes) translate it to Russian.

### Themes

I also plan to add a selector for website themes, it will be next to the language menu.
Themes I want to implement are:
- System default
- Light
- Dark
- High contrast (possibly also split into light and dark)

Currently, most of the colors used are [named colors][colors], and the text is `black`, and the background is `white`.
This is good for contrast, and for accessibility, but this is not something that I personally like to see, so I plan to create a "prettier" default theme and move the current one to "high contrast".

[colors]: https://developer.mozilla.org/en-US/docs/Web/CSS/named-color

## Build changes

The move of the website sources to a separate repository was done for two reasons:
- I wanted to be able to work on new content without having to worry about people reading the unfinished drafts.
- I didn't want to store the website version history publicly.
  This, of course, can be circumvented, but the current solution is enough for me.

Luckily, the Github Action I was already using for deployments ([peaceiris/actions-gh-pages][action]) supports both deploying to a separate repository and creating an orphan branch on every deployment.

Because of me playing with SCSS, I also had to add a step to install `dart-sass-embedded` to the Github Action.

[action]: https://github.com/peaceiris/actions-gh-pages

## Further plans

- Accesibility improvements (readability, semantic HTML, check tab order, aria-labelling, etc.)
- Better colors for the default theme, and a theme selector
- Better non-color-related styling of the posts (e.g. margins, line height, font sizes, etc.)
- New content sections (Projects), cleaning up the existing ones (About me).
- favicon...
