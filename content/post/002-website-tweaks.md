---
title: "Website tweaks"
date: 2021-09-17T13:00:00+01:00
tags: [Meta]
---

I have done some minor optimization of the website in order to improve its
Lighthouse score and its performance.

The score should be above 90% in every category (except PWA that I don't target)
at the moment of publishing this post. I only tested it on localhost,
but as the most significant problem was caused by Google Fonts the website
depends on, that part should be the same as in production.

The changes are:

- Alter Cayman Theme's default `head.html` to have three CSS files mentioned
  there preload.
  <br> ["Link types: preload" on MDN][0].
  ```html
  <!-- Three times, once for each file: -->
  <link rel="preload" as="style" type="text/css" href="...">
  <link rel="stylesheet" href="...">
  ```

- Add `&display=swap` to the Google Fonts URL.
  <br> ["font-display" on MDN][1].

- Change a link text in the [first Parentheses devlog][2] to not be `here`, but
  something more descriptive. Apparently, that matters for SEO.

- Add this paragrapoh about analytics:

  This webiste uses analytics provided by [Plausible][3].
  <br> They do not interfere, they do not collect personalized data.
  I don't even have to include a privacy statement.
  Unfortunately, ad blockers still block them :'(
  <br> Well, not much I can and want to do with that.

  (And mention analytics in the footer 👇)

# Update 2022-10-21

I disabled my analytics subscription a while ago as it was unwise to keep it.
Today, I removed it from the website.
I'll keep the old text of the post here.
It was an interesting experiment.


[0]: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload
[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
[2]: /post/001-devlog-parentheses-01/
[3]: https://plausible.io
