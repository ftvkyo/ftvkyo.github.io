---
title: "Keikakuban devlog #1: pain and suffering from recent tech"
date: 2023-05-25T19:48:00+01:00
tags: [Devlog, Keikakuban, TS]
description: >
  Adventures with Yarn, TypeORM, Typia, Next.js, tRPC and associated pain.
---

This is a recollection of an interesting experience that I got myself into.

The story is split into these episodes:

{{<toc>}}

## Discovery of an interesting open-source project

- Found Planka
- Used for a bit
- Got inspired

## Motivation to recreate that project with cool technologies

- Challenging framework which is not worth learning
- Inability to easily adapt the app to desired technologies
- Resulting in the necessity to rewrite it as not that much could be easily reused

## Design and technology choices

### Stage 1: I didn't know where it's going to take me

- Yarn: Workspaces, PnP
- Desire to divide and conquer
- Typescript references and --build
- Database schema using TypeORM
- Implemented API validator with TS types and runtime typechecks that became redundant later

### Stage 2: I looked at what I'd done and wondered when it's going to end

- Started trying to connect everything
- Spent a huge amount of time figuring out all the typescript options and how things are meant to be configured
- Prototyped the UI with Next.js and Tailwind CSS
- Could not get Next.js to use external packages, tried:
    - transpileModules
    - webpack custom config for transforming API typechecks
    - does not discover workspace dependencies even if they are defined as such
    - does not let tsconfig to provide paths outside of rootDir
- Next.js changing tsconfig by itself when it does not see the options even if those are explicitly defined in the parent tsconfig.
- Trying to use ts-patch, problems with yarn pnp
- Had a lot of "fun" with yarn constraints in prolog

### Stage 3: I tried to find a compromise

- Merged all packages together
- Loaded things with ts-loader in Next.js to allow transformations
- Considered prisma, had problems with yarn pnp
- tRPC + zod (getting rid of typia) while keeping TypeORM
- Change aim of perfectionism.
  Achieve more with less.

## Introspect

- Mistakes made.
- But was it possible to avoid them?
- It would be difficult to imagine that so many things would refuse to work with Yarn PnP.
- Also that Next.js would not easily support workspace packages because of it dynamic+framework nature.
- Some options were only discovered along the way (tRPC and zod which succeed my typesafe API design that I spent a lot of time on).

## Next steps

- Considering getting rid of next.js whatsoever and just using pure react
- Plans what I want to implement in the app
