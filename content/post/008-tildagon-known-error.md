---
title: "Making a \"Known Error\" app for Tildagon"
date: 2024-06-17T10:00:00Z
tags: [Events]
toc: true
aliases:
- "008"
description: >
  Quick and not-so-dirty commemoration of an "Unknown Error" message we all know and "love"
draft: true
---

At the end of May 2024, I went to my first [EMF Camp](https://emfcamp.org), and I loved it.
It had many interesting things to see and cool people to meet.
I can't say I made new friends there, but I did get closer to members of [Edinburgh Hacklab](https://wiki.ehlab.uk) which I am also a member of.

This post if not about EMF Camp though, it is about one of its highlights: the [Tildagon](https://tildagon.badge.emfcamp.org/) badge.
These badges are electronic devices that are meant to be extended and modified, this is a [hacker](https://en.wikipedia.org/wiki/Hacker) event after all.
The badges could be preordered for 25£.

{{< figure src=`/img/008/tildagon.webp` caption=`My Tildagon when I just received and assembled it` >}}

## A bit more about the Tildagon

Tildagons have many features, some of which are:
- Amazing artwork and interesting design
- ESP32 microcontroller that runs [MicroPython](https://micropython.org/)
- Round display, some bright RGB LEDs
- USB-C, WiFi, Bluetooth with BLE
- 6 Hexpansion connectors (custom solution for extending the badges functionality or changing its look)
- Some buttons, a bunch of sensors
- A battery

People can freely develop applications and hexpansions for these badges.
It's an open-souce project, and even if some hardware is poorly documented or inaccessible from software, it can be fixed.
EMF organisers also intend to reuse the same badges for future events, as previous generations of badges felt more like one-off things, and they didn't like that.

I am excited to see what people would come up with in the following 2 years by the time EMF Camp 2026 comes.
In fact, by the time of EMF Camp 2024, many people already had developed something for the Tildagons!
Lots of simple hexpansions were available for purchase or just given away.
There was also the amazing [Great Camp Hexpansion Quest](https://gchq.net/) -- they hang **88** little hexpansions around the entire campsite for people to find, plug into their badges and progress in leaderboards! [^don-t-do-this]

[^don-t-do-this]: Generally... please don't connect random stuff you find outside to your devices.

## Why I made this post

Some creators have already made some inspirational publications about the badges.
I want my post to be inspirational for others as well, even if it does not feel very sophisticated.

- Hackaday: [Hands-On With The Electromagnetic Field 2024 Badge](https://hackaday.com/2024/06/01/hands-on-with-the-electromagnetic-field-2024-badge/)
- Terence Eden: [Displaying a QR code in MicroPython on the Tildagon Badge](https://shkspr.mobi/blog/2024/06/displaying-a-qr-code-in-micropython-on-the-tildagon-badge/)

On the day I received the badge, its firmware was not very useful.
I think it was not even possible to install software from their App store at that moment.
However, it was still fun to play with, and cool to see how quickly common problems were fixed by the badge volunteer team.

On that day, I got my badge stuck in a state where it would just show "Unknown Error" and would not respond.
I could just reboot it, but I thought -- isn't this kind of in the spirit?
However, I thought that the error message was not flashy enough :D
So I decided to make an app that would let me access the "flashy error experience" on demand.

## How I made the "Known Error" app

- GitHub: [ftvkyo/tildagon-known-error](https://github.com/ftvkyo/tildagon-known-error)
- Tildagon Docs: [Run apps on real hardware](https://tildagon.badge.emfcamp.org/tildagon-apps/run-on-badge/)

It was actually very easy to make an app.
As I had a physical badge, I didn't need to bother with setting up an emulator.

I mentioned that the badge runs MicroPython.
For the app to work, it only needed to contain a few files:

- `metadata.json` that tells the badge's firmware how to run the app
- `app.py` with the actuall app functionality
- `__init__.py` to export the main class of the app (not sure if it's required)

`metadata.json` stayed the same:
```json
{
    "callable": "KnownErrorApp",
    "name": "Known Error",
    "path": "apps.known-error.app",
    "hidden": false
}
```

`__init__.py` stayed the same:
```py
from .app import KnownErrorApp
```

For the first installation, a directory for the app needs to be created:

```sh
mpremote mkdir apps
mpremote mkdir apps/known-error
```

App installation process looked like this:

```sh
# Assuming the 3 app files I mentioned are in the `app/` directory
mpremote cp app/* :/apps/known-error/

# Now the controller needs to be rebooted.
#
# For me, the easiest way was to:
# 1. Launch mpremote
mpremote
# 2. Send an interrupt
#   Press Ctrl-C
# 3. Soft-reset the device
#   Press Ctrl-D
# 4. Disconnect from mpremote
#   Press Ctrl-X
```

Now, let's look at the actual code!

### Displaying text

Here is the full code of the initial version.
It does 3 things:
- Checks if the "CANCEL" button was pressed to exit the app
- Fills the screen with black color
- Draws "Known Error" text roughly in the middle of the screen

```py
import asyncio
import app

from events.input import Buttons, BUTTON_TYPES


class KnownErrorApp(app.App):
    def __init__(self):
        self.button_states = Buttons(self)

    def update(self, delta):
        if self.button_states.get(BUTTON_TYPES["CANCEL"]):
            self.button_states.clear()
            self.minimise()

    def draw(self, ctx):
        ctx.save()
        ctx.rgb(0, 0, 0).rectangle(-120, -120, 240, 240).fill()
        ctx.rgb(1, 1, 1).move_to(-80, 0).text("Known Error")
        ctx.restore()
```

### Changing displayed text in runtime

I wanted some interactivity from the app.
Specifically, I wanted to be able to select which error message shoudld be displayed.

This required:
- Determining which error messages should be available
- Checking if "UP" or "DOWN" buttons were pressed to change the text
- Displaying the currently selected error message


{{% details "How I implemented text selection" %}}

```py
import asyncio
import app

from events.input import Buttons, BUTTON_TYPES


TEXTS = [
    "Known Error",
    "Unknown Error",
]


class KnownErrorApp(app.App):
    def __init__(self):
        self.button_states = Buttons(self)

        self.text_index = 0

   def update(self, delta):
        if self.button_states.get(BUTTON_TYPES["CANCEL"]):
            self.button_states.clear()
            self.minimise()

        if self.button_states.get(BUTTON_TYPES["UP"]):
            self.button_states.clear()

            self.text_index += 1
            self.text_index %= len(TEXTS)

        if self.button_states.get(BUTTON_TYPES["DOWN"]):
            self.button_states.clear()

            self.text_index = self.text_index - 1
            self.text_index %= len(TEXTS)

    def draw(self, ctx):
        ctx.save()
        self.clear_background(ctx)
        ctx.rgb(1, 1, 1).move_to(-80, 0).text(TEXTS[self.text_index])
        ctx.restore()

    def clear_background(self, ctx):
        ctx.rgb(0, 0, 0).rectangle(-120, -120, 240, 240).fill()
```

{{% /details %}}


### Adding glitch effects to make it more fun

I mentioned I wanted the app to be flashy.
Just displaying static text is not flashy.
So I wanted to add something dynamic into the app, something that changes on its own, without user interaction.

My original idea was to fill some part of the display with scattered pixels of different colors.
However, I crashed the badge a few times trying to do this (probably consumed too much memory), and it didn't look great either.

So in the end I decided to do these things:
- Add vertical stripes on top of the displayed image
  - Random number
  - Random colors
  - Random positions
- Make the LEDs around the display more chaotic
- Change the pattern periodically (every 2 seconds)


{{% details "How I implemented glitch effects" %}}

```py
import math
from random import random, randint

import app
from tildagonos import tildagonos
from events.input import Buttons, BUTTON_TYPES
from system.eventbus import eventbus
from system.patterndisplay.events import PatternDisable, PatternEnable


MIN = -120
MAX = 120
SIDE = MAX - MIN

CENTER = (MIN + MAX) / 2


LED_COLORS = [
    (0, 0, 0),
    (0, 0, 15),
    (0, 15, 0),
    (0, 15, 15),
    (15, 0, 0),
    (15, 0, 15),
    (15, 15, 0),
    (15, 15, 15),
]


TEXTS = [
    "Known Error",
    "Unknown Error",
]


class KnownErrorApp(app.App):
    def __init__(self):
        self.button_states = Buttons(self)

        # Selected display text
        self.text_index = 0

        # Glitch effect
        self.glitch_enabled = False
        self.glitch_timing = 0
        self.glitch_period_ms = 2000
        self.glitch_stripes = []
        self.glitch_leds = []

    #############
    # Overrides #
    #############

    def update(self, delta):
        if self.glitch_enabled:
            self.glitch_timing += delta
            if self.glitch_timing > self.glitch_period_ms:
                self.glitch_timing = 0
                self.update_glitch()

        if self.button_states.get(BUTTON_TYPES["CANCEL"]):
            self.button_states.clear()
            print("Closing")
            eventbus.emit(PatternEnable())
            self.minimise()

        elif self.button_states.get(BUTTON_TYPES["CONFIRM"]):
            self.button_states.clear()
            self.glitch_enabled = not self.glitch_enabled
            print(f"Glitch enabled: {self.glitch_enabled}")
            if self.glitch_enabled:
                eventbus.emit(PatternDisable())
            else:
                eventbus.emit(PatternEnable())

        elif self.button_states.get(BUTTON_TYPES["UP"]):
            self.button_states.clear()
            self.text_index += 1
            self.text_index %= len(TEXTS)

        elif self.button_states.get(BUTTON_TYPES["DOWN"]):
            self.button_states.clear()
            self.text_index -= 1
            self.text_index %= len(TEXTS)

    def draw(self, ctx):
        ctx.save()
        self.clear(ctx)
        self.text(ctx, TEXTS[self.text_index])
        if self.glitch_enabled:
            self.glitch(ctx)
        ctx.restore()

    ###########
    # Updates #
    ###########

    def update_glitch(self):
        self.glitch_stripes = []
        for _ in range(randint(0, 32)):
            x = MIN + random() * SIDE
            r, g, b = random(), random(), random()
            self.glitch_stripes.append((x, r, g, b))

        self.glitch_leds = []
        for _ in range(12):
            i = randint(0, len(LED_COLORS) - 1)
            self.glitch_leds.append(LED_COLORS[i])

    ###########
    # Display #
    ###########

    def clear(self, ctx):
        ctx.rgb(0, 0, 0).rectangle(MIN, MIN, SIDE, SIDE).fill()

    def text(self, ctx, text):
        width = ctx.text_width(text)
        left_edge = CENTER - width / 2
        ctx.rgb(1, 1, 1).move_to(left_edge, 0).text(text)

    def glitch(self, ctx):
        for (x, r, g, b) in self.glitch_stripes:
            ctx.rgb(r, g, b).rectangle(x, MIN, 1, SIDE).fill()
        for (i, color) in enumerate(self.glitch_leds):
            tildagonos.leds[i + 1] = color
```

{{% /details %}}
