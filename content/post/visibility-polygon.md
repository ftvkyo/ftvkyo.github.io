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
There are some basic concepts I expect the reader to be familiar with, I will cover them briefly.
There will also be some additional ideas that I will explain in more detail further in the post.

{{% details `Basic concepts` %}}

There are some common symbols I am going to use:

Symbol          | Meaning
----------------|--------
$\forall a ...$ | for all $a$ ...
$\exists a ...$ | there exists $a$ such that ...
$a \land b$     | $a$ and $b$ (are true)
$a \lor b$      | $a$ or $b$ (or both) (are true)
$a \implies b$  | $a$ implies $b$
$a \iff b$      | $a$ if and only if $b$
$a := b$        | $a$ is defined as $b$

A *set* is a collection of objects, which are called *elements* of the set.
The order of the elements in the set does not matter.

$$
\alig
\{a, b, c\} & \text{ is a set}, \\
\{3, 2, 1, -5, 8\} & \text{ is also a set}. \\
\ealig
$$

$$
\text{Empty set } \varnothing := \{\}.
$$

Sets can be declared by specifying the rules of element inclusion.
For a condition $\text{cond}$ and expression $\text{expr}$, a set of all values of $\text{expr}$ for which $\text{cond}$ is true can be denoted like this:

$$
\{\text{expr} \, | \, \text{cond}\}.
$$

For example, the set of all integers

$$
\mathbb{Z} := \{n \, | \, n \text{ is an integer} \}.
$$

The following are some symbols related to sets:

Symbol          | Meaning
----------------|--------
$a \in A$       | $a$ is an element of set $A$
$A \subseteq B$ | $A$ is a subset of $B$
$A \cap B$      | intersection of sets $A$ and $B$

$$
A \subseteq B \implies \forall a \in A : a \in B.
$$

$$
A \cap B := \{a \, | \, a \in A \land a \in B \}.
$$

The set of all real numbers [^real-number] is denoted as $\R$.

The set of all pairs of real numbers

$$
\RR := \{(a, b) \, | \, a \in \R \land b \in \R\}.
$$

