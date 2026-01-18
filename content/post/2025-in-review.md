---
title: "2025 in review"
date: 2026-01-18T23:59:59Z
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
But the overall feelings about it are positive, and I think I made a lot of progress.


## Key events of 2025

At the time of writing, I am still processing just how many things happened in 2025.
A few things deserve more than just a line in a list, so I gave them separate sections.
There is a Table of Contents at the top of the page if you need it :)


### Event highlight: Factorio LAN party

For my birthday, my friends and I organised a Factorio LAN party that went on for 3 days.
10+ people played the game, and at the peak there were 8 simultaneous players.

We put a lot of effort into the event.
To make sure things go smoothly, we planned out when people are going to come and leave, and whether they'd like to sleep over.
That allowed us to make sure there is sufficient space and nutrition for the guests.
We also set up a wired network connection for everybody who wanted to use it.

For the game, we set some rough goals, but in general just tried to make sure that people were not feeling lost in the game.
We were playing with the Space Age DLC, and we got to space by the end of day 3.

To make the game more fun, we wrote a [mod for Factorio][statorio] for exporting game stats to Prometheus.
It is based on [graftorio2][graftorio2] but has some unique statistics and bugs.
One of the unique statistics is "Area Paved" --- we all know it's not a megabase if there is no concrete.
During the game, we projected a Grafana dashboard with game stats onto the wall, and one of the guests even wrote custom CSS to give it some party vibes.

{{< figure src=`factorio-grafana.webp` caption=`Factorio Grafana projected onto a wall in my living room` >}}

I recorded a timelapse of the game, if you'd like to see it:
- [Day 1][factorio-day1]
- [Day 2][factorio-day2]
- [Day 3][factorio-day3]

[factorio-day1]: https://www.youtube.com/watch?v=H0GILysmJxw
[factorio-day2]: https://www.youtube.com/watch?v=4cRIVcaSM20
[factorio-day3]: https://www.youtube.com/watch?v=CyJb9VveP2Y
[statorio]: https://github.com/ftvkyo/statorio
[graftorio2]: https://github.com/remijouannet/graftorio2


### Event highlight: Moving

At the start of the year, I moved into a different flat, having spent 3 years in the last one.
I really appreciate the move, as I find the new area much more enjoyable.
A few months after I moved, I drew a [floorplan][floorplan] of the new place.

[floorplan]: /project/floorplans/#edinburgh-may-2025

Now, almost a year later, this place feels like home even more than the last place did after 3 years there.
I put a lot of effort into adapting to the new place and into adapting it for me.
The scope of these adjustments can be pretty big, and I mostly focused on the following:

- Adding decorations that feel "right" and that require minimal attention
- Disassembling and getting rid of some of the furniture that I kept from the old flat
- Finding appropriate places to store many little things (or getting rid of them)

{{< figure src=`ceiling-decorations.webp` caption=`UV-reactive stars on the ceiling, lit up by UV fairy lights` >}}

This year I learned a lot about optimising my living/working space.
At the same time, there are a couple of things that are becoming increasingly clear to me.

First, for many reasons, I need more space.
I do a lot of things at home, so the space has to stay highly multifunctional, and that often causes conflicts between activities.
This is complicated by the fact that a lot of the furniture is "glued" in place because there is no better place for it.
And, well, I also just want to have a guest bedroom, a guest desk, and a greater ability to reconfigure my flat.

And the other thing -- I want to have more control over noise levels.
The biggest noise sources are the boiler, the radiators and the fridge.
Don't get me wrong, on their own they are alright, but any source of noise can drive you mad if it's around you all day every day.

There are many other little things that contribute to the noisescape.
Just for instance --- squeaky floors (don't get me started on how uneven they are!), coil whine from various power supplies and tech devices, fan noises, upstairs neighbours walking around or doing laundry.
My bed is also right against the wall of the stairwell, so all of the corridor sounds get nicely amplified for the optimal sleep experience.

So, having learned so much, maybe I will move again in 2026 :)


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

{{< figure src=`/img/post/visibility-polygon/render.webp` >}}

One of my favourite parts of the project is an implementation of an algorithm for calculating [Visibility Polygons][visibility-polygon].
I spent a long time writing a post about it, but the post is [still a draft][visibility-polygon-post-draft] at the time of publishing.

[visibility-polygon]: https://en.wikipedia.org/wiki/Visibility_polygon
[visibility-polygon-post-draft]: https://github.com/ftvkyo/ftvkyo.github.io/blob/main/content/post/visibility-polygon.md

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

I recorded a bunch of videos from the different stages in development:

