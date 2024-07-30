---
title: "Procedural generation of organic shapes using Bézier curves"
date: 2024-07-13T22:00:00Z
tags: [3D-printing, Procedural generation, Maths]
toc: true
aliases:
- "009"
description: >
  OpenSCAD for the win!
  Even if it means I should implement Bézier curves from scratch.
draft: true
---

Some time ago I got this idea to make some "organic" models for 3D-printing.
It's something that you woulnd't want to do using Autodesk Fusion, which I used for [Hovert60 keyboard][hovert60] development.
I also didn't want to boot into Windows to use Fusion every time 😅

[hovert60]: /tags/hovert60-keyboard/


## What is OpenSCAD?

OpenSCAD is a program that allows modeling complex solid objects by combining simpler objects in various ways.
It supports things like:

- Creating primitive [polygons][polygon] like squares and other regular polygons (approximations of circles)
- Creating arbitrary polygons from a set of points
- Creating primitive [polyhedra][polyhedron] like cubes, prisms (approximations of cylinders), [UV spheres][uv-sphere]
- Creating arbitraty polyhedra from a set of triangles
- [Affine transformations][affine-transformation] of polygons and polyhedra
  - Rotation
  - Translation
  - Scaling
  - Mirroring
  - Arbitraty transformations using a matrix
- Boolean operations [on polygons][boolean-polygons] and on polyhedra
  - Union
  - Intersection
  - Difference
- [Convex hull][convex-hull] calculation for polygons and polyhedra
- [Minkowski addition][minkowski] of polygons and polyhedra
- Offsetting a polygon's outline
- Extrusion of 2D shapes into 3D shapes with linear or rotational movement

[polygon]: https://en.wikipedia.org/wiki/Polygon
[polyhedron]: https://en.wikipedia.org/wiki/Polyhedron
[affine-transformation]: https://en.wikipedia.org/wiki/Affine_transformation
[uv-sphere]: https://en.wikipedia.org/wiki/UV_mapping
[boolean-polygons]: https://en.wikipedia.org/wiki/Boolean_operations_on_polygons
[convex-hull]: https://en.wikipedia.org/wiki/Convex_hull
[minkowski]: https://en.wikipedia.org/wiki/Minkowski_addition


## Theory


### Basics

{{< figure src=`/img/009/vectors.svg` caption=`` >}}
{{< figure src=`/img/009/lerp.svg` caption=`` >}}


### Quadratic Bézier curves

{{< figure src=`/img/009/bezier-quadratic-1.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-quadratic-2.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-quadratic-3.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-quadratic-4.svg` caption=`` >}}


### Cubic Bézier curves

{{< figure src=`/img/009/bezier-cubic-1.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-cubic-2.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-cubic-3.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-cubic-4.svg` caption=`` >}}
{{< figure src=`/img/009/bezier-cubic-5.svg` caption=`` >}}


### Derivative of a Bézier curve


{{< figure src=`/img/009/bezier-derivative.svg` caption=`` >}}


### Stroke expansion

{{< figure src=`/img/009/stroke-expansion-1.svg` caption=`` >}}
{{< figure src=`/img/009/stroke-expansion-2.svg` caption=`` >}}
{{< figure src=`/img/009/stroke-expansion-3.svg` caption=`` >}}
{{< figure src=`/img/009/stroke-expansion-4.svg` caption=`` >}}


## Practice

{{< figure src=`/img/009/openscad-curves.webp` caption=`` >}}

{{< figure src=`/img/009/openscad-original-stem.webp` caption=`` >}}
{{< figure src=`/img/009/openscad-original-barbs.webp` caption=`` >}}
{{< figure src=`/img/009/openscad-original-assembly.webp` caption=`` >}}

{{< figure src=`/img/009/openscad-new-stem.webp` caption=`` >}}
{{< figure src=`/img/009/openscad-new-barbs.webp` caption=`` >}}
{{< figure src=`/img/009/openscad-new-barbs-control.webp` caption=`` >}}
{{< figure src=`/img/009/openscad-new-assembly.webp` caption=`` >}}


## Results

...


## Bonus

{{< figure src=`/img/009/blender.webp` caption=`Print-in-place mail made in Blender using an Array Modifier applied to an expanded NURBS curve, and flattened with a Boolean Modifier for better bed adhesion` >}}


{{% details "Why didn't I use Blender?" %}}

I considered using Blender.
However, Blender is huge, and learning it would be a great effort.
Additionally, I expected it to be subpar with regards to version control of the models and precise changes to them.
Not that those things would be impossible, but they would require even more involvement.

I could, maybe, write scripts for Blender using its Python API.
It would solve both problems -- I would be able to store the code in Git, and I would be able to calculate values for precise changes right in Python. [^blender-api]

[^blender-api]: If you are interested, there is a brilliant answer on StackOverflow about this: [diff and version manage blender work -- answer by Brent Baccala](https://blender.stackexchange.com/a/9155).
  It may also tease your curiosity, as it uses a cool approach to launch the script called "[Multiline shebang](https://rosettacode.org/wiki/Multiline_shebang)".

However, this would still mean I'd have to learn Blender.

{{% /details %}}



{{% details "Why didn't I write some G-code by hand?" %}}

At this point, I realised I want to print some "hair".
To achieve that, I decided to write some custom <span title="Commands that control movement and actions of automated machines">G-code</span> for the 3D printer I was using. [^dont-try-this-at-home]

[^dont-try-this-at-home]: **Don't try this at home unless you really know what you are doing!**

I created a model of a flat square, loaded it into PrusaSlicer, generated G-code, and then tried to modify it.
The G-code does not generally expect to be modified.
For example, if you randomly insert extrusion commands in the middle of it, the print head may crash into those extruded bits later in the program, as it does not expect them to be there.

Nothing went wrong in my experiments, but I found a better solution in the end.
At the same time, the custom G-Code solution was unique:
- I made the printer raise away from the layer and pull the "hair" up & sideways at the same time
- I made it so the printer rips the "hair" by stopping extruding and pulling even further away

The tips of the hair look really ugly, but the idea is neat, and what's cool, every hair strand only goes *one* way.

{{< figure src=`/img/009/hair-g-code.webp` caption=`Some 3D-printed "hair" I printed using custom G-code` >}}

{{% /details %}}
