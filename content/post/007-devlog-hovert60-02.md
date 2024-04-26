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
Prototyping something with a laser cutter would also be easier than with a CNC router.
So I started by drawing a test pattern to find what size of the holes I should use.

{{< figure src=`/img/007/test-holes.svg` caption=`Holes of different sizes to check laser cutter tolerance. For actual testing, line thickness should be set to "hairline", but I changed it here for better visibility.` >}}

However, as I was about to perform the test, I learned that with the thickness of the plate I wanted, neither wood or acrylic would be reliable options.
I could opt-in for a thicker plate and give up the idea of making the key switches click in place, but at that moment, the idea of making the front plate out of metal using a CNC router took over.


## Going with metal

So, I decided to use metal.
As I mentioned in the previous post, my metal of choice is brass.
However, I still bought a few sheets of acrylic (3mm thick) and two plates of 6061 aluminium (1.5mm thick) for testing.

At this point, the front plate stopped being 2D.
On a laser cutter, the depth of the cut is controlled by changing the speed with which the laser moves.
On a CNC router, the milling bit moves on 3 axes.
As I also want the switches to snap into their holes, some cutting movements don't reach through the <span title="The piece of material to be cut">stock</span>.

It was time to learn a new tool: [Autodesk Fusion][fusion].

[fusion]: https://www.autodesk.co.uk/products/fusion-360/overview


### Picking up Autodesk Fusion

For a few first minutes, the program was a bit confusing.
I intend to make 3D models, are 2D sketches really the way to go?
Why isn't it something like [Blender][blender]?
However, after watching a random tutorial, things started making more sense.
With sketches, it's easy to define sizes and constraints for different features.

[blender]: https://www.blender.org/


{{% details "Terminology used" %}}

Please note that these definitions are contextual and may be incomplete.


#### Plane

Plane is a flat surface that extends indefinitely.

There are three "main" planes: XY, XZ and YZ.
They intersect with the origin and contain the corresponding axes.

Planes can be based on various surfaces of the model designed.


#### Sketch

Sketch is a 2-dimensional drawing.
Each sketch is made on some plane.

When a sketch is finished, various commands like "Extrude" can reference its features.

To work well, sketches should be "fully constrained".
When making a sketch, the user can generally do two things:
- Draw various points, lines and shapes
- Specify constraints between drawn things

Some examples of constraints are:
- Length of a line (you can see lots of these in the next illustration)
- Distance between lines or between a line and a point
- Lines being parallel or perpendicular
- Lines and points being incident
- Lines being tangential to curves

The program accumulates this data and tries to figure out how to place all the parts of the drawing in a way that complies with the constraints.
When there is enough information for the program to resolve all uncertainities, the sketch is considered to be "fully constrained".


#### "Extrude" command

"Extrude" is the primary command that allows turning 2D sketches into 3D shapes.
In the most general case, it allows specifying thickness to be used for selected areas of an existing sketch.
It can also be used to cut *into* the model.

{{% /details %}}


I started by creating a flat piece of material of random width and length and known thickness.
I then sketched square holes for the keys on the surface of that piece.

{{< figure src=`/img/007/v4-sketch.webp` caption=`Sketching the holes for the bottom row of keys` >}}

After I had the sketch for holes, I was able to use the Extrude command to cut them out of the existing plate.
Then, by using a Rectangular pattern command, I repeated the cutting operation 4 times on the Y axis using some offset.

{{< figure src=`/img/007/v4-cutout-pattern.webp` caption=`Repeating cutouts along the Y axis` >}}


### It just makes sense

At this point I found out that I can actually specify some variables to be reused when settings constraints and configuring various commands.
This greatly sped up the development process.
I could adjust dimensions in multiple places at the same time.

On top of that, formulas for these variables can contain mentions of other variables!
This way I could give names to common values that depended on other values.

One of such values is the area that is occupied by a key.
It consists of the size of the cutout together with some margin around it.
It is called `keyspace` in the next illustration.

{{< figure src=`/img/007/v9-parameters.webp` caption=`Discovering parameters` >}}

After I got the first batch of parameters specified, I redefined my sketch in terms of them.
Dimensions that are prefixed with `fx:` in the next screenshot are those that use parameters (so, all of them).

{{< figure src=`/img/007/v9-parametrised-sketch.webp` caption=`Using parameters in a sketch` >}}

As you can see, I decided to design a single row of the keyboard, and then duplicate these rows.
To be fair, it might have worked better if I learned more advanced pattern techniques, such as making patterns of a sketch.
But it still worked fine.

In the following picture you can see the design that I came to after doing all these things with parameters.
There you can also see that columns 4, 5 and 6 are one key taller.
This was the initial version of a thumb cluster -- a group of keys that are meant to be pressed with the thumb.

{{< figure src=`/img/007/v11-thumb-attempt.webp` caption=`Trying to design the thumb cluster` >}}

When I arrived to this complex shape, I realized that I don't like the approach of "cut out the holes in a predefined plate" I have been using.
If I wanted to continue, I would need to define parameters that would define the initial dimensions of the plate.
And I would also need to do a lot of "cutting" work to strip down the excess pieces of the plate.

It would get even worse if I wanted to design a more advanced thumb cluster.
I would have to use even more complex calculations to determine the initial size of the plate, or I'd have to do intermediate Extrusions to stretch out the plate and make space for more keys.

I didn't want to deal with any of that, so I decided to try an alternative approach.


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
