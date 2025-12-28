---
title: "2025 in review"
date: 2025-12-31T23:59:59Z
tags: [Reflection, Year in review]
toc: true
draft: true
---

Last year I wrote [2024 in review][2024-in-review].
There are many good things about that post.
I reviewed it a few times throughout the year, curious about the changes in my mental state since then, and about the goals I had set.
It has also been fun to share it with my friends and acquaintances.
And, most importantly, it presented a good opportunity for reflection at the time of writing.
So, here I am, writing a follow-up :)

[2024-in-review]: /post/2024-in-review

2025 has been a transformative year.
It had its ups and downs, and felt somewhat chaotic.
But the overall feelings about it are positive, and I am looking forward to reviewing it.


## Key events of 2025

{{% aside %}}

Over the last few days I have been slowly realising how many things happened in 2025.
I am curious to see how long this section is going to be once I write it.

{{% /aside %}}


### Event highlight: Moving

At the start of the year, I moved into a different flat, having spent 3 years in the last one.
I really appreciate the move, as I find the new area much more enjoyable.
A few months after I moved, I drew a [floorplan][floorplans] of the new place.

[floorplans]: /project/floorplans

Now, almost a year later, this place feels like home even more than the last place did after 3 years there.
I put a lot of effort into adapting to the new place and into adapting it for me.
There are a few things I focused on in that regard.

First of all, I tried to get rid of stuff I don't need anymore.
I still have a couple of boxes of stuff that I barely touch, and I have a bunch of furniture that I need to get rid of.
But it is now organised much more neatly, and I mostly know where things are.

I put quite a bit of effort into decorating the new place.
I printed a bunch of UV-reactive decorations and put up some UV fairy lights in my living room.
I found good spots for my furniture and various devices so that things are easily accessible but don't feel cluttered.

Just in general, my storage management has improved.
With the help of my friend, I worked out what things I want to be quickly accessible, and introduced catch-all boxes for my rooms.
I also picked up a lot of hobbies in the last 2 years, so I needed to learn how to organise it all.

Next time I have to move, I will plan it out more thoroughly.
It will also be much easier to do so, considering that now I have much less stuff that's just "loose".


### Event highlight: Factorio LAN party

For my birthday, my friends and I organised a Factorio LAN party that went on for 3 days.
10+ people played the game, and at the peak there were 8 simultaneous players.

We put a lot of effort into the event.
To make sure things go smoothly, we planned out when people are going to come and leave, and whether they'd like to sleep over.
That allowed us to make sure there is sufficient space and nutrition for the guests.
We also set up a wired network connection for everybody who wanted to use it.

For the game, we set some rough goals, but in general just tried to make sure that people are not feeling lost in the game.
We were playing with the Space Age DLC, and we got to space by the end of day 3.

To make the game more fun, we wrote a [mod for Factorio][statorio] for exporting game stats to Prometheus.
It is based on [graftorio2][graftorio2] but has some unique statistics and bugs.
One of the unique statistics is "Area Paved" --- we all know it's not a megabase if there is no concrete.
During the game, we projected a Grafana dashboard with game stats onto the wall, and one of the guests even wrote custom CSS to give it some party vibes.

I recorded a timelapse of the game, if you'd like to see it:
- [Day 1][factorio-day1]
- [Day 2][factorio-day2]
- [Day 3][factorio-day3]

[factorio-day1]: https://www.youtube.com/watch?v=H0GILysmJxw
[factorio-day2]: https://www.youtube.com/watch?v=4cRIVcaSM20
[factorio-day3]: https://www.youtube.com/watch?v=CyJb9VveP2Y
[statorio]: https://github.com/ftvkyo/statorio
[graftorio2]: https://github.com/remijouannet/graftorio2


### Project highlight: Donut renderer

In the summer I decided to develop ~~a video game~~ a rendering engine.
I used [Rust][rust] and [wgpu.rs][wgpu] to make something inspired by [Towerfall][towerfall].
Apart from wanting to use said tools, I had more goals in mind:

- I wanted it to be an "eye candy"
- I wanted an interesting programming challenge

I don't feel like I got that project to a conclusion, but I am very happy with what I've done and what I've learned.
The project is called [`donut`][donut] because, like Towerfall, it is topologically equivalent to a torus [^topo-torus].

