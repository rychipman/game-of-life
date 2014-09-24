// This is the file that has all of my qUnit unittests
// as explained in the lifeModelPrivateTests file, this
// set of tests is also testing a bunch of private methods
// on top of the public interface

test("testing Cell initialization", function() {
    var c = lifeApp.Cell(2, 3, 1);
    equal(c.getState(), 1, "correct state");
    equal(c.getX(), 2, "correct x");
    equal(c.getY(), 3, "correct y");

    c = lifeApp.Cell(2, 2, 0);
    equal(c.getState(), 0, "correct state (0)");
});

test("testing cell neighbor functions", function() {
    var c = lifeApp.Cell(2,3,1);
    var d = lifeApp.Cell(2,4,1);
    var e = lifeApp.Cell(2,5,1);
    var f = lifeApp.Cell(1,4,0);
    var g = lifeApp.Cell(3,4,0);

    c.setNeighbors([d,f,g]);
    deepEqual(c.getNeighbors(), [d,f,g], "return correct neighbor list");
});

test("testing cell state changes", function() {
    var c = lifeApp.Cell(2,3,1);
    c.toggleState();
    equal(c.getState(), 0, "toggle cell off");

    c.toggleState();
    equal(c.getState(), 1, "toggle cell on");

    var d = lifeApp.Cell(2,4,1);
    var e = lifeApp.Cell(2,5,1);
    var f = lifeApp.Cell(1,4,0);
    var g = lifeApp.Cell(3,4,0);
    c.setNeighbors([d,f,g]);
    d.setNeighbors([c,e,f,g]);
    f.setNeighbors([c,d,e]);

    var next = c.stageStep();
    var current = c.getState();
    equal(next, 0, "on + 1 alive = off");
    equal(current, 1, "changes not applied yet");

    c.applyStep();
    current = c.getState();
    equal(current, 0, "now changes have been applied");
});

