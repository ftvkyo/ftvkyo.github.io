---
title: "In search of the Visibility Polygon"
description: "Implementing visibility polygon calculation based on the algorithm of Asano"
date: 2025-07-13T22:00:00Z
tags: [Maths, Gamedev]
toc: true
math: true
draft: true
---

$$
\newcommand{\coloneqq}{\mathrel{\vcenter{\colon}}=}
$$

I have been building a 2D game for fun recently.
Once I implemented a basic lighting system for it, I understood that I want game objects to cast shadows.
There are multiple ways to achieve that, and the approach I selected is based on visibility polygons.

{{< figure src=`render.webp` caption=`A frame from the game I am building, with differently colored flames lighting up different areas based on their visibility` >}}

A visibility polygon represents the area that, for a given arrangement of occluding objects, has a direct line of sight to a certain point (called the *query point*).
You can read more about them here:

- [Visibility polygon](https://en.wikipedia.org/wiki/Visibility_polygon) on Wikipedia
- [2D Visibility](https://www.redblobgames.com/articles/visibility/) on Red Blob Games

{{< figure src=`visibility.svg` caption=`This is what a visibility polygon looks like. The occluding objects are purple, the polygon is yellow, and the query point is red.` >}}

I found the problem of finding the visibility polygon interesting, so I decided to implement an algorithm that can calculate them.
The algorithm I implemented is based on a description I found in [^bungiu-2014] under the section "3.2 Algorithm of Asano".

That paper actually suggests a different algorithm for this problem, but I found the algorithm of Asano more fun.
That paper also references a source for the algorithm [^asano-1985] , but... I found the short description more interesting to work with.
Also, [^asano-1985] is quite hard to access.

[^bungiu-2014]: Francisc Bungiu, Michael Hemmer, John Hershberger, Kan Huang, Alexander Kröller (2014). [Efficient Computation of Visibility Polygons](https://arxiv.org/abs/1403.3905).

[^asano-1985]: Asano, Tetsuo (1985). An efficient algorithm for finding the visibility polygon for a polygonal region with holes. Institute of Electronics, Information, and Communication Engineers. Vol. 68. pp. 557–559.

## Terminology

To explain the algorithm, I will need to use some basic terminology.
There will be some additional concepts that I will explain in more detail in the process.

- A *point* is a pair of coordinates in a Euclidean plane [^euclidean-plane]
- A *line* is a set of points that is infinitely long and has no width [^line]
    - A line can be defined by two points
- A *segment* is an uninterrupted subset of a line [^segment]
    - A segment is defined and bounded by two distinct endpoints
    - A *closed segment* is a segment that includes both of its endpoints, only closed segments are discussed on this page

[^euclidean-plane]: [Euclidean plane](https://en.wikipedia.org/wiki/Euclidean_plane) on Wikipedia
[^line]: [Line](<https://en.wikipedia.org/wiki/Line_(geometry)>) on Wikipedia
[^segment]: [Line segment](https://en.wikipedia.org/wiki/Line_segment) on Wikipedia

Collinearity [^collinearity]:
- A point is collinear with a segment if it lies on the line defined by that segment's endpoints
- A pair of segments is collinear if all of their points are on the same line

An intersection of two lines [^line-intersection] can be one of:
- An empty set (then the two lines are *parallel*)
- A single point
- A line (then the lines are equal)

An intersection of two segments [^segment-intersection] can be one of:
- An empty set (no intersection, the segments may still be parallel and collinear)
- A single point
- A segment (then the segments are collinear, but may not be equal)

[^line-intersection]: [Line–line intersection](https://en.wikipedia.org/wiki/Line–line_intersection) on Wikipedia
[^segment-intersection]: [Intersection of two line segments](<https://en.wikipedia.org/wiki/Intersection_(geometry)#Two_line_segments>) on Wikipedia
[^collinearity]: [Collinearity](https://en.wikipedia.org/wiki/Collinearity) on Wikipedia

## The Algorithm

### Overview

The algorithm needs the following inputs:
- \(Q\) -- the query point

$$
Q \in \mathbb{R}^2
$$

- \(\mathbb{S}\) -- the set of \(n\) occluding segments

$$
\mathbb{S} \coloneqq \{ s_1, s_2, \dots, s_n \}
$$

In \(\mathbb{S}\), each \(s_n\) is a segment between its endpoints \(A_n\) and \(B_n\):

$$
\begin{align}
s_n \coloneqq& \, \overline{A_n B_n} \\
A_n \in& \, \mathbb{R}^2 \\
B_n \in& \, \mathbb{R}^2 \\
\end{align}
$$

In \(\mathbb{S}\), segments are only allowed to intersect at their ends:

$$
\begin{align}
\forall s_j, s_k \in& \, \mathbb{S}, s_j \neq s_k \colon \\
\text{either } s_j \cap s_k =& \, \varnothing, \\
\text{or } s_j \cap s_k =& \{E \text{ - endpoint of both } s_j \text{ and } s_k \} \\
\end{align}
$$

In \(\mathbb{S}\), segments may not contain the point \(Q\):

$$
\forall s \in \, \mathbb{S} \colon Q \notin s
$$

---

Define a function `angle` that receives a single point \(P\) and returns the angle between the vector \(\overrightarrow{QP}\) and the X-axis.

$$
\text{angle} \colon \mathbb{R}^2 \rightarrow \mathbb{R}
$$

Define a function `order_endpoints` that receives a single segment \(s\) and determines which of its endpoints is a "start event", and which is the "end event" with respect to \(Q\).
In other words, it "reorders" the endpoints of the segment so that the first one is always the "start", and the other one is always the "end".

$$
\text{order_endpoints} \colon (\mathbb{R}^2, \mathbb{R}^2) \rightarrow (\mathbb{R}^2, \mathbb{R}^2)
$$

---

Then, to calculate the visibility polygon:

1. Sort endpoints \(E_m\) of all segments by the value \(\text{angle(}E_m\text{)}\), keeping track of which segment \(n\) they came from and whether they are a "start" or an "end" event

2. Go over all of the events once to determine which segments are "active" at angle zero

3. Go over all of the events again, "activating" segments on start events, and "deactivating" them on end events, keeping track of the nearest segment at any moment and generating new segments that represent the visibility polygon whenever the nearest segment changes

...

### Determining whether a point lies in a half-plane

...

### Ordering segments by distance to a point

The algorithm features a segment comparison routine that is aimed at decreasing the cost of performing the comparison by reducing the number of required floating point operations.

The cheap segment comparison routine is **only valid under the following assumptions**:

1. Any two segments can only be compared between each other if a line can be drawn that includes the query point and a point from each of the segments
2. The segments do not intersect between each other with the exception of intersections that yield their endpoints

The comparison routine can be simplified if all segments collinear with the query point are removed from the input data.
For completeness, cases when the query point is collinear with the segments are still considered below.

#### The segments are collinear

{{< figure src=`segments-both-collinear.svg` >}}

#### One of the segments is collinear with the query point

{{< figure src=`segments-collinear-pointing.svg` >}}

{{< figure src=`segments-collinear-touching.svg` >}}

{{< figure src=`segments-collinear.svg` >}}

#### None of the segments are collinear with the query point

{{< figure src=`segments-pointing.svg` >}}

{{< figure src=`segments-touching.svg` >}}

{{< figure src=`segments.svg` >}}

### Calculating the visibility polygon

{{< figure src=`example-1.svg` >}}

{{< figure src=`example-2.svg` >}}

{{< figure src=`example-3.svg` >}}

{{< figure src=`example-4.svg` >}}

### Edge cases

{{< figure src=`edge-cases.svg` >}}
