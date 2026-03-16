// Player & physics
const player = document.getElementById("player");
const spikes = document.querySelectorAll(".spike");
const portals = document.querySelectorAll(".portal");
const music = document.getElementById("music");

let mode = "cube";
let velocity = 0;
let gravity = 0.6;
let jumpStrength = 12;

// Keyboard controls
document.addEventListener("keydown", e => {
    if(e.code === "Space"){
        if(mode === "cube" || mode === "mini"){
            velocity = jumpStrength;
        } else if(mode === "ship"){
            velocity = 6;
        } else if(mode === "wave"){
            velocity = -velocity || -6;
        } else if(mode === "ball"){
            velocity = -velocity || 8;
        }
    }
});

// Game Loop
function gameLoop(){
    // Physics
    if(mode === "cube" || mode === "mini" || mode === "ball"){
        velocity -= gravity;
    }
    
    let bottom = parseFloat(getComputedStyle(player).bottom);
    bottom += velocity;

    if(bottom < 0){
        bottom = 0;
        velocity = 0;
    }
    if(bottom > 260) bottom = 260; // ceiling limit

    player.style.bottom = bottom + "px";

    // Move obstacles left
    spikes.forEach(spike=>{
        let left = parseFloat(spike.style.left);
        left -= 6;
        spike.style.left = left + "px";

        let rect1 = player.getBoundingClientRect();
        let rect2 = spike.getBoundingClientRect();
        if(rect1.right > rect2.left && rect1.left < rect2.right && rect1.bottom > rect2.top){
            alert("Game Over!");
            location.reload();
        }
    });

    // Move portals
    portals.forEach(p=>{
        let left = parseFloat(p.style.left);
        left -=6;
        p.style.left = left + "px";

        let rect1 = player.getBoundingClientRect();
        let rect2 = p.getBoundingClientRect();
        if(rect1.right > rect2.left && rect1.left < rect2.right){
            if(p.classList.contains("cube")) mode="cube";
            if(p.classList.contains("ship")) mode="ship";
            if(p.classList.contains("wave")) mode="wave";
            if(p.classList.contains("ball")) mode="ball";
        }
    });

    // Decorations move
    document.querySelectorAll(".deco").forEach(d=>{
        let left = parseFloat(d.style.left);
        left -= 2; // slower for parallax effect
        if(left < -50) left = window.innerWidth;
        d.style.left = left + "px";
    });

    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
