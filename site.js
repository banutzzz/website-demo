(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Bubble trail: bubbles appear slightly behind the pointer and fade in place.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const canvas = document.createElement("canvas");
    canvas.id = "bubble-trail";
    Object.assign(canvas.style, {
      position: "fixed", inset: "0", width: "100%", height: "100%",
      pointerEvents: "none", zIndex: "20"
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let bubbles = [], previous = null, lastBubble = null;
    let w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize); resize();
    window.addEventListener("pointermove", e => {
      if (e.pointerType === "touch") return;
      const p = {x:e.clientX, y:e.clientY};
      if (!previous) { previous = p; return; }
      const dx=p.x-previous.x, dy=p.y-previous.y, dist=Math.hypot(dx,dy);
      if (dist > 0) {
        const ux=dx/dist, uy=dy/dist;
        const x=p.x-ux*24, y=p.y-uy*24;
        if (!lastBubble || Math.hypot(x-lastBubble.x,y-lastBubble.y)>30) {
          bubbles.push({x,y,r:4+Math.random()*5,life:1});
          lastBubble={x,y};
        }
      }
      previous=p;
      if (bubbles.length>90) bubbles.splice(0,bubbles.length-90);
    });
    window.addEventListener("blur",()=>{previous=null;lastBubble=null;});
    function frame() {
      ctx.clearRect(0,0,w,h);
      bubbles=bubbles.filter(b=>{
        b.life-=0.012;
        ctx.save(); ctx.globalAlpha=Math.max(0,b.life)*0.75;
        const g=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,1,b.x,b.y,b.r);
        g.addColorStop(0,"rgba(255,255,255,.18)");
        g.addColorStop(.65,"rgba(190,220,235,.05)");
        g.addColorStop(1,"rgba(255,255,255,.45)");
        ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
        ctx.fillStyle=g;ctx.fill();ctx.lineWidth=1;
        ctx.strokeStyle="rgba(210,230,240,.8)";ctx.stroke();
        ctx.beginPath();ctx.arc(b.x-b.r*.28,b.y-b.r*.3,b.r*.2,0,Math.PI*2);
        ctx.strokeStyle="rgba(255,255,255,.9)";ctx.stroke();
        ctx.restore();
        return b.life>0;
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  // Product catalog is editable in products.json. Orders are assembled for WhatsApp.
  fetch("products.json").then(r=>r.json()).then(data=>{
    const render=(target,items)=>{
      const el=document.getElementById(target); if(!el)return;
      el.innerHTML=items.map(p=>`<article class="product-card">
        <div class="product-thumb">${p.icon||"✧"}</div>
        <h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
        <div class="product-bottom"><span class="product-price">${Number(p.price).toFixed(2)} lei</span>
        <button type="button" data-order="${escapeHTML(p.name)}">Comandă</button></div></article>`).join("");
      el.querySelectorAll("[data-order]").forEach(btn=>btn.addEventListener("click",()=>{
        const p=items.find(x=>x.name===btn.dataset.order);
        const message=`Bună! Doresc detalii/comandă pentru: ${p.name} – ${Number(p.price).toFixed(2)} lei. Îmi puteți confirma disponibilitatea și livrarea?`;
        window.open("https://wa.me/40778258631?text="+encodeURIComponent(message),"_blank","noopener");
      }));
    };
    render("featured-products",data.slice(0,3));
    render("all-products",data);
    const count=document.getElementById("product-count"); if(count)count.textContent=`${data.length} produse în catalog`;
  }).catch(()=>{});
  function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
})();