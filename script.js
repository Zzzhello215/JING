const pages=[...document.querySelectorAll('.page')];
const loader=document.getElementById('loadingScreen');
const progress=loader.querySelector('.progress i');
const progressText=document.getElementById('progressText');
let changing=false;

function showPage(name){
  pages.forEach(p=>p.classList.toggle('active',p.dataset.page===name));
  window.scrollTo({top:0,behavior:'instant'});
  history.replaceState(null,'','#'+name);
}
function travel(name){
  if(changing)return; changing=true; loader.classList.add('open'); loader.setAttribute('aria-hidden','false');
  let value=0; progress.style.width='0'; progressText.textContent='0%';
  const timer=setInterval(()=>{value=Math.min(100,value+25);progress.style.width=value+'%';progressText.textContent=value+'%';if(value===100){clearInterval(timer);setTimeout(()=>{showPage(name);loader.classList.remove('open');loader.setAttribute('aria-hidden','true');changing=false},220)}},180);
}
document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>travel(button.dataset.go)));

const neteasePlayer=document.getElementById('neteasePlayer');
document.querySelector('.room-window').addEventListener('click',()=>{
  if(!neteasePlayer.src) neteasePlayer.src='https://music.163.com/outchain/player?type=2&id=1463165960&auto=1&height=66';
},{once:true});

const pet=document.getElementById('pixelPet');
function petCry(){pet.classList.remove('cry');void pet.offsetWidth;pet.classList.add('cry')}
pet.addEventListener('click',petCry);pet.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();petCry()}});

document.querySelectorAll('[data-weather]').forEach(button=>button.addEventListener('click',()=>{button.animate([{transform:'translateY(0)'},{transform:'translateY(-12px)'},{transform:'translateY(0)'}],{duration:450})}));
document.querySelectorAll('.hour').forEach(button=>button.addEventListener('click',()=>{button.animate([{transform:'scale(1)'},{transform:'scale(1.18)'},{transform:'scale(1)'}],{duration:360})}));

document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===tab));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===tab.dataset.tab));
}));

const messageModal=document.getElementById('messageModal');
const loveModal=document.getElementById('loveModal');
function openModal(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
function closeModal(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.getElementById('openBoard').addEventListener('click',()=>{renderMessages();openModal(messageModal)});
document.querySelectorAll('[data-dialog="love"]').forEach(b=>b.addEventListener('click',()=>openModal(loveModal)));
document.querySelectorAll('.modal-close,.ok-button').forEach(b=>b.addEventListener('click',()=>closeModal(b.closest('.modal'))));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m)}));

const defaultMessages=['我喜欢你'];
function getMessages(){try{return JSON.parse(localStorage.getItem('mirrorMessages'))||defaultMessages}catch{return defaultMessages}}
function renderMessages(){document.getElementById('messages').innerHTML=getMessages().map(m=>`<p class="message"><span>${escapeHtml(m)}</span></p>`).join('')}
function escapeHtml(text){const d=document.createElement('div');d.textContent=text;return d.innerHTML}
document.getElementById('messageForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('messageInput');const list=getMessages();list.push(input.value.trim());localStorage.setItem('mirrorMessages',JSON.stringify(list));input.value='';renderMessages()});

showPage(location.hash.slice(1)&&['home','meet','profile'].includes(location.hash.slice(1))?location.hash.slice(1):'home');
