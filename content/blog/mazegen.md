---
external: false
title: "Maze Generation and Pathfinding (C++)"
description: "You can author content using the familiar markdown syntax you already know. All basic markdown syntax is supported."
date: 2024-04-21
---
#### Recursive Backtracking - 1 Depth
![idkman](/images/mazegen.gif)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The gif above shows my maze generation and pathfinding algorithm I wrote for my upcoming untitled 3D ascii-graphics analog-horror game. This project proved to be a fruitful exploration of recursive algorithms as well as, obviously, maze generation and pathfinding.

## Generation
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I explored many different forms of maze generation, but ultimately decided on a form of [recursive backtracking](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation) that searches only 1 layer of walls deep.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The trickiest part of this generation is that I wanted the spaces that walls and paths use to be permeable in regard to the same grid. Basically, I wanted a single 2D vector to contain the entire maze, and for it to be feasible for paths and walls to exist on any single coordinate. I wanted this both for the convienence of the single vector that holds the whole map, and because I wanted the walls to be the same thickness as the paths. This proved to cause some difficulties when attemping 2-level-deep recursive backtracking.

#### Recursive Backtracking - 2 Depth
![idkman](/images/mazegen2.gif)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note that if you compare this generation to the one at the start of this article, there are *far* less walls connecting to eachother. That is because this implementation, before placing a pathway, checks a particular direction up to 2 nodes away. This (for the most part) prevents walls from connecting to previously generated walls. This makes a much more traditional maze, but was not ideal for gameplay.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Since I allow a path or a wall to exist on any node, that also means large amounts of the map go to waste as the algorithm fails to fully search what otherwise might be potential paths due to the complex combinations of walls and paths that the algorithm cannot discern are pathable within a 2-depth search. This implementation also, rather admitedly, was quite buggy. It often times placed paths in places that directly contradict the algorithm to my bafflement, creating even more wasted space and creating loops (which should not exist under the definition of this algorithm whatsoever). This bug, combined with 1-depth search, actually created exactly what I ultimately wanted.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I went with 1-depth search as that caused the most interconnectedness - both from the level of depth and from this inexplicable bug. Note how often the path generated using 2-depth search is long and windy, giving the player few options for exploration, and even fewer options for escape from monsters. 1-depth search provides plenty of paths for the player to use, and plenty of avenues for monsters to sneak up on them.

## Pathfinding

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The pathfinding algorithm is, quite possibly, the _**Worst**_ implementation of flood-fill known to man. You may be familiar with flood-fill in the form of [A*](https://en.wikipedia.org/wiki/A*_search_algorithm). A* uses floodfill by only searching nodes that have the highest potential to reach the target first, a heuristic that changes as the flooding encounter walls. This also means that since A* hops to whatever node shows the highest potential, it cannot (or maybe just should not) be implemented using recursion.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My implementation of pathfinding was, in part, recycled from code using to generate the maze - meaning its recursive. The algorithm works as such:
 1. Within the current node, store how many steps it took to get here.
 2. Pick a random open pathway along a cardinal direction.
    * If there are no open pathways besides the one used to get here, then return function.
 3. Does the node in selected direction have a stored distance higher than the distance of the current node + 1? (untouched nodes store infinity distance by default)
    * If yes, call self at that new node (**recursion occurs here**).
    * If no, pick a new direction.
       * If no new directions can be picked, then return function.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This algorithm is guaranteed to find the shortest path to the objective. It is *also* guaranteed to mark absolutely every single open pathway node with its correct distance from the objective - regardless of how far out-of-the-way that is. A solution with 20 steps could have already been found, and the algorithm could continue searching and storing distances thousands of times larger.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the context of my game, map size, and PC specs, this has not proved to be a problem peformance-wise (even when calling this algorithm 30 times every second - all on its own thread of course). I believe that I, as a programmer, am a victim (lol) of how good computers are now-a-days. I have thus far gotten away with writing this atrocious algorithm, and have faced zero consequences besides the shame of this article. I fully intend to implement A* eventually, but for now this solution has worked quite well.

 ## Conclusion

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the case of maze generation, I think the moral is very much a retelling of the classic **"It's not a bug, it's a feature."** I am very satisfied with how the maze generation turned out. Pathfinding on the otherhand, well, I think the moral of the story there is that **"If it works then it works"**. As atrociously inefficient as it is, it still runs more than fine on modern hardware. Be sure to keep an eye out for more posts related to my upcoming untitled 3D ascii-graphics analog horror game.