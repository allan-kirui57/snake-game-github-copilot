/**
 * Snake Game Implementation
 * A classic Snake game built with HTML5 Canvas and vanilla JavaScript
 * Features: collision detection, food generation, score tracking, and high score persistence
 */

class SnakeGame {
    /**
     * Constructor: Initializes the game with DOM elements and game state
     */
    constructor() {
        // Get canvas and 2D rendering context for drawing the game
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Get UI elements for score, status updates, and buttons
        this.scoreDisplay = document.getElementById('score');
        this.highScoreDisplay = document.getElementById('highScore');
        this.statusDisplay = document.getElementById('status');
        this.resetBtn = document.getElementById('resetBtn');

        // Game grid configuration
        this.gridSize = 20; // Size of each tile in pixels
        this.tileCount = this.canvas.width / this.gridSize; // Number of tiles per row/column (20x20 = 400)
        this.gameSpeed = 100; // Game update interval in milliseconds

        // Initialize game state variables
        this.snake = [{ x: 10, y: 10 }]; // Snake starts as single segment in center
        this.direction = { x: 1, y: 0 }; // Current direction (1,0) = moving right
        this.nextDirection = { x: 1, y: 0 }; // Next direction (prevents invalid 180-degree turns)
        this.food = this.generateFood(); // Generate initial food at random location
        this.score = 0; // Current game score
        this.highScore = localStorage.getItem('snakeHighScore') || 0; // Load high score from browser storage
        this.isRunning = false; // Is the game currently active?
        this.isPaused = false; // Is the game paused?
        this.gameLoopId = null; // ID for the game loop interval

        this.init();
    }

    /**
     * Initialize the game: display high score and setup event listeners
     */
    init() {
        this.highScoreDisplay.textContent = this.highScore; // Display saved high score
        this.setupEventListeners(); // Attach keyboard and button event handlers
    }

    /**
     * Setup keyboard and button event listeners for game controls
     */
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    /**
     * Handle keyboard input for snake direction and game controls
     * Prevents the snake from reversing into itself (e.g., can't go left if moving right)
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyPress(e) {
        // Map keyboard input to direction changes
        switch (e.key.toUpperCase()) {
            case 'ARROWUP':
            case 'W':
                e.preventDefault(); // Prevent page scrolling
                // Only allow up movement if not currently moving vertically
                if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
                break;
            case 'ARROWDOWN':
            case 'S':
                e.preventDefault();
                if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
                break;
            case 'ARROWLEFT':
            case 'A':
                e.preventDefault();
                // Only allow left movement if not currently moving horizontally
                if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
                break;
            case 'ARROWRIGHT':
            case 'D':
                e.preventDefault();
                if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
                break;
            case ' ':
                // Spacebar: start game or toggle pause
                e.preventDefault();
                this.togglePause();
                break;
        }
    }

    /**
     * Toggle between running and paused states
     * If game hasn't started, start it; if running, pause/unpause
     */
    togglePause() {
        if (!this.isRunning) {
            this.start(); // Start the game if not running
        } else {
            this.isPaused = !this.isPaused; // Toggle pause state
            this.statusDisplay.textContent = this.isPaused ? 'PAUSED' : 'Running...';
        }
    }

    /**
     * Start the game loop with interval-based updates
     */
    start() {
        if (this.isRunning) return; // Prevent multiple game loops
        this.isRunning = true;
        this.isPaused = false;
        this.statusDisplay.textContent = 'Running...';
        // Call gameLoop every 100ms to update game state
        this.gameLoopId = setInterval(() => this.gameLoop(), this.gameSpeed);
    }

    /**
     * Main game loop: updates game state and renders the canvas each frame
     */
    gameLoop() {
        // Skip update if game is paused
        if (this.isPaused) return;

        // Apply queued direction change
        this.direction = this.nextDirection;
        // Move snake and check for food
        this.updateSnake();
        // Check for collisions with walls or self
        this.checkCollisions();
        // Draw the updated game state
        this.render();
    }

