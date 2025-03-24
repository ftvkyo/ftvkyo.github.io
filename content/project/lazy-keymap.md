---
title: "Lazy keymap"
description: >
    Keymap generator.
    Takes some configuration in and provides a [ZMK](https://zmk.dev) keymap config, an SVG reference card, and in the future, an [XKB](https://www.x.org/wiki/XKB/) layout description.
---

- Github repository: [ftvkyo/lazy-keymap](https://github.com/ftvkyo/lazy-keymap)
- Work started: *Dec 5, 2023*
    - Code recreated based on a previous implementation written in Python
    - And then again, but with a better approach to getting things done

{{< skills "Rust, ZMK, X Keyboard Config, SVG" >}}

{{< figure src=`refcard.svg` caption=`Example reference card for my one of a kind [Hovert60 keyboard](/post/devlog-hovert60-02/)` >}}

That refcard is generated based on 2 config files.
One of them is a config file that defines the shape and "slots" of the keyboard, and the other one specifies the actual mapping of the keys to those slots.

For now, what can be drawn in the SVG is quite limited, but it's already very useful.
Even though I have to manually assign styles and labels to keys, it's nice to keep a single source of truth for everything, as it reduces the chance of making mistakes.
I also really like what the SVG refcard looks like.

Here is the keymap file that was generated simultaneously with the refcard shown above:

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/bt.h>

/*
    This is file is
    a keymap "ftvkyo"
    for board "hovert60".
*/

#define DEFAULT 0
#define LOWER 1
#define BT0 BT_SEL 0
#define BT1 BT_SEL 1
#define BT2 BT_SEL 2
#define BTX BT_CLR
#define V_UP C_VOLUME_UP
#define V_DN C_VOLUME_DOWN
#define MUTE C_MUTE
#define MPLAY C_PLAY_PAUSE
#define MPREV C_PREVIOUS
#define MNEXT C_NEXT
#define B_UP C_BRIGHTNESS_INC
#define B_DN C_BRIGHTNESS_DEC

/ {
    keymap {
        compatible = "zmk,keymap";

        layer_0 {

            // Default

            bindings = <
&kp GRAVE  &kp N1     &kp N2     &kp N3     &kp N4     &kp N5                 /*   */             &kp N6     &kp N7     &kp N8     &kp N9     &kp N0     &kp BSPC
&kp TAB    &kp Q      &kp W      &kp E      &kp R      &kp T                  /*   */             &kp Y      &kp U      &kp I      &kp O      &kp P      &kp SQT
&kp LCTRL  &kp A      &kp S      &kp D      &kp F      &kp G                  /*   */             &kp H      &kp J      &kp K      &kp L      &kp SEMI   &kp RCTRL
&kp LSHFT  &kp Z      &kp X      &kp C      &kp V      &kp B      &kp LBKT    /*   */  &kp RBKT   &kp N      &kp M      &kp COMMA  &kp DOT    &kp SLASH  &kp RSHFT
                      &kp ESC    &kp LALT   &kp LMETA  &mo LOWER  &kp SPACE   /*   */  &kp SPACE  &kp RET    &kp LMETA  &kp RALT   &kp BSLH
            >;
        };

        layer_1 {

            // Lower

            bindings = <
&kp PSCRN  &kp F1     &kp F2     &kp F3     &kp F4     &kp F5                 /*   */             &kp F6     &kp F7     &kp F8     &kp F9     &kp F10    &kp DEL
&none      &bt BT0    &bt BT1    &bt BT2    &none      &bt BTX                /*   */             &none      &none      &none      &kp F11    &kp F12    &none
&trans     &kp MPREV  &kp V_DN   &kp V_UP   &kp MNEXT  &kp MINUS              /*   */             &kp EQUAL  &kp LEFT   &kp DOWN   &kp UP     &kp RIGHT  &trans
&trans     &none      &none      &none      &none      &none      &none       /*   */  &none      &none      &kp HOME   &kp PG_DN  &kp PG_UP  &kp END    &trans
                      &kp CAPS   &trans     &trans     &trans     &none       /*   */  &kp MUTE   &kp MPLAY  &trans     &trans     &none
            >;
        };

    };

};
```
