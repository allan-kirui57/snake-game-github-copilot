# 🐍 Snake Game

A classic Snake game implementation built with **HTML5 Canvas** and **vanilla JavaScript**. Control your snake, eat food, and achieve the highest score!

## 📸 Game Snapshot

![Snake Game Screenshot](Screenshot%20snake-game.png)

## 🎮 How to Play

### Controls

- **Arrow Keys** or **WASD** - Move the snake (up, down, left, right)
- **SPACEBAR** - Start/Pause the game
- **Reset Button** - Restart the game

### Objective

1. **Eat the red food** 🔴 to grow your snake and increase your score
2. **Avoid collisions** with your own body
3. **Beat your high score** which is saved automatically

### Game Features

- ✅ Smooth snake movement
- ✅ Random food generation
- ✅ Score tracking with persistent high score storage
- ✅ Pause/Resume functionality
- ✅ Grid-based collision detection
- ✅ Wraparound edges (snake exits one side and enters the opposite)
- ✅ Glowing neon visual effects
- ✅ Responsive design

## 📁 Project Structure

```
snake-game/
├── index.html       # Main HTML file with canvas and UI
├── snake.js         # Game logic and mechanics
├── styles.css       # Styling with dark theme and neon effects
└── README.md        # This file
```

## 🚀 Getting Started

### Method 1: Direct File Opening (Easiest)

1. Navigate to the `snake-game` folder
2. Double-click `index.html` to open in your default browser
3. Press **SPACE** to start playing!

### Method 2: Using Live Server (VS Code)

1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html` → Select **"Open with Live Server"**
3. Browser will automatically open with auto-refresh on file changes

### Method 3: Using Python HTTP Server

```bash
cd /path/to/snake-game
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

### Method 4: Using Node.js HTTP Server

```bash
cd /path/to/snake-game
npx http-server
```

## 🎯 Gameplay Tips

- 🎯 **Plan ahead** - Think about where the food will appear
- ⚡ **Don't rush** - Take your time to avoid collisions with your body
- 🎪 **Use the edges** - The snake wraps around screen edges, which can be strategic
- 📈 **Aim for high scores** - Beat your personal best!

## 💻 Technical Details

### Built With

- **HTML5** - Canvas API for rendering
- **CSS3** - Modern styling with gradients and shadows
- **JavaScript (ES6)** - Game logic and mechanics

### Key Code Components

**SnakeGame Class** handles:

- Game state management (running, paused, game over)
- Snake movement and growth mechanics
- Collision detection (self and walls)
- Food generation and consumption
- Score tracking and persistence
- Canvas rendering with visual effects

**Game Loop**:

- Runs at 100ms intervals (10 FPS updates)
- Processes input → Updates state → Renders frame
- Smooth and responsive gameplay

### Storage

- High scores are saved to browser `localStorage`
- Survives browser restarts and sessions
- Automatically loaded on game start

## 🎨 Visual Design

- **Dark Theme** (#1a1a1a background)
- **Neon Green** (#00ff00) for snake with glow effects
- **Red** (#ff0000) for food with glow effects
- **Purple Gradient** background for aesthetic appeal
- **Grid Pattern** for visual guidance

## 📊 Game Mechanics

### Snake Growth

- Starts with 1 segment
- Grows by 1 segment each time it eats food
- Score increases by 10 points per food item

### Collision Detection

- **Self Collision**: Game ends if snake hits its own body
- **Wall Wrapping**: Exits one side and re-enters the opposite (no wall collision)

### Food Spawning

- Randomly placed on the grid
- Never spawns on the snake's body
- Multiple food items can't overlap

## 🔧 Customization

You can easily modify the game by editing `snake.js`:

```javascript
// Change game speed (lower = faster)
this.gameSpeed = 100; // milliseconds

// Change grid size
this.gridSize = 20; // pixels per tile

// Change score per food
this.score += 10; // points per food
```

## 📝 Code Comments

The code is fully commented with JSDoc-style documentation explaining:

- Each method's purpose and functionality
- Parameter and return value descriptions
- Key algorithm implementations
- Game state management logic

## 🐛 Known Features & Limitations

✅ **Features**:

- Infinite gameplay (game only ends on self-collision)
- Wraparound world edges
- Persistent high score storage

⚠️ **Notes**:

- Direction changes are buffered (prevents mid-frame reversals)
- Game runs at 10 FPS for retro feel
- Optimal for desktop browsers

## 🎓 Learning Resources

This project is great for learning:

- Canvas API and 2D rendering
- Game loop architecture
- Event handling and keyboard input
- DOM manipulation
- Object-oriented JavaScript
- LocalStorage API

## 📜 License

This is a free, open-source project. Feel free to modify and use it however you like!

---

**Enjoy the game! 🎮**

_Built with ❤️ using HTML5, CSS3, and JavaScript_