    /**
     * Update snake position and check for food collision
     * Wraps around canvas edges (torus/wraparound mode)
     */
    updateSnake() {
        // Get the snake's head position
        const head = this.snake[0];
        
        // Calculate new head position with wraparound (modulo operator prevents going off-screen)
        const newHead = {
            x: (head.x + this.direction.x + this.tileCount) % this.tileCount,
            y: (head.y + this.direction.y + this.tileCount) % this.tileCount
        };

        // Add new head to front of snake array
        this.snake.unshift(newHead);

        // Check if snake ate food
        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score += 10; // Increase score
            this.scoreDisplay.textContent = this.score; // Update UI
            this.food = this.generateFood(); // Generate new food at random location
        } else {
            // If no food eaten, remove tail to keep snake length constant
            this.snake.pop();
        }
    }

    /**
     * Check for collisions with snake's own body
     * Game ends if head occupies same position as any body segment
     */
    checkCollisions() {
        const head = this.snake[0];

        // Loop through snake body (starting from index 1, skip head)
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.endGame(); // End game on collision
                return;
            }
        }
    }

    /**
     * Generate food at a random grid position not occupied by snake
     * @returns {Object} Food object with x and y coordinates
     */
    generateFood() {
        let food;
        let isOnSnake;
        
        // Keep generating random positions until one is not on the snake
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            // Check if food position overlaps with any snake segment
            isOnSnake = this.snake.some(segment => segment.x === food.x && segment.y === food.y);
        } while (isOnSnake);
        
        return food;
    }

    /**
     * Render the game state: draw canvas background, grid, snake, and food
     */
    render() {
        // Clear canvas with dark background
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines for visual guidance
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.tileCount; i++) {
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();

            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }

        // Draw snake segments
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Draw head with bright green and glow effect
                this.ctx.fillStyle = '#00ff00';
                this.ctx.shadowColor = '#00ff00';
                this.ctx.shadowBlur = 10;
            } else {
                // Draw body with slightly darker green
                this.ctx.fillStyle = '#00cc00';
                this.ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
                this.ctx.shadowBlur = 5;
            }
            // Draw square tile with 1px padding
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw food as a circle with red glow
        this.ctx.fillStyle = '#ff0000';
        this.ctx.shadowColor = '#ff0000';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        // Draw circle at center of food tile
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        // Disable shadow for next render
        this.ctx.shadowColor = 'transparent';
    }

    /**
     * End the game and update high score if current score is higher
     * Saves high score to localStorage for persistence
     */
    endGame() {
        clearInterval(this.gameLoopId); // Stop the game loop
        this.isRunning = false;
        this.statusDisplay.textContent = `Game Over! Final Score: ${this.score}`;

        // Update high score if current score is better
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreDisplay.textContent = this.highScore;
            // Persist high score to browser storage
            localStorage.setItem('snakeHighScore', this.highScore);
        }
    }

    /**
     * Reset the game to initial state
     * Clears snake, resets score, and prepares for new game
     */
    reset() {
        clearInterval(this.gameLoopId); // Stop any running game loop
        this.snake = [{ x: 10, y: 10 }]; // Reset snake to single segment at center
        this.direction = { x: 1, y: 0 }; // Reset direction to right
        this.nextDirection = { x: 1, y: 0 };
        this.food = this.generateFood(); // Generate new food
        this.score = 0; // Reset score to 0
        this.isRunning = false; // Mark game as not running
        this.isPaused = false; // Clear pause state
        this.scoreDisplay.textContent = '0'; // Update UI
        this.statusDisplay.textContent = 'Press SPACE to start'; // Reset status message
        this.render(); // Draw reset game state
    }
}

/**
 * Initialize game when DOM is fully loaded
 * Prevents errors from accessing HTML elements before they exist
 */
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});
