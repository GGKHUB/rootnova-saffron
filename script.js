const belt=document.querySelector('#belt');
const cards=[...document.querySelectorAll('.step-card')];
const progress=document.querySelector('#progress');
const current=document.querySelector('#currentStep');
let active=0,down=false,startX=0,scrollStart=0;
function update(){
  const center=belt.scrollLeft+belt.clientWidth*.35;
  let best=0,dist=Infinity;
  cards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft+card.offsetWidth/2-center);if(d<dist){dist=d;best=i}});
  active=best;cards.forEach((card,i)=>card.classList.toggle('active',i===active));
  current.textContent=String(active+1).padStart(2,'0');progress.style.width=`${((active+1)/cards.length)*100}%`;
}
function go(n){const idx=Math.max(0,Math.min(cards.length-1,n));belt.scrollTo({left:cards[idx].offsetLeft-belt.offsetLeft,behavior:'smooth'})}
document.querySelector('#prev').addEventListener('click',()=>go(active-1));
document.querySelector('#next').addEventListener('click',()=>go(active+1));
belt.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
belt.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(active-1)}});
belt.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;scrollStart=belt.scrollLeft;belt.classList.add('grabbing');belt.setPointerCapture(e.pointerId)});
belt.addEventListener('pointermove',e=>{if(down)belt.scrollLeft=scrollStart-(e.clientX-startX)});
function release(){down=false;belt.classList.remove('grabbing')}
belt.addEventListener('pointerup',release);belt.addEventListener('pointercancel',release);
update();