- [`2025-06-11` Phong lighting demo with pixel-art texture and normal map][donut-video1]
- [`2025-06-17` Phong lighting demo with pixel-art texture and normal map, and multiple coloured lights][donut-video2]
- [`2025-06-25` Multiple layers in a level + animated sprites that rotate + multicolour lighting][donut-video3]
- [`2025-06-27` Blinn lighting with inverse-square law distance factor][donut-video4]
- [`2025-07-04` Blinn lighting, more lights, and a level made in Tiled Map Editor][donut-video5]
- [`2025-07-12` Something isn't right... \[FLASHING LIGHTS\]][donut-video6]
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

At the start of the year, I felt like I wanted to improve the User Experience in my interactions with digital devices.
Since I was also interested in learning how to design PCBs and wanted to manufacture a PCB without using chemicals, I decided to make another custom keyboard.
I called it Cryptodancer, inspired by the title of "Crypt of the NecroDancer" game (there is no connection).

{{< figure src=`cryptodancer.webp` caption=`The keyboard` >}}

I started by deciding which components I am going to use and designing the PCB in KiCad.
I also needed to decide how I was going to manufacture it, and I decided to mill it on the CNC-router that I used when working on my [last][hovert60-01] [keyboard][hovert60-02] at the Edinburgh Hacklab.

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

In April 2025, through a friend from the lab, I acquired a central unit from a [Logitech® Z906][logitech-z906] surround sound system.
The usual composition of that system is:

- A control console
- A central unit combining the amplifier and the subwoofer
- 4x satellite speakers
- 1x central speaker
- A DE-15 extension cable to connect the control console to the central unit. It looks just like a VGA extension cable, but most of those don't actually wire some of the pins or bridge some of them.
- A remote

[logitech-z906]: https://www.logitech.com/en-gb/shop/p/z906-surround-sound-system

I wanted to use that amplifier, but it could not be controlled without a console, which I didn't have.
What I had was a PCB produced by that same friend that allowed me to connect an ESP32-S3 to the console port of the central unit.
The friend also provided some other resources:

- [Unofficial documentation for Logitech® Z906 Surround Sound Speakers][nomis-logitech-z906]
- [Alternative console and simulated amplifier interface for the ESP32-S3 microcontroller interacting with Logitech® Z906 Surround Sound Speakers][nomis-ggroohauga]
- [PCBs for an alternative console and simulated amplifier interface for the ESP32-S3 microcontroller interacting with Logitech® Z906 Surround Sound Speakers][nomis-ggroohauga-pcb]

[nomis-logitech-z906]: https://github.com/nomis/logitech-z906
[nomis-ggroohauga]: https://github.com/nomis/ggroohauga
[nomis-ggroohauga-pcb]: https://github.com/nomis/ggroohauga-pcb

Based on those, I wrote [my own firmware][ftvkyo-ggroohauga-rs] for the ESP32-S3.
I used Rust with `esp-idf-hal` and I implemented the following features:

- Connecting to Wi-Fi
- Synchronising time using NTP
- Communicating with the user through MQTT, including:
    - Accepting power, volume, input, effect and speaker level commands
    - Reporting status into MQTT
    - Logging warnings and errors into MQTT
- Communicating with the central unit over serial based on user input

[ftvkyo-ggroohauga-rs]: https://github.com/ftvkyo/ggroohauga-rs

{{< figure src=`ggroohauga-output.webp` caption=`Example output from <code>ggroohauga-rs</code> over MQTT` >}}

Somewhere in-between I acquired and connected the other speakers, completing the MVP.
There are still some hardware things to improve, and a lot of software stuff to work out.

One of the software things to work on is support for switching between playing 2-channel and 6-channel audio.
The speaker is connected to my PC over 3x AUX cables (each carrying 2 channels), and it has a bunch of channel mapping modes:

- "None" --- connect the 6 channels to the 6 speakers with no changes.
- "2.1" --- connect the 2 front channels to the 2 front speakers and auto-generate the subwoofer output. Ignores the other 4 input channels.
- "4.1" --- like "2.1", but also copy the 2 front channels to the 2 rear channels. Ignores the other 4 input channels.
- "3D" --- connect the 2 front channels to the 2 front speakers and auto-generate the outputs of the subwoofer and the central and rear speakers. Ignores the other 4 input channels.

In an ideal world, you would use "None" for playing audio mastered for 6 channels, and "3D" for creating a "surround" effect for the more common 2-channel content.
Unfortunately, turns out that the "3D" mode has a big issue.
Specifically, certain bass-heavy or distortion-heavy tracks make the rear speakers crackle, sound corrupted or compressed.
I enjoyed the surround experience otherwise, so I figured out how to upmix 2-channel audio into 6 channels in software, on my PC.

To do the upmixing, I used [CamillaDSP][camilladsp] that another lab friend had recommended.
First, I created a virtual 2-channel Pulseaudio Sink using PipeWire, and then made CamillaDSP listen to that sink, process the sound, and output it into the 6-channel ALSA device.
I uploaded my config as a GitHub [gist][camilladsp-config].

[camilladsp]: https://henquist.github.io/
[camilladsp-config]: https://gist.github.com/ftvkyo/547e9780e4e8dcc566586245a947a27d

Unfortunately, as I understand, outputting through ALSA rather than Pulseaudio means that other applications can not output to that device at the same time.
I would use Pulseaudio, but for some reason the overwhelming majority of my attempts generated chopped-up sound, sometimes just silence, and it could get fixed and broken again by simple program restarts, with no configuration changes.

I am looking forward to the future improvements in the user experience of this system.

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
