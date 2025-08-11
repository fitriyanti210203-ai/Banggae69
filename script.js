
const symbols = ['🍒','🍋','🔔','⭐','🍇','7️⃣'];
const r1 = document.getElementById('r1');
const r2 = document.getElementById('r2');
const r3 = document.getElementById('r3');
const spin = document.getElementById('spin');
const reset = document.getElementById('reset');
const msg = document.getElementById('msg');
let credits = 100;

function rand(max){ return crypto.getRandomValues(new Uint32Array(1))[0] % max; }

spin.addEventListener('click', async ()=>{
  const bet = Math.max(1, Number(document.getElementById('bet').value) || 1);
  const lines = Math.min(Math.max(1, Number(document.getElementById('lines').value) || 1),3);
  if(bet > credits){ msg.textContent='Kredit tidak cukup.'; return; }
  credits -= bet*lines;
  msg.textContent='Memutar...';
  spin.disabled = true;
  // animate quick random
  const chosen = [symbols[rand(symbols.length)], symbols[rand(symbols.length)], symbols[rand(symbols.length)]];
  r1.textContent=''; r2.textContent=''; r3.textContent='';
  const steps = 12;
  for(let i=0;i<steps;i++){
    r1.textContent = symbols[rand(symbols.length)];
    r2.textContent = symbols[rand(symbols.length)];
    r3.textContent = symbols[rand(symbols.length)];
    await new Promise(r=>setTimeout(r, 60+i*6));
  }
  r1.textContent = chosen[0]; r2.textContent = chosen[1]; r3.textContent = chosen[2];
  // evaluate simple payout
  let payout = 0;
  if(chosen[0]===chosen[1] && chosen[1]===chosen[2]){
    payout = bet * (chosen[0]==='7️⃣'?10: (chosen[0]==='⭐'?5:2)) * lines;
    credits += payout;
    msg.textContent = `Menang! ${chosen.join(' ')} +${payout} kredit.`;
  } else {
    msg.textContent = `Kalah. Hasil: ${chosen.join(' ')}.`;
  }
  spin.disabled = false;
});

reset.addEventListener('click', ()=>{
  credits = 100; msg.textContent='Kredit disetel ulang.';
});
