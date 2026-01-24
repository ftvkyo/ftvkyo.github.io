---
title: "2025 in review"
date: 2026-01-22T22:00:00Z
tags: [Reflection, Year in review]
toc: true
---

Last year, I wrote [2024 in review][2024-in-review].
There are many good things about that post.
I reviewed it a few times throughout the year, curious about the changes in my mental state since then and about the goals I had set.
It has also been fun to share it with my friends and acquaintances.
And, most importantly, it presented a good opportunity for reflection at the time of writing.
So, here I am, writing a follow-up :)

[2024-in-review]: /post/2024-in-review

2025 has been a transformative year.
It had its ups and downs and felt somewhat chaotic.
But the overall feelings about it are positive, and I think I made a lot of progress.


## Reintroduction 🏳️‍⚧️

Greetings!
Let me rei-introduce myself.
My name is Rei, and my pronouns are she/they.

{{% details `Для русскоговорящих (For Russian speakers)` %}}

Меня зовут Рей (произносится "Рэй").
Я использую местоимения она/они.

{{% /details %}}

My feminine appearance entered the public beta in summer 2024, and my transition reached a pre-release state in summer 2025.
Today is the release day 😸

I had been thinking about whether transitioning was something I wanted for years before that, and I am glad I had finally gotten around to it.
Making up my mind was hard; I was never fully sure, and it was getting exhausting.
However, by mid-2025, I understood that I was not really bothered by any possible consequences.

*And I thought to myself <br>
fuck it we ball.*

This decision has made me much, much happier.
I am appreciating literally every change and rei-discovering so many things!
10/10, would do it again.


## Key events of 2025

At the time of writing, I am still processing just how many things happened in 2025.
A few things deserve more than just a line in a list, so I gave them separate sections.
There is a Table of Contents at the top of the page if you need it :)


### Event highlight: Factorio LAN party

For my birthday, my friends and I organised a Factorio LAN party that went on for three days.
More than 10 people played the game, and at the peak, there were eight simultaneous players.

We put a lot of effort into the event.
To make sure things went smoothly, we planned when people were going to come and leave, and whether they'd like to sleep over.
That allowed us to make sure there was sufficient space and food for the guests.
We also set up a wired network connection for everybody who wanted to use it.

For the game, we set some rough goals, but in general, just tried to make sure that people were not feeling lost.
We were playing with the Space Age DLC, and we got to space by the end of day three.

To make the game more fun, we wrote a [mod for Factorio][statorio] to export game stats to Prometheus.
It is based on [graftorio2][graftorio2] but has some unique statistics and bugs.
One of the unique statistics is "Area Paved" --- we all know it's not a megabase if there is no concrete.
During the game, we projected a Grafana dashboard with game stats onto the wall, and one of the guests even wrote custom CSS to give it party vibes.

I recorded a time-lapse of the game, if you'd like to see it:
- [Day 1][factorio-day1]
- [Day 2][factorio-day2]
- [Day 3][factorio-day3]

[factorio-day1]: https://www.youtube.com/watch?v=H0GILysmJxw
[factorio-day2]: https://www.youtube.com/watch?v=4cRIVcaSM20
[factorio-day3]: https://www.youtube.com/watch?v=CyJb9VveP2Y
[statorio]: https://github.com/ftvkyo/statorio
[graftorio2]: https://github.com/remijouannet/graftorio2

{{< figure src=`factorio-grafana.webp` caption=`Factorio Grafana projected onto a wall in my living room` >}}


### Event highlight: Moving

At the start of the year, I moved into a different flat, having spent three years in the last one.
I really appreciate the move, as I find the new area much more enjoyable.
A few months after I moved, I drew a [floorplan][floorplan] of the new place.

[floorplan]: /project/floorplans/#edinburgh-may-2025

Now, almost a year later, this place feels like home even more than the last place did after three years there.
I put a lot of effort into adapting to the new place and into adapting it for me.
The scope of these adjustments can grow pretty big, so I mostly focused on the following:

- Adding decorations that feel "right" and that require minimal attention
- Optimising the furniture layout, disassembling and getting rid of some of the furniture that I kept from the old flat
- Finding appropriate places to store the many little things I have (or getting rid of them)

{{< figure src=`ceiling-decorations.webp` caption=`UV-reactive stars on the ceiling, lit up by UV fairy lights` >}}

