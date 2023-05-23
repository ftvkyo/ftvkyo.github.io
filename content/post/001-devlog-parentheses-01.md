---
title: "Parentheses devlog #1: getting to LLVM IR emission"
date: 2021-06-27T21:00:00+08:00
tags: [Devlog, Parentheses, C++]
archived: true
---


## Table of contents
{{< toc >}}


## Pre-intro

I start these series hoping to continue them along with the development of
the project this devlog is related to.
Not only the project is an excercise for me, but the devlog itself is as well.
I think about making some games in the future, and how could I make a good
game without having a devlog about it?

Also, thanks to all the advice from different people who suggested some better
techniques of dealing with challenges I face in this project.


## Intro

I've recently got an idea to create a little programming language using
[LLVM][0]. Knowing how to do it would also be very useful for my future career,
so this idea went through the stupid-ideas-filter easily and
I started writing code for it.

Fortunately, there is a good introduction into language creation
[for begginers][1]. It doesn't bother defining abstractions, aiming at providing
very quick overview of things one would need to make a simple language.

However, this also means that when you try to implement something more
complex than the most basic language, you'd have to come up with these
abstractions by yourself.


## The language

For now, I left the language in a repository named `a` on [my github][gh].
Finding a name for something is always difficult for me, so I might just end up
using that "Parentheses" name I chose for this post.

The language is a Scheme-inspired C-like language. It has Scheme-like syntax
while having C-like internals. Just imagine that you took C, replaced all
its keywords with Scheme's special forms, used [prefix notation][2] in it
and added some parentheses. Here, that's almost what I'm doing.

The language does not have a runtime. It is expression-oriented, and
I'm yet to decide how to return big values from functions without leaking
them. But this is one of the smallest problems.


## What has been done already

As the tutorial says, I started with creation of a Lexer -- a thing that
converts a stream of characters into a stream of tokens. It was relatively easy.
I'm using C++, it's fun but also relatively painful. I think I'd do things
faster if I used Rust, but for now I'll stick to C++ and accept it as
a challenge.

From the start, I wrote code in classes to avoid polluting my code with global
variables. The classes I wrote are not entirely perfect, but are good enough.

I also made classes for Tokens, adding some fancy inheritance.
I started using polymorphism with `std::dynamic_cast<SomeTokenType*>(token)`
and I hated it. Tokens were stored in `std::unique_ptr`and I was trying to shove
`std::move` here and there. Unfortunately, that made code less readable,
so it was a premature optimization that was caused by my love for
Rust's move-by-default paradigm.

After struggling with these things for a while, I replaced `std::unique_ptr`
with `std::shared_ptr` (reference counting can't really make things worse here),
and made generic methods on the parent of Tokens to retrieve
internal values. Yes, they throw when there is no such value, but it is still
better than having to convert stuff through ugly dynamic cast in this case.

Ah, if only I could use Rust's enum. And don't tell me about `std::variant`,
I've tried it. You have to build your own abstractions on top
of such things to use them in a comfortable way.

Anyway, after Lexer I got to Parser that makes an [abstract syntax tree][3] from
a stream of tokens. There are many types of parsers, I didn't bother
finding out what I'm doing and just wrote it intuitively. It works, it has
acceptable code, it has some tests, it's good enough.

In general, I've decided to separate the build process into 5+ stages:
1. Lexing
2. Parsing
3. Verification of the AST
4. Transformation of the AST (like macros)
5. Emission of LLVM IR
6. Whatever I need to do here to make an executable


## Current state

I've got to some correct IR being generated! Let me illustrate current
pipeline:

### Input 👉
```scheme
(+ 1 2)
```

### Tokenized 👉
```
LB IDEN:+ INT:1 INT:2 RB

where
    LB: Left bracket
    RB: Right bracket
    IDEN: identifier
    INT: integer
```

### Parsed 👉
```
SpecialForm
    |
    +- Keyword:@block
    |
    +- FunctionCall
        |
        +- Identifier:+
        |
        +- Integer:1
        |
        +- Integer:2
```

`@block` keyword is added right before parsing. It allows for multiple top-level
expressions in the input file. Basically, it's a special form similar to
Rust's `{}`, it's value is equal to the value of the last expression in it.

### Verified 👉

    Checks that top level AST node is a special form and its
    first element is a keyword "@block"

### Transformed 👉

    No transformations applied yet

### IR Emitted 👉

```llvm
; ModuleID = 'a'
source_filename = "a"

define i64 @f_add(i64 %arg0, i64 %arg1) {
entry:
    %0 = add i64 %arg0, %arg1
    ret i64 %0
}

define i64 @__anon_expr() {
entry:
    %calltmp = call i64 @f_add(i64 1, i64 2)
    ret i64 %calltmp
}

define i64 @main() {
entry:
    %0 = call i64 @__anon_expr()
    ret i64 %0
}
```

In the generated IR, function `f_add` is a builtin function `+`,
`__anon_expr` comes from `@block` and `main` is main. The code, surprisingly,
works -- I was able to build it and check that the return value of the
program is three.

I will make a short pause on this step. For the current PR (#4),
I need to implement at least 4 extra functions -- subtraction, multiplication,
division and printing. And I should do it in such a way that avoids boilerplate
code. This is the current challenge, as I need to figure out what abstractions
to add. For example, there is `llvm::Value*`, but I can't just pass it around
everywhere, because sometimes I need extra data related to it. If there is
a function stored in the `Value`, I should also know its arguments
to be able to call it. This can be achieved if I pass `llvm::FunctionCallee`
around, but in this case there would be functons that return both `Value` and
`FuncitonCallee`, so I will have to separate them. I'm pretty sure I'll find
what is the idiomatic way to use LLVM's API eventually, I guess there are even
some helper types somewhere in the code.


## Future updates

Within the current PR (#4) I want to reach some minimal language that works
correctly on all correct and limited inputs. I might even skip `@define`
for now, it can be implemented later.

There will be plenty of content for future posts:
1. Making exceptions show what place in the code made them appear
2. Adding a type system
3. Adding anonymous functions
4. Adding closures
5. Restructuring the code in a way that is open for extension -- recent code
just doesn't scale well
6. Just sharing some interesting experience

Please tell me if there is some particular thing you are interested in. It can
be both something I've already briefly mentioned or something that I'll
get to working on only in the future. I also accept typo and style corrections.

Thanks for reading, bye!


[0]: https://en.wikipedia.org/wiki/LLVM
[1]: https://releases.llvm.org/12.0.0/docs/tutorial/MyFirstLanguageFrontend/index.html
[2]: https://en.wikipedia.org/wiki/Polish_notation
[3]: https://en.wikipedia.org/wiki/Abstract_syntax_tree

[gh]: https://github.com/ftvkyo
