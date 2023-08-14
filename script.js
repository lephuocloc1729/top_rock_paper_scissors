let score = JSON.parse(localStorage.getItem('score')) || {
  win : 0,
  tie : 0,
  lose : 0
};
announce_score();

function result(choice, move)
{
  let result = '';
  if (choice === 'rock')
  {
    if (move ===  'rock')
    {
      result = 'tied';
    }
    else if (move === 'paper')
    {
      result = 'losed';
    }
    else 
    {
      result = 'won';
    }
  }
  else if (choice === 'paper' )
  {
    if (move ===  'rock')
    {
      result = 'won';
    }
    else if (move === 'paper')
    {
      result = 'tied';
    }
    else 
    {
      result = 'lose';
    }
  }
  else
  {
    if (move ===  'rock')
    {
      result = 'losed';
    }
    else if (move === 'paper')
    {
      result = 'won';
    }
    else 
    {
      result = 'tied';
    }
  }
  return result;
}

function playGame(choice)
{
  const randomNumber = Math.random();
  let move = '';
  if (randomNumber <= 1/3)
  {
    move = 'rock';
  }
  else if (1/3 < randomNumber <= 2/3)
  {
    move = 'paper';
  }
  else
  {
    move = 'scissors';
  }
  game = result(choice, move);
  
  if (game === 'won')
  {
    score.win += 1;
  }
  else if (game==='tied')
  {
    score.tie += 1;
  }
  else 
  {
    score.lose += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  announce_score(); 
  announce_result(game); 
  announce_move(choice, move);
}

function announce_score()
{
  document.querySelector('.js-score').innerHTML =`
  Wins:${score.win}, tie: ${score.tie}, lose: ${score.lose}`;
}
function announce_result(game)
{
  document.querySelector('.js-result').innerHTML = `You ${game}`;
}
function announce_move(choice, move)
{
  document.querySelector('.js-move').innerHTML = `You <img src="images/${choice}-emoji.png" class="move-image"> -  <img src="images/${move}-emoji.png" class="move-image"> Computer`;
}
function reset()
{
  document.querySelector('.js-move').innerHTML = '';
  document.querySelector('.js-result').innerHTML = '';
}
function autoChoice()
{
  const randomNumber = Math.random();
  let choice = '';
  if (randomNumber <= 1/3)
  {
    choice = 'rock';
  }
  else if (1/3 < randomNumber <= 2/3)
  {
    choice = 'paper';
  }
  else
  {
    choice = 'scissors';
  }
  return choice;
}
let intervalId;
function autoPlay()
{
  if (document.querySelector('.auto-button').innerText ==='Auto play')
  {
    intervalId = setInterval(function(){
      playGame(autoChoice());
    }, 500);
    document.querySelector('.auto-button').classList.add('auto-pressed');
    document.querySelector('.auto-button').innerHTML = 'Stop';
  }
  else if (document.querySelector('.auto-button').innerText ==='Stop')
  {
    clearInterval(intervalId); 
    document.querySelector('.auto-button').classList.remove('auto-pressed');
    document.querySelector('.auto-button').innerHTML = 'Auto play';
  }
}
document.querySelector('.rock-button')
  .addEventListener('click', () => playGame('rock'));
document.querySelector('.paper-button')
  .addEventListener('click', () => playGame('paper'));
document.querySelector('.scissors-button')
  .addEventListener('click', () => playGame('scissors'));

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') 
  {
    playGame('rock');
  }
  else if (event.key === 'p')
  {
    playGame('paper');
  }
  else if (event.key === 's')
  {
    playGame('scissors');
  }
});
