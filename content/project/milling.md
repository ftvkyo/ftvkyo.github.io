---
title: "Milling calculator"
description: >
    Calculate speeds and feeds for milling bits.
math: true
---

{{% aside warn %}}
Surface speed presets are **unreliable**.
{{% /aside %}}

{{< interactive/milling-calculator >}}

## Personal experience

There are some settings that worked well for me.

### Tools

Code        | Diameter | Flutes | Material    | Link
----------- | -------- | ------ | ----------- | -------------------
`EHC570020` | 2mm      | 2      | HSS, coated | [Cutwel][EHC570020]
`EHC570040` | 4mm      | 2      | HSS, coated | [Cutwel][EHC570040]

[EHC570020]: https://www.cutwel.co.uk/2mm-2-flute-tialn-coated-premium-superhard-hss-short-length-slot-drill-esh57-yg-1-ehc570020
[EHC570040]: https://www.cutwel.co.uk/4mm-2-flute-tialn-coated-premium-superhard-hss-short-length-slot-drill-esh57-yg-1-ehc570040

### Settings

Legend:
- \(V_s\) - surface speed (m/min)
- \(L\) - chip load (mm)
- \(v\) - spindle speed (RPM)
- \(V_f\) - feed XY (mm/min)

#### Material: Acrylic

Tool | \(V_s\) | \(L\) | \(v\) | \(V_f\) | Verdict
--- | --- | --- | --- | --- | ---
`EHC570040` | ~38.1 | 0.025 | 3032 | 152 | Perfect (slow)
`EHC570040` | ~38.1 | 0.05  | 3032 | 303 | Perfect (medium)
`EHC570040` | ~38.1 | 0.075 | 3032 | 450 | Perfect (fast)
`EHC570020` | 25    | 0.02  | 3979 | 159 | Light melting on slot cuts

---

This page is inspired by [Fablab Feeds and Speeds Calculator](https://pub.pages.cba.mit.edu/feed_speeds/).
