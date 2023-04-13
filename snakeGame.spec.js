
describe("Snake Game", () => {
  const gameCanvas = document.createElement("canvas");
  gameCanvas.id = "gameCanvas";
  const ctx = gameCanvas.getContext("2d");

  beforeEach(() => {
    document.body.appendChild(gameCanvas);
    serpent = [{ x: 5, y: 5 }];
  });

  afterEach(() => {
    document.body.removeChild(gameCanvas);
  });

  it("should detect a crash when serpent head goes beyond the canvas boundaries", () => {
    gameCanvas.width = 100;
    gameCanvas.height = 100;

    serpent = [{ x: 10, y: 10 }];
    expect(detectCrash()).toBe(false);

    serpent = [{ x: -1, y: 10 }];
    expect(detectCrash()).toBe(true);

    serpent = [{ x: 10, y: -1 }];
    expect(detectCrash()).toBe(true);
  });

  it("should detect a crash when an obstacle hits any part of the snake", () => {

    serpent = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ];

    obstacles = [
      { x: 6, y: 5, direction: 'right' },
    ];

    const crashDetected = detectCrash();

    expect(crashDetected).toBe(true);
  });

  it("should detect a crash when an obstacle hits any part of the snake PT2", () => {

    serpent = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ];

    obstacles = [
      { x: 7, y: 5, direction: 'right' },
    ];

    const crashDetected = detectCrash();

    expect(crashDetected).toBe(true);
  });

});


