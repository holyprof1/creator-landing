/* ─── CreatorHiveAI — script.js ─── */
(function(){
'use strict';

/* ═══ 1. DEMO SWITCHER ═══ */
window.showDemo = function(n){
  document.querySelectorAll('.demo').forEach(function(d){ d.classList.remove('demo--active'); });
  document.querySelectorAll('.switcher__pill').forEach(function(p){ p.classList.remove('switcher__pill--active'); });
  document.getElementById('demo'+n).classList.add('demo--active');
  document.querySelectorAll('.switcher__pill')[n-1].classList.add('switcher__pill--active');
  window.scrollTo({top:0,behavior:'smooth'});
  // re-trigger canvas if demo 1
  if(n===1 && !canvasStarted){ startCanvas(); }
  // re-trigger counters
  triggerCounters();
};

/* ═══ 2. PARTICLE CANVAS — Demo 1 ═══ */
var canvasStarted = false;
function startCanvas(){
  var canvas = document.getElementById('d1canvas');
  if(!canvas) return;
  canvasStarted = true;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var W, H;

  function resize(){
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for(var i=0;i<80;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      size: Math.random()*2+0.5,
      opacity: Math.random()*0.4+0.1
    });
  }

  function animate(){
    ctx.clearRect(0,0,W,H);
    // Draw connections
    ctx.strokeStyle='rgba(245,166,35,0.06)';
    ctx.lineWidth=1;
    for(var i=0;i<particles.length;i++){
      for(var j=i+1;j<particles.length;j++){
        var dx=particles[i].x-particles[j].x;
        var dy=particles[i].y-particles[j].y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.globalAlpha=(1-dist/120)*0.12;
          ctx.stroke();
          ctx.globalAlpha=1;
        }
      }
    }
    // Draw & move dots
    particles.forEach(function(p){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=W; if(p.x>W) p.x=0;
      if(p.y<0) p.y=H; if(p.y>H) p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle='rgba(245,166,35,'+p.opacity+')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
// Start canvas on load
document.addEventListener('DOMContentLoaded', function(){
  startCanvas();
});

/* ═══ 3. COUNTER ANIMATION ═══ */
var countersTriggered = false;
function triggerCounters(){
  countersTriggered = false;
  var counters = document.querySelectorAll('.d1-stats__num[data-target]');
  counters.forEach(function(el){ el.textContent='0'; });
  // Small delay to let page render
  setTimeout(function(){
    animateCounters();
  },300);
}

function animateCounters(){
  var counters = document.querySelectorAll('.d1-stats__num[data-target]');
  var duration = 1800;
  var start = performance.now();
  function update(now){
    var elapsed = now - start;
    var progress = Math.min(elapsed/duration, 1);
    // ease out cubic
    var ease = 1 - Math.pow(1-progress, 3);
    counters.forEach(function(el){
      var target = parseInt(el.dataset.target);
      var current = Math.floor(target * ease);
      var suffix = target===50 ? 'K+' : '+';
      el.textContent = current.toLocaleString() + suffix;
    });
    if(progress<1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ═══ 4. SMOOTH SCROLL ═══ */
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href^="#"]');
  if(!a) return;
  var id = a.getAttribute('href');
  var target = document.querySelector(id);
  if(!target) return;
  e.preventDefault();
  var rect = target.getBoundingClientRect();
  var top = rect.top + window.scrollY - 100;
  window.scrollTo({top:top, behavior:'smooth'});
});

})();
