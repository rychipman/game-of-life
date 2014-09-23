Project 1 : Game of Life
========================

##Ryan Chipman

###Execution Instructions

Running this is very easy -- just open up the life.html file in a modern web browser and enjoy!

###Grader Direction

The following is a collection of some things in this project that are particularly noteworthy or that are deserving of consideration when grading, each one accompanied by a brief description.

- Map/Reduce/Filter

Instead of using iteration when manipulating my board, I made use of the map/reduce/filter design patterns, which made my code a lot less leggy and easier to read (in general).

https://github.com/6170-fa14/rchipman_proj1/blob/ebef3869755abd6136a0f7d6594ff973fa9b2964/lifeModel.js#L32-L39
https://github.com/6170-fa14/rchipman_proj1/blob/ebef3869755abd6136a0f7d6594ff973fa9b2964/lifeModel.js#L45-L53
https://github.com/6170-fa14/rchipman_proj1/blob/ebef3869755abd6136a0f7d6594ff973fa9b2964/lifeModel.js#L59-L63
https://github.com/6170-fa14/rchipman_proj1/blob/ebef3869755abd6136a0f7d6594ff973fa9b2964/lifeModel.js#L113-L116

- Modularity

I took a great deal of care making sure the game logic and the graphics logic were properly separated. Furthermore, abstracting the Board and Game separately was very helpful, as it allowed the Board to remain totally ignorant of graphics concerns, while the Game managed the Board, the step timer, and the graphics (through the viewController public interface).

[No specific link for this one, since it's more about design concepts than about individual lines]

- Clean namespacing & scoping

It can be really easy to clutter up the Javascript namespace and to have very messy and unclear scoping. I encapsulated everything under a custom namespace to keep it clean, and even within that namespace all the business logic is cleanly encapsulated and exposed through a minimal public interface.

https://github.com/6170-fa14/rchipman_proj1/blob/ebef3869755abd6136a0f7d6594ff973fa9b2964/lifeModel.js#L2

- Object-orientation

I used closures to create objects with private fields and methods.

[again no specific link, just skimming the code will show what I'm talking about]


###Design Challenges

These are some of the design choices that were made during the development of this project, the other options that were considered, and some of the reasoning behind the final choices.

- Abstraction

It was really important to decouple the graphics logic from the board/game logic. I also decided to include a viewController to provide a simpler interface between the high-level game logic and the lower-level graphics libs. The game logic shouldn't have to worry about what steps go into drawing a rectangle. Furthermore, I made the decision to Separate the board (which was just the abstraction for the state of the game and the rules for how that state changed) from the Game (which was more focused on the mechanics and steps of running the game and taking the necessary steps to move from one state to the next at a high level).

- Map/Filter/Reduce

In light of what we learned in class, I decided to forego the old standby (for loops) for functionals. This included using the built-in array functionals, but also entailed building my own map function for the Board class (which used two nested Array.prototype.map calls to allow me to call a function on all elements of the board). Though they were a little less natural for me at first, especially when writing them, it was really nice to have them when I wanted to call a function on a whole collection of things (for example, to step the board to the next state, all I have to do is call map with the getNextState function!).

