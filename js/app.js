const C=window.WEDDING_CONFIG;
document.querySelectorAll('[data-bride]').forEach(x=>x.textContent=C.bride);
document.querySelectorAll('[data-groom]').forEach(x=>x.textContent=C.groom);
document.querySelector('#inviteText').textContent=C.invitation;
document.querySelector('#venue').textContent=C.venue;
document.querySelector('#address').textContent=C.address;
document.querySelector('#dateDisplay').textContent=C.dateDisplay;
document.querySelector('#footerDate').textContent=C.dateDisplay;
document.querySelector('#mapLink').href=C.mapUrl;
['heroPhoto','originalPhoto'].forEach(id=>document.getElementById(id).src=C.photo);
document.querySelector('#schedule').innerHTML=C.schedule.map(x=>`<article><b>${x.time}</b><div><h3>${x.title}</h3><p>${x.note}</p></div></article>`).join('');
document.querySelector('#openBtn').onclick=()=>{document.querySelector('.paper').classList.add('open');document.querySelector('#invitation').scrollIntoView({behavior:'smooth'})};
function tickCountdown(){const n=new Date(C.dateISO)-new Date();const e=document.querySelector('#countdown');if(n<=0){e.textContent='今天，我们结婚了';return}const d=Math.floor(n/86400000),h=Math.floor(n/3600000)%24,m=Math.floor(n/60000)%60;e.textContent=`距离婚礼还有 ${d} 天 ${h} 小时 ${m} 分钟`}
tickCountdown();setInterval(tickCountdown,60000);
const solved=[0,1,2,3,4,5,6,7,8];let tiles=[],steps=0,seconds=0,timerId;
function solvable(o){let v=o.filter(n=>n!==8),x=0;for(let i=0;i<v.length;i++)for(let j=i+1;j<v.length;j++)if(v[i]>v[j])x++;return x%2===0}
function reset(){do tiles=[...solved].sort(()=>Math.random()-.5);while(!solvable(tiles)||tiles.every((n,i)=>n===i));steps=seconds=0;clearInterval(timerId);timerId=setInterval(()=>{seconds++;document.querySelector('#timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`},1000);render()}
function render(){const p=document.querySelector('#puzzle');p.classList.remove('complete');p.innerHTML='';tiles.forEach((tile,index)=>{const b=document.createElement('button');b.className='tile'+(tile===8?' empty':'');if(tile===8)b.textContent='❧';else{b.style.backgroundImage=`url('${C.photo}')`;b.style.backgroundPosition=`${tile%3*50}% ${Math.floor(tile/3)*50}%`}b.onclick=()=>move(index);p.appendChild(b)});document.querySelector('#steps').textContent=steps}
function move(i){const e=tiles.indexOf(8),a=[e-3,e+3,...(e%3?[e-1]:[]),...(e%3<2?[e+1]:[])];if(!a.includes(i))return;[tiles[i],tiles[e]]=[tiles[e],tiles[i]];steps++;render();if(tiles.every((n,j)=>n===j)){clearInterval(timerId);document.querySelector('#puzzle').classList.add('complete')}}
document.querySelector('#reset').onclick=reset;const modal=document.querySelector('#modal');document.querySelector('#original').onclick=()=>modal.hidden=false;document.querySelector('#close').onclick=()=>modal.hidden=true;modal.onclick=e=>{if(e.target===modal)modal.hidden=true};reset();
document.querySelector('#rsvpForm').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));if(C.rsvpEndpoint){await fetch(C.rsvpEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}else localStorage.setItem('wedding-rsvp',JSON.stringify(data));e.target.hidden=true;document.querySelector('#thanks').hidden=false};
