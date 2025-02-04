---
title: "Tekutonu"
toc: true
description: >
    Voxel engine. Uses Rust and the `vulkano` library.
---

- GitHub repository: [ftvkyo/tekutonu](https://github.com/ftvkyo/tekutonu)
- Work started: *Oct 14, 2022*
- Work stopped: *Nov 20, 2022*
- Timespan: 38 days, *17* of them have commits

{{< skills "Rust, Vulkan (vulkano.rs)" >}}

It is not the first time I tried to build a voxel engine.
This time, the primary objective of the project was to learn the basics of Vulkan.

The development process went okay for the time.
The endeavour coincides with me writing [a post about self-organisation](/post/my-time-and-focus-01/).
While working on the project, I journaled some notes about it, and wrote down some ideas (I may or may not convert them into posts later).
However, my task tracking and planning was rudimentary.

I would say that the experience I got working on this was one of the important drivers for improving my skills of getting things done and ultimately building [Obsidian ftvkyo](/project/obsidian-ftvkyo/).
Not that I am stopping there, though.


## Achievements

In terms of features, Tekutonu has:
- Camera movement
    - Changing the position on 3 axis using WASDRF keys
    - Speeding up the movement when Shift is held
- Camera orientation
    - Uses polar coordinates (Pitch & Yaw) that nicely map to X and Y axis of the mouse movement, which is the typical approach
- Rendering a chunk of cubes
    - With textures
    - Constant light
    - Block light sources
    - Sky light (gets blocked by overhangs)

Technical details are complicated.
In hopes of keeping things isolated from each other, there is the "classic" [MVC](https://en.wikipedia.org/wiki/Model–view–controller) involved, which separates game data, user input and rendering.
However, the Model and the View are quite complicated anyway.

Specifically, the Model is a structure that has multiple "layers" to it.
There are chunks that have blocks in them, but there were also plans to have regions that would have said chunks in them.
As the Model grows, it gets more complicated and requires better abstractions to prevent spaghetty getting unbearable.

An example would be how lighting calculation is implemented now.
If I planned to continue working on the project, I would likely need to think not of the optimal solution for it, but at least of something that would be easy to replace.
Then there could be more complicated things, such as implementing [culling](https://en.wikipedia.org/wiki/Hidden-surface_determination) for things that should not be sent to the GPU.

Either way, the Model is not actually the worst part.
The sheer amount of code that is required to draw things on screen using Vulkan makes the View pretty... intense, even if all the individual parts make sense.
It's always been interesting for me to experiment with low-level stuff, but it's very hard to balance it with *actually making features*.

Not that I will stop tinkering.
I just think this experience taught me a lesson in task management --- I should only do it *if I set it as one of the goals*, take into account the extra effort it will require and how it will affect approaching other goals.
So I don't get upset later.


### Screenshots

The following is a picture with some floating cubes.
There is an invisible light source somewhere there.
I think.

{{< figure src=`main.webp` caption=`Cubes floating in space` >}}


The following is an illustration of sky lighting.
The overhang in the top-left corner of the picture blocks the light from the sky.
The light level decreases "by 1" for each of the blocks it travels from the edge of the overhang.

{{< figure src=`lighting.webp` caption=`Cubes are shaded by their exposure to the sky light` >}}


## Lessons learned

- It's not good to try to abstract too early, but it's also not good to build everything "in place".
  I think I got a decent balance of that when working on this project, though.
    - Poor abstractions won't save me from spaghetti code, and then when I try to refactor something, I'll see that I have to touch the code everywhere anyway.
    - I frequently come back and tweak stuff either when I get distracted with something like "new shiny type constraints I can impose" or "better choice of class names".
      This often becomes a very tedious process.
      For this, setting clearer goals, tasks, paying some attention to design beforehand, working in iterations, and not diving head first into refactors can be helpful.
- Not a new thing, but still, despite the difficulties, I think tinkering with low-level stuff can be interesting, and the acquired knowledge can be useful if said tinkering is done right.
- As I mentioned, work on this served as an inspiration for further development of my organisational skills, [Obsidian ftvkyo](/project/obsidian-ftvkyo/) describes the background.
  The main improvement is probably my advancements in how I track and schedule tasks for my project work, because that's something that was lacking at the time.
- It feels like it would be hard for me to return to the project because it would require an annoyingly high involvement with the necessary Vulkan-related code.
    - It might be interesting to build games with something like [`bevy`](https://bevyengine.org) though.