[rust]: https://rust-lang.org/
[wgpu]: https://wgpu.rs/
[towerfall]: https://en.wikipedia.org/wiki/TowerFall
[donut]: https://github.com/ftvkyo/donut
[^topo-torus]: Wikipedia: [Wraparound](https://en.wikipedia.org/wiki/Wraparound_(video_games))

One of my favourite parts of the project is an implementation of an algorithm for calculating [Visibility Polygons][visibility-polygon].
I spent a long time writing a post about it, but the post is still a draft at the time of writing: [In search of the Visibility Polygon][visibility-polygon-post].

[visibility-polygon]: https://en.wikipedia.org/wiki/Visibility_polygon
[visibility-polygon-post]: /post/visibility-polygon

I also had fun fiddling with geometry for implementing simple impulse-based physics for 2D bodies.
I am looking forward to learning more about [Collision response][collision-response] in the future.

[collision-response]: https://en.wikipedia.org/wiki/Collision_response

I really enjoyed writing the rendering part of the engine.
Learning resources on [wgpu][wgpu] were able to answer my questions, and (to my surprise) I had a lot of fun reading though [WebGPU Reference][wgpu-ref] and [WebGPU Shading Language (WGSL) Reference][wgsl-ref] in my spare time.
A lot of knowledge from my past experiments with OpenGL and with Vulkan translated to WebGPU quite well too.

[wgpu-ref]: https://www.w3.org/TR/webgpu/
[wgsl-ref]: https://www.w3.org/TR/WGSL/

The current renderer utilises an apporach called [Deferred Shading][deferred-shading].
I really enjoyed stumbling upon it by myself once I understood what I can do with the information generated by the Visibility Polygon algorithm.
Rendering happens in 3 passes, where:

- The first pass draws the entirety of the level onto multiple temporary framebuffers, storing information about color, depth and other properties of the material for every pixel of the screen
- The second pass uses the visibility data for each light, renders it as triangles that sample the framebuffers from the previous pass, and finally render the pixel using the Blinn lighting model
- During the second pass, blending is configured to sum all the lights per pixel, which essentially allows avoiding having a for-loop in the shader that would otherwise have to go over every light in the scene
- On the third pass, light emitters are rendered (with animations!)

[deferred-shading]: https://en.wikipedia.org/wiki/Deferred_shading

I recorded a bunch of videos from the different stages in development
- [`2025-06-11` Phong lighting demo with pixel-art texture and normal map][donut-video1]
- [`2025-06-17` Phong lighting demo with pixel-art texture and normal map, and multiple coloured lights][donut-video2]
- [`2025-06-25` Multiple layers in a level + animated sprites that rotate + multicolour lighting][donut-video3]
- [`2025-06-27` Blinn lighting with inverse-square law distance factor][donut-video4]
- [`2025-07-04` Blinn lighting, more lights, and a level made in Tiled Map Editor][donut-video5]
- [`2025-07-12` Something isn't right... [FLASHING LIGHTS]][donut-video6]
- [`2025-07-19` Multicolor lights with dynamic visibility calculation (and broken physics, yes)][donut-video7]
- [`2025-07-20` Multicolor lights with dynamic visibility calculation and impulse-based physics][donut-video8]
- [`2025-08-13` Wrapping light beyond level edges][donut-video9]

[donut-video1]: https://www.youtube.com/watch?v=_2w2ZL9MftE
[donut-video2]: https://www.youtube.com/watch?v=v8n37ChAZxU
[donut-video3]: https://www.youtube.com/watch?v=6oisuYNPGq0
[donut-video4]: https://www.youtube.com/watch?v=S3xxBcVtQb8
[donut-video5]: https://www.youtube.com/watch?v=hLW9Jo9WqsY
[donut-video6]: https://www.youtube.com/watch?v=Rfd3DKzmUyQ
[donut-video7]: https://www.youtube.com/watch?v=om-rZYK4yQ8
[donut-video8]: https://www.youtube.com/watch?v=LijT-8gj0RA
[donut-video9]: https://www.youtube.com/watch?v=0pzXuZvGXPE


### Project highlight: Cryptodancer keyboard

At the start of the year, I felt like I want to improve the User Experience in my interactions with digital devices.
Since I also was interested in learning how to design PCBs and wanted to manufacture a PCB without using chemicals, I decided to make (another) custom keyboard.
I called it Cryptodancer, inspired by the title of "Crypt of the NecroDancer" game (there is no connection).

I started by deciding which components I am going to use and designing the PCB in KiCad.
I also needed to decide how I was going to manufacture it, and I decided to mill it on Edinburgh Hacklab's CNC-router that I used when working on my [last][hovert60-01] [keyboard][hovert60-02].

[hovert60-01]: /post/devlog-hovert60-01
[hovert60-02]: /post/devlog-hovert60-02

Once I had the design, I tried to use several [Computer-aided manufacturing (CAM)][cam] tools to generate G-code for the CNC-router.
Last year I used Autodesk Fusion for that, but these days I am more allergic to Windows and to cloud-oriented software.
For some reason, I could not get any of the CAM tools I tried to work on Linux, so naturally, I decided to implement G-code generation by myself.

[cam]: https://en.wikipedia.org/wiki/Computer-aided_manufacturing

My initial idea for that G-code generator involved me implementing an entire library for doing boolean operations on polygons --- I could not let down the brain worm that got into me at the end of 2024.
After some time I understood that I don't have the time to implement all the hard algorithms, so I turned to using the [`geo`][geo-rs] ecosystem.
This is what the generator does:

1. Read the job config, including:
  - SVG file to use
  - Operation type: engrave, cut, drill or bore
  - Milling bit size and shape
  - Filters, such as minimal and maximal circle radii for the drilling and boring operations
2. Read the input SVG and extract all the circles and straight lines (and straight path segments) that match the job filter. Yes, everything else is ignored.
3. Expand the stroke of the straight segments, giving them thickness and turning them into polygons. Also turn circles into polygons.
  - If cutting or engraving contours, expand ([dilate][dilation]) all polygons by a value based on the milling bit size and shape
4. Walk all segments and issue movement commands to an Encoder that checks the validity of issued moves (e.g. disallowing rapid movements when the milling bit is engaged)
5. Export the resulting G-code from the Encoder

[geo-rs]: https://docs.rs/geo/
[dilation]: https://en.wikipedia.org/wiki/Dilation_(morphology)

After I had the G-code, I was able to mill the PCB as planned.
In total I made 3 PCBs, iterating some traces and milling settings.
They turned out beautiful (no illustrations here, sorry).
The milling was single-sided, so I had to solder *a lot* of bridges made out of diode legs 🙈

The keyboard itself is column-staggered, with the microcontroller sitting between two angled halves.
The halves are 30 keys each, in 6x5 matrices, with each half also having a linear encoder in the thumb cluster.

I implemented some ~~cursed~~ custom encoder behaviour in QMK.
I made the encoders pretend to be arrow keys or the mouse (like etch-a-sketch!), depending on the mode.
Moreover, I added an acceleration feature to them: if they register that they are being turned faster than some threshold, they send multiple arrow keys / mouse movement commands per tick.
I had a lot of fun combining that with noise from a piezo buzzer, it improved the experience of using the encoders.

I am happy with the project --- I learned a lot and got to write some interesting code.
And even though the keyboard currently does not work, it has made a big and positive impact on my life this year.

For example, it pushed me to finally move to Colemak Mod-DH, and I use it full-time.
Even though I only type at 70 WPM now, I really enjoy the experience, so I will keep using it (and get faster).
Using QWERTY or even just row-staggered keyboards has become more of a pain now though.

The keyboard also has led to me connecting with some wonderful people, so that's also cool about it :)


### Project highlight: 5.1 audio system

- speakers
- ggroohauga-rs
- camilladsp


### Other events

- I went to 20 [parkruns][parkrun]
- I organised an "OpenSCAD for Beginners" workshop at [Edinburgh Hacklab][ehlab]
    - You can find the slides on GitHub: [ftvkyo/openscad-workshop][openscad-workshop]
    - A few of my colleagues came to Edinburgh for the workshop, I was very happy to see them
- I organised a lot of boardgames, videogames and movie watching events

[parkrun]: https://www.parkrun.org.uk/
[ehlab]: https://ehlab.uk
[openscad-workshop]: https://github.com/ftvkyo/openscad-workshop


### Other projects

- Modifying IKEA Ivars
    - Projector giraffe
    - Racing wheel rig
    - Painting a shelf with a friend
- 3D-designing and 3D-printing
    - Upgraded laptop stand hinges
    - A stand for TRMNL
    - Choreboard
    - Various hooks and clips
    - Steam Deck d-pad replacement
    - Car phone magnet
    - Procedurally generated keycaps for preonic
    - Many cool shapes
- Coding
    - ?
- Some leatherwork
- Laser-printed daily planner
- Drawing


### Travel

- Narrowboat (4 days)
- London (5 days)
  - YOASOBI
- London (8 days)
  - Friends
- Sheffield (3 days)
- Liverpool (? days)


### Work

- Work: Business Insider
- Work: trip 1 (4 days)
- Work: trip 2 (6 days)


## Goals from last year

I want to have a look at how I did with respect to the goals I set for 2025.
I already know that I didn't get them all to 100% completion, but I think that's fine.

{{% details "Summary of the goals from the last post" %}}

Functioning as a person:

- Keep doing my best at treating others with respect and kindness, even in challenging situations
- Be more mindful of how I spend my time and energy, have proper rest
- Get better at utilising the flow state
- Improve my long-term planning
- Reduce back and neck pain and generally improve my physical health
- Make consistent progress in work, projects and learning

Projects and hobbies:

- Learn the basics of making music, could be digital or with an instrument
- Close, clean up some old projects / tasks / ideas that stopped being relevant
- Improve my interactions with the computer
  - Make a keyboard that I will actually because
  - Improve my usage of keyboard shortcuts
  - Make another attempt at migrating to Colemak Mod-DH
- Play 200 more hours of Factorio
- Finish Elden Ring DLC
- Update my approach to journaling, learning and reviewing notes to make those come naturally
- Write

{{% /details %}}


## Reflection

- What makes 2025 different
- Inspiration


## Goals for 2026

## Thank you

...