[^real-number]: [Real number](https://en.wikipedia.org/wiki/Real_number) on Wikipedia

---

- A *point* is represented using an element of $\RR$ [^euclidean-plane].
- A *vector* is also represented using an element of $\RR$, even though it has a different meaning [^euclidean-vector].
- A *line* is a set of points that is infinitely long and has no width [^line].
  A line can be defined by two distinct points.
- A *segment* is an uninterrupted subset of a line [^segment].
  A segment can be defined by two distinct points.
  All segments in this post are *closed segments*, which means they include their endpoints.

[^euclidean-plane]: [Euclidean plane](https://en.wikipedia.org/wiki/Euclidean_plane) on Wikipedia
[^euclidean-vector]: [Euclidean vector](https://en.wikipedia.org/wiki/Euclidean_vector) on Wikipedia
[^line]: [Line](<https://en.wikipedia.org/wiki/Line_(geometry)>) on Wikipedia
[^segment]: [Line segment](https://en.wikipedia.org/wiki/Line_segment) on Wikipedia

In this post, I use the following notation:

$$
\alig
A, B, C, D, ... & - \text{points}, \\
\vec{a}, \vec{b}, ..., \vecl{AB}, \vecl{CD}, ... & - \text{vectors}, \\
AB, CD, ... & - \text{lines}, \\
\overline{a}, \overline{b}, ..., \overline{AB}, \overline{CD}, ... & - \text{segments}. \\
\ealig
$$

---

Collinearity [^collinearity]:

[^collinearity]: [Collinearity](https://en.wikipedia.org/wiki/Collinearity) on Wikipedia

- A point is collinear with a segment if it lies on the line defined by that segment's endpoints.

$$
\alig
&\forall P, A, B \in \, \RR: \\
&P \text{ collinear } \overline {AB} \iff P \in AB.
\ealig
$$

- A pair of segments is collinear if all of their points are on the same line.

$$
\alig
&\forall A, B, C, D \in \, \RR: \\
&\overline{AB} \text{ collinear } \overline{CD} \iff AB = CD. \\
\ealig
$$

An intersection of two lines [^line-intersection] can be one of:
- An empty set (then the two lines are *parallel*),
- A single point,
- A line (then the lines are equal).

$$
\alig
& \forall A, B, C, D \in \RR: \\
& AB \cap CD = \varnothing \\
& \lor \, AB \cap CD = \{P\} \\
& \lor \, AB \cap CD = AB = CD, \\
\text{where } & P \in \, \RR. \\
\ealig
$$

[^line-intersection]: [Line–line intersection](https://en.wikipedia.org/wiki/Line–line_intersection) on Wikipedia

An intersection of two segments [^segment-intersection] can be one of:
- An empty set (no intersection, the segments may still be parallel and collinear),
- A single point,
- A segment (then the segments are collinear, but may not be equal).

$$
\alig
& \forall A, B, C, D \in \RR: \\
& \overline{AB} \cap \overline{CD} = \varnothing \\
& \lor \, \overline{AB} \cap \overline{CD} = \{P\} \\
& \lor \, \overline{AB} \cap \overline{CD} = \overline{EF}, \\
\text{where } & P \in \, \RR, \\
& \overline{EF} \subseteq \overline{AB} \land \overline{EF} \subseteq \overline{CD}.
\ealig
$$

[^segment-intersection]: [Intersection of two line segments](<https://en.wikipedia.org/wiki/Intersection_(geometry)#Two_line_segments>) on Wikipedia

{{% /details %}}

## Algorithm inputs and outputs

The algorithm needs the following inputs:

- a query point $Q$,
- a set of segments $\mathbf{S}$.

No segment in $\mathbf{S}$ should include $Q$.

$$
\forall \overline{s} \in \mathbf{S} : Q \notin \overline{s}.
$$

No two distinct segments in $\mathbf{S}$ are allowed to intersect, unless their intersection is a single point that is an endpoint of both of those segments.

$$
\alig
& \forall \overline{AB}, \overline{CD} \in \mathbf{S}, \, \overline{AB} \neq \overline{CD} : \\
& \overline{AB} \cap \overline{CD} = \varnothing \\
& \lor \, \overline{AB} \cap \overline{CD} = \{E\}, \\
\text {where } & E \in \{A, B\} \land E \in \{C, D\} \\
\ealig
$$

Running the algorithm produces a set of segments $\mathbf{S}_Q$ that represents the surfaces visible from $Q$.
Each segment in $\mathbf{S}_Q$ is a subset of some segment from $\mathbf{S}$.

$$
\mathbf{S}_Q := \text{calculateVisibility} (Q, \mathbf{S}). \\
$$

$$
\forall \overline{q} \in \mathbf{S}_Q, \exists \overline{s} \in \mathbf{S} : \overline{q} \subseteq \overline{s}.
$$

{{% aside %}}
As you are going to see, this has some implications on the produced output.
Basically, if there are no segments in some direction relative to $Q$, there won't be any surfaces visible there.

For practical applications such as determining the area illuminated from $Q$, the solution is quite simple: $\mathbf{S}$ is made to include a bunch of segments that completely encompass all of the other segments.

This way, there would be at least one segment in $\mathbf{S}$ for every direction relative to $Q$.
{{% /aside %}}

From $\mathbf{S}_Q$, the actual polygon can be obtained by combining the endpoints of each of the segments in $\mathbf{S}_Q$ with $Q$ to form triangles.
The polygon is the union of all such triangles

$$
\mathbf{V}_{\mathbf{S}Q} := \{P \, | \, \overline{AB} \in \mathbf{S}_Q, P \in \triangle ABQ \}.
$$

The outline of the polygon can also be trivially generated with a slight modification to the algorithm, which is left as an exercise for the reader.

## Algorithm overview

To calculate the visibility polygon, we will "visit" all of the segment endpoints, keeping track of which segment is the nearest to $Q$ at all times.

This is a sweep line algorithm [^sweep-line-algo].
The sweep line in this case is the line that connects $Q$ with the current endpoint.
As the current endpoint changes, the line rotates around $Q$.

[^sweep-line-algo]: [Sweep line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm) on Wikipedia.

{{% aside %}}

It's important to understand why we only care about endpoints, and not whole segments.
As stated before, the input data prohibits segments that intersect anywhere but at their endpoints.
This basically means that as the sweep line rotates around $Q$, the notion of the "segment nearest to $Q$" can only ever change when the sweep line goes through a segment endpoint.

{{% /aside %}}

Let $n$ be the number of segments in the input.

This problem can be solved naively in $O(n^2)$ time.
For example:

1. Sort segment endpoints by their position relative to $Q$.
2. For each endpoint $E$, find all intersections between $EQ$ and all other segments.
  Use that information to keep track of which segment is the nearest to $Q$.
3. Whenever the segment nearest to $Q$ changes, take note of that.

An optimisation allows us to cut down the time to $O(n \, \text{log} \, n)$.
Instead of keeping track of just the nearest segments, we will keep track of all segments that are currently intersected by our sweep line (henceforth called *active* segments).

As the sweep line goes through segment endpoints, we will be "activating" and "deactivating" corresponding segments.
In practice, given some endpoint, it can be difficult to tell what to do with it on the fly.
For this reason, all endpoints are designated as $\text{Start}$ or $\text{End}$ events.
See [Ordering endpoints within a segment](#ordering-endpoints-within-a-segment) for details.

To keep track of currently active segments, an ordered set can be used.
Common implementations of ordered sets [^ordered-sets] can do insertion and removal in $O(\text{log} \, n)$ time -- that's exactly what we need!

[^ordered-sets]: For example, [BTreeSet](https://doc.rust-lang.org/stable/std/collections/struct.BTreeSet.html) in Rust. Read about [BTrees](https://en.wikipedia.org/wiki/B-tree) on Wikipedia.

Note, though, that we need to define the ordering between the segments to store them in an ordered set.
It's a bit tricky to do, so see [Ordering segments by distance to a point](#ordering-segments-by-distance-to-a-point) for details.

---

Time to bring this all together.
So, that's what the algorithm needs to do:

1. Prepare the input data:
    - Create a set of all segment endpoints, keeping track of which segment they came from;
    - Order the endpoints based on the direction from $Q$ to the endpoint;
    - For each of the endpoints, designate it is a $\text{Start}$ or an $\text{End}$ event.
2. Determine the initial state -- choose the first endpoint and find all segments that are active when the sweep line passes through it.
3. Go over all events, doing the following:
    - Activate the segment if this is a $\text{Start}$ event,
    - Deactivate the segment if this is an $\text{End}$ event,
    - Save a new visibility segment whenever the segment closest to $Q$ changes.

---

### Example

{{< figure src=`example-1.svg` caption=`**Fig. 1.1**` >}}

{{< figure src=`example-2.svg` caption=`**Fig. 1.2**` >}}

{{< figure src=`example-3.svg` caption=`**Fig. 1.3**` >}}

{{< figure src=`example-4.svg` caption=`**Fig. 1.4**` >}}


## Ordering endpoints within a segment

{{< figure src=`edge-cases.svg` caption=`**Fig. 2**` >}}


## Determining whether a point lies in a half-plane

A naive implementation of $\text{cmp}_Q$ can ...

...


## Ordering segments by distance to a point

The algorithm features a segment comparison routine that is aimed at decreasing the cost of performing the comparison by reducing the number of required floating point operations.

The cheap segment comparison routine is **only valid under the following assumptions**:

1. Any two segments can only be compared between each other if a line can be drawn that includes the query point and a point from each of the segments
2. The segments do not intersect between each other with the exception of intersections that yield their endpoints

The comparison routine can be simplified if all segments collinear with the query point are removed from the input data.
For completeness, cases when the query point is collinear with the segments are still considered below.

### The segments are collinear

{{< figure src=`segments-both-collinear.svg` caption=`**Fig. 3.1**` >}}

### One of the segments is collinear with the query point

{{< figure src=`segments-collinear-pointing.svg` caption=`**Fig. 3.2**` >}}

{{< figure src=`segments-collinear-touching.svg` caption=`**Fig. 3.3**` >}}

{{< figure src=`segments-collinear.svg` caption=`**Fig. 3.4**` >}}

### None of the segments are collinear with the query point

{{< figure src=`segments-pointing.svg` caption=`**Fig. 3.5**` >}}

{{< figure src=`segments-touching.svg` caption=`**Fig. 3.6**` >}}

{{< figure src=`segments-touching-equal.svg` caption=`**Fig. 3.7**` >}}

{{< figure src=`segments-1.svg` caption=`**Fig. 3.8**` >}}

{{< figure src=`segments-2.svg` caption=`**Fig. 3.9**` >}}
