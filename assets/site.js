(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pb=document.getElementById('progress');
if(pb)addEventListener('scroll',function(){var h=document.documentElement;pb.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
document.querySelectorAll('.spot').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
var cio=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;cio.unobserve(en.target);if(reduce)return;var el=en.target,n=+el.dataset.n,t0=null;
 function f(ts){t0=t0||ts;var p=Math.min((ts-t0)/1200,1),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=v;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.6});
document.querySelectorAll('[data-n]').forEach(function(e){cio.observe(e)});
var cv=document.getElementById('mesh');
if(cv&&!reduce){var cx=cv.getContext('2d'),W,H,pts=[],dpr=Math.min(devicePixelRatio||1,2),mouse={x:-999,y:-999};
 function size(){W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);pts=[];var n=Math.round(W*H/16000);for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25})}
 size();addEventListener('resize',size);
 cv.parentNode.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
 var col=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#ff7a45';
 (function draw(){cx.clearRect(0,0,W,H);for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  var dm=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(dm<140){p.x+=(p.x-mouse.x)/dm*.6;p.y+=(p.y-mouse.y)/dm*.6}
  cx.globalAlpha=.7;cx.fillStyle=col;cx.beginPath();cx.arc(p.x,p.y,1.4,0,6.3);cx.fill();
  for(var j=i+1;j<pts.length;j++){var q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.globalAlpha=(1-d/120)*.35;cx.strokeStyle=col;cx.lineWidth=.6;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}}
  requestAnimationFrame(draw)})()}
var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach(function(e,i){e.style.transitionDelay=(e.classList.contains('stat')||e.classList.contains('card2'))?((i%4)*70)+'ms':'0ms';io.observe(e)});
})();
