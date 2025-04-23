function getGameOverTemplate() {
  return `
    <div id="game_over_screen">
      <h1>GAME OVER</h1>
      <button id="retry_button" class="menu_button">TRY AGAIN</button>
      <button id="menu_button" class="menu_button main-menu">MAIN MENU</button>
    </div>
  `;
}

function getWinTemplate() {
  return `
    <div id="win_screen">
      <h1>YOU WIN!</h1>
      <p>Congratulations! You defeated the endboss!</p>
      <button id="play_again_button" class="menu_button">PLAY AGAIN</button>
      <button id="win_menu_button" class="menu_button main-menu">MAIN MENU</button>
    </div>
  `;
}