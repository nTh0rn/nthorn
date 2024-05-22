---
external: false
title: "Integer-only Raycaster (Batch)"
description: "A raycaster I wrote in Batch doesn't use any trigonometric function or non-integers."
tags: ["Raycaster", "Challenge", "Engine", "Algorithm", "Batch", ""]
date: 2024-01-17
draft: true
---

# Table of Contents
1. [What is a Raycaster?](#1.-the-fractional-line-symmetry-test)
2. [Intro](#2.-visualization)
3. [Line Counting](#3.-line-counting)\
3.1 &nbsp;[Horizontal Line Counting](#3.1-horizontal-line-counting)\
3.2 &nbsp;[Vertical Line Counting](#3.2-vertical-line-counting)
4. [Empirical Proof for Line Count Estimation](#4.-empirical-proof-for-line-count-estimation)


{% table %}
 * ![](/images/batch_raycaster/batch_raycaster_walking.gif) {% align="center" %}
{% /table %}
[**Checkout the code for this over on GitHub**](https://github.com/nTh0rn/batch-raycaster).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pictured above is my Raycaster that I built in Batch. This project had many challenges, most notably, the
inability to use floating point numbers or basic trigonmetric functions. This meant I had to get creative in regard to the actual casting of the rays, as well
as the storage of the map.

## Map
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The first thing I had to do was figure out some way to store the map. This was accomplished using dynamic variable naming, which is the Batch equivilent to arrays.
First the map is stored in a text file as shown.
{% table %}
 * ![](/images/batch_raycaster/room.txt.png) {% align="center" %}
{% /table %}
Note the hightlighted **P**. This denotes where the player is in the map. You may also note the dots used instead of blank spaces. Batch is basically incapable of comprehending blank spaces in strings, so some filler character must be used instead. This map is 10x10, but the raycaster can support larger maps.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The map is then read line by line, and character by character. Each character is then assigned to its appropriate coordinate, saving the player's coordinates seperately.
```batch
set mapx%x%y%y%=!char!
if "!char!"=="P" (
	set pcord=x%x%y%y%
	set /a px=!x!
	set /a py=!y!
)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;One issue though, how do we navigate within cells on the map if we cannot use floating point numbers? The answer is to scale the map up. The higher the scale, the more accurate the raycasting - but also the longer it takes to calculate!

## Scaling
{% table %}
 * ![](/images/batch_raycaster/raycaster_scale.png) {% align="center" %}
{% /table %}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scaling is very simple. The coordinate system used is not actually 10x10 from the map. Instead, every x and y coordinate is scaled by some number, 500 for example, meaning your grid is actually 5000x5000, with a different cell every 500 units. I usually go overboard and use 500, but anywhere between 150-300 can provide suffecient visual fidelity while also rendering faster.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When working on a scaled grid, it allows you to more precisely calculate the distance of the ray
# How to use
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To move, type the coordinates of the piece you want to move and where
you want it to move to. For example:
```e2e4```

{% table %}
 * ![](/images/batch_raycaster/raycast_visualized.gif) {% align="center" %}
{% /table %}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upon opening, whoever's move it is is determined by who actually moves first.
This was done to avoid additional fen-parsing.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Still a pretty cool demo though in my opinion! I might someday write up a full article about the challenges of this project and how I approached legal-move calculation. So for now, I encourage you to look at the code if you're curious!

# Evaluation
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The evaluation only works by using piece-tables, obtained from [here](https://www.chessprogramming.org/Simplified_Evaluation_Function) (The Chess Programming Wiki is a goldmine, I highly recommend it.). Again, I was going to implement an actual chess-engine, and then I wised up.
![](/images/chessbit/eval.png)
## A statement on switch-statements and the goto function.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A lot of what I wanted to do when writing this program was use switch-statements and goto loops. Unfortunately, Batch does not have switch statements. What it does have, however, is a dynamic text system that allows you to imbed variables into variable names.

This means the following code:
```
switch(input) {
    case x:
        ...
        break;
    case y:
        ...
        break;
    case z:
        ...
        break;
}
```
In Batch, is written as this:
```
goto switch_%input%

:switch_x
    ...
    goto :eof
:switch_y
    ...
    goto :eof
:switch_z
    ...
    goto :eof
```
The bad news, however, is that when using the goto function in Batch, it doesn't just jump straight to the line that has that function. Instead, Batch immediately jumps to the start of the file and reads downward until it finds the function. That means loops or switch statements kept near the top of your code will run faster than if they were at the bottom of your code.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I hope it is apparent now way I moved away from writing this in Batch. Be sure to check out the code for this over on [GitHub](https://github.com/nTh0rn/chessbit).