Project 1 : Game of Life
========================

##Ryan Chipman

# Phase 2

###Execution Instructions

To open the game, open the file __life.html__ in a modern web browser. This will show you the game and a set of basic directions if you're at all confused as to how to get started. To look at tests, open the file __tests.html__.

###Grader Direction

####Highlights

Many of the points that I would light to highlight for grading are ones that I have already mentioned down below in design challenges. So, I will refer the grader down there for a more detailed description of the elements, and take this space up here to provide links to the specific lines.

- Cell Class
- Optimizing
- Graphics Reorganization
- Save and Restore

####Questions

This class has heavily advocated for the use of functionals in place of iteration. Aren't functionals inherently slower than iteration in many cases? I understand the benefits when it comes to the readability and conceptual clarity of the code, but, especially with resource-intensive applications (like the Game of Life could be were it made large enough), what is the proper balance between nice-to-read code and performance?

Second, I have noticed that every so many seconds the DOM seems to 'hang' for a fraction of a second. Why is this, and what, if anything, can I do to fix it? (I have not tested my project on other machines, so it is also altogether possible that my machine was just too busy at the time).

###Design Challenges

A number of important design changes were made while updating my project from phase 1. All in all, they added up to give me a much better and cleaner abstraction, more efficient computation of steps, and increased modularity that made incorporating my additional features smooth and simple.

- Cell class

This was one of the first decisions I made upon starting phase 2. I previously thought it was abstraction-overkill to have a whole class for a single cell when a boolean or int would suffice. However, using primitives instead of an abstraction forced me into using a 2D-array in the Board class (which made for some messy functionals), and resulted in me having more & messier functions in my Board class than I would have liked. Getting rid of it allowed me to greatly simplify my abstractions, and, as I will detail next, make my code more efficient.

- Optimizing the Game

With a sufficiently large board, the game started to slow down. The solution of simply limiting board size felt cheap to me, and so I went about optimizing my code. My initial implementation was rife with unnecessary iteration. To fix this, I changed my viewController implementation so that I only sent the cells that had changed to be updated. This saved TONS of iteration on the GUI side, especially for simpler patterns. To parallel that on the model side, I implemented a strategy that, whenever the game stepped, only calculated the next state for cells that were eligible to change (i.e. cells that changed the previous iteration and the neighbors of such cells). This resulted in snappier performance overall, and meant that performance was now no longer a function of board size, but rather of the size and complexity of the board _state_ at any given time.

- Graphics library reorganization

When using the canvas as my graphics library, the viewController functioned as an intermediary between the low-level graphics functions and the high-level Game class. However, when it came time to switch to a DOM-based implementation, I wanted to simplify things a bit. By creating my board (made of divs) dynamically using javascript and applying and removing css classes with javascipt to change colors, etc, I was able to greatly compact the amount of code I needed to achieve my desired effect, while not sacrificing functionality or clarity to do so.

- Save and Restore functionality

In my previous phase, I parsed URL parameters to get a starting state. This was an incredibly messy way of doing things, but it did inspire my additional feature that I added. I added a feature that allows the user to save and restore patterns (only for the current session, as there is no persistent storage). This allows for a slightly better exploratory experience with the application, and also allows me to 'preload' the site with an interesting pattern or two. As I mentioned above, the work I did on cleaning up my abstractions made this feature a piece of cake to implement!

# Phase 1

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

