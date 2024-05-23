---
external: false
title: "Integer-only Raycaster (Batch)"
description: "A raycaster I wrote in Batch doesn't use any trigonometric function or non-integers."
tags: ["Raycaster", "Challenge", "Engine", "Algorithm", "Batch", ""]
date: 2024-05-22
draft: true
---

# Table of Contents
1. [Intro](#intro)\
1.1 &nbsp;[Demo / Source Code](#demo)\
1.2 &nbsp;[What is Raycasting?](#)
2. [The Map](#)\
2.1 &nbsp;[Scaling](#)
3. [The Screen](#)\
3.1 &nbsp;[Vertical Columns](#)
4. [Empirical Proof for Line Count Estimation](#)

# 1. Intro
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This article explains the solutions I used in the creation of my Batch raycaster.
This is a notable challenge as Batch is very low level language and, quite frankly, an awful language. However, it can be incredibly fun
to code in, and always yields interesting solutions to what are otherwise trivial problems in most languages.

## 1.1 Demo / Source Code
[Source code on GitHub](https://github.com/nTh0rn/batch-raycaster)
{% table id="demo"%}
 * ![](/images/batch_raycaster/batch_raycaster_walking.gif) {% align="center" %}
{% /table %}



## 1.2 What is Raycasting?
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The basic jist of raycasting is that every single vertical column of the user's screen is assigned to a ray on a 2D top-down representation of the player's map. How far that ray can imminate from the player before hitting a wall corresponds to the length of a line drawn in its vertical column. This means walls that are far away yield small vertical lines, and walls that are close yield large vertical lines.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So raycasting relies on one basic principle: ***Things look smaller when they are farther away***.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check out [Lode Vandevenne's fantastic article on raycasting](https://lodev.org/cgtutor/raycasting.html) for a full explanation of floating point raycasting. My article focusses on explaining the integer-only solutions to raycasting, and will not recover the basics beyond unique solutions.


## The Map
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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scaling is very simple. The coordinate system used is not actually 10x10 from the map. Instead, every x and y coordinate is scaled by some number, 500 for example, meaning your grid is actually 5000x5000, with a different cell every 500 units. Using 500 is a bit overboard, as anywhere between 150-300 can provide suffecient visual fidelity while also rendering faster.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Whether or not you'll collided with a cell is done by taking the current scaled coordinates and dividing them by the scale amount. The result will be the nearest rounded down integer, which can then be checked using the dynamic map variables for either a wall or blank space.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What happens if a wall is detected is talked about in [Calculating Distance](#calculating-distance).

## Vertical columns
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traditionally, you would generate the vertical columns on the fly in a raycaster. I found this to be a bit too much out of the scope of this project, especially since I wanted special characters are the top and bottom of walls. So instead, I use a set of variables that represent all possible vertical columns, stored horizontally as a string.

```batch
set d33=A···············‾··············B
set d32=A··············_‾··············B
set d31=A·············_##‾·············B
set d30=A·············—##—·············B
set d29=A············_####‾············B
set d28=A············—####—············B
set d27=A···········_######‾···········B
set d26=A···········—######—···········B
set d25=A··········_########‾··········B
set d24=A··········—########—··········B
set d23=A·········_##########‾·········B
set d22=A·········—##########—·········B
set d21=A········_############‾········B
set d20=A········—############—········B
set d19=A·······_##############‾·······B
set d18=A·······—##############—·······B
set d17=A······_################‾······B
set d16=A······—################—······B
set d15=A·····_##################‾·····B
set d14=A·····—##################—·····B
set d13=A····_####################‾····B
set d12=A····—####################—····B
set d11=A···_######################‾···B
set d10=A···—######################—···B
 set d9=A··_########################‾··B
 set d8=A··—########################—··B
 set d7=A·_##########################‾·B
 set d6=A·—##########################—·B
 set d5=A_############################‾B
 set d4=A—############################—B
 set d3=A##############################B
 set d2=A##############################B
 set d1=A##############################B
```
The `A` and `B` at the start and end of the line assist with whitespace later on in the code (as mentioned earlier, Batch is horrendous when dealing with whitespace.)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


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