This year, I learned a lot about optimising my living and working space.
At the same time, there are a couple of things that are becoming increasingly clear to me.

First, for many reasons, I need more space.
I do a lot of things at home, so the space has to stay highly multifunctional, and that often causes conflicts between activities.
This is complicated by the fact that a lot of the furniture is "glued" in place, as there is no better place for it.
And, well, I also just want to have a guest bedroom, a guest desk, and a greater ability to reconfigure my flat.

And the other thing --- I want to have more control over the noise levels in the flat.
The biggest noise sources are the boiler, the radiators, and the fridge.
Don't get me wrong, on their own they are alright, but any source of noise can drive you mad if it's around you all day, every day.

There are many other little things that contribute to the soundscape.
Just for instance --- squeaky floors (don't get me started on how uneven they are!), coil whine from various power supplies and tech devices, fan noise, upstairs neighbours walking around or doing laundry.
My bed is also right against the wall of the stairwell, so all of the corridor sounds get nicely amplified for the optimal sleep experience.

So, having learned so much, maybe I will move again in 2026 :)


### Project highlight: Donut renderer

In the summer, I decided to develop ~~a video game~~ a rendering engine.
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

I also had fun fiddling with the geometry to implement simple impulse-based physics for 2D bodies.
I am looking forward to learning more about [Collision response][collision-response] in the future.

[collision-response]: https://en.wikipedia.org/wiki/Collision_response

I really enjoyed writing the rendering part of the engine.
Learning resources on [wgpu][wgpu] were able to answer my questions, and (to my surprise) I had a lot of fun reading through the [WebGPU Reference][wgpu-ref] and the [WebGPU Shading Language (WGSL) Reference][wgsl-ref] in my spare time.
A lot of knowledge from my past experiments with OpenGL and Vulkan translated to WebGPU quite well, too.

[wgpu-ref]: https://www.w3.org/TR/webgpu/
[wgsl-ref]: https://www.w3.org/TR/WGSL/

{{% details `More about the approach to rendering` %}}

The current renderer utilises an approach called [Deferred Shading][deferred-shading].
I really enjoyed stumbling upon it by myself once I understood what I could do with the information generated by the Visibility Polygon algorithm.
Rendering happens in three passes, where:

- The first pass draws the entirety of the level onto multiple temporary framebuffers, storing information about colour, depth, and other properties of the material for every pixel of the screen
- The second pass uses the visibility data for each light, renders it as triangles that sample the framebuffers from the previous pass, and finally renders the pixel using the Blinn lighting model
- During the second pass, blending is configured to sum all the lights per pixel, which essentially allows avoiding having a for-loop in the shader that would otherwise have to go over every light in the scene
- In the third pass, light emitters are rendered (with animations!)

[deferred-shading]: https://en.wikipedia.org/wiki/Deferred_shading

{{% /details %}}

{{% details `A bunch of videos from different stages in development` %}}

