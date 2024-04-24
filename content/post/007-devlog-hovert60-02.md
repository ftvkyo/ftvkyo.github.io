---
title: "Hovert60 keyboard devlog #2: Design"
date: 2024-04-12T22:00:00Z
tags: [Devlog, Hovert60 keyboard]
toc: true
aliases:
- "007"
description: >
  What shape should my keyboard have?
  How do I avoid making expensive mistakes?
draft: true
---


## Overview

In the [previous post](/post/006) -- on the topic, I introcuded my new project: making a personalized mechanical keyboard from scratch.
I described my criteria for the end result and showed you the components I intend to use.

This post is focused on the design aspect of the project.
The posts are sequential, but in reality they go hand-in-hand.
The design influences which components can be used.
Availability, price and properties of the components influence the design.

This interconnection extends past the "preparation" and "design" stages.
In reality, I am in the beginning of the "manufacture" stage now and I still have to make purchases and revisit the design.

This post will cover these stages:

1. Finding inspiration and collecting data
2. Figuring out how to manufacture the parts
3. Learning-by-doing using Autodesk Fusion
4. Iterating on the design until I'm happy
5. Resolving remaining uncertainties


## Where do I even begin?

### What's the shape of my hand?

In the previous post I mentioned a tool called [Cosmos][cosmos].
There is also a type of keyboard called [Dactyl][dactyl].
Both of these things have a common theme: they are made for tweaking, personalization.
So I thought, why don't I try to do the same?

[cosmos]: https://ryanis.cool/cosmos/
[dactyl]: https://github.com/adereth/dactyl-keyboard

I drew some dots on the joints of my hand (and a few extra ones).
Then I put a ruler on a wall and took some photos of my hand next to the ruler.
To decrease the influence of perspective on the resulting image, I took the photos from afar with high level of zoom.

After I had the photos of various positions of my hand (relaxed, flat, stretched, contracted), I traced the dots I drew into hand shapes and made an SVG with all that stuff.
Thanks to the ruler in the photos, I was able to scale the results quite precisely.

Some fiddling with it later, I tried to estimate the paths that my fingertips should follow when moving.
When I saw the paths, I understood that I don't want to use this approach anymore.
Maybe next time.

{{< figure src=`/img/007/hand-adjusted.svg` caption=`An example of a hand traced in various positions. Thick grey lines represent favoured fingertip movement paths.` >}}


### Can I use a laser cutter?

At first I was considering using a sheet of wood or acrylic for the top plate of the keyboard.
Prototyping something with a laser cutter would also be easier than on a CNC router.
So I started by drawing a test pattern to find what size of the holes I should use.

{{< figure src=`/img/007/test-holes.svg` caption=`Holes of different sizes to check laser cutter tolerance. For actual testing, line thickness should be set to "hairline", but I changed it here for better visibility.` >}}

However, as I was about to perform the test, I learned that with the thickness I wanted, neither wood or acrylic would be reliable options.
I could opt-in for a thicker plate and give up the idea of making the key switches click in place, but at that moment, the idea of making the front plate out of metal using a CNC router took over.


## Going with metal

So, I decided to use metal.
As I mentioned in the previous post, my metal of choice is Brass.
However, I still bought some `3mm`-thick sheets of Acrylic and two `1.5mm`-thick plates of 6061 Aluminium for testing.

At this point, the front plate stopped being 2D.
On a laser cutter, you control depth of the cut by changing the speed with which the laser moves.
On a CNC router, you need to care about 3-axial movement of the milling bit.
Additionally, I want my front plate to have features that would not cut fully cut through the stock.

It was time to learn a new tool: Autodesk Fusion.


### Picking up Autodesk Fusion

{{< figure src=`/img/007/v4-sketch.webp` caption=`Sketching holes of the bottom row` >}}

{{< figure src=`/img/007/v4-cutout-pattern.webp` caption=`Repeating cutouts along the Y axis` >}}


### It just makes sense

{{< figure src=`/img/007/v9-parameters.webp` caption=`Discovering parameters` >}}

{{< figure src=`/img/007/v9-parametrised-sketch.webp` caption=`Using parameters in a sketch` >}}

{{< figure src=`/img/007/v11-thumb-attempt.webp` caption=`Trying to design the thumb cluster` >}}


### Additive design approach

{{< figure src=`/img/007/v15-additive.webp` caption=`Rather than cutting holes in a plate, extrude just the key "margins" of a single row and repeat that` >}}


### Taking inspiration

{{< figure src=`/img/007/v15-bent-thumb-cluster.webp` caption=`Designing a curved thumb cluster` >}}


### Approaching the finish line

#### Adding other parts

To estimate what the final assembly would look like

{{< figure src=`/img/007/v20-filled-and-with-mc-board.webp` caption=`Adding a microcontroller breadboard to see how it would look` >}}

{{< figure src=`/img/007/v23-bottom-plate-and-battery.webp` caption=`Adding a bottom plate and a battery to see how they fit` >}}


#### Projecting the bottom plate

{{< figure src=`/img/007/v29-bottom-sketch.webp` caption=`Making fillets on the bottom plate based on projections of other parts` >}}


#### Feature showcase

{{< figure src=`/img/007/v29-top.webp` caption=`Top view of the "almost final" version` >}}

{{< figure src=`/img/007/v29-thumb-dimensions.webp` caption=`Dimensions of the thumb cluster` >}}

{{< figure src=`/img/007/v29-lock-notches.webp` caption=`Notches for the key switches to lock in (bottom side of the top plate)` >}}

{{< figure src=`/img/007/v29-parameters.webp` caption=`Parameters used in the "almost final" version` >}}


## Test component

{{< figure src=`/img/007/v29-test-plate.webp` caption=`A smaller 3×3 test model to reduce waste during prototyping` >}}

{{< figure src=`/img/007/v29-test-plate-simulated.webp` caption=`Simulation of cutting the test model` >}}


## Remaining uncertainties

### How do I achieve good precision?

...


### Where do I put screw holes?

- not too fragile
- not too stiff

{{< figure src=`/img/007/v29-screw-hole-plan.webp` caption=`Sketch used for positioning screw holes` >}}


### How do I make it rigid?

- How do I make sure the top plate does not slide relative to the bottom plate?

...
