---
title: "OpenSCAD snippets"
toc: true
math: true
description: Some snapshots of my OpenSCAD adventures
---

For now, the snippets are self-contained.
That implies there may be duplicates of common functions between snippets.
Even worse, the functions with the same names may work differently in different snippets.
And there may be fewer comments than desired.
You've been warned `¯\_(ツ)_/¯`

## Wavy donut

*Just why did I do this?*

{{< figure src=`wavy-donut-2.webp` caption=`A render of the wavy donut with 2 waves` >}}

It is implemented using the `polyhedron()` OpenSCAD module.
I generate flat slices of the donut, rotate and position them in 3D using `pts_rotate3` and `pts_translate3`, and then stitch them into a loop in the `pts_extrude` module.

There are alternative methods to get roughly similar results (e.g. intersecting cylinders or cones), but they are insufficient.
Additionally, OpenSCAD's boolean operations with polyhedra are not very fast.
Smoothing the results with something like a Minkowski sum of the shape's edge and a sphere would be painfully slow, and the result still won't be as smooth as this.

What I really like about this one, is that it took me just a couple minutes to implement tilting of individual slices to make the waves actually "bend" rather than "bob".
I used the fact that if \( f(\alpha) = cos(\alpha) \), and \( f(\alpha) \) is the slice "bobbing" function, then \( f'(\alpha) = -sin(\alpha) \) which provides the tilt.
And then guesstimated some magic coefficients because I couldn't be bothered.

{{< figure src=`wavy-donut-5.webp` caption=`The same wavy donut, but with 5 waves` >}}

{{% details `Source code of the wavy donut` %}}

```scad
function clamp(v_min, t, v_max) = max(v_min, min(t, v_max));


function pts_circle(radius, edges) =
    assert(is_num(radius) && radius > 0, "'radius' is not a number larger than 0")
    assert(is_undef(edges) || (is_num(edges) && edges > 2) , "'edges' is not a number larger than 2")
    let(edges = is_num(edges) ? edges : clamp(12, radius, 360))
    [ for (a = [0 : 360 / edges : 359.99999]) [cos(a) * radius, sin(a) * radius] ];


function _assert_vec2(vec) =
    assert(is_list(vec) && len(vec) == 2, "a vec is not a list of 2 elements")
    assert(is_num(vec.x) && is_num(vec.y), "a vec component is not a number")
    true;


function _assert_vec3(vec) =
    assert(is_list(vec) && len(vec) == 3, "a vec is not a list of 3 elements")
    assert(is_num(vec.x) && is_num(vec.y) && is_num(vec.z), "a vec component is not a number")
    true;


function _assert_flat(flat) =
    assert(is_list(flat) && len(flat) > 2, "a flat is not a list of more than 2 points")
    is_list([ for (point = flat)
        assert(is_list(point) && len(point) == 2, "a point in a flat is not a list of 2 elements")
        assert(is_num(point.x) && is_num(point.y), "a component of a point in a flat is not a number")
        true
    ]);


function _assert_slice(slice) =
    assert(is_list(slice) && len(slice) > 2, "a slice is not a list of more than 2 points")
    is_list([ for (point = slice)
        assert(is_list(point) && len(point) == 3, "a point in a slice is not a list of 3 elements")
        assert(is_num(point.x) && is_num(point.y) && is_num(point.z), "a component of a point in a slice is not a number")
        true
    ]);


function pts_translate2(flat, t) =
    assert(_assert_flat(flat))
    assert(_assert_vec2(t))
    [ for (point = flat) point + t ];


function pts_translate3(slice, t) =
    assert(_assert_slice(slice))
    assert(_assert_vec3(t))
    [ for (point = slice) point + t ];


function pts_inflate(flat) =
    assert(_assert_flat(flat))
    [ for (point = flat) [point.x, point.y, 0] ];


function pts_rotate3(s, r) =
    assert(_assert_slice(s))
    assert(_assert_vec3(r))
    [ for (p0 = s)
        let (
            // 1. rotate around Z
            p1 = [
                p0.x * cos(r.z) - p0.y * sin(r.z),
                p0.x * sin(r.z) + p0.y * cos(r.z),
                p0.z,
            ],
            // 2. rotate around Y
            p2 = [
                p1.x * cos(r.y) + p1.z * sin(r.y),
                p1.y,
              - p1.x * sin(r.y) + p1.z * cos(r.y),
            ],
            // 3. rotate around X
            p3 = [
                p2.x,
                p2.y * cos(r.x) - p2.z * sin(r.x),
                p2.y * sin(r.x) + p2.z * cos(r.x),
            ]
        ) p3
    ];


module pts_extrude(slices) {
    /* Validate the data */

    // Check that 'slices' is a list of slices
    assert(is_list(slices) && len(slices) > 2, "'slices' is not a list of more than 2 slices");

    // Check that the first slice has enough points
    assert(is_list(slices[0]) && len(slices[0]) > 2, "'slices[0]' is not a slice of more than 2 points");

    _num_slices = len(slices);
    _num_points = len(slices[0]);

    // Check that all the slices have the same number of points
    for (slice = slices) {
        assert(is_list(slice) && len(slice) == _num_points, "a slice has a wrong number of points");
    }

    // Check that all slices contain points of right dimensionality
    for (slice = slices) {
        for (point = slice) {
            assert(is_list(point) && len(point) == 3, "a point is not a list of 3 elements");
            assert(is_num(point.x) && is_num(point.y) && is_num(point.z), "a point component is not a number");
        }
    }

    /* Generate inputs */

    // Collect all the points
    points = [ for (slice = slices) each slice ];

    // Define all the faces
    faces = [ for (slice = [0 : _num_slices - 1]) each [
        // For each slice, define rectangular faces that connect it to the next slice
        for (i = [0 : _num_points - 1]) [
            // Two points on the current slice
            (slice * _num_points) + i,
            (slice * _num_points) + (i + 1) % _num_points,
            // Two points on the next slice (possibly zeroth)
            ((slice + 1) % _num_slices * _num_points) + (i + 1) % _num_points,
            ((slice + 1) % _num_slices * _num_points) + i,
        ]
    ] ];

    /* Render */

    polyhedron(points, faces);
}


module test() {
    thickness = 10;
    radius = 30;
    delta_z = 10;
    waves = 2;

    fn1 = 36;
    fn2 = 360;

    function slice_tilt(t) = [- sin(waves * t * 360) * delta_z * waves * 2/3, 0, 0];
    function slice_displacement(t) = [0, 0, cos(waves * t * 360) * delta_z / 2];

    c_base = pts_translate3(
        pts_rotate3(
            pts_inflate(pts_circle(thickness / 2, fn1)),
            [90, 0, 0]
        ),
        [radius + thickness / 2, 0, 0]
    );

    cs = [ for (t = [1 / fn2 : 1 / fn2 : 1])
        pts_translate3(
            pts_rotate3(
                pts_rotate3(
                    c_base,
                    slice_tilt(t)
                ),
                [0, 0, t * 360]
            ),
            slice_displacement(t)
        )
    ];

    pts_extrude(cs);
}


test();
```

{{% /details %}}
