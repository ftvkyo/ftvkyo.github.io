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

## Preface

...


## Background

A while ago I got this idea to make some "organic" models for 3D-printing.
It's something that I didn't want to try and do using Autodesk Fusion, which I used for [Hovert60 keyboard][hovert60] development.
I also didn't want to boot into Windows to use Fusion every time 😅

[hovert60]: /tags/hovert60-keyboard/

{{< figure src=`/img/009/blender.webp` caption=`Print-in-place mail made in Blender using an Array Modifier applied to an expanded NURBS curve, and flattened with a Boolean Modifier for better bed adhesion` >}}

After some experiments with Blender and even with writing some custom G-code for 3D-printing, I stumbled upon a tool called OpenSCAD.


## What is OpenSCAD?

[OpenSCAD](https://openscad.org/) is a <abbr title="Computer-aided Design">CAD</abbr> program that allows modeling complex solid objects by combining simpler objects in various ways.
Supported operations include:

- Creating primitive [polygons][polygon] like squares and other regular polygons (approximations of circles)
- Creating arbitrary polygons from a set of points
- Creating primitive [polyhedra][polyhedron] like cubes, prisms (approximations of cylinders), [UV spheres][uv-sphere]
- Creating arbitraty polyhedra from a set of triangles
- [Affine transformations][affine-transformation] of polygons and polyhedra
  - Rotation
  - Translation
  - Scaling
  - Mirroring
  - Arbitrary transformations using a matrix
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


Unlike in many other tools, models in OpenSCAD are created by writing code rather than by interacting with a GUI.
I think this approach unlocks several benefits.

For instance, my existing software development skills translate to OpenSCAD nicely, as it allows storing the code for my models in Git and provides capabilities for [code reuse](https://en.wikipedia.org/wiki/Code_reuse).
It removes the need to learn a complex set of keyboard shortcuts and menu items, instead providing a simple <abbr title="Application Programming Interface">API</abbr> for which it has a [cheatsheet](https://openscad.org/cheatsheet/index.html).

But OpenSCAD also has a bunch of drawbacks compared to other CAD software.
It does not use the concept of [constraints][constraint], and the user has to figure out the formulas even for simple things.
The simplicity of the API I mentioned requires a high degree of creativity from the user when making advanced designs.
As a result, creating complex models can get overwhelming.

[constraint]: https://en.wikipedia.org/wiki/Constraint_(computer-aided_design)

In their work, software developers can spend some extra effort on making their code more "future-proof".
The code could be organised more neatly, variables and functions could be named appropriately and so on.
When working with OpenSCAD, you end up having to do the same.
But organizing code and thinking of right names for parts of your designs can be quite hard.

I think these limitations of OpenSCAD pose an interesting challenge for its users.
I can't say if they make OpenSCAD less suited for professional work, but they definitely can make it more enjoyable.


## Theory

...


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