- [`2025-06-11` Phong lighting demo with pixel-art texture and normal map][donut-video1]
- [`2025-06-17` Phong lighting demo with pixel-art texture and normal map, and multiple coloured lights][donut-video2]
- [`2025-06-25` Multiple layers in a level + animated sprites that rotate + multicolour lighting][donut-video3]
- [`2025-06-27` Blinn lighting with inverse-square law distance factor][donut-video4]
- [`2025-07-04` Blinn lighting, more lights, and a level made in Tiled Map Editor][donut-video5]
- [`2025-07-12` Something isn't right... \[FLASHING LIGHTS\]][donut-video6]
- [`2025-07-19` Multicolour lights with dynamic visibility calculation (and broken physics, yes)][donut-video7]
- [`2025-07-20` Multicolour lights with dynamic visibility calculation and impulse-based physics][donut-video8]
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

{{% /details %}}


### Project highlight: Cryptodancer keyboard

At the start of the year, I felt like I wanted to improve the user experience in my interactions with digital devices.
Since I was also interested in learning how to design PCBs and wanted to manufacture a PCB without using chemicals, I decided to make another custom keyboard.
I called it Cryptodancer, inspired by the title of the game "Crypt of the NecroDancer" (there is no connection).

{{< figure src=`cryptodancer.webp` caption=`The keyboard lit up by a UV lamp` >}}

I started by deciding which components I was going to use and designing the PCB in KiCad.
I also needed to decide how I was going to manufacture it, and I decided to mill it on the CNC router that I used when working on my [last][hovert60-01] [keyboard][hovert60-02] at the Edinburgh Hacklab.

[hovert60-01]: /post/devlog-hovert60-01
[hovert60-02]: /post/devlog-hovert60-02

Once I had the design, I tried to use several [Computer-aided manufacturing (CAM)][cam] tools to generate G-code for the CNC router.
Last year, I used Autodesk Fusion for that, but these days I am more allergic to Windows and to cloud-oriented software.
For some reason, I could not get any of the CAM tools I tried to work on Linux, so naturally, I decided to implement G-code generation myself: [ftvkyo/svg2gcode][ftvkyo-svg2gcode] on GitHub.

[cam]: https://en.wikipedia.org/wiki/Computer-aided_manufacturing
[ftvkyo-svg2gcode]: https://github.com/ftvkyo/svg2gcode

{{% details `More about the G-code generator` %}}

My initial idea for the G-code generator involved implementing an entire library for doing Boolean operations on polygons --- I could not let down the brain worm that got into me at the end of 2024.
After some time, I understood that I did not have the time to implement all the hard algorithms, so I turned to using the [`geo`][geo-rs] ecosystem.
This is what the generator does:

1. Read the job config, including:
    - SVG file to use
    - Operation type: engrave, cut, drill, or bore
    - Milling bit size and shape
    - Filters, such as minimal and maximal circle radii for the drilling and boring operations
2. Read the input SVG and extract all the circles and straight lines (and straight path segments) that match the job filter. Yes, everything else is ignored.
3. Expand the stroke of the straight segments, giving them thickness and turning them into polygons. Also turn circles into polygons.
    - If cutting or engraving contours, expand ([dilate][dilation]) all polygons by a value based on the milling bit size and shape
4. Walk all segments and issue movement commands to an encoder that checks the validity of issued moves (e.g. disallowing rapid movements when the milling bit is engaged)
5. Export the resulting G-code from the encoder

[geo-rs]: https://docs.rs/geo/
[dilation]: https://en.wikipedia.org/wiki/Dilation_(morphology)

{{% /details %}}

After I had the G-code, I was able to mill the PCB as planned.
In total, I made three PCBs, iterating on some traces and milling settings.
The milling was single-sided, so I had to solder *a lot* of bridges made out of diode legs 🙈

{{< figure src=`cryptodancer-traces.webp` caption=`Traces on the third PCB` >}}

The keyboard itself is column-staggered, with the microcontroller sitting between two angled halves.
The halves are 30 keys each, in 6×5 matrices, with each half also having a linear encoder in the thumb cluster.

I implemented a ~~cursed~~ custom encoder behaviour in QMK.
I made the encoders pretend to be arrow keys or the mouse (like an Etch A Sketch!), depending on the mode.
Moreover, I added an acceleration feature to them: if they register that they are being turned faster than some threshold, they send multiple arrow key or mouse movement commands per tick.
I had a lot of fun combining that with noise from a piezo buzzer; it improved the experience of using the encoders.

I am happy with the project --- I learned a lot and got to write some interesting code.
And even though the keyboard currently does not work, it has made a big and positive impact on my life this year.

For example, it pushed me to finally move to [Colemak Mod-DH][colemak-mod-dh] (ortho version), which I use full-time now.
Even though I currently only type at 70 WPM, I really enjoy the experience, so I will keep using it (and get faster).
Using QWERTY, or even just row-staggered keyboards, has become more of a pain now, though.

[colemak-mod-dh]: https://colemakmods.github.io/mod-dh/

The keyboard has also led to me connecting with some awesome people, so that's also cool about it :)


### Project highlight: 5.1 audio system

In April 2025, through a friend from the lab, I acquired a central unit / amplifier from a [Logitech® Z906][logitech-z906] surround sound system.

[logitech-z906]: https://www.logitech.com/en-gb/shop/p/z906-surround-sound-system

{{% details `The stock composition of Logitech® Z906` %}}

- A control console
- A central unit combining the amplifier and the subwoofer
- 4× satellite speakers
- 1× central speaker
- A DE-15 extension cable to connect the control console to the central unit. It looks just like a VGA extension cable, but most of those do not actually wire some of the pins or bridge some of them.
    - Actually, this thing might be hardwired to the console; I am not sure.
- A remote

{{% /details %}}

I wanted to use that amplifier, but it could not be controlled without a console, which I did not have.
What I had was a PCB produced by that same friend that allowed me to connect an ESP32-S3 to the console port of the central unit.
The friend also provided some other resources:

- [nomis/logitech-z906][nomis-logitech-z906] on GitHub: Unofficial documentation for Logitech® Z906 Surround Sound Speakers
- [nomis/ggroohauga][nomis-ggroohauga] on GitHub: Alternative console and simulated amplifier interface for the ESP32-S3 microcontroller interacting with Logitech® Z906 Surround Sound Speakers
- [nomis/ggroohauga-pcb][nomis-ggroohauga-pcb] on GitHub: PCBs for an alternative console and simulated amplifier interface for the ESP32-S3 microcontroller interacting with Logitech® Z906 Surround Sound Speakers

[nomis-logitech-z906]: https://github.com/nomis/logitech-z906
[nomis-ggroohauga]: https://github.com/nomis/ggroohauga
[nomis-ggroohauga-pcb]: https://github.com/nomis/ggroohauga-pcb

Based on those, I wrote my own firmware for the ESP32-S3: [ftvkyo/ggroohauga-rs][ftvkyo-ggroohauga-rs] on GitHub.
I used Rust with `esp-idf-hal` and implemented the following features:

- Connecting to Wi-Fi
- Synchronising time using NTP
- Communicating with the user through MQTT, including:
    - Accepting power, volume, input, effect and speaker level commands
    - Reporting status into MQTT
    - Logging warnings and errors into MQTT
- Communicating with the central unit over serial based on user input

[ftvkyo-ggroohauga-rs]: https://github.com/ftvkyo/ggroohauga-rs

{{< figure src=`ggroohauga-output.webp` caption=`Example output from <code>ggroohauga-rs</code> over MQTT` >}}

Somewhere in-between, I acquired and connected the other speakers, completing the MVP.
There are still some hardware things to improve, and a lot of software stuff to work out.
I am looking forward to future improvements in the user experience of this system.

{{% details `About the audio pipeline` %}}

One of the software things to work on is supporting switching between playing 2-channel and 6-channel audio.
The speaker is connected to my PC over three AUX cables (each carrying two channels), and it has a bunch of channel mapping modes:

- "None" --- connect the six channels to the six speakers with no changes.
- "2.1" --- connect the two front channels to the two front speakers and auto-generate the subwoofer output. Ignores the other four input channels.
- "4.1" --- like "2.1", but also copy the two front channels to the two rear channels. Ignores the other four input channels.
- "3D" --- connect the two front channels to the two front speakers and auto-generate the outputs of the subwoofer and the central and rear speakers. Ignores the other four input channels.

In an ideal world, you would use "None" for playing audio mastered for six channels, and "3D" for creating a "surround" effect for the more common 2-channel content.
Unfortunately, it turns out that the "3D" mode has a big issue.
Specifically, certain bass-heavy or distortion-heavy tracks make the rear speakers crackle, sound corrupted, or compressed.
I enjoyed the surround experience otherwise, so I figured out how to upmix 2-channel audio into six channels in software on my PC.

To do the upmixing, I used [CamillaDSP][camilladsp], which another lab friend had recommended.
First, I created a virtual 2-channel PulseAudio Sink using PipeWire, and then made CamillaDSP listen to that sink, process the sound, and output it into the 6-channel ALSA device.
I uploaded my config as a GitHub [gist][camilladsp-config].

[camilladsp]: https://henquist.github.io/
[camilladsp-config]: https://gist.github.com/ftvkyo/547e9780e4e8dcc566586245a947a27d

Unfortunately, as I understand it, outputting through ALSA rather than PulseAudio means that other applications cannot output to that device at the same time.
I would use PulseAudio, but for some reason the overwhelming majority of my attempts generated chopped-up sound, sometimes just silence, and it could get fixed and broken again by simple program restarts, with no configuration changes.

{{% /details %}}


### Other events and projects

I organised an "OpenSCAD for Beginners" workshop at [Edinburgh Hacklab][ehlab].
You can find the slides on GitHub: [ftvkyo/openscad-workshop][openscad-workshop].
A few of my colleagues came to Edinburgh for the workshop, and I was very happy to see them.

[ehlab]: https://ehlab.uk
[openscad-workshop]: https://github.com/ftvkyo/openscad-workshop

I did a lot of 3D-designing and 3D-printing and levelled up my OpenSCAD [incantations][openscad-project] (with a particular focus on curves).
The culmination of my OpenSCAD journey of 2025 is a set of Cherry MX-compatible keycaps.
Their shell is generated by interpolating between differently positioned [squircles][squircle].
Most offsets and sizes are configurable, and interpolation is controlled by an assortment of easing functions.

[openscad-project]: /project/openscad-snippets
[squircle]: https://en.wikipedia.org/wiki/Squircle

I printed the keycaps out of PLA on my Ender 3V3 SE with a 0.25 mm nozzle and 0.075 mm layer height.
The source is here: [`keycaps/mx_v4.scad` in ftvkyo/openscad][openscad-github-keycaps] on GitHub.

[openscad-github-keycaps]: https://github.com/ftvkyo/openscad/blob/c0453a97fc9e411927f052d8f1508e8f7e086389/src/keycaps/mx_v4.scad

{{< figure src=`openscad-keycaps.webp` caption=`Keycaps in question.` >}}

I also did a bunch of things with my IKEA Ivar shelves.
My friend and I painted one double unit, and I used the other double unit to make ~~a giraffe~~ a projector stand, a steering wheel rig, and a few other small things.

I went to 20 [parkruns][parkrun] and organised a bunch of boardgame, video game, and movie-watching events.
I did a bunch of drawing, some leatherwork, and many more various little things!

[parkrun]: https://www.parkrun.org.uk/


### Travel and holidays

My friends and I rented a narrowboat and travelled on it from Falkirk to Winchburgh Marina and back over four days.
That was a very fun adventure that included going through the [Falkirk Wheel][falkirk-wheel] twice, finding a sheep skull, exploring multiple towns, rescuing a drowned drone, and even ordering a taxi by calling their dispatch centre!

[falkirk-wheel]: https://en.wikipedia.org/wiki/Falkirk_Wheel

{{< figure src=`narrowboat.webp` caption=`View from the narrowboat` >}}

I went to London twice, for a total of 13 days.
I saw [Yoasobi][yoasobi] at [Wembley Arena][wembley-arena], went to the [Thames Traditional Boat Festival][ttbf] in [Henley-on-Thames][henley-on-thames], and rode on the (miniature) [Great Cockcrow Railway][cockcrow-railway].

[yoasobi]: https://en.wikipedia.org/wiki/Yoasobi
[wembley-arena]: https://en.wikipedia.org/wiki/Wembley_Arena
[ttbf]: https://tradboatfestival.com/
[henley-on-thames]: https://en.wikipedia.org/wiki/Henley-on-Thames
[cockcrow-railway]: https://en.wikipedia.org/wiki/Great_Cockcrow_Railway

{{< figure src=`cockcrow.webp` caption=`At the Great Cockcrow Railway` >}}

The second trip to London was also the first time I travelled truly by myself.
I stayed in a hostel and did a lot of walking, coding, and writing in between hanging out with friends.

I saw my childhood friend in Sheffield before she left the country.
I explored Liverpool and went to a [Pendulum][pendulum] set there.

[pendulum]: https://en.wikipedia.org/wiki/Pendulum_(drum_and_bass_band)


### Work stuff

Work life has also been eventful.
I went on two work trips over ten days in total, both for productivity and social purposes.
I got to meet most of my colleagues in person; it was wonderful, and I am looking forward to future gatherings.

Our product, [SCALE][work-scale], received a lot of updates and went from `v1.2.0` to `v1.5.0`.
I wrote a [post about using SCALE to build and run GOMC][work-gomc-post].
The company, [Spectral Compute][spectral-compute], raised $6 million, appeared at multiple conferences, and even got featured in [Business Insider][work-business-insider]!

[work-scale]: https://scale-lang.com
[work-gomc-post]: https://scale-lang.com/posts/2025-06-16-GOMC
[spectral-compute]: https://spectralcompute.com/
[work-business-insider]: https://www.businessinsider.com/spectral-compute-funding-pitch-deck-nvidia-cuda-2025-11

I am proud to be a part of it all!


## Reflection

Just like last year, this post is a good opportunity for reflection.
In the [last post][2024-in-review], I openly wrote about ADHD, depression, burnout, and anxiety.
First, I will give an update on how that's going, and then I'll look into a few other things.


### Anxiety sucks!

**CONTENT WARNING: Self-doubt.**

Can you guess what thoughts I've experienced while writing this year's post?!
Let me try to summarise:

- "People are going to judge me"
- "Openly writing about yourself on the internet is cringe"
- "I am rambling too much and wasting people's time"
- "I am making myself vulnerable to an unknown audience and I will regret that"
- "I am looking for attention and validation for my inflated ego"
- "I spend too much time \"having fun\" and not enough time doing \"useful work\""
- "My friends don't *actually* want to read this"

Thankfully, regardless of how true those are, I have plenty of counterarguments that make this all worthwhile:

- My openness about mental health has helped other people deal with similar problems;
- My posts and projects have inspired people both at Edinburgh Hacklab and at work;
- When I discuss my output with my colleagues, they tell me that I am useful, and they recognise my strengths and weaknesses;
- If a friend decided to write something quite this personal, I would love to read it to understand and support them better;
- I have too many friends to think that none of them would want to read this;
- This post has a Table of Contents and a decent structure, so I know that people can skip the bits they might not want to read.

I am also writing this post *in spite of being anxious*.
Yes, it is scary to talk about mental health.
It is scary to talk about my transition.
But I do not think it should be scary.
I do not want to let these fears linger, so that's why I do it!
Paradoxically, showing my vulnerability makes me feel safer.


### I am making progress

To my surprise, I feel like my depression has improved, even though I have not been diligent with antidepressants.
I think it is the consequence of my life changing drastically due to being a part of Edinburgh Hacklab, interacting with lots of wonderful people, and doing so many cool things throughout the year.

My burnout does not have that "hopelessness" flavour to it anymore, although I still feel demotivated about many things.
Most of the time, I still feel like there is too much that demands my attention.
Juggling work, hobbies, relationships with people, adequate rest, life admin, touching grass, food intake, self-care, laundry, cleaning, sleep---it is a lot.

However, I feel like I have been making a lot of progress.
I got quite a bit better at juggling the needs and the joys, but there is still room for improving my "organised chaos".
I also think that the amount of stuff I have done in 2025 is a bit scary.
Almost as if I have been speedrunning being happy 😅

At the moment, I feel like anxiety is the number one contributor to my life challenges.
The symptoms of [Generalised Anxiety Disorder (GAD)][gad] seem to be quite relevant.
So, at the moment, I am working in that direction.

[gad]: https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder-gad/

A few other things that I want to work on are:

- Finding rituals and routines for starting and doing specific things, such as a ritual for getting into the working mood or a general routine for cleaning the flat
- Reducing factors that prevent me from being productive "impulsively" (I suspect that I do my best work when I let myself loose)
- Rethinking my innate desire to be in control of my life (which I think is justified considering my journey), how it affects my day-to-day existence and the people around me


### Rei-connection

**CONTENT WARNING: Emotions, childhood trauma.**

There is a song by Madilyn Mei called "What's Going On?!" that captures my current vibe quite well.
The full lyrics are [available on Genius][genius-whats-going-on], but here is how it starts:

*I am an alien <br>
My rocketship is human bone and skin <br>
I'm something smaller <br>
Staring out the skull <br>
With a panel of wire <br>
And buttons I don't understand <br>
Spamming every one of them <br>
So does being human mean <br>
Pretending to know what's going on?*

[genius-whats-going-on]: https://genius.com/Madilyn-mei-whats-going-on-lyrics

I have lived in many different environments --- first, nine years in six different schools, two years in a vocational school, two years in and around university, then I left Russia and spent two years between the Philippines and Hong Kong, and finally, four years in Edinburgh.
Naturally, I have been exposed to many different life situations from different sides.

That experience ended up being a double-edged sword for me.
It helped me navigate my life and sometimes allowed me to give spot-on advice to others.
But it combined poorly with some difficulties I had with handling my emotions that I carried over from my childhood.

Back in my childhood, I was somewhat of a menace.
People seemed to really like some parts of me, and really dislike some other parts.
Unfortunately, I did not have fine-grained control over that, nor an understanding of what was wrong with me.
So, at some point, I started suppressing my emotions in favour of [intellectualization][intellectualization].

[intellectualization]: https://en.wikipedia.org/wiki/Intellectualization

I learned to justify the behaviour of others instead of getting angry at them.
I do not know when was the last time I was genuinely angry at somebody.
Where most people get angry, I usually think, "I understand how it happened, I understand how you got there," and simply feel sad that life has gone this way.
It's as if I just do not see the point, as if the anger feels counter-productive as a whole.

I learned not to cry.
Crying in front of other people felt like I was affecting their judgement.
I concluded that such behaviour must be equal to emotional manipulation, and that was not something I wanted to do.
There were also some conflicts in which crying worked as a "reset" point that would calm things down for the time being, only for them to come up again later.

Crying by myself felt counter-productive too.
I cried a bunch while I was stuck alone in a hotel room in the Philippines for half a year during COVID-19, and I burned out on that because I felt like there was nothing I could do.

The detachment from emotions also creates a multitude of more subtle issues.
For instance, I struggle to understand how I feel about various things.
I find it quite frustrating.

There is probably more to this all, but I think I captured the overall state of my being quite well.
The bad news is that this affects me and people around me to this day.
The good news is that I seem to be aware of this, as aware as ever, and I am working on reconnecting with my emotions.

I have been somewhat aware of these issues for a long time now, but just like my anxiety issues, they became much more apparent once I acquired close friends again.
Thankfully, my outlook on this is very positive:

- I have a lot of wonderful friends who support me and who can give me the necessary feedback and advice
- My friends appreciate the silly side of me, and for the most part, I feel comfortable unmasking and bringing up my concerns
- Transitioning is helping me a lot with reconnecting with my emotions too


## Goals

At the end of 2024, I set [a bunch of goals for 2025][goals-for-2025].
I did not get them all to 100% completion, but I think that's fine.
I am quite happy with how 2025 turned out, so I won't go over those goals individually.

[goals-for-2025]: /post/2024-in-review/#what-i-want-from-2025

In 2026, my "functional" goals are:

- Keep doing my best at treating others with respect and kindness, even in challenging situations
- Keep strengthening my friendships
- Work on my mental health issues, anxiety and emotions in particular
- Remember to pay attention to my physical health
- Make consistent progress in work, projects, and learning
- Find ways to make my day-to-day life less stressful
- Take adequate rest both short- and long-term
- Consider moving again

Some of my "fun" goals for 2026 are:

- Keep doing artistic stuff and inspiring people
- Set up a proper home network & a VPN with a local DNS and a Network-Accessible Storage (NAS)
- Self-host [Immich][immich], move my photos there, and hopefully get back into photography
- Make a return to [Emacs][emacs]
- Maybe pick up [Nix][nix]
- Play Factorio. I haven't played much since the August LAN party.
- Finish Hollow Knight: Silksong. I haven't played for a while as I am stuck on *the gauntlet*. If you know, you know.
- Bite people (consensually)
- Be myself

[immich]: https://immich.app/
[emacs]: https://www.gnu.org/software/emacs/
[nix]: https://nixos.org/


## Thank you

Just like last year, people are one of the things that made 2025 so great.
I want to thank all the people who provided support, advice, listened to me, and simply existed.

Thank you, Mom, Alla, and Oleg.

Thank you
Ariadne,
Artem,
Ashley,
Blake,
Callen,
Chris,
Cicely & Colin,
Dan F,
Dylan,
Emily K,
Eugene & Maria,
François,
Giulio,
Gregor,
Ilya & Maria,
Ivan,
Jared,
Jon,
Julia,
Justine,
Lamis,
Mary & Max,
Matthew,
Matt & Mel,
Michael,
Miron,
Natalia K,
Nicholas,
Nina,
River,
Rocket,
Ross,
Sam,
Sapphire,
Sean,
Simon,
Solomon,
Sophia,
Taylor,
Vanessa,
Vera,
Yara,
Yasha.

Thank you, fellow Spectral Compute colleagues and Edinburgh Hacklab members.

You made my year.
Best wishes for 2026!
