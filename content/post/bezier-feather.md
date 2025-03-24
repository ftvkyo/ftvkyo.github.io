---
title: "Procedural generation of organic shapes using Bézier curves"
date: 2024-07-13T22:00:00Z
tags: [3D-printing, Procedural generation, Maths]
toc: true
math: true
description: >
  OpenSCAD for the win!
  Even if it means I should implement Bézier curves from scratch.
draft: true
---

## Preface

A while ago I got an idea to create some "organic" shapes for 3D-printing.
I learned a bunch of interesting stuff trying to do that.
This post captures the essence of my experience.

The post starts with an introduction to the tools I am using.
Then I present the concept of Bézier curves.
I provide a bunch of illustrations to make it more intuitive and fun.
After we are familiar with both the tools and the curves, I wrap up by showing how it works in practice.

{{< figure src=`openscad-new-assembly.webp` caption=`The resulting model to be 3D-printed` >}}

{{< figure src=`feather.webp` caption=`The result of 3D-printing said model` >}}

The post contains some maths, but understanding them should not be necessary for enjoying the content.


## The tools

This project is something that I didn't want to try and do using Autodesk Fusion, which I used for [Hovert60 keyboard](/post/devlog-hovert60-02/) development.
I also didn't want to boot into Windows to use Fusion every time 😅

{{< figure src=`blender.webp` caption=`Print-in-place mail made in Blender using an Array Modifier applied to an expanded NURBS curve, and flattened with a Boolean Modifier for better bed adhesion` >}}

After some experiments with Blender and even with writing some custom G-code for 3D-printing, I stumbled upon a tool called OpenSCAD.


### What is OpenSCAD?

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


## Bézier curves

When I started, I didn't know what I want to achieve, but I knew I wanted to use [Bézier curves][bezier] for this ~~small~~ project.
You might have encountered these curves in programs like Inkscape or Adobe Illustrator.
There are 3 ways to use them in OpenSCAD:
- Through a 3rd-party library (which is boring)
- Imprort an SVG (which is not flexible, and also boring)
- Implement the curves by myself (yeah, try to guess where this is going...)

[bezier]: https://en.wikipedia.org/wiki/Bézier_curve

To implement the curves, I needed to revisit some theory, which I will explain here.
Feel free to skip the maths -- I think the pictures with their flavour text should be enough to get the basic idea.


### The Basics

Before we can talk talk about advanced stuff, I should make sure we are on the same page with regards to the basics.
I will be very brief.
There are two very simple concepts that serve as a foundation for Bézier curves.
They are:
- Vectors and operations on them
- Linear interpolation between two vectors

In this post, we are working on a [Cartesian plane][cartesian-plane].
That implies:
- There are 2 axes (X-axis and Y-axis), 2 dimensions
- The axes are perpendicular to each other
- Any point (or vector) on the plane can be defined using a pair of two real numbers

[cartesian-plane]: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Cartesian_plane

You might have learned about [vectors][vector] in school.
For this post, what matters is:
- A vector is a pair of two real numbers
- Two vectors can be added together
- Two vectors can be subtracted from each other
- A vector can be multiplied by a scalar (a real number)
- Each vector has some length

[vector]: https://en.wikipedia.org/wiki/Euclidean_vector

{{< figure src=`vectors.svg` caption=`Examples of operations on vectors. Left: two vectors. Middle-Top: difference of two vectors. Middle-Bottom: multiplying vectors by scalars. Right-Top: sum of two vectors. Right-Bottom: length of a vector.` >}}

Let's look at the examples.
Given two vectors \(\vec{A}\) and \(\vec{B}\),

\[
\vec{A} = \begin{bmatrix} 2 \\ 4 \end{bmatrix}, \;
\vec{B} = \begin{bmatrix} 5 \\ 2 \end{bmatrix}
\]

Their sum is:

\[
\vec{D} = \vec{A} + \vec{B} = \begin{bmatrix} 2 + 5 \\ 4 + 2 \end{bmatrix} = \begin{bmatrix} 7 \\ 6 \end{bmatrix}
\]

Their difference is:

