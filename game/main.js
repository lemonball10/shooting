const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player ={
  x: canvas.width / 2 - 15,
  y: canvas.height -60,
  width: 30,
  height: 30,
  color: "yellow",
  life: 3,
};

const bullets = [];
const BULLET_SPEED = -10;

function tryShoot(){
  bullets.push({
    x: player.x,
    y: player.y,
    width: 5,
    height: 5,
    vy: BULLET_SPEED,
  })
}
window.addEventListener("keydown",(e) => {
    if(e.key ==="ArrowLeft"){
      if(player.x > 10){
        player.x -= 10;
      }
    } else if (e.key === "ArrowRight") {
      if(player.x < canvas.width - player.width -10){
        player.x += 10;
      }
    }else if (e.code === "Space") {
     tryShoot();
    }
});
function update(){
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    bullet.y += bullet.vy;
    if(bullet.y < 0) {
      bullets.splice(i,1);
    }
  }
}

let y1 = 0;
let y2 = -150;

function draw() {
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
 
  ctx.fillStyle =player.color;
  ctx.fillRect(player.x,player.y,player.width,player.height);

  for (let i = bullets.length - 1; i >= 0 ; i--) {
    const bullet = bullets[i];
    bullet.y += bullet.vy;
    ctx.fillStyle = "white" ;
    ctx.fillRect(bullet.x, bullet.y ,bullet.width, bullet.height);
  }
}
  function gameLoop(){
    update();
    draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();