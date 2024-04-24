---
external: false
draft: true
title: "Diagonal Matrix Traversal (Python)"
description: "An algorithm to traverse across a square matrix diagonally."
date: 2024-04-22
tags: ["Matrix", "Linear Algebra", "Traversal", "Diagonal"]
---
#### Output of diagonally wrapping traversal
```
Pre-diagonal string: "123456789"
['1', '2', '3']
['4', '5', '6']
['7', '8', '9']

Post-diagonal string: "142753869"
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The goal of this project is simple - traverse a matrix diagonally while wrapping and storing the contents of each cell to a string. To understand why exactly someone might want to do this, read up on the random-test I developed for my [HRNG](https://arxiv.org/abs/2404.09395) research, [The FLS Test](Link_coming_soon).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So the goals are simple: We must first convert the string to a matrix, traverse that matrix diagonally, and store the output of each cell as a string.