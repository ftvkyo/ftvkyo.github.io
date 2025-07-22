---
title: "In search of the Visibility Polygon"
description: "Implementing visibility polygon calculation based on the algorithm of Asano"
date: 2025-07-13T22:00:00Z
tags: [Maths, Gamedev]
toc: true
draft: true
---

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
That paper also references a source for the algorithm [^asano-1985] , but I found the short description more interesting to work with.
Also, [^asano-1985] is quite hard to access.

[^bungiu-2014]: Francisc Bungiu, Michael Hemmer, John Hershberger, Kan Huang, Alexander Kröller (2014). [Efficient Computation of Visibility Polygons](https://arxiv.org/abs/1403.3905).

[^asano-1985]: Asano, Tetsuo (1985). An efficient algorithm for finding the visibility polygon for a polygonal region with holes. Institute of Electronics, Information, and Communication Engineers. Vol. 68. pp. 557–559.

In this post I will describe the implementation of that algorithm.
There are some basic concepts I expect the reader to be familiar with.
For completeness, I will introduce those concepts now.
There will be some additional ideas that I will explain in more detail further in the post.

{{% aside %}}
I want the post to be enjoyable, but I also want it to be precise in the areas that matter.
I don't want to overuse the mathematical notation and make the post unwelcoming, so I will do my best to keep it simple.

Mathematical notation in the post should be supplementary to the text.
In other words, the text should make sense on its own, but the math notes may make it easier to understand.

I guess I am also a bit worried about using the notation wrong or being not pedantic enough.
But oh well, I am learning here.
{{% /aside %}}

{{% details `Notation` %}}

- $\forall ...$ means "for all ..."
- $\exists ...$ means "there exists ... such that"
- $... \land ...$ means "... and ... (are true)"
- $... \lor ...$ means "... or ... (or both) (are true)"
- $... \implies ...$ means "... implies ..."
- $... \iff ...$ means "... if and only if ..."
- $... \, \defineas \, ...$ means "... is defined as ..."

A *set* is a collection of objects / elements.

- $\varnothing \defineas \{\}$ is an empty set
- $A = \{a, b, c\}$ and $B = \{0, 1, 2, \dots\}$ are sets defined by enumeration
- $A = \{\text{expression} \, | \, \text{condition}\}$ is a set of values of the "$\text{expression}$" for which the "$\text{condition}$" holds true
- $a \in A$ means "object $a$ is an element of set $A$"

$A \subseteq B$ means "$A$ is a subset of $B$":

- $A \subseteq B \implies \forall a \in A: a \in B$
- All elements of $A$ are also elements of $B$

$A \cap B$ means "intersection of $A$ and $B$":

- $A \cap B \defineas \{x \, | \, x \in A \land x \in B\}$
- Set of all objects that are present both in set $a$ and set $b$

$\R$ denotes the set of all real numbers [^real-number].

$\RR$ is a set of all pairs of real numbers:

$$
\RR \defineas \{(a, b) \, | \, a \in \R, b \in \R\}
$$

[^real-number]: [Real number](https://en.wikipedia.org/wiki/Real_number) on Wikipedia

{{% /details %}}

{{% details `Basic concepts` %}}

A *point* is an element of $\RR$.
It represents a location in Euclidean plane [^euclidean-plane].

$$
\text{point } A = (x, y)
$$

A *vector* is also an element of $\RR$.
It represents an object with magnitude (length) and direction [^euclidean-vector].

$$
\text{vector } \vec{v} = (x, y)
$$

$$
\aligd
A =& (x_1, y_1) \\
B =& (x_2, y_2) \\
\text{vector } \vecl{AB} \defineas& (x_2 - x_1, y_2 - y_1) \\
\ealigd
$$

$\vecl{AB}$ is a vector from point $A$ to point $B$, but it does not *start* in $A$.
It merely represents "how to get to point $B$ if you are in point $A$".
If you are not in point $A$, it will take you somewhere else.

A *line* is a set of points that is infinitely long and has no width [^line].
It can be defined by two distinct points.

$$
\alig
A =& (x_1, y_1) \\
B =& (x_2, y_2) \\
\text{line } AB \defineas& \{(x, y) \, | \, (x_2 - x_1)(y - y_1) - (y_2 - y_1)(x - x_1) = 0 \} \\
\ealig
$$

A *segment* is an uninterrupted subset of a line [^segment].
It is defined and bounded by two distinct endpoints.
This post only discusses *closed segments*, which are segments that include both of its endpoints.

$$
\alig
\text{segment } &\overline{s} \\
\text{segment } &\overline{AB} \\
\ealig
$$

[^euclidean-plane]: [Euclidean plane](https://en.wikipedia.org/wiki/Euclidean_plane) on Wikipedia
[^euclidean-vector]: [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector) on Wikipedia
[^line]: [Line](<https://en.wikipedia.org/wiki/Line_(geometry)>) on Wikipedia
[^segment]: [Line segment](https://en.wikipedia.org/wiki/Line_segment) on Wikipedia

---

Collinearity [^collinearity]:
- A point is collinear with a segment if it lies on the line defined by that segment's endpoints
- A pair of segments is collinear if all of their points are on the same line

[^collinearity]: [Collinearity](https://en.wikipedia.org/wiki/Collinearity) on Wikipedia

$$
\alig
\forall P, A, B, C, D \in& \, \RR: \\
P \text{ collinear } \overline{AB} \iff& P \in AB \\
\overline{AB} \text{ collinear } \overline{CD} \iff& AB = CD \\
\ealig
$$

An intersection of two lines [^line-intersection] can be one of:
- An empty set (then the two lines are *parallel*)
- A single point
- A line (then the lines are equal)

$$
\alig
\forall A, B, C, D \in& \, \RR: \\
AB \cap CD =& \varnothing \\
\lor AB \cap CD =& \{P\} \text{ - a single point} \\
\lor AB \cap CD =& AB = CD \\
\ealig
$$

[^line-intersection]: [Line–line intersection](https://en.wikipedia.org/wiki/Line–line_intersection) on Wikipedia

An intersection of two segments [^segment-intersection] can be one of:
- An empty set (no intersection, the segments may still be parallel and collinear)
- A single point
- A segment (then the segments are collinear, but may not be equal)

$$
\alig
\forall A, B, C, D \in& \, \RR: \\
\overline{AB} \cap \overline{CD} =& \varnothing \\
\lor \overline{AB} \cap \overline{CD} =& \{P\} \text{ - a single point} \\
\lor \overline{AB} \cap \overline{CD} =& \overline{EF} \text { - a segment} \\
\ealig
$$

Here, $\overline{EF} \subseteq \overline{AB}$ and $\overline{EF} \subseteq \overline{CD}$.

[^segment-intersection]: [Intersection of two line segments](<https://en.wikipedia.org/wiki/Intersection_(geometry)#Two_line_segments>) on Wikipedia

{{% /details %}}

## Overview of the algorithm

The algorithm needs the following inputs:

- $Q$ -- the query point

$$
Q \in \RR
$$

- $\mathbf{S}$ -- the set of $n$ occluding segments

$$
\mathbf{S} = \{ \overline{s_1}, \overline{s_2}, \dots, \overline{s_n} \}
$$

In $\mathbf{S}$, segments are only allowed to intersect at their ends:

$$
\alig
\forall \overline{AB}, \overline{CD} \in& \, \mathbf{S}, \overline{AB} \neq \overline{CD} : \\
\overline{AB} \cap \overline{CD} =& \, \varnothing \\
\lor \overline{AB} \cap \overline{CD} =& \{E\} \\
\ealig
$$

$$
\text {where } (E = A \lor E = B) \land (E = C \lor E = D)) \\
$$

In $\mathbf{S}$, segments may not contain the point $Q$:

$$
\forall \overline{s} \in \, \mathbf{S} : Q \notin s
$$

---

Based on the inputs, we can now define several functions:

- $\text{angle}_Q(P)$ receives a single point $P$ and returns the angle between the vector $\vecl{QP}$ and the X-axis

$$
\text{angle}_Q : \RR \rightarrow \R
$$

...

Define a function `order_endpoints` that receives a single segment $s$ and determines which of its endpoints is a "start event", and which is the "end event" with respect to $Q$.
In other words, it "reorders" the endpoints of the segment so that the first one is always the "start", and the other one is always the "end".

$$
\text{orderendpoints} : (\RR, \RR) \rightarrow (\RR, \RR)
$$

---

Then, to calculate the visibility polygon:

1. Sort endpoints $E_m$ of all segments by the value $\text{angle(}E_m\text{)}$, keeping track of which segment $n$ they came from and whether they are a "start" or an "end" event

2. Go over all of the events once to determine which segments are "active" at angle zero

3. Go over all of the events again, "activating" segments on start events, and "deactivating" them on end events, keeping track of the nearest segment at any moment and generating new segments that represent the visibility polygon whenever the nearest segment changes

...

## Determining whether a point lies in a half-plane

...

## Ordering segments by distance to a point

The algorithm features a segment comparison routine that is aimed at decreasing the cost of performing the comparison by reducing the number of required floating point operations.

The cheap segment comparison routine is **only valid under the following assumptions**:

1. Any two segments can only be compared between each other if a line can be drawn that includes the query point and a point from each of the segments
2. The segments do not intersect between each other with the exception of intersections that yield their endpoints

The comparison routine can be simplified if all segments collinear with the query point are removed from the input data.
For completeness, cases when the query point is collinear with the segments are still considered below.

### The segments are collinear

{{< figure src=`segments-both-collinear.svg` >}}

### One of the segments is collinear with the query point

{{< figure src=`segments-collinear-pointing.svg` >}}

{{< figure src=`segments-collinear-touching.svg` >}}

{{< figure src=`segments-collinear.svg` >}}

### None of the segments are collinear with the query point

{{< figure src=`segments-pointing.svg` >}}

{{< figure src=`segments-touching.svg` >}}

{{< figure src=`segments.svg` >}}

## Calculating the visibility polygon

{{< figure src=`example-1.svg` >}}

{{< figure src=`example-2.svg` >}}

{{< figure src=`example-3.svg` >}}

{{< figure src=`example-4.svg` >}}

## Edge cases

{{< figure src=`edge-cases.svg` >}}
