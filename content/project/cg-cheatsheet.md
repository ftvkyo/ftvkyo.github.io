---
title: "Computer Graphics cheatsheet"
toc: true
---

## Coordinate systems

### Handedness

Three-dimensional coordinate systems can be left-handed and right-handed.

How to remember which one is which:
1. Use your corresponding hand
2. Form an `L` shape with the thumb and the index finger
3. Form an `L` shape with the index finger and the middle finger
    (make your middle finger perpendicular to the surface of your palm)
4. Assign the positive X, positive Y and positive Z directions to the fingers in the following order: the thumb, then the index finger, then the middle finger

Different grapics APIs may use differently handed coordinate systems.

### Normalized Device Coordinates (NDC)

WebGPU expects all vertices output by the vertex shader to have normalised coordinates.

$$
\begin{aligned}
x &\in [-1.0, 1.0] \\
y &\in [-1.0, 1.0] \\
z &\in [0.0, 1.0] \\
\end{aligned}
$$
