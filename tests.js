// This is the file that has all of my qUnit unittests
// as explained in the lifeModelPrivateTests file, this
// set of tests is also testing a bunch of private methods
// on top of the public interface

test("testing Board initialization", function() {
    var b = lifeApp.Board(3, 2, false);
    var grid = b.init();
    equal(grid.length, 3, "correct width");
    equal(grid[0].length, 2, "correct height");

    grid = b.init(["0,0", "1,1", "2,0"]);
    deepEqual(grid, [[1,0],[0,1],[1,0]], "specifying start state");
});


test("testing Board copyBoard function", function() {
    var b = lifeApp.Board(3, 3, false);
    var grid = b.init(["0,0", "1,1", "2,2"]);
    var copy = b.copyBoard(b);
    deepEqual(copy, grid, "check that copyBoard works correctly");
});

test("testing Board getNextState function", function() {
    var b = lifeApp.Board(3, 3, false);
    b.init(["0,0", "1,0", "2,0", "2,2"]);

    var next_state = b.getNextState(0,2);
    equal(next_state, 0, "check dead + 0 neighbors = dead");

    next_state = b.getNextState(2,2);
    equal(next_state, 0, "check live + 0 neighbors = dead");

    next_state = b.getNextState(1,2);
    equal(next_state, 0, "check dead + 1 neighbors = dead");

    next_state = b.getNextState(0,0);
    equal(next_state, 0, "check live + 1 neighbors = dead");

    next_state = b.getNextState(0,1);
    equal(next_state, 0, "check dead + 2 neighbors = dead");

    next_state = b.getNextState(1,0);
    equal(next_state, 1, "check live + 2 neighbors = live");

    next_state = b.getNextState(2,1);
    equal(next_state, 1, "check dead + 3 neighbors = live");

    b.init(["0,0", "0,1", "1,0", "1,1", "0,2", "2,2"]);
    next_state = b.getNextState(0,0);
    equal(next_state, 1, "check live + 3 neighbors = live");

    next_state = b.getNextState(1,2);
    equal(next_state, 0, "check dead + 4 neighbors = dead");

    next_state = b.getNextState(0,1);
    equal(next_state, 0, "check live + 4 neighbors = dead");

    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check live + 5 neighbors = dead");

    b.init(["0,0", "1,0", "0,1", "0,2", "1,1", "2,1", "2,2"]);
    next_state = b.getNextState(1,2);
    equal(next_state, 0, "check dead + 5 neighbors = dead");

    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check live + 6 neighbors = dead");

    b.init(["0,0", "1,0", "2,0", "0,2", "1,2", "2,2"]);
    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check dead + 6 neighbors = dead");

    b.init(["0,0", "1,0", "2,0", "0,1", "0,2", "1,2", "2,2"]);
    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check dead + 7 neighbors = dead");

    b.init(["0,0", "1,0", "2,0", "0,1", "1,1", "0,2", "1,2", "2,2"]);
    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check live + 7 neighbors = dead");

    b.init(["0,0", "1,0", "2,0", "0,1", "2,1", "0,2", "1,2", "2,2"]);
    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check dead + 8 neighbors = dead");

    b.init(["0,0", "1,0", "2,0", "0,1", "1,1", "2,1", "0,2", "1,2", "2,2"]);
    next_state = b.getNextState(1,1);
    equal(next_state, 0, "check live + 8 neighbors = dead");
});

test("testing Board step function", function() {
    var b = lifeApp.Board(3, 3, false);

    b.init(["0,0"]);
    var next_grid = b.step();

    b.init(["0,0", "0,1"]);
    next_grid = b.step();
    deepEqual(next_grid, [[0,0,0],[0,0,0],[0,0,0]], "check 1-neighbor rule");

    b.init(["0,0", "0,1", "1,0"]);
    next_grid = b.step();
    deepEqual(next_grid, [[1,1,0],[1,1,0],[0,0,0]], "check 2-neighbor rule and 3-neighbor reproduction");

    b.init(["0,0", "1,0", "0,1", "1,1"]);
    next_grid = b.step();
    deepEqual(next_grid, [[1,1,0],[1,1,0],[0,0,0]], "check 3-neighbor staying alive rule");
});
