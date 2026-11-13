(() => {
  'use strict';
  const D=window.EXTAY, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const languages=['ko','en','ja','zh','tw'];
  const guideMediaUrl=file=>file.startsWith('assets/diagrams/')?`${file}?v=20261113-pine1`:file;
  let language='ko';try{const saved=localStorage.getItem('extayjeonpo-language');if(languages.includes(saved))language=saved;}catch{}
  let route='home',category='all',localCategory='all',query='',slide=0,lightboxItems=[],lightboxIndex=0,toastTimer,deviceResizeObserver;
  const heroPhotos=[1,3,8], scrolls=new Map();
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t=v=>typeof v==='object'&&v!==null?(v[language]??v.en??v.ko??''):String(v??'');
  const tr=k=>t(D.ui[k]);
  const text=v=>esc(t(v)),lines=v=>text(v).replace(/\n/g,'<br>');
  const L=D.L;
  const img=(id,attrs='')=>{
    const [width,height]=D.photoSizes[id]||[];
    const dimensions=width&&!/\bwidth=/.test(attrs)?`width="${width}" height="${height}"`:'';
    return `<img src="assets/images/photo-${String(id).padStart(2,'0')}.webp" alt="${text(D.captions[id]||'EXTAY JEONPO')}" decoding="async" ${dimensions} ${attrs}>`;
  };

  const N=q=>'https://map.naver.com/p/search/'+encodeURIComponent(q);
  const G=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
  const ext=(url,label,cls='text-link')=>`<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span></a>`;
  const link=(r,label,cls='text-link')=>`<a class="${cls}" href="#${r}">${label}<span aria-hidden="true">↗</span></a>`;
  const paths={home:'<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',gallery:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="m3 16 6-6 5 5 3-3 4 4"/><circle cx="16" cy="8" r="1"/>',guide:'<path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3Z"/><path d="M12 6v16M6 8h3M15 8h3M6 12h3M15 12h3"/>',nearby:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',book:'<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 2v6M16 2v6M8 14h3M13 17h3"/>',checkin:'<path d="M13 3h8v18h-8M3 12h13m-4-4 4 4-4 4"/>',wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/>',transport:'<rect x="5" y="2" width="14" height="17" rx="4"/><path d="M5 10h14M9 19l-3 3M15 19l3 3"/><path d="M8 15h1M15 15h1"/>',appliances:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',rules:'<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',laundry:'<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="5"/><path d="M4 7h16M7 4h2"/>',tours:'<path d="m3 4 6-2 6 3 6-2v17l-6 2-6-3-6 2Z"/><path d="M9 2v17M15 5v17"/>'};
  const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[k==='airport'?'transport':k]||paths.guide}</svg>`;
  const stats=()=>`<dl class="stats">${[['10','guests'],['2','bedrooms'],['4','queenBeds'],['2','bathrooms']].map(([n,k])=>`<div><dt>${tr(k)}</dt><dd>${n}</dd></div>`).join('')}</dl>`;
  const footer=()=>`<footer class="footer">${photoCredits()}<a class="footer-brand" href="#home"><img src="assets/images/extay-logo.svg?v=20261113-logo1" alt="EXTAY" width="518" height="155"><span>JEONPO</span></a><div><p>${tr('address')}</p>${ext(D.bookingUrl,tr('ask'))}</div><small>© ${new Date().getFullYear()} EXTAY JEONPO<br>YOUR STAY, YOUR MOMENT.</small></footer>`;
  const heading=(label,title,lead='')=>`<div class="page-heading"><a class="back-link" href="#home">← ${tr('back')}</a><p class="eyebrow">${label}</p><h1>${lines(title)}</h1>${lead?`<p class="lead">${text(lead)}</p>`:''}</div>`;
  const mapButtons=(q=D.address)=>`<div class="button-row">${ext(N(q),tr('naver'),'outline-button')}${ext(G(q),tr('google'),'outline-button')}</div>`;
  const help=()=>`<aside class="help-block"><div><p class="eyebrow">HERE TO HELP</p><h2>${tr('guideCaption')}</h2><p>${tr('askBody')}</p></div>${ext(D.bookingUrl,tr('ask'),'primary-button')}</aside>`;
  const guideRows=()=>['airport','transport','checkin','wifi','appliances','laundry','rules'].map((r,i)=>`<a href="#${r}" class="guide-row"><span class="row-number">0${i+1}</span>${icon(r)}<span>${tr(r)}</span><span aria-hidden="true">↗</span></a>`).join('');
  function deviceCarousel(c){
    const slides=D.deviceMedia[c.id];
    return `<section class="device-visual ${slides.length===1?'single-image':''}" aria-label="${text(c.title)}"><div class="device-visual-heading"><span>${tr('illustratedGuide')}</span><strong data-guide-count>01 / ${String(slides.length).padStart(2,'0')}</strong></div><div class="device-track" data-device-track="${esc(c.id)}" tabindex="0" role="group" aria-label="${text(c.title)} · ${tr('illustratedGuide')}">${slides.map((s,i)=>{const source=s.photo!==undefined?`assets/images/photo-${String(s.photo).padStart(2,'0')}.webp`:guideMediaUrl(s.file);const dimensions=s.photo!==undefined?D.photoSizes[s.photo]:[s.width,s.height];return `<figure class="device-slide" ${i?'inert aria-hidden="true"':''}><button class="device-media-button" type="button" data-device-media="${esc(c.id)}:${i}" aria-label="${text(c.title)} · ${text(s.title)} · ${tr('zoomIn')}"><img src="${esc(source)}" width="${dimensions[0]}" height="${dimensions[1]}" alt="${text(c.title)} · ${text(s.title)}" loading="lazy" decoding="async"><span class="media-expand" aria-hidden="true">↗</span></button><figcaption><p>${text(s.title)}</p>${s.keys?`<ol class="diagram-key">${s.keys.map(k=>`<li>${text(k)}</li>`).join('')}</ol>`:''}</figcaption></figure>`}).join('')}</div><div class="device-carousel-controls"><button type="button" data-guide-shift="-1" class="carousel-arrow" aria-label="${tr('guidePrevious')}" disabled>←</button><span class="device-page" data-guide-page role="status" aria-label="${tr('guidePage')}">01 / ${String(slides.length).padStart(2,'0')}</span><button type="button" data-guide-shift="1" class="carousel-arrow" aria-label="${tr('guideNext')}">→</button></div><div class="device-dots" aria-label="${tr('guidePage')}">${slides.map((s,i)=>`<button type="button" data-guide-index="${i}" aria-label="${tr('guidePage')} ${i+1}" aria-current="${i===0?'true':'false'}"><span aria-hidden="true"></span></button>`).join('')}</div><p class="swipe-guide">${tr('swipeGuide')}</p></section>`;
  }
  function syncDeviceCarousel(track){
    const index=Math.max(0,Math.min(track.children.length-1,Math.round(track.scrollLeft/Math.max(1,track.clientWidth))));
    if(track.dataset.active===String(index))return;
    track.dataset.active=String(index);const root=track.closest('.device-visual'),count=`${String(index+1).padStart(2,'0')} / ${String(track.children.length).padStart(2,'0')}`;
    $('[data-guide-count]',root).textContent=count;$('[data-guide-page]',root).textContent=count;
    $('[data-guide-shift="-1"]',root).disabled=index===0;$('[data-guide-shift="1"]',root).disabled=index===track.children.length-1;
    [...track.children].forEach((s,i)=>{s.inert=i!==index;s.setAttribute('aria-hidden',String(i!==index))});
    $$('[data-guide-index]',root).forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));
    fitDeviceTrack(track);
  }
  function moveDeviceCarousel(root,index){const track=$('[data-device-track]',root);track.scrollTo({left:Math.max(0,Math.min(track.children.length-1,index))*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  function bindDeviceCarousels(){
    deviceResizeObserver?.disconnect();deviceResizeObserver=new ResizeObserver(entries=>{for(const entry of entries){const track=entry.target.closest('[data-device-track]');if(track)fitDeviceTrack(track);}});
    $$('[data-device-track]').forEach(track=>{let frame;track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>syncDeviceCarousel(track))},{passive:true});track.addEventListener('keydown',e=>{if(e.target!==track||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const current=Number(track.dataset.active||0),next=e.key==='Home'?0:e.key==='End'?track.children.length-1:current+(e.key==='ArrowRight'?1:-1);moveDeviceCarousel(track.closest('.device-visual'),next)});syncDeviceCarousel(track)});
    $$('.device-slide').forEach(slide=>deviceResizeObserver.observe(slide));
  }
  function fitDeviceTrack(track){const current=track.children[Number(track.dataset.active||0)];if(track.clientWidth&&current?.offsetHeight)track.style.height=current.offsetHeight+'px';}
  function photoCredits(){
    const photos=route==='nearby'?D.dining.map(x=>({...D.diningPhotoSources[x.id],title:t(x.title),publisher:''})):route==='tours'?D.photoCredits:['home','nearby'].includes(route)?D.photoCredits.filter(p=>p.id==='jeonpo'):[];
    if(!photos.length)return '';
    return `<details class="photo-credits"><summary>${tr('photoCredits')}</summary>${route==='nearby'?'':`<p>${tr('photoLicense')}</p>`}<ul>${photos.map(p=>`<li>${ext(p.source,esc(p.title))}<span>${esc(p.creator)} · ${esc(p.publisher)}${p.created?` · ${esc(p.created)}`:''}</span></li>`).join('')}</ul></details>`;
  }
  function home(){return `
    <section class="cover">
      <div class="cover-meta"><span>BUSAN PRIVATE STAY</span><span>JEONPO, BUSAN</span><span class="cover-issue">A PLACE TO STAY TOGETHER</span></div>
      <div class="cover-title"><h1 aria-label="EXTAY JEONPO"><img class="cover-logo" src="assets/images/extay-logo.svg?v=20261113-logo1" width="518" height="155" alt="EXTAY"><span>JEONPO<i aria-hidden="true">.</i></span></h1><p>${text(D.home.line).replace(/\n/g,' ')}</p></div>
      <div class="hero-photo"><div class="hero-slide">${img(heroPhotos[slide],'fetchpriority="high" width="1448" height="1086" id="heroImage"')}</div><div class="photo-index"><span id="heroCaption">${text(D.captions[heroPhotos[slide]])}</span><div><button class="hero-prev" aria-label="${tr('previous')}">←</button><span id="heroCount">0${slide+1} / 03</span><button class="hero-next" aria-label="${tr('next')}">→</button></div></div></div>
      <div class="cover-caption"><span>PRIVATE SPACE · SHARED MOMENTS</span><button class="scroll-link" data-scroll="introduction">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></button></div>
    </section>
    <section class="intro section" id="introduction"><div><p class="eyebrow">01 / THE STAY</p><h2>${lines(D.home.introTitle)}</h2></div><div class="intro-copy"><p>${text(D.home.introBody)}</p>${stats()}${link('gallery',tr('gallery'))}</div></section>
    <section class="essentials section"><div class="section-heading"><div><p class="eyebrow">STAY ESSENTIALS</p><h2>${text(D.home.essentials)}</h2></div><span class="small-note">THE PRACTICAL SIDE<br>OF A GOOD STAY</span></div><div class="essential-grid">${[['checkin','checkIn','16:00'],['checkin','checkOut','11:00'],['transport','transport',text(L('부전역 도보 5–8분','Bujeon · 5–8 min walk','釜田駅 徒歩5–8分','釜田站步行5–8分钟','釜田站步行5–8分鐘'))],['wifi','wifi','5G · 2.4G']].map(([r,k,v])=>`<a href="#${r}">${icon(r)}<span>${tr(k)}</span><strong>${v}</strong><i aria-hidden="true">↗</i></a>`).join('')}</div><a href="#transport" class="arrival-note"><strong>${tr('stairs')}</strong><span>${text(D.home.floorBody)}</span><span aria-hidden="true">↗</span></a></section>
    <section class="signature section"><button class="signature-image photo-button" data-photo="9">${img(9,'loading="lazy" width="1448" height="1086"')}<span class="photo-open" aria-hidden="true">↗</span></button><div class="signature-copy"><p class="eyebrow">ROOM FOR YOUR PEOPLE</p><h2>${lines(D.home.signatureTitle)}</h2><p>${text(D.home.signatureBody)}</p>${link('gallery',tr('gallery'))}<span class="signature-mark">ONE FLOOR.<br>JUST YOURS.</span></div></section>
    <section class="space-edit section"><div class="section-heading"><div><p class="eyebrow">02 / THE SPACE EDIT</p><h2>${text(D.home.galleryTitle)}</h2></div>${link('gallery',tr('viewAll'))}</div><div class="editorial-mosaic">${[[15,'BEDROOM 01'],[29,'THE TERRACE'],[2,'LITTLE DETAILS']].map(([id,label])=>`<button class="photo-button" data-photo="${id}">${img(id,'loading="lazy"')}<span class="image-caption"><small>${label}</small><span>${text(D.captions[id])}</span><i aria-hidden="true">↗</i></span></button>`).join('')}</div></section>
    <section class="local-edit section"><div class="local-copy"><p class="eyebrow">03 / JEONPO, AT YOUR PACE</p><h2>${lines(D.home.localTitle)}</h2><p>${text(D.home.localBody)}</p><div class="local-links">${link('nearby',tr('nearby'))}${link('tours',tr('tours'))}</div></div>${localPhoto('jeonpo',t(D.sights[0].title),'home-local-photo')}</section>
    <section class="home-guide section"><div class="section-heading"><div><p class="eyebrow">04 / YOUR STAY, MADE EASY</p><h2>${tr('infoTitle')}</h2></div><p>${tr('infoBody')}</p></div><div class="guide-rows">${guideRows()}</div></section>
    <section class="faq-section section"><p class="eyebrow">BEFORE YOU BOOK</p><h2>${tr('faq')}</h2><div class="faq-list">${D.faqs.map(x=>`<details><summary>${text(x.q)}</summary><p>${text(x.a)}</p></details>`).join('')}</div></section><section class="booking-section section"><p class="eyebrow">A GOOD PLACE, WITH GOOD PEOPLE</p><h2>${lines(D.home.bookingTitle)}</h2><p>${text(D.home.bookingBody)}</p><button class="primary-button" data-book>${tr('book')}<span aria-hidden="true">↗</span></button><span class="booking-location">JEONPO<br>BUSAN, KOREA</span></section>${footer()}`;}
  function gallery(){const items=D.gallery.filter(x=>category==='all'||x.category===category);return `${heading('THE SPACE EDIT',D.ui.gallery,L('창가의 빛부터, 하루를 마무리하는 침실까지.','From the light by the window to the room you end your day in.','窓辺の光から、一日を終える寝室まで。','从窗边阳光，到结束一天的卧室。','從窗邊陽光，到結束一天的臥室。'))}<section class="gallery-section section"><div class="gallery-top">${stats()}<span class="gallery-total">35 PHOTOGRAPHS</span></div><div class="filter-tabs" role="group" aria-label="${tr('gallery')}">${['all','living','bedroom1','bedroom2','kitchen','terrace','bath'].map(k=>`<button data-category="${k}" class="${k===category?'active':''}" aria-pressed="${k===category}">${tr(k)}</button>`).join('')}</div><div class="gallery-grid">${items.map((x,i)=>`<button class="gallery-item photo-button ${i%7===0?'wide':''}" data-photo="${x.id}">${img(x.id,'loading="lazy"')}<span><small>${String(x.id).padStart(2,'0')}</small>${text(D.captions[x.id])}<i aria-hidden="true">↗</i></span></button>`).join('')}</div></section>${help()}${footer()}`;}
  function guideIndex(){return `${heading('YOUR STAY, MADE EASY',D.ui.guide,D.ui.infoBody)}<section class="guide-index section"><div class="guide-rows">${guideRows()}</div><div class="guide-message">${icon('checkin')}<p>${tr('message')}</p></div></section>${help()}${footer()}`;}
  function guidePage(){
    const g=D.guides[route],devices=['appliances','laundry'].includes(route);
    return `${heading(g.label,g.title,g.lead)}<div class="guide-layout section"><aside class="guide-sidebar"><figure>${img(g.image,'loading="lazy"')}<figcaption>${text(D.captions[g.image])}</figcaption></figure><nav aria-label="${tr('guide')}">${Object.keys(D.guides).map(k=>`<a href="#${k}" ${route===k?'aria-current="page"':''}>${tr(k)}<span>↗</span></a>`).join('')}</nav></aside><div class="guide-content">${devices?`<nav class="device-jump" aria-label="${tr('deviceJump')}"><p>${tr('deviceJump')}</p><div>${g.cards.filter(c=>c.id).map(c=>`<button data-scroll="device-${esc(c.id)}">${text(c.title)}<span aria-hidden="true">↓</span></button>`).join('')}</div></nav>`:''}${g.cards.map((c,i)=>`<article class="info-article" ${c.id?`id="device-${esc(c.id)}"`:''}><div class="article-heading"><span>${String(i+1).padStart(2,'0')}</span><h2>${text(c.title)}</h2></div>${c.model?`<p class="device-model">${esc(c.model)}</p><p class="device-location">${tr('locationLabel')} · ${text(c.location)}</p>`:''}${devices&&c.id&&D.deviceMedia[c.id]?deviceCarousel(c):c.image!==null?`<button class="guide-photo photo-button ${[54,55,56,58,57].includes(c.image)?'contain':''}" data-photo="${c.image}">${img(c.image,'loading="lazy"')}<span class="photo-open" aria-hidden="true">↗</span></button>`:''}${c.id==='living-ac'?`<div class="remote-legend"><span>01 · ${text(L('왼쪽 / TV','Left / TV','左／TV','左／电视','左／電視'))}</span><span>02 · ${text(L('가운데 / 에어컨','Middle / AC','中央／エアコン','中／空调','中／冷氣'))}</span><span>03 · ${text(L('오른쪽 / 팬','Right / fan','右／ファン','右／吊扇','右／吊扇'))}</span></div>`:''}<p>${text(c.text)}</p>${route==='wifi'&&i===0?`<div class="wifi-network-grid">${D.wifiNetworks.map(n=>`<div class="wifi-network"><small>${esc(n.band)}</small><code>${esc(n.name)}</code><button class="copy-button" data-copy="${esc(n.name)}">${tr('copyNetwork')} <span aria-hidden="true">⧉</span></button></div>`).join('')}</div>`:''}${c.photos?`<div class="entry-lock-photos">${c.photos.map(id=>`<figure><button class="photo-button" data-photo="${id}">${img(id,'loading="lazy"')}<span class="photo-open" aria-hidden="true">↗</span></button><figcaption>${text(D.captions[id])}</figcaption></figure>`).join('')}</div>`:''}${c.steps.length?`<ol class="steps">${c.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>`:''}${c.caution?`<aside class="device-caution"><strong>${tr('guideCaution')}</strong><p>${text(c.caution)}</p></aside>`:''}${c.links?.length?`<div class="manual-links">${c.links.map(x=>ext(x.url,text(x.title))).join('')}</div>`:''}</article>`).join('')}${devices?`<div class="device-support"><p>${tr('deviceHelp')}</p>${ext(D.bookingUrl,tr('ask'))}</div>`:''}</div></div>${help()}${footer()}`;
  }

  function transport(){const steps=[
    [45,L('부전역 2번 출구','Bujeon Station, Exit 2','釜田駅2番出口','釜田站2号出口','釜田站2號出口'),L('부산 도시철도 1호선 부전역 2번 출구로 나옵니다. 숙소까지 약 450m, 도보 약 5–8분입니다.','Take Exit 2 at Bujeon Station on Metro Line 1. Walk about 450 m, approximately 5–8 minutes.','地下鉄1号線釜田駅2番出口から約450m、徒歩約5–8分。','地铁1号线釜田站2号出口，约450米，步行约5–8分钟。','地鐵1號線釜田站2號出口，約450公尺，步行約5–8分鐘。')],
    [46,L('왼쪽으로 돌아 직진','Turn left and go straight','左へ進んで直進','左转后直行','左轉後直行'),L('출구에서 왼쪽으로 돌아 파리바게뜨 방향으로 직진합니다. 대한적십자사 간판을 지나 계속 걸어주세요.','Turn left toward Paris Baguette. Continue straight past the Red Cross sign.','出口から左、パリバゲット方面へ。赤十字の看板を過ぎて直進。','出站左转朝巴黎贝甜方向，经过红十字标识继续直行。','出站左轉朝巴黎貝甜方向，經過紅十字標示繼續直行。')],
    [50,L('푸드앤 마트 사거리','FOOD& intersection','FOOD&マートの交差点','FOOD&超市路口','FOOD&超市路口'),L('사거리에 있는 대형 식자재마트 FOOD&를 찾습니다. 횡단보도로 마트 방향으로 건넌 뒤, 마트를 끼고 왼쪽으로 약 100m 직진합니다.','Find the FOOD& supermarket at the intersection. Cross toward it, then turn left along the supermarket and walk about 100 m.','交差点のFOOD&へ横断歩道で渡り、マートを左へ約100m進みます。','找到路口FOOD&超市，过人行横道朝超市走，沿超市左转约100米。','找到路口FOOD&超市，過行人穿越道朝超市走，沿超市左轉約100公尺。')],
    [37,L('식당 옆 입구에서 5층으로','Beside the restaurant, up to 5F','食堂横の入口から5階へ','餐厅旁入口，上5楼','餐廳旁入口，上5樓'),L('하얀 5층 건물의 1층 ‘전포대패삼겹’ 식당을 찾습니다. 식당 바로 옆이 계단 입구입니다. 엘리베이터가 없으니 계단으로 5층까지 올라와 주세요.','Look for Jeonpo Daepae Samgyeop on the ground floor of a white five-storey building. The stairs are immediately beside it. Take them to the 5th floor; there is no elevator.','白い5階建て、1階「전포대패삼겹」のすぐ横が階段入口。エレベーターはなく、階段で5階へ。','找到白色5层楼房1楼“전포대패삼겹”餐厅，旁边为楼梯入口，无电梯，请上5楼。','找到白色5層樓房1樓「전포대패삼겹」餐廳，旁邊為樓梯入口，無電梯，請上5樓。')]
  ];return `${heading('FIND YOUR WAY HERE',D.ui.transport,L('처음 오는 골목도, 사진을 따라 천천히.','A photo guide to your first arrival.','初めての路地も、写真を頼りに。','第一次来，也能跟着照片找到路。','第一次來，也能跟著照片找到路。'))}<section class="address-section section"><div class="address-card"><p class="eyebrow">OUR ADDRESS</p><h2>${tr('address')}</h2><p>${text(L('1층 전포대패삼겹 식당 옆 계단 입구','Stair entrance beside the ground-floor pork restaurant','1階「전포대패삼겹」横の階段入口','1楼전포대패삼겹餐厅旁楼梯入口','1樓전포대패삼겹餐廳旁樓梯入口'))}</p>${mapButtons()}<button class="copy-button" data-copy="${esc(D.address+', 5층')}">${tr('copy')} <span aria-hidden="true">⧉</span></button></div><div class="building-photo"><button class="photo-button" data-photo="36">${img(36,'loading="lazy"')}</button></div></section><section class="transport-section section"><div class="travel-alert"><strong>${tr('stairs')} / ${tr('noParking')}</strong><p>${text(D.home.floorBody)}</p></div><div class="route-overview"><article><p class="eyebrow">FROM BUSAN STATION</p><h2>${text(L('부산역에서','From Busan Station','釜山駅から','从釜山站出发','從釜山站出發'))}</h2><p>${text(L('도시철도 1호선 노포 방면 → 부전역 하차 → 2번 출구 → 도보 약 5–8분.','Metro Line 1 toward Nopo → Bujeon Station → Exit 2 → about 5–8 minutes on foot.','1号線・老圃方面 → 釜田駅 → 2番出口 → 徒歩約5–8分。','地铁1号线老圃方向 → 釜田站 → 2号出口 → 步行约5–8分钟。','地鐵1號線老圃方向 → 釜田站 → 2號出口 → 步行約5–8分鐘。'))}</p>${ext('https://data.humetro.busan.kr/default/main.do',text(L('부산 도시철도 노선 안내','Busan Metro routes','釜山地下鉄路線案内','釜山地铁线路','釜山地鐵路線')))}</article><article><p class="eyebrow">FROM GIMHAE AIRPORT</p><h2>${text(L('김해공항에서','From Gimhae Airport','金海空港から','从金海机场出发','從金海機場出發'))}</h2><p>${text(L('부산김해경전철 사상 방면 → 사상역에서 2호선 장산 방면 → 서면역에서 1호선 노포 방면 → 부전역. 짐이 많다면 택시 이용을 권장합니다.','Light rail toward Sasang → Line 2 toward Jangsan → at Seomyeon change to Line 1 toward Nopo → Bujeon. A taxi may be easier with heavy luggage.','軽電鉄で沙上へ → 2号線・萇山方面 → 西面で1号線・老圃方面 → 釜田。大きな荷物にはタクシーをおすすめします。','轻轨沙上方向 → 沙上换2号线苌山方向 → 西面换1号线老圃方向 → 釜田。行李多建议乘出租车。','輕軌沙上方向 → 沙上換2號線萇山方向 → 西面換1號線老圃方向 → 釜田。行李多建議搭計程車。'))}</p>${link('airport',tr('airport'))}</article></div><div class="section-heading"><div><p class="eyebrow">THE LAST FEW STEPS</p><h2>${text(L('부전역에서 숙소까지','The walk from Bujeon','釜田駅から宿まで','釜田站到住宿','釜田站到住宿'))}</h2></div></div><div class="walking-grid">${steps.map(([id,title,body],i)=>`<article class="walking-step"><button class="photo-button" data-photo="${id}">${img(id,'loading="lazy"')}<span class="photo-open" aria-hidden="true">↗</span></button><p class="eyebrow">STEP 0${i+1}</p><h3>${text(title)}</h3><p>${text(body)}</p></article>`).join('')}</div><div class="transport-notes"><article><h2>${text(L('짐이 많다면','With luggage','大きな荷物がある場合','携带较多行李时','攜帶較多行李時'))}</h2><p>${text(L('호스트는 부전역 6번 출구 엘리베이터 이용을 안내하고 있습니다. 택시에는 ‘부산진구 동성로 113’을 보여주세요. 1층 계단 옆에서 체크인 전·후 무료 짐 보관이 가능합니다.','Your host recommends the elevator at Bujeon Exit 6. For a taxi, show “부산진구 동성로 113”. Free luggage storage is beside the ground-floor stairs before and after your stay.','ホストは釜田駅6番出口のエレベーターを案内しています。タクシーには「부산진구 동성로 113」を。1階で滞在前後の無料荷物預かりが可能です。','房东建议使用釜田站6号出口电梯。向出租车出示“부산진구 동성로 113”。入住前后可在1楼楼梯旁免费寄存行李。','房東建議使用釜田站6號出口電梯。向計程車出示「부산진구 동성로 113」。入住前後可在1樓樓梯旁免費寄存行李。'))}</p></article><article><h2>${text(L('차를 가져오신다면','Arriving by car','お車の場合','自驾前来时','自行開車前來時'))}</h2><p>${text(L('건물 주차는 불가능합니다. 호스트 안내: 바로 옆 명성주차장, 도보 약 30초. 시간당 3,000원 / 일 주차 20,000원. 요금과 주차 가능 여부는 현장에서 확인해 주세요.','No parking at the building. Your host suggests nearby Myeongseong Parking, about 30 seconds away on foot: KRW 3,000/hour or KRW 20,000/day. Confirm rates and availability on site.','敷地内駐車不可。隣の명성주차장は徒歩約30秒、1時間3,000ウォン・1日20,000ウォン（ホスト案内）。現地で料金と空きをご確認ください。','楼内无停车位。房东推荐旁边명성주차장，步行约30秒，3,000韩元/小时、20,000韩元/天，实际费用及空位请现场确认。','樓內無停車位。房東推薦旁邊명성주차장，步行約30秒，3,000韓元/小時、20,000韓元/天，實際費用及空位請現場確認。'))}</p>${ext(N('명성주차장 부산 전포동 동성로113'),tr('map'))}</article></div></section>${help()}${footer()}`;}
  const directions=x=>'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(D.address)+'&destination='+encodeURIComponent(x.query)+'&travelmode=transit';
  function localPhoto(id,label,cls='discovery-photo'){
    const photo=D.localPhotos[id];
    return `<figure class="${cls}"><button class="photo-button place-photo" type="button" data-local-photo="${esc(id)}" aria-label="${esc(label)} · ${tr('zoomIn')}"><img src="${esc(photo.file)}" alt="${esc(label)}" loading="lazy" width="${photo.width}" height="${photo.height}"><span class="photo-open" aria-hidden="true">↗</span></button>${cls==='place-feature-photo'?'':`<figcaption>${esc(label)}</figcaption>`}</figure>`;
  }
  function localCards(){
    const dining=route==='nearby',all=dining?D.dining:D.sights,categories=D.placeCategories[dining?'dining':'sights'];
    const q=query.trim().toLocaleLowerCase();
    const items=all.filter(x=>(localCategory==='all'||(localCategory==='local'&&dining?x.near:x.category===localCategory))&&(!q||JSON.stringify([x.title,x.nameEn,x.address,x.area,x.menu,x.body]).toLocaleLowerCase().includes(q)));
    const total=`<p class="result-count" role="status">${String(items.length).padStart(2,'0')} / ${all.length} ${dining?'FOOD & CAFÉS':'PLACES'}</p>`;
    if(!items.length)return total+`<p class="empty-state">${tr('empty')}</p>`;
    return total+items.map(x=>`<article class="discovery-item" id="place-${esc(x.id)}"><div class="discovery-meta"><span>${String(all.indexOf(x)+1).padStart(2,'0')} / ${esc(x.area)}</span><span>${text(categories[x.category])}</span></div><h2>${text(x.title)}</h2><p class="place-original" lang="${language==='ko'?'en':'ko'}">${esc(language==='ko'?x.nameEn:x.nameKo===t(x.title)?x.nameEn:x.nameKo)}</p>${D.localPhotos[x.id]?localPhoto(x.id,t(x.title),'place-feature-photo'):''}${x.menu?`<p class="place-menu">${text(x.menu)}</p>`:''}<p class="place-body">${text(x.body)}</p><details class="place-details"><summary>${tr('placeDetails')}</summary><dl class="place-facts"><div><dt>${tr('addressLabel')}</dt><dd lang="ko">${esc(x.address)}</dd></div>${x.tip?`<div><dt>${tr('visitTip')}</dt><dd>${text(x.tip)}</dd></div>`:''}<div><dt>${tr('hoursLabel')}</dt><dd>${D.venueHours?.[x.id]?`<span class="hours-value">${esc(D.venueHours[x.id])}</span>`:''}${tr('checkOnMap')}</dd></div></dl><div class="place-map-links">${ext(N(x.query),tr('naver'),'outline-button')}${ext(G(x.query),tr('google'),'outline-button')}</div>${ext(directions(x),tr('directions'))}${ext(x.source,tr('officialInfo'))}</details></article>`).join('');
  }
  function dayCourses(){
    return `<section class="day-courses section"><p class="eyebrow">A DAY, WELL SPENT</p><h2>${tr('courses')}</h2><div class="course-accordion">${D.dayCourses.map(c=>`<details><summary><small>${esc(c.label)}</small><span>${text(c.title)}</span></summary><ol>${c.stops.map(id=>{const place=D.sights.find(x=>x.id===id);return `<li>${ext(N(place.query),text(place.title))}</li>`}).join('')}</ol></details>`).join('')}</div></section>`;
  }
  function discoveryPage(dining){
    const categories=D.placeCategories[dining?'dining':'sights'];
    return `${heading(dining?'LOCAL NOTES / FOOD & CAFÉS':'LOCAL NOTES / BUSAN',dining?D.ui.diningIntro:D.ui.sightsIntro,dining?D.ui.diningLead:D.ui.sightsLead)}<section class="discovery-cover section">${localPhoto(dining?'jeonpo':'sea',dining?t(D.sights[0].title):t(D.sights.find(x=>x.id==='sea').title))}<div class="discovery-intro"><p class="eyebrow">${dining?'20 TABLES & COFFEE STOPS':'20 PLACES, YOUR OWN PACE'}</p><p>${tr('sourceNote')}</p><small>${tr('updated')}</small></div><div class="local-page-links">${link(dining?'tours':'nearby',tr(dining?'tours':'nearby'))}</div></section>${dining?'':dayCourses()}<section class="discovery-list section"><h2 class="discovery-list-title">${dining?tr('nearby'):tr('explorePlaces')}</h2><label class="search-field">${icon('nearby')}<input type="search" id="localSearch" placeholder="${tr(dining?'placeSearch':'sightSearch')}" aria-label="${tr(dining?'placeSearch':'sightSearch')}" value="${esc(query)}"></label><div class="filter-tabs" role="group" aria-label="${tr(dining?'nearby':'tours')}">${Object.entries(categories).map(([id,label])=>`<button type="button" class="${localCategory===id?'active':''}" data-local-category="${id}" aria-pressed="${localCategory===id}">${text(label)}</button>`).join('')}</div><div id="localResults">${localCards()}</div></section>${help()}${footer()}`;
  }
  function nearby(){return discoveryPage(true);}
  function tours(){return discoveryPage(false);}
  function airport(){
    const a=D.airport;
    return `${heading('ARRIVE IN YOUR OWN WAY',a.title,a.lead)}<section class="airport-section section"><div class="airport-choices">${a.options.map(x=>`<button class="airport-choice" data-scroll="airport-${x.id}"><span>${esc(x.tag)}</span><strong>${text(x.title)}</strong><b>${text(x.fare)}</b><small>${text(x.time)} · ${text(x.changes)}</small><i aria-hidden="true">↓</i></button>`).join('')}</div><p class="planning-note">${text(a.note)}</p><div class="airport-guides">${a.options.map(x=>`<article id="airport-${x.id}" class="airport-guide"><p class="eyebrow">${esc(x.tag)}</p><h2>${text(x.title)}</h2><p class="airport-best">${text(x.best)}</p><div class="airport-facts"><span>${text(x.fare)}</span><span>${text(x.time)}</span><span>${text(x.changes)}</span></div><p>${text(x.body)}</p><ol class="steps">${x.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>${x.extra?`<p class="airport-service-note">${text(x.extra)}</p>`:''}<div class="manual-links">${x.links.map(l=>ext(l.url,text(l.title))).join('')}</div>${x.id==='rail'?link('transport',tr('transport')):''}${x.id==='bus'?ext(G('부전역 BRT 공항리무진2'),text(L('부전역 리무진 정류소 지도','Bujeon limousine stop map','釜田リムジン停留所の地図','釜田机场巴士站地图','釜田機場巴士站地圖'))):''}${x.id==='taxi'?`<div class="taxi-address"><span>${text(L('기사님께 보여주세요','Show your driver','運転手に見せてください','请向司机出示','請向司機出示'))}</span><strong lang="ko">부산진구 동성로 113</strong><button class="copy-button" data-copy="부산광역시 부산진구 동성로 113">${tr('copy')} <span aria-hidden="true">⧉</span></button></div>`:''}</article>`).join('')}</div><article class="return-airport"><p class="eyebrow">ON YOUR WAY BACK</p><h2>${text(a.returnTitle)}</h2><p>${text(a.returnBody)}</p>${ext('https://www.airport.co.kr/gimhae/',text(L('김해공항 공식 안내','Gimhae Airport information','金海空港公式案内','金海机场官方指南','金海機場官方指南')))}</article><p class="content-date">${tr('updated')}</p></section>${help()}${footer()}`;
  }

  function updateNavigation(){
    $('.desktop-nav').innerHTML=[['gallery','gallery'],['guide','guide'],['nearby','local']].map(([r,k])=>`<a href="#${r}" ${route===r?'aria-current="page"':''}>${tr(k)}</a>`).join('');
    $('.header-book').textContent=tr('book');
    $('.bottom-nav').innerHTML=[['home','home','home'],['gallery','space','gallery'],['guide','guide','guide'],['nearby','local','nearby'],['book','book','book']].map(([r,k,i])=>r==='book'?`<button data-book>${icon(i)}<span>${tr(k)}</span></button>`:`<a href="#${r}" ${route===r||(r==='guide'&&['airport','transport',...Object.keys(D.guides)].includes(route))||(r==='nearby'&&route==='tours')?'aria-current="page"':''}>${icon(i)}<span>${tr(k)}</span></a>`).join('');
    $('.drawer-nav').innerHTML=['home','gallery','airport','transport','checkin','wifi','appliances','laundry','rules','nearby','tours'].map((r,i)=>`<a href="#${r}" ${route===r?'aria-current="page"':''}><small aria-hidden="true">${String(i+1).padStart(2,'0')}</small><span class="drawer-copy"><strong>${esc(tr(r))}</strong><span class="drawer-subtitle">${text(D.menuDescriptions[r])}</span></span><i aria-hidden="true">↗</i></a>`).join('');
    $('#language').value=language;$('#languageLabel').textContent=tr('language');$('.skip-link').textContent=tr('skip');$('.menu-button').setAttribute('aria-label',tr('menu'));$('.bottom-nav').setAttribute('aria-label',tr('quick'));
    $('#zoomIn').setAttribute('aria-label',tr('zoomIn'));$('#zoomOut').setAttribute('aria-label',tr('zoomOut'));$('#zoomReset').setAttribute('aria-label',tr('zoomReset'));
    $$('[data-close]').forEach(b=>b.setAttribute('aria-label',tr('close')));$('.prev').setAttribute('aria-label',tr('previous'));$('.next').setAttribute('aria-label',tr('next'));
    $('#bookingTitle').textContent=tr('bookingTitle');$('#bookingBody').innerHTML=`<p>${tr('bookingBody')}</p>${stats()}<div class="booking-facts"><p>${tr('stairs')}</p><p>${tr('noParking')}</p></div>${ext(D.bookingUrl,tr('bookingCta'),'primary-button')}<p class="booking-contact">${tr('askBody')}</p>`;
  }
  // Native disclosures keep the full guide available without a long first screen.
  function disclosure(nodes,title,subtitle='',group='guide',id=''){
    const panel=document.createElement('details');panel.className='compact-panel';panel.name=group;
    if(id)panel.id=id;
    const summary=document.createElement('summary');
    summary.innerHTML=`<span class="panel-copy"><strong>${esc(title)}</strong>${subtitle?`<span>${esc(subtitle)}</span>`:''}</span><span class="panel-toggle" aria-hidden="true">+</span>`;
    const body=document.createElement('div');body.className='panel-body';
    const first=nodes[0];first.before(panel);panel.append(summary,body);nodes.forEach(node=>body.append(node));
    summary.addEventListener('click',()=>{panel.dataset.userToggle='true';});
    panel.addEventListener('toggle',()=>{
      const userTriggered=panel.dataset.userToggle==='true';delete panel.dataset.userToggle;
      if(!panel.open)return;
      $$('.compact-panel').filter(other=>other!==panel&&other.name===group&&other.open).forEach(other=>{other.open=false;});
      requestAnimationFrame(()=>{
        $$('.device-visual',panel).forEach(root=>{const track=$('[data-device-track]',root);track.scrollLeft=Number(track.dataset.active||0)*track.clientWidth;fitDeviceTrack(track);});
        if(userTriggered)panel.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      });
    });
    return panel;
  }
  function compactLists(){
    const list=$('#localResults')||$('.gallery-grid');if(!list)return;
    const cards=$$('#localResults>.discovery-item,.gallery-grid>.gallery-item');
    const batch=route==='gallery'?6:4;
    cards.forEach((card,i)=>{card.hidden=i>=batch;const body=$('.place-body',card),details=$('.place-details',card);if(body&&details)details.querySelector('summary').after(body);});
    list.parentElement.querySelector('[data-show-more]')?.remove();
    if(cards.length>batch){const button=document.createElement('button');button.className='show-more outline-button';button.dataset.showMore=String(batch);
      button.innerHTML=`${text(L(`${batch}개 더 보기`,`Show ${batch} more`,`${batch}件をさらに見る`,`再看${batch}个`,`再看${batch}個`))}<span aria-hidden="true">＋</span>`;
      list.after(button);
    }
  }
  function compactPage(){
    if(route==='home')$$('.signature img,.editorial-mosaic img,.home-local-photo img').forEach(image=>{
      const width=Number(image.getAttribute('width')),height=Number(image.getAttribute('height'));
      if(width&&height)image.style.aspectRatio=`${width} / ${height}`;
    });
    if(D.guides[route]){
      $('.guide-sidebar')?.remove();$('.device-jump')?.remove();
      $$('.info-article').forEach((article,i)=>{
        const title=$('h2',article)?.textContent||'',model=$('.device-model',article)?.textContent||'';
        const id=article.id;article.removeAttribute('id');$('.article-heading',article)?.remove();$('.device-model',article)?.remove();
        const panel=disclosure([article],title,model,'stay-guide',id);
        if(route==='wifi'&&i===0)panel.open=true;
      });
    }
    if(route==='transport'){
      const entry=$('.building-photo');let entryPanel;if(entry)entryPanel=disclosure([entry],t(L('건물 입구 → 5층','Building entrance → 5F','建物入口 → 5階','建筑入口 → 5楼','建築入口 → 5樓')),tr('stairs'),'transport');
      $$('.route-overview>article').forEach((article,i)=>{
        const title=t(i?L('김해공항 → 숙소','Gimhae Airport → the stay','金海空港 → 宿','金海机场 → 住宿','金海機場 → 住宿'):L('부산역 → 숙소','Busan Station → the stay','釜山駅 → 宿','釜山站 → 住宿','釜山站 → 住宿'));
        $('h2',article)?.remove();$('.eyebrow',article)?.remove();disclosure([article],title,'','transport');
      });
      const walking=$('.walking-grid');$('.transport-section>.section-heading')?.remove();
      if(walking)disclosure([walking],t(L('부전역 2번 출구 → 숙소','Bujeon Exit 2 → the stay','釜田駅2番出口 → 宿','釜田站2号出口 → 住宿','釜田站2號出口 → 住宿')),t(L('도보 5–8분 · 사진으로 찾아가기','5–8 min walk · photo directions','徒歩5–8分・写真で道案内','步行5–8分钟・照片指引','步行5–8分鐘・照片指引')),'transport');
      $$('.transport-notes>article').forEach((article,i)=>{const title=i?t(L('차량 → 명성주차장','By car → Myeongseong Parking','車 → 명성駐車場','自驾 → 명성停车场','開車 → 명성停車場')):$('h2',article).textContent;$('h2',article)?.remove();disclosure([article],title,'','transport');});
      if(entryPanel){$('.transport-section').append(entryPanel);const note=$('.travel-alert>p');if(note)$('.panel-body',entryPanel).prepend(note);}
      const address=$('.address-card');if(address)disclosure([address],t(L('숙소 주소 · 지도','Stay address · maps','宿の住所・地図','住宿地址・地图','住宿地址・地圖')),tr('address'),'transport');
      $('.transport-section').after($('.address-section'));
    }
    if(route==='airport'){
      $('.airport-choices')?.remove();
      $$('.airport-guide').forEach(article=>{const subtitle=$('h2',article)?.textContent||'',title=t(L('김해공항 → 숙소','Gimhae Airport → the stay','金海空港 → 宿','金海机场 → 住宿','金海機場 → 住宿'));const id=article.id;article.removeAttribute('id');$('h2',article)?.remove();$('.eyebrow',article)?.remove();disclosure([article],title,subtitle,'airport',id);});
      const back=$('.return-airport');if(back){$('h2',back)?.remove();$('.eyebrow',back)?.remove();disclosure([back],t(L('숙소 → 김해공항','The stay → Gimhae Airport','宿 → 金海空港','住宿 → 金海机场','住宿 → 金海機場')),'','airport');}
    }
    if(['nearby','tours'].includes(route)){
      $('.discovery-cover')?.remove();
      const courses=$('.day-courses');if(courses){$('h2',courses)?.remove();$('.eyebrow',courses)?.remove();disclosure([courses],tr('courses'),'','courses').classList.add('course-panel');}
    }
    compactLists();
  }

  function render(focus=false,restore=false){
    const samePage=document.body.dataset.route===route,openPanels=$$('.compact-panel').map((panel,i)=>panel.open?i:-1);
    document.documentElement.lang={zh:'zh-CN',tw:'zh-TW'}[language]||language;
    const pages={home,gallery,guide:guideIndex,airport,transport,nearby,tours};
    $('#main').innerHTML=(pages[route]||guidePage)();
    document.body.dataset.route=route;document.title=route==='home'?'EXTAY JEONPO — Busan Private Stay':`${tr(route)} · EXTAY JEONPO`;
    compactPage();if(samePage)$$('.compact-panel').forEach((panel,i)=>{panel.open=openPanels.includes(i);});updateNavigation();bindDeviceCarousels();if(focus)$('#main').focus({preventScroll:true});if(restore)window.scrollTo({top:scrolls.get(route)||0,behavior:'instant'});
  }
  function navigate(){const next=location.hash.slice(1)||'home',known=['home','gallery','guide','airport','transport','nearby','tours',...Object.keys(D.guides)];scrolls.set(route,window.scrollY);const resolved=known.includes(next)?next:'home';if(route!==resolved){localCategory='all';query='';}route=resolved;$$('dialog[open]').forEach(x=>x.close());render(true,true);}
  function showToast(message){clearTimeout(toastTimer);$('.toast').textContent=message;$('.toast').classList.add('visible');toastTimer=setTimeout(()=>$('.toast').classList.remove('visible'),3300);}
  function openPhoto(id){lightboxItems=route==='gallery'?D.gallery.filter(x=>category==='all'||x.category===category).map(x=>x.id):route==='transport'?[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]:D.guides[route]?[...new Set([D.guides[route].image,...D.guides[route].cards.flatMap(x=>[x.image,...(x.photos||[])]).filter(x=>x!==null)])]:D.gallery.map(x=>x.id);if(!lightboxItems.includes(id))lightboxItems.push(id);lightboxIndex=lightboxItems.indexOf(id);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);}
  function updatePhoto(){photoZoom=1;const item=lightboxItems[lightboxIndex],isFile=typeof item==='object';$('#lightboxImage').src=isFile?guideMediaUrl(item.file):`assets/images/photo-${String(item).padStart(2,'0')}.webp`;$('#lightboxImage').alt=isFile?item.caption:t(D.captions[item]);$('#lightboxCaption').textContent=isFile?item.caption:t(D.captions[item]);$('.lightbox-counter').textContent=`${String(lightboxIndex+1).padStart(2,'0')} / ${String(lightboxItems.length).padStart(2,'0')}`;requestAnimationFrame(fitPhoto);}
  function shiftPhoto(n){lightboxIndex=(lightboxIndex+n+lightboxItems.length)%lightboxItems.length;updatePhoto();}
  function shiftHero(n){slide=(slide+n+heroPhotos.length)%heroPhotos.length;const id=heroPhotos[slide];$('#heroImage').src=`assets/images/photo-${String(id).padStart(2,'0')}.webp`;$('#heroImage').alt=t(D.captions[id]);$('#heroCaption').textContent=t(D.captions[id]);$('#heroCount').textContent=`0${slide+1} / 03`;}
  document.addEventListener('click',async e=>{
    if(e.target.closest('.skip-link')){e.preventDefault();$('#main').focus();return;}
    const device=e.target.closest('[data-device-media]');if(device){const[id,index]=device.dataset.deviceMedia.split(':');const c=[...D.guides.appliances.cards,...D.guides.laundry.cards].find(c=>c.id===id);lightboxItems=D.deviceMedia[id].map(s=>({file:s.photo!==undefined?'assets/images/photo-'+String(s.photo).padStart(2,'0')+'.webp':s.file,caption:t(c.title)+' · '+t(s.title)+(s.keys?' · '+s.keys.map((k,i)=>(i+1)+'. '+t(k)).join(' / '):'')}));lightboxIndex=Number(index);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);return;}
    const guideShift=e.target.closest('[data-guide-shift]');if(guideShift){const root=guideShift.closest('.device-visual'),track=$('[data-device-track]',root);moveDeviceCarousel(root,Number(track.dataset.active||0)+Number(guideShift.dataset.guideShift));return;}
    const guideIndex=e.target.closest('[data-guide-index]');if(guideIndex){moveDeviceCarousel(guideIndex.closest('.device-visual'),Number(guideIndex.dataset.guideIndex));return;}
    const localPhoto=e.target.closest('[data-local-photo]');if(localPhoto){const id=localPhoto.dataset.localPhoto,places=(route==='nearby'?D.dining:D.sights).filter(place=>D.localPhotos[place.id]);lightboxItems=places.map(place=>({file:D.localPhotos[place.id].file,caption:t(place.title)}));lightboxIndex=places.findIndex(place=>place.id===id);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);return;}
    const photo=e.target.closest('[data-photo]');if(photo){openPhoto(Number(photo.dataset.photo));return;}
    if(e.target.closest('[data-book]')){$('#bookingDialog').showModal();return;}
    const close=e.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close).close();return;}
    if(e.target.closest('.menu-button')){$('#menuDialog').showModal();$('.menu-button').setAttribute('aria-expanded','true');return;}
    const cat=e.target.closest('[data-category]');if(cat){category=cat.dataset.category;const y=scrollY;render();window.scrollTo({top:y,behavior:'instant'});$(`[data-category="${category}"]`).focus({preventScroll:true});return;}
    const local=e.target.closest('[data-local-category]');if(local){localCategory=local.dataset.localCategory;$$('[data-local-category]').forEach(b=>{b.classList.toggle('active',b.dataset.localCategory===localCategory);b.setAttribute('aria-pressed',String(b.dataset.localCategory===localCategory))});$('#localResults').innerHTML=localCards();compactLists();return;}
    const copy=e.target.closest('[data-copy]');if(copy){try{await navigator.clipboard.writeText(copy.dataset.copy);showToast(tr('copied'))}catch{showToast(tr('copyFail'))}return;}
    if(e.target.closest('.hero-prev'))shiftHero(-1);if(e.target.closest('.hero-next'))shiftHero(1);
    if(e.target.closest('.lightbox-arrow.prev'))shiftPhoto(-1);if(e.target.closest('.lightbox-arrow.next'))shiftPhoto(1);
    const more=e.target.closest('[data-show-more]');if(more){const hidden=$$('#localResults>.discovery-item[hidden],.gallery-grid>.gallery-item[hidden]'),batch=Number(more.dataset.showMore);hidden.slice(0,batch).forEach(card=>{card.hidden=false;});if(hidden.length<=batch)more.remove();if(hidden[0]){hidden[0].tabIndex=-1;hidden[0].focus({preventScroll:true});hidden[0].scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}return;}
    const scroll=e.target.closest('[data-scroll]');if(scroll){const target=document.getElementById(scroll.dataset.scroll);if(target?.matches('details'))target.open=true;target?.closest('details')?.setAttribute('open','');target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===location.hash&&$('#menuDialog').open)$('#menuDialog').close();
  });
  $('#language').addEventListener('change',e=>{const y=scrollY;language=e.target.value;try{localStorage.setItem('extayjeonpo-language',language)}catch{}render();window.scrollTo({top:y,behavior:'instant'})});
  document.addEventListener('input',e=>{if(e.target.id==='localSearch'){query=e.target.value;$('#localResults').innerHTML=localCards();compactLists()}});
  $('#menuDialog').addEventListener('close',()=>$('.menu-button').setAttribute('aria-expanded','false'));
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const b=d.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)d.close()}}));
  document.addEventListener('keydown',e=>{if($('#lightbox').open){if(e.key==='ArrowRight'){e.preventDefault();shiftPhoto(1)}if(e.key==='ArrowLeft'){e.preventDefault();shiftPhoto(-1)}}});
  let touchX=0;$('#lightbox').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});$('#lightbox').addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchX;if(photoZoom===1&&Math.abs(delta)>55)shiftPhoto(delta<0?1:-1)},{passive:true});
  let photoZoom=1;
  function fitPhoto(){
    const stage=$('#lightboxStage'),photo=$('#lightboxImage');if(!$('#lightbox').open||!photo.naturalWidth||!stage.clientWidth||!stage.clientHeight)return;
    const factor=Math.min(stage.clientWidth/photo.naturalWidth,stage.clientHeight/photo.naturalHeight);
    const width=photo.naturalWidth*factor*photoZoom,height=photo.naturalHeight*factor*photoZoom;
    stage.classList.toggle('is-zoomed',photoZoom>1);photo.style.width=`${width}px`;photo.style.height=`${height}px`;
    photo.style.marginLeft=photoZoom>1?`${Math.max(0,(stage.clientWidth-width)/2)}px`:'0';
    photo.style.marginTop=photoZoom>1?`${Math.max(0,(stage.clientHeight-height)/2)}px`:'0';
    stage.scrollLeft=Math.max(0,(width-stage.clientWidth)/2);stage.scrollTop=Math.max(0,(height-stage.clientHeight)/2);
    $('#zoomValue').textContent=`${Math.round(photoZoom*100)}%`;$('#zoomOut').disabled=photoZoom<=1;$('#zoomIn').disabled=photoZoom>=4;
  }
  function setPhotoZoom(value){photoZoom=Math.max(1,Math.min(4,value));fitPhoto();}
  $('#zoomIn').addEventListener('click',()=>setPhotoZoom(photoZoom+1));
  $('#zoomOut').addEventListener('click',()=>setPhotoZoom(photoZoom-1));
  $('#zoomReset').addEventListener('click',()=>setPhotoZoom(1));
  $('#lightboxStage').addEventListener('dblclick',()=>setPhotoZoom(photoZoom===1?2:1));
  $('#lightboxImage').addEventListener('load',fitPhoto);window.addEventListener('resize',()=>requestAnimationFrame(fitPhoto));
  document.addEventListener('keydown',e=>{if(!$('#lightbox').open)return;if(e.key==='+'||e.key==='='){e.preventDefault();setPhotoZoom(photoZoom+1)}if(e.key==='-'){e.preventDefault();setPhotoZoom(photoZoom-1)}if(e.key==='0'){e.preventDefault();setPhotoZoom(1)}});
  window.addEventListener('hashchange',navigate);route=['home','gallery','guide','airport','transport','nearby','tours',...Object.keys(D.guides)].includes(location.hash.slice(1))?location.hash.slice(1):'home';render();
})();