\[
\vec{C} = \vec{B} - \vec{A} = \begin{bmatrix} 5 - 2 \\ 2 - 4 \end{bmatrix} = \begin{bmatrix} 3 \\ -2 \end{bmatrix}
\]

Multiplying them by a scalar:

\[
\begin{align}
  \frac{3}{2} \vec{A} &= \begin{bmatrix} \frac{3}{2} \cdot 2 \\ \frac{3}{2} \cdot 4 \end{bmatrix} = \begin{bmatrix} 3 \\ 6 \end{bmatrix} \\
  \frac{1}{2} \vec{B} &= \begin{bmatrix} \frac{1}{2} \cdot 5 \\ \frac{1}{2} \cdot 2 \end{bmatrix} = \begin{bmatrix} 2.5 \\ 1 \end{bmatrix} \\
\end{align}
\]

---

For a different vector \(\vec{A}\),

\[
\vec{A} = \begin{bmatrix} 4 \\ 3 \end{bmatrix}
\]

It's length \(\Vert A \Vert\) can be calculated by the [Pythagorean theorem][pythagor]:

\[
\Vert \vec{A} \Vert = \sqrt{4^2 + 3^2} = \sqrt{16 + 9} = \sqrt{25} = 5
\]

[pythagor]: https://en.wikipedia.org/wiki/Pythagorean_theorem

---

Now, the remaining piece of the puzzle is a function called \(lerp\) which stands for [Linear interpolation][lerp].
This function receives 3 values: 2 values \(v_0\) and \(v_1\) to interpolate between, and a parameter \(t \in [0, 1]\).
\(v_0\) and \(v_1\) can be real numbers, but they can also be vectors (with the same dimensionality).

\(lerp\) can be defined like this:

\[
  lerp(v_0, v_1, t) := (1 - t) v_0 + t v_1
\]

Note the values of the function for \(t\) at the ends of the \([0, 1]\) interval:

\[
\begin{align}
  lerp(v_0, v_1, 0) &= v_0 \\
  lerp(v_0, v_1, 1) &= v_1 \\
\end{align}
\]

Now, if we calculate \(lerp(\vec{A}, \vec{B}, t)\) for all \(t \in [0, 1]\) for some fixed \(\vec{A}\) and \(\vec{B}\), we get a set of points that live on the line segment connecting \(A\) and \(B\).

{{< figure src=`lerp.svg` caption=`` >}}

[lerp]: https://en.wikipedia.org/wiki/Linear_interpolation

### Quadratic Bézier curves

{{< figure src=`bezier-quadratic-1.svg` caption=`` >}}
{{< figure src=`bezier-quadratic-2.svg` caption=`` >}}
{{< figure src=`bezier-quadratic-3.svg` caption=`` >}}
{{< figure src=`bezier-quadratic-4.svg` caption=`` >}}


### Cubic Bézier curves

{{< figure src=`bezier-cubic-1.svg` caption=`` >}}
{{< figure src=`bezier-cubic-2.svg` caption=`` >}}
{{< figure src=`bezier-cubic-3.svg` caption=`` >}}
{{< figure src=`bezier-cubic-4.svg` caption=`` >}}
{{< figure src=`bezier-cubic-5.svg` caption=`` >}}


### Derivative of a Bézier curve


{{< figure src=`bezier-derivative.svg` caption=`` >}}


### Stroke expansion

{{< figure src=`stroke-expansion-1.svg` caption=`` >}}
{{< figure src=`stroke-expansion-2.svg` caption=`` >}}
{{< figure src=`stroke-expansion-3.svg` caption=`` >}}
{{< figure src=`stroke-expansion-4.svg` caption=`` >}}


## Putting it all together

{{< figure src=`openscad-curves.webp` caption=`` >}}

{{< figure src=`openscad-original-stem.webp` caption=`` >}}
{{< figure src=`openscad-original-barbs.webp` caption=`` >}}
{{< figure src=`openscad-original-assembly.webp` caption=`` >}}

{{< figure src=`openscad-new-stem.webp` caption=`` >}}
{{< figure src=`openscad-new-barbs.webp` caption=`` >}}
{{< figure src=`openscad-new-barbs-control.webp` caption=`` >}}
{{< figure src=`openscad-new-assembly.webp` caption=`` >}}


## Results

...
