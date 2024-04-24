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

...


## Where do I even begin?

### What's the shape of my hand?

{{< figure src=`/img/007/hand-adjusted.svg` caption=`Tracing a hand in various positions` >}}


### Can I use a laser cutter?

{{< figure src=`/img/007/test-holes.svg` caption=`Holes to check laser cutter tolerance` >}}


## Going with metal

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
