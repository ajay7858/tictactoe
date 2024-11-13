const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartButton = document.querySelector('.restart');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal from top-left
      [2, 4, 6]  // Diagonal from top-right
    ];

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.getAttribute('data-index');

      if (gameBoard[index] !== '' || !gameActive) return;

      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer); // Add color class based on player

      checkWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateMessage();
    }

    function checkWinner() {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          highlightWinningCells(combination); // Highlight winning cells
          setTimeout(() => {
            showWinningMessage(gameBoard[a]); // Show highlighted winning message
          }, 500);
          gameActive = false;
          return;
        }
      }

      if (!gameBoard.includes('')) {
        message.textContent = "IT'S A DRAW!";
        message.classList.add('show');
        gameActive = false;
      }
    }

    function highlightWinningCells(combination) {
      combination.forEach(index => {
        cells[index].classList.add('winning-cell'); // Add style for winning cells
      });
    }

    function showWinningMessage(winner) {
      message.innerHTML = `PLAYER <span class="highlight-winner ${winner}">${winner}</span> WINS!`;
      message.classList.add('show'); // Show message with animation
    }

    function updateMessage() {
      if (gameActive) {
        message.textContent = `Player ${currentPlayer}'s Turn`;
        message.classList.add('show');
      }
    }

    function restartGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Reset cell classes
      });
      currentPlayer = 'X';
      gameActive = true;
      message.classList.remove('show');
      updateMessage();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    updateMessage();