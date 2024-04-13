---
title: "Hovert60 keyboard devlog #2: Design"
date: 2024-04-12T22:00:00Z
tags: [Devlog, Hovert60 keyboard, IRL]
description: >
  What shape should my keyboard have?
  How do I avoid making expensive mistakes?
draft: true
---

{{< toc >}}


## Overview

...


## Where do I even begin?

### What's the shape of my hand?

{{< figure "/img/007/hand-adjusted.svg" "Tracing a hand in various positions" >}}


### Can I use a laser cutter?

{{< figure "/img/007/test-holes.svg" "Holes to check laser cutter tolerance" >}}


## Going with metal

### Picking up Autodesk Fusion

{{< figure "/img/007/v4-sketch.webp" "Sketching holes of the bottom row" >}}

{{< figure "/img/007/v4-cutout-pattern.webp" "Repeating cutouts along the Y axis" >}}


### It just makes sense

{{< figure "/img/007/v9-parameters.webp" "Discovering parameters" >}}

{{< figure "/img/007/v9-parametrised-sketch.webp" "Using parameters in a sketch" >}}

{{< figure "/img/007/v11-thumb-attempt.webp" "Trying to design the thumb cluster" >}}


### Additive design approach

{{< figure "/img/007/v15-additive.webp" `Rather than cutting holes in a plate, extrude just the key "margins" of a single row and repeat that` >}}


### Taking inspiration

{{< figure "/img/007/v15-bent-thumb-cluster.webp" "Designing a curved thumb cluster" >}}


### Approaching the finish line

#### Adding other parts

To estimate what the final assembly would look like

{{< figure "/img/007/v20-filled-and-with-mc-board.webp" "Adding a microcontroller breadboard to see how it would look" >}}

{{< figure "/img/007/v23-bottom-plate-and-battery.webp" "Adding a bottom plate and a battery to see how they fit" >}}


#### Projecting the bottom plate

{{< figure "/img/007/v29-bottom-sketch.webp" "Making fillets on the bottom plate based on projections of other parts" >}}


#### Feature showcase

{{< figure "/img/007/v29-top.webp" `Top view of the "almost final" version` >}}

{{< figure "/img/007/v29-thumb-dimensions.webp" "Dimensions of the thumb cluster" >}}

{{< figure "/img/007/v29-lock-notches.webp" "Notches for the key switches to lock in (bottom side of the top plate)" >}}

{{< figure "/img/007/v29-parameters.webp" `Parameters used in the "almost final" version` >}}


## Test component

{{< figure "/img/007/v29-test-plate.webp" "A smaller 3×3 test model to reduce waste during prototyping" >}}

{{< figure "/img/007/v29-test-plate-simulated.webp" "Simulation of cutting the test model" >}}


## Remaining uncertainties

### How do I achieve good precision?

...


### Where do I put screw holes?

- not too fragile
- not too stiff

{{< figure "/img/007/v29-screw-hole-plan.webp" "Sketch used for positioning screw holes" >}}


### How do I make it rigid?

- How do I make sure the top plate does not slide relative to the bottom plate?

...
