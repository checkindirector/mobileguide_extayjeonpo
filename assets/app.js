(() => {
  'use strict';
  const D=window.EXTAY, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const languages=['ko','en','ja','zh','tw'];
  const guideMediaUrl=file=>file.startsWith('assets/diagrams/')?`${file}?v=20261113-pine1`:file;
  let language='ko';try{const saved=localStorage.getItem('extayjeonpo-language');if(languages.includes(saved))language=saved;}catch{}
  let route='home',category='all',localCategory='all',query='',applianceCategory='all',applianceId='',lightboxItems=[],lightboxIndex=0,toastTimer,deviceResizeObserver;
  const heroPhotos=[1,9,8], scrolls=new Map();
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
  const heading=(label,title,lead='')=>`<div class="page-heading"><p class="eyebrow">${label}</p><h1>${lines(title)}</h1>${lead?`<p class="lead">${text(lead)}</p>`:''}</div>`;
  const mapButtons=(q=D.address)=>`<div class="button-row">${ext(N(q),tr('naver'),'outline-button')}${ext(G(q),tr('google'),'outline-button')}</div>`;
  const help=()=>`<aside class="help-block"><div><p class="eyebrow">HERE TO HELP</p><h2>${tr('guideCaption')}</h2><p>${tr('askBody')}</p></div>${ext(D.bookingUrl,tr('ask'),'primary-button')}</aside>`;
  const guideRows=()=>['airport','transport','checkin','wifi','appliances','laundry','rules'].map((r,i)=>`<a href="#${r}" class="guide-row"><span class="row-number">0${i+1}</span>${icon(r)}<span class="guide-row-copy"><strong>${tr(r)}</strong><small>${text(D.menuDescriptions[r])}</small></span><span aria-hidden="true">↗</span></a>`).join('');
  const visualSets={};
  function playBrandIntro(){
    const root=document.documentElement,intro=$('#brandIntro');
    if(!intro||!root.classList.contains('brand-intro-pending')){intro?.remove();return;}
    const reduced=matchMedia('(prefers-reduced-motion: reduce)'),logo=$('img',intro);
    let leaveTimer,removeTimer,finished=false;
    const finish=()=>{
      if(finished)return;finished=true;clearTimeout(leaveTimer);clearTimeout(removeTimer);
      const active=root.classList.contains('brand-intro-pending');
      root.classList.remove('brand-intro-pending','brand-intro-revealing');intro.remove();
      reduced.removeEventListener('change',onMotionChange);window.removeEventListener('hashchange',finish);
      if(active)document.dispatchEvent(new Event('extay:intro-complete'));
    };
    const onMotionChange=event=>{if(event.matches)finish();};
    const start=()=>{
      if(finished)return;
      if(reduced.matches||!root.classList.contains('brand-intro-pending')){finish();return;}
      intro.classList.add('is-running');
      try{sessionStorage.setItem('extay-jeonpo-brand-intro-v1','1');}catch{}
      leaveTimer=setTimeout(()=>{root.classList.add('brand-intro-revealing');intro.classList.add('is-leaving');removeTimer=setTimeout(finish,290);},650);
    };
    reduced.addEventListener('change',onMotionChange);window.addEventListener('hashchange',finish,{once:true});
    if(logo.complete){if(logo.naturalWidth)start();else finish();}
    else{logo.addEventListener('load',start,{once:true});logo.addEventListener('error',finish,{once:true});}
  }
  const walkingDirectionMarks=[
    {height:1333.3333,start:[555,875],line:'M555 875 L555 1050',head:'M525 1014 L555 1050 L585 1014'},
    {height:1333.3333,start:[690,1220],line:'M690 1220 L650 1000 L610 810',head:'M586 851 L610 810 L640 844'},
    {height:750,start:[350,700],line:'M350 700 L225 647 L110 592 L35 565',head:'M75 561 L35 565 L49 603'},
    {height:1333.3333,start:[545,1110],line:'M545 1110 L500 960 Q490 915 450 885 L363 792',head:'M368 836 L363 792 L412 799'}
  ];
  function walkingDirections(index){
    const mark=walkingDirectionMarks[index];if(!mark)return '';
    return `<svg class="walking-directions" viewBox="0 0 1000 ${mark.height}" fill="none" aria-hidden="true" focusable="false"><path class="walking-route-halo" d="${mark.line} ${mark.head}"/><path class="walking-route-line" d="${mark.line} ${mark.head}"/><circle class="walking-route-number" cx="${mark.start[0]}" cy="${mark.start[1]}" r="42"/><text class="walking-route-number-text" x="${mark.start[0]}" y="${mark.start[1]+14}" text-anchor="middle">${String(index+1).padStart(2,'0')}</text></svg>`;
  }
  function entranceHighlight(){
    return '<svg class="entrance-highlight" viewBox="0 0 1350 1800" fill="none" aria-hidden="true" focusable="false"><circle class="entrance-ring-halo" cx="635" cy="1492" r="150"/><circle class="entrance-ring" cx="635" cy="1492" r="150"/></svg>';
  }
  function deviceCarousel(c,slides=D.deviceMedia[c.id],key=c.id){
    visualSets[key]={title:c.title,slides};
    const visualLabel=key==='airport-boarding'?text(D.airport.guide.labels.terminalMap):key==='arrival-walk'?text(L('사진으로 찾아오기','Photo directions','写真で道案内','照片路线指引','照片路線指引')):key==='checkin-entry'?text(L('사진으로 보는 입실 안내','Check-in in photographs','写真でチェックイン','入住照片指南','入住照片指南')):tr('illustratedGuide');
    return `<section class="device-visual ${slides.length===1?'single-image':''}" aria-label="${text(c.title)}"><div class="device-visual-heading"><span>${visualLabel}</span><strong data-guide-count>01 / ${String(slides.length).padStart(2,'0')}</strong></div><div class="device-track" data-device-track="${esc(key)}" tabindex="0" role="group" aria-label="${text(c.title)} · ${visualLabel}">${slides.map((s,i)=>{const source=s.photo!==undefined?`assets/images/photo-${String(s.photo).padStart(2,'0')}.webp`:guideMediaUrl(s.file);const dimensions=s.photo!==undefined?D.photoSizes[s.photo]:[s.width,s.height];return `<figure class="device-slide" ${i?'inert aria-hidden="true"':''}><button class="device-media-button" type="button" data-device-media="${esc(key)}:${i}" aria-label="${text(c.title)} · ${text(s.title)} · ${tr('zoomIn')}">${key==='arrival-walk'?`<span class="walking-photo-frame"><img src="${esc(source)}" width="${dimensions[0]}" height="${dimensions[1]}" alt="${text(c.title)} · ${text(s.title)}" loading="lazy" decoding="async">${walkingDirections(i)}</span>`:`<img src="${esc(source)}" width="${dimensions[0]}" height="${dimensions[1]}" alt="${text(c.title)} · ${text(s.title)}" loading="lazy" decoding="async">`}<span class="media-expand" aria-hidden="true">↗</span></button><figcaption><p>${text(s.title)}</p>${s.keys?`<ol class="diagram-key">${s.keys.map(k=>`<li>${text(k).replace(/^\d+[.·\s]+/,'')}</li>`).join('')}</ol>`:''}</figcaption></figure>`}).join('')}</div><div class="device-carousel-controls"><button type="button" data-guide-shift="-1" class="carousel-arrow" aria-label="${tr('guidePrevious')}" disabled>←</button><span class="device-page" data-guide-page role="status" aria-label="${tr('guidePage')}">01 / ${String(slides.length).padStart(2,'0')}</span><button type="button" data-guide-shift="1" class="carousel-arrow" aria-label="${tr('guideNext')}">→</button></div><div class="device-dots" aria-label="${tr('guidePage')}">${slides.map((s,i)=>`<button type="button" data-guide-index="${i}" aria-label="${tr('guidePage')} ${i+1}" aria-current="${i===0?'true':'false'}"><span aria-hidden="true"></span></button>`).join('')}</div><p class="swipe-guide">${tr('swipeGuide')}</p></section>`;
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
    const photos=route==='home'?[...D.photoCredits.filter(p=>p.id==='sea'),{...D.diningPhotoSources[D.dining[0].id],title:t(D.dining[0].title),publisher:''}]:route==='nearby'?D.dining.map(x=>({...D.diningPhotoSources[x.id],title:t(x.title),publisher:''})):route==='tours'?D.photoCredits:['home','nearby'].includes(route)?D.photoCredits.filter(p=>p.id==='jeonpo'):[];
    if(!photos.length)return '';
    return `<details class="photo-credits"><summary>${tr('photoCredits')}</summary>${route==='nearby'?'':`<p>${tr('photoLicense')}</p>`}<ul>${photos.map(p=>`<li>${ext(p.source,esc(p.title))}<span>${esc(p.creator)} · ${esc(p.publisher)}${p.created?` · ${esc(p.created)}`:''}</span></li>`).join('')}</ul></details>`;
  }
  const homePhotoSets={
    hero:heroPhotos.map(id=>({id,label:''})),
    spaces:[{id:15,label:'BEDROOM 01'},{id:29,label:'THE TERRACE'},{id:2,label:'LITTLE DETAILS'}]
  };
  const homePhotoIndices={hero:0,spaces:0};
  let homePhotoObserver;
  const homeHeroAutoDelay=1680;
  let homeHeroAutoComplete=false,disposeHomeHeroAutoplay=()=>{};
  function homePhotoCarousel(key){
    const items=homePhotoSets[key],active=homePhotoIndices[key];
    const label=key==='hero'?L('익스테이 전포 공간 사진','EXTAY JEONPO space photographs','EXTAY JEONPOの空間写真','EXTAY JEONPO空间照片','EXTAY JEONPO空間照片'):D.home.galleryTitle;
    const carouselLabel=L('사진 캐러셀','Photo carousel','写真カルーセル','照片轮播','照片輪播');
    const slideLabel=L('사진','Photograph','写真','照片','照片');
    const selectLabel=L('사진 선택','Choose a photograph','写真を選択','选择照片','選擇照片');
    return `<div class="home-photo-carousel ${key==='hero'?'hero-photo':''}" data-home-carousel="${key}" role="region" aria-roledescription="${text(carouselLabel)}" aria-label="${text(label)}">
      <div class="home-photo-track" data-home-track tabindex="0" role="group" aria-label="${text(L('좌우로 넘기거나 방향키로 사진을 바꿔보세요','Swipe or use the arrow keys to change photographs','スワイプまたは矢印キーで写真を切り替えます','左右滑动或使用方向键切换照片','左右滑動或使用方向鍵切換照片'))}">
        ${items.map((item,i)=>`<figure class="home-photo-slide" role="group" aria-roledescription="${text(slideLabel)}" aria-label="${i+1} / ${items.length}" ${i!==active?'inert aria-hidden="true"':''}>
          <button class="photo-button" type="button" data-home-photo="${key}:${i}" aria-label="${text(D.captions[item.id])} · ${tr('zoomIn')}">${img(item.id,key==='hero'?(i===active?'fetchpriority="high" loading="eager"':'loading="eager"'):'loading="lazy"')}<span class="photo-open" aria-hidden="true">↗</span></button>
          ${key==='hero'?'':`<figcaption>${item.label?`<small>${esc(item.label)}</small>`:''}<p>${text(D.captions[item.id])}</p></figcaption>`}
        </figure>`).join('')}
      </div>
      <div class="home-carousel-controls">
        <button class="carousel-arrow" type="button" data-home-shift="-1" aria-label="${tr('previous')}" ${active===0?'disabled':''}>←</button>
        <div class="home-carousel-position"><span data-home-count role="status" aria-live="polite" aria-atomic="true">${String(active+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}</span><div class="home-carousel-dots" role="group" aria-label="${text(selectLabel)}">${items.map((item,i)=>`<button type="button" data-home-index="${i}" aria-label="${text(slideLabel)} ${i+1} · ${text(D.captions[item.id])}" aria-current="${i===active}"><span aria-hidden="true"></span></button>`).join('')}</div></div>
        <button class="carousel-arrow" type="button" data-home-shift="1" aria-label="${tr('next')}" ${active===items.length-1?'disabled':''}>→</button>
      </div>
    </div>`;
  }
  function fitHomePhotoTrack(track){
    const root=track.closest('[data-home-carousel]'),index=homePhotoIndices[root.dataset.homeCarousel];
    const current=track.children[index];
    if(track.clientWidth&&current?.offsetHeight)track.style.height=Math.ceil(current.getBoundingClientRect().height)+'px';
  }
  function syncHomePhotoCarousel(track){
    const root=track.closest('[data-home-carousel]'),key=root.dataset.homeCarousel;
    const index=Math.max(0,Math.min(track.children.length-1,Math.round(track.scrollLeft/Math.max(1,track.getBoundingClientRect().width))));
    homePhotoIndices[key]=index;if(key==='hero')document.body.dataset.hero=String(index);
    if(track.dataset.active!==String(index)){
      if(track.contains(document.activeElement)&&document.activeElement!==track&&!track.children[index].contains(document.activeElement))track.focus({preventScroll:true});
      track.dataset.active=String(index);
      [...track.children].forEach((figure,i)=>{figure.inert=i!==index;figure.setAttribute('aria-hidden',String(i!==index));});
      $('[data-home-count]',root).textContent=`${String(index+1).padStart(2,'0')} / ${String(track.children.length).padStart(2,'0')}`;
      $('[data-home-shift="-1"]',root).disabled=index===0;
      $('[data-home-shift="1"]',root).disabled=index===track.children.length-1;
      $$('[data-home-index]',root).forEach((button,i)=>button.setAttribute('aria-current',String(i===index)));
    }
    fitHomePhotoTrack(track);
  }
  function moveHomePhotoCarousel(root,index){
    const track=$('[data-home-track]',root),next=Math.max(0,Math.min(track.children.length-1,index));
    track.scrollTo({left:track.children[next].offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  function bindHomeHeroAutoplay(root){
    disposeHomeHeroAutoplay();disposeHomeHeroAutoplay=()=>{};
    if(!root||homeHeroAutoComplete)return;
    const track=$('[data-home-track]',root),last=homePhotoSets.hero.length-1,events=new AbortController();
    let timer=0,visible=false,disposed=false,visibilityObserver;
    const clear=()=>{clearTimeout(timer);timer=0;};
    const stop=()=>{homeHeroAutoComplete=true;clear();};
    const canPlay=()=>!disposed&&!homeHeroAutoComplete&&visible&&!document.hidden&&!$('dialog[open]')&&!document.documentElement.classList.contains('brand-intro-pending');
    const schedule=()=>{
      clear();if(!canPlay())return;
      if(homePhotoIndices.hero>=last){stop();return;}
      if($$('img',track).some(image=>!image.complete||!image.naturalWidth))return;
      timer=setTimeout(()=>{
        timer=0;if(!canPlay())return;
        const next=homePhotoIndices.hero+1;
        moveHomePhotoCarousel(root,next);
        if(next>=last)stop();else schedule();
      },homeHeroAutoDelay);
    };
    // One pass, like Another House: 1 → 2 → 3, then leave manual navigation in charge.
    root.addEventListener('pointerdown',stop,{passive:true,signal:events.signal});
    root.addEventListener('focusin',stop,{signal:events.signal});
    root.addEventListener('keydown',stop,{signal:events.signal});
    root.addEventListener('wheel',event=>{if(event.deltaX||event.shiftKey)stop();},{passive:true,signal:events.signal});
    root.addEventListener('load',schedule,{capture:true,signal:events.signal});
    document.addEventListener('visibilitychange',schedule,{signal:events.signal});
    document.addEventListener('extay:intro-complete',schedule,{signal:events.signal});
    document.addEventListener('close',schedule,{capture:true,signal:events.signal});
    if('IntersectionObserver' in window){
      visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.35;schedule();},{threshold:[0,.35]});
      visibilityObserver.observe(root);
    }else{visible=true;schedule();}
    disposeHomeHeroAutoplay=()=>{disposed=true;clear();events.abort();visibilityObserver?.disconnect();};
  }
  function bindHomePhotoCarousels(){
    homePhotoObserver?.disconnect();
    const roots=$$('[data-home-carousel]');bindHomeHeroAutoplay(roots.find(root=>root.dataset.homeCarousel==='hero'));if(!roots.length)return;
    homePhotoObserver=new ResizeObserver(entries=>{for(const {target} of entries){const track=target.matches('[data-home-track]')?target:target.closest('[data-home-track]');if(!track)continue;
      if(target===track&&track.dataset.width!==String(track.clientWidth)){
        track.dataset.width=String(track.clientWidth);
        track.scrollLeft=track.children[homePhotoIndices[track.closest('[data-home-carousel]').dataset.homeCarousel]].offsetLeft;
      }
      fitHomePhotoTrack(track);
    }});
    roots.forEach(root=>{
      const track=$('[data-home-track]',root),key=root.dataset.homeCarousel;
      track.scrollLeft=track.children[homePhotoIndices[key]].offsetLeft;
      track.dataset.width=String(track.clientWidth);syncHomePhotoCarousel(track);
      let frame;track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>syncHomePhotoCarousel(track));},{passive:true});
      track.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=homePhotoIndices[key];moveHomePhotoCarousel(root,event.key==='Home'?0:event.key==='End'?track.children.length-1:current+(event.key==='ArrowRight'?1:-1));});
      homePhotoObserver.observe(track);[...track.children].forEach(figure=>homePhotoObserver.observe(figure));
    });
  }

  function home(){
    const quick=[['checkin','checkIn','16:00'],['checkin','checkOut','11:00'],['transport','transport',text(L('부전역 도보 5–8분','Bujeon · 5–8 min walk','釜田駅 徒歩5–8分','釜田站步行5–8分钟','釜田站步行5–8分鐘'))],['wifi','wifi','5G · 2.4G']];
    const localTeaser=(destination,place,label)=>{const photo=D.localPhotos[place.id];return `<a class="atelier-local-card" href="#${destination}"><img src="${esc(photo.file)}" width="${photo.width}" height="${photo.height}" alt="${text(place.title)}" loading="lazy" decoding="async"><small>${label}</small><span>${tr(destination)}<i aria-hidden="true">↗</i></span></a>`;};
    return `
    <section class="cover atelier-cover" aria-label="${text(L('익스테이 전포의 첫 장면','Your first look at EXTAY JEONPO','EXTAY JEONPOの最初の風景','EXTAY JEONPO的第一印象','EXTAY JEONPO的第一印象'))}">
      ${homePhotoCarousel('hero')}
      <div class="cover-title"><p class="cover-location">BUSAN · PRIVATE STAY</p><h1 aria-label="EXTAY JEONPO"><img class="cover-logo" src="assets/images/extay-logo-white.svg?v=20261113-logo1" width="518" height="155" alt="EXTAY"><span>JEONPO</span></h1><p class="cover-tagline">${text(L('부산 전포, 함께 머무는 우리만의 집.','Your private place, together in Jeonpo.','釜山・全浦、みんなで過ごす私たちの家。','釜山田浦，与旅伴共享的私人空间。','釜山田浦，與旅伴共享的私人空間。'))}</p></div>
      <button type="button" class="cover-scroll" data-cover-scroll aria-label="${text(L('아래 안내 보기','Scroll to the stay guide','下の滞在案内を見る','查看下方入住指南','查看下方入住指南'))}">SCROLL<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
    </section>
    <section class="essentials section" id="stay-essentials"><div class="section-heading"><div><p class="eyebrow">STAY ESSENTIALS</p><h2>${text(L('도착부터 퇴실까지.','From arrival to departure.','到着からチェックアウトまで。','从抵达到离开。','從抵達到離開。'))}</h2></div></div><div class="essential-grid">${quick.map(([r,k,v])=>`<a href="#${r}">${icon(r)}<span>${tr(k)}</span><strong>${v}</strong><i aria-hidden="true">↗</i></a>`).join('')}</div><a href="#transport" class="arrival-note"><strong>${tr('stairs')} · ${tr('noParking')}</strong><span>${text(D.home.floorBody)}</span><span aria-hidden="true">↗</span></a></section>
    <section class="intro section" id="introduction"><p class="eyebrow">THE JEONPO STAY</p><h2>${lines(L('부산 전포의 풍경을,\n우리만의 속도로.','A view of Jeonpo.\nA pace of your own.','釜山・全浦の風景を、\n自分たちのペースで。','以自己的节奏，\n看釜山田浦的风景。','以自己的節奏，\n看釜山田浦的風景。'))}</h2><div class="intro-copy"><p>${text(D.home.introBody)}</p>${stats()}</div></section>
    <section class="atelier-spaces section"><div class="section-heading"><div><p class="eyebrow">ROOMS & LITTLE DETAILS</p><h2>${text(L('거실부터 테라스까지.','From living room to terrace.','リビングからテラスまで。','从客厅到露台。','從客廳到露台。'))}</h2></div></div><a href="#gallery" class="atelier-room-wide" aria-label="${text(D.captions[15])}">${img(15,'loading="lazy"')}<span aria-hidden="true">01</span></a><div class="atelier-room-pair">${[2,29].map((id,i)=>`<a href="#gallery" aria-label="${text(D.captions[id])}">${img(id,'loading="lazy"')}<span aria-hidden="true">0${i+2}</span></a>`).join('')}</div>${link('gallery',tr('viewAll'),'outline-button atelier-view-all')}</section>
    <section class="atelier-local section"><p class="eyebrow">OUT IN JEONPO</p><h2>${text(L('골목의 커피, 부산의 바다.','Coffee in the lanes. Sea air in Busan.','路地のコーヒー、釜山の海。','巷里的咖啡，釜山的海。','巷裡的咖啡，釜山的海。'))}</h2><p>${text(L('가까운 전포의 맛집부터 부산의 풍경까지, 오늘의 동선을 골라보세요.','Find your next stop, from nearby Jeonpo cafés to the sights of Busan.','全浦のグルメから釜山の風景まで、今日の行き先を。','从田浦附近的餐厅咖啡馆到釜山风景，选择今天的去处。','從田浦附近的餐廳咖啡館到釜山風景，選擇今天的去處。'))}</p><div class="atelier-local-grid">${localTeaser('nearby',D.dining[0],'FOOD & CAFÉS')}${localTeaser('tours',D.sights.find(x=>x.id==='sea'),'BUSAN & BEYOND')}</div></section>
    <section class="home-guide section"><div class="section-heading"><div><p class="eyebrow">GUEST GUIDE</p><h2>${text(L('머무는 동안, 필요한 안내.','A little help for your stay.','滞在中に必要なご案内。','入住期间，所需指南。','入住期間，所需指南。'))}</h2></div></div><div class="guide-rows">${guideRows()}</div></section>
    <section class="faq-section section"><p class="eyebrow">BEFORE YOUR STAY</p><h2>${tr('faq')}</h2><div class="faq-list">${D.faqs.map(x=>`<details><summary>${text(x.q)}</summary><p>${text(x.a)}</p></details>`).join('')}</div></section>
    <section class="booking-section section"><p class="eyebrow">YOUR NEXT STAY</p><h2>${lines(D.home.bookingTitle)}</h2><p>${text(D.home.bookingBody)}</p><button class="primary-button" data-book>${tr('book')}<span aria-hidden="true">↗</span></button><span class="booking-location">EXTAY JEONPO · BUSAN</span></section>${footer()}`;
  }
  const galleryPhotoOrder=[2,5,6,1,16,17,3,15,29,9,11,12,14,10,25,26,13,22,27,4,31,32,34,7,28,35,30,24,33,8,18,19,20,21,23];
  const galleryItems=()=>galleryPhotoOrder.map(id=>D.gallery.find(photo=>photo.id===id)).filter(photo=>category==='all'||photo.category===category);
  function galleryPhotos(items){
    const bands=[],gap=8,patterns=[[[0],[1,2]],[[3],[]],[[4,6],[5]],[[7],[8]],[[9],[]]];
    const heightRatio=index=>{const [width,height]=D.photoSizes[items[index].id];return height/width;};
    for(let base=0;base<items.length;base+=10){
      for(const pattern of patterns){
        const columns=pattern.map(offsets=>offsets.map(offset=>base+offset).filter(index=>index<items.length));
        const paired=columns.every(column=>column.length),rows=Math.max(...columns.map(column=>column.length));
        if(!rows)continue;
        // Balance the two natural-height columns, including their internal gaps.
        const sums=columns.map(column=>column.reduce((sum,index)=>sum+heightRatio(index),0));
        const share=sums[1]/(sums[0]+sums[1]);
        const bias=(columns[1].length-columns[0].length)*gap/(sums[0]+sums[1]);
        const placements=columns.flatMap((column,columnIndex)=>column.map((index,rowIndex)=>({index,column:columnIndex+1,row:rowIndex+1,span:rows===2&&column.length===1?2:1})));
        const photos=placements.sort((a,b)=>a.index-b.index).map(({index,column,row,span})=>{
          const photo=items[index],[width,height]=D.photoSizes[photo.id],number=String(index+1).padStart(2,'0');
          return `<button type="button" class="gallery-item photo-button" data-photo="${photo.id}" style="--photo-ratio:${width}/${height};grid-column:${paired?column:1};grid-row:${row}/span ${span}" aria-label="${number} · ${text(D.captions[photo.id])} · ${tr('zoomIn')}">${img(photo.id,'loading="lazy"')}<span class="gallery-number" aria-hidden="true">${number}</span></button>`;
        }).join('');
        bands.push(`<div class="gallery-band${paired?'':' single'}" style="--gallery-left-share:${share.toFixed(10)};--gallery-left-bias:${bias.toFixed(6)}px">${photos}</div>`);
      }
    }
    return bands.join('');
  }
  function gallery(){
    const items=galleryItems();
    return `<section class="gallery-section section"><header class="gallery-reference-head"><p>ROOM GALLERY</p><h1>${tr('gallery')}</h1></header><p class="gallery-lead">${text(L('한 팀만을 위한 한 층의 공간. 거실과 침실, 테라스의 장면들을 둘러보세요.','One floor, just for your group. Explore the living room, bedrooms and terrace.','1フロアをひと組だけで。リビング、寝室、テラスの風景をご覧ください。','一整层，只留给同行的旅伴。看看客厅、卧室和露台的风景。','一整層，只留給同行的旅伴。看看客廳、臥室和露台的風景。'))}</p><p class="gallery-facts-inline">${text(L('최대 10인 · 침실 2 · 퀸 베드 4 · 욕실 2','Up to 10 guests · 2 bedrooms · 4 queen beds · 2 bathrooms','最大10名・寝室2・クイーンベッド4・バスルーム2','最多10人·2间卧室·4张大床·2间浴室','最多10人・2間臥室・4張大床・2間浴室'))}</p><div class="filter-tabs gallery-filters" role="group" aria-label="${tr('gallery')}">${['all','living','bedroom1','bedroom2','kitchen','terrace','bath'].map(k=>`<button data-category="${k}" class="${k===category?'active':''}" aria-pressed="${k===category}">${tr(k)}</button>`).join('')}</div><div class="gallery-grid natural-photos">${galleryPhotos(items)}</div></section>${footer()}`;
  }
  function guideIndex(){return `${heading('YOUR STAY, MADE EASY',D.ui.guide,D.ui.infoBody)}<section class="guide-index section"><div class="guide-rows">${guideRows()}</div><div class="guide-message">${icon('checkin')}<p>${tr('message')}</p></div></section>${help()}${footer()}`;}
  const airportOpenGuides=new Set();
  const informationOpenGuides=new Set();
  const deviceGroups=D.applianceSpaces;
  const applianceGroup=id=>deviceGroups.find(group=>group.ids.includes(id));
  const applianceCard=id=>D.guides.appliances.cards.find(card=>card.id===id);
  const pageKey=()=>route==='appliances'&&applianceId?`appliances/${applianceId}`:route;
  function resolvePage(hash){
    const [base,id,...extra]=hash.split('/');
    if(base==='appliances')return {route:base,id:!extra.length&&applianceCard(id)?id:''};
    return {route:['home','gallery','guide','airport','transport','nearby','tours',...Object.keys(D.guides)].includes(hash)?hash:'home',id:''};
  }
  function applianceThumbnail(c){
    const meta=D.applianceCatalog[c.id]||{},slide=meta.photo!==undefined?meta:D.deviceMedia[c.id][0];
    const source=slide.photo!==undefined?`assets/images/photo-${String(slide.photo).padStart(2,'0')}.webp`:slide.file;
    const [width,height]=slide.photo!==undefined?D.photoSizes[slide.photo]:[slide.width,slide.height];
    return `<span class="appliance-thumbnail">${meta.crop?`<svg viewBox="${meta.crop.join(' ')}" aria-hidden="true" focusable="false"><image href="${esc(source)}" width="${width}" height="${height}"/></svg>`:`<img src="${esc(source)}" width="${width}" height="${height}" alt="" loading="lazy" decoding="async">`}</span>`;
  }
  function applianceCards(){
    const cards=D.guides.appliances.cards.filter(c=>applianceCategory==='all'||applianceGroup(c.id).id===applianceCategory);
    return cards.map(c=>`<a class="appliance-card" href="#appliances/${c.id}" data-appliance-id="${c.id}">${applianceThumbnail(c)}<div class="appliance-card-copy"><h2>${text(c.title)}</h2><p>${text(D.applianceCatalog[c.id]?.location||c.location)}</p><span class="appliance-card-open">${text(D.applianceUI.open)}<span aria-hidden="true">→</span></span></div></a>`).join('');
  }
  function applianceResultLabel(){
    const count=D.guides.appliances.cards.filter(c=>applianceCategory==='all'||applianceGroup(c.id).id===applianceCategory).length;
    const space=deviceGroups.find(group=>group.id===applianceCategory);
    return `${space?text(space.title)+' · ':''}${count}${text(D.applianceUI.countUnit)}`;
  }
  function applianceDetail(c){
    const u=D.applianceUI,index=D.guides.appliances.cards.indexOf(c)+1;
    return `<div class="appliance-detail"><header class="appliance-detail-top section"><a class="appliance-back" href="#appliances"><span aria-hidden="true">←</span>${text(u.back)}</a><p class="eyebrow">STAY ESSENTIALS / ${String(index).padStart(2,'0')}</p><h1>${text(c.title)}</h1><p class="appliance-model">${esc(c.model)}</p><p class="appliance-full-location">${tr('locationLabel')} · ${text(c.location)}</p></header>
      <div class="appliance-detail-body section">
      <section class="appliance-instructions" aria-labelledby="appliance-instructions-title"><h2 id="appliance-instructions-title">${text(u.instructions)}</h2><p class="appliance-intro">${text(c.text)}</p><ol class="steps">${c.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol></section>
      ${c.caution?`<aside class="device-caution"><strong>${tr('guideCaution')}</strong><p>${text(c.caution)}</p></aside>`:''}
      <div class="appliance-visual">${deviceCarousel(c)}</div>
      ${c.id==='living-ac'?`<div class="remote-legend"><span>01 · ${text(L('왼쪽 / TV','Left / TV','左／TV','左／电视','左／電視'))}</span><span>02 · ${text(L('가운데 / 에어컨','Middle / AC','中央／エアコン','中／空调','中／冷氣'))}</span><span>03 · ${text(L('오른쪽 / 팬','Right / fan','右／ファン','右／吊扇','右／吊扇'))}</span></div>`:''}
      ${c.links?.length?`<details class="appliance-references"><summary>${text(u.references)}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="manual-links">${c.links.map(x=>ext(x.url,text(x.title))).join('')}</div></details>`:''}
      <aside class="appliance-support"><h2>${text(u.support)}</h2><p>${tr('deviceHelp')}</p>${ext(D.bookingUrl,tr('ask'),'text-link')}</aside><a class="outline-button appliance-list-return" href="#appliances"><span aria-hidden="true">←</span>${text(u.return)}</a></div></div>${footer()}`;
  }
  function appliancesPage(){
    const selected=applianceCard(applianceId);if(selected)return applianceDetail(selected);
    const g=D.guides.appliances,u=D.applianceUI;
    return `${heading(g.label,g.title,u.lead)}<section class="appliance-catalog section"><div class="appliance-filters" role="group" aria-label="${text(u.filter)}">${[{id:'all',title:u.all},...deviceGroups].map(group=>`<button type="button" data-appliance-filter="${group.id}" aria-pressed="${applianceCategory===group.id}">${text(group.title)}</button>`).join('')}</div><p class="appliance-result-count" role="status" aria-live="polite">${applianceResultLabel()}</p><div class="appliance-grid">${applianceCards()}</div></section>${help()}${footer()}`;
  }
  const informationLabels={
    useShow:L('사용법 보기','View instructions','使い方を見る','查看用法','查看用法'),
    useHide:L('사용법 접기','Hide instructions','使い方を閉じる','收起用法','收起用法'),
    detailShow:L('사진·상세 보기','View photos & details','写真・詳細を見る','查看照片与详情','查看照片與詳情'),
    detailHide:L('사진·상세 접기','Hide photos & details','写真・詳細を閉じる','收起照片与详情','收起照片與詳情'),
    checkoutShow:L('퇴실 준비 보기','View checkout checklist','チェックアウトの準備を見る','查看退房清单','查看退房清單'),
    checkoutHide:L('퇴실 준비 접기','Hide checkout checklist','チェックアウトの準備を閉じる','收起退房清单','收起退房清單')
  };
  function informationDisclosure(id,title,preview,body,{number='',instructions=false,kind='',checkout=false}={}){
    const key=route+':'+id,show=checkout?informationLabels.checkoutShow:instructions?informationLabels.useShow:informationLabels.detailShow,hide=checkout?informationLabels.checkoutHide:instructions?informationLabels.useHide:informationLabels.detailHide;
    return `<details class="information-disclosure ${kind}" id="${id}" data-information-guide="${esc(key)}" ${informationOpenGuides.has(key)?'open':''}><summary id="summary-${id}" aria-controls="content-${id}"><span class="information-title">${number?`<span class="information-number">${number}</span>`:''}<strong>${text(title)}</strong></span>${preview?`<span class="information-preview">${preview}</span>`:''}<span class="information-toggle"><span class="information-show">${text(show)}</span><span class="information-hide">${text(hide)}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></summary><div class="information-detail" id="content-${id}" role="region" aria-labelledby="summary-${id}">${body}<button type="button" class="information-close" data-close-information="${id}">${text(hide)}<span aria-hidden="true">↑</span></button></div></details>`;
  }
  function guideCard(c,i){
    const id=c.id?'device-'+c.id:'guide-'+route+'-'+i,devices=['appliances','laundry'].includes(route);
    const folded=route==='appliances'||route==='checkin'||(route==='laundry'&&c.id);
    const media=c.photos?[c.image,...c.photos].filter(id=>id!==null).map(photo=>({photo,title:D.captions[photo]})):null;
    const preview=route==='appliances'?`${tr('locationLabel')} · ${text(c.location)}`:`${c.location?`<span class="information-location">${tr('locationLabel')} · ${text(c.location)}</span>`:''}${text(c.text)}`;
    const body=`<article class="info-article" ${folded?`aria-labelledby="summary-${id}"`:`id="${id}" tabindex="-1"`}>
      ${folded?'':`<div class="article-heading"><span>${String(i+1).padStart(2,'0')}</span><h2>${text(c.title)}</h2></div>`}
      ${c.model?`<p class="device-model">${esc(c.model)}</p>${route==='appliances'?'':`<p class="device-location">${tr('locationLabel')} · ${text(c.location)}</p>`}`:''}
      ${folded&&route!=='appliances'?'':`<p>${text(c.text)}</p>`}
      ${media?deviceCarousel(c,media,'checkin-entry'):devices&&c.id&&D.deviceMedia[c.id]?deviceCarousel(c):c.image!==null?`<button class="guide-photo photo-button ${[54,55,56,58,57].includes(c.image)?'contain':''}" data-photo="${c.image}" aria-label="${text(c.title)} · ${tr('zoomIn')}">${img(c.image,'loading="lazy"')}<span class="photo-open" aria-hidden="true">↗</span></button>`:''}
      ${c.id==='living-ac'?`<div class="remote-legend"><span>01 · ${text(L('왼쪽 / TV','Left / TV','左／TV','左／电视','左／電視'))}</span><span>02 · ${text(L('가운데 / 에어컨','Middle / AC','中央／エアコン','中／空调','中／冷氣'))}</span><span>03 · ${text(L('오른쪽 / 팬','Right / fan','右／ファン','右／吊扇','右／吊扇'))}</span></div>`:''}
      ${route==='wifi'&&i===0?`<div class="wifi-network-grid">${D.wifiNetworks.map(n=>`<div class="wifi-network"><small>${esc(n.band)}</small><code>${esc(n.name)}</code><button class="copy-button" data-copy="${esc(n.name)}">${tr('copyNetwork')} <span aria-hidden="true">⧉</span></button></div>`).join('')}</div>`:''}
      ${c.steps.length?`<ol class="steps">${c.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>`:''}${c.caution?`<aside class="device-caution"><strong>${tr('guideCaution')}</strong><p>${text(c.caution)}</p></aside>`:''}${c.links?.length?`<div class="manual-links">${c.links.map(x=>ext(x.url,text(x.title))).join('')}</div>`:''}</article>`;
    return folded?informationDisclosure(id,c.title,preview,body,{number:String(i+1).padStart(2,'0'),instructions:devices,kind:'guide-disclosure',checkout:route==='checkin'&&i===2}):body;
  }
  function checkinPage(){
    const g=D.guides.checkin,[arrival,luggage,departure]=g.cards;
    const photos=[arrival.image,...arrival.photos].map(photo=>({photo,title:D.captions[photo]}));
    const checklistTitles=[
      L('식기 정리','Dishes','食器','餐具','餐具'),
      L('분리배출','Sort waste','ゴミの分別','垃圾分类','垃圾分類'),
      L('수건 모으기','Used towels','タオル','收好毛巾','收好毛巾'),
      L('전원 · 문 확인','Power & doors','電源・戸締まり','电源与门窗','電源與門窗')
    ];
    return `${heading(g.label,g.title,g.lead)}
      <div class="checkin-page section">
        <div class="stay-times" aria-label="${text(L('입실·퇴실 시간','Arrival and departure times','チェックイン・アウト時間','入住与退房时间','入住與退房時間'))}">
          <button type="button" data-scroll="checkin-arrival"><span>${tr('checkIn')}</span><time datetime="16:00">16:00</time><span class="stay-time-note">${text(L('이후 · 셀프 체크인','From · self check-in','以降・セルフチェックイン','起 · 自助入住','起 · 自助入住'))}<span aria-hidden="true">↓</span></span></button>
          <button type="button" data-scroll="checkin-departure"><span>${tr('checkOut')}</span><time datetime="11:00">11:00</time><span class="stay-time-note">${text(L('까지 · 퇴실 준비','By · departure checklist','まで・出発の準備','前 · 退房准备','前 · 退房準備'))}<span aria-hidden="true">↓</span></span></button>
        </div>
        <aside class="stay-entry-note">${icon('checkin')}<div><h2>${text(L('출입번호 안내','Your entry code','入室コード','门锁密码','門鎖密碼'))}</h2><p>${text(arrival.text)}</p></div></aside>
        <section class="stay-section" id="checkin-arrival" aria-labelledby="checkin-arrival-title">
          <header class="stay-section-heading"><p class="eyebrow">01 / ARRIVAL</p><h2 id="checkin-arrival-title">${text(L('입실하기','Settling in','チェックイン','办理入住','辦理入住'))}</h2></header>
          <div class="checkin-entry-photos">${deviceCarousel(arrival,photos,'checkin-entry')}</div>
          <ol class="stay-arrival-steps">${arrival.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>
          <a class="text-link" href="#transport">${text(L('건물까지 찾아오는 길','Directions to the building','建物へのアクセス','前往大楼的路线','前往大樓的路線'))}<span aria-hidden="true">↗</span></a>
        </section>
        <section class="stay-section" id="checkin-luggage" aria-labelledby="checkin-luggage-title">
          <p class="eyebrow">02 / LUGGAGE</p>
          <div class="stay-luggage-heading"><button class="photo-button" data-photo="${luggage.image}" aria-label="${text(luggage.title)} · ${tr('zoomIn')}">${img(luggage.image,'loading="lazy"')}<span aria-hidden="true">↗</span></button><div><h2 id="checkin-luggage-title">${text(L('짐은 가볍게,\n머무름은 편하게.','Leave your bags.\nEnjoy your day.','荷物を預けて、\n身軽な滞在を。','放下行李，\n轻松入住。','放下行李，\n輕鬆入住。')).replace(/\n/g,'<br>')}</h2><p>${text(L('1층 계단 옆 · 무료 짐 보관','Free storage · beside the 1F stairs','1階の階段横・無料荷物預かり','1楼楼梯旁 · 免费寄存','1樓樓梯旁 · 免費寄存'))}</p></div></div>
          <p class="stay-body">${text(luggage.text)}</p>
        </section>
        <section class="stay-section" id="checkin-departure" aria-labelledby="checkin-departure-title">
          <header class="stay-section-heading"><p class="eyebrow">03 / DEPARTURE</p><h2 id="checkin-departure-title">${text(L('떠나기 전, 네 가지만.','Four things before you go.','出発前に、4つだけ。','离开前，做好这四件事。','離開前，做好這四件事。'))}</h2></header>
          <ol class="stay-checklist">${departure.steps.map((s,i)=>`<li><span class="stay-check-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><h3>${text(checklistTitles[i])}</h3><p>${text(s)}</p></div></li>`).join('')}</ol>
          <aside class="stay-late-note"><h3>${text(L('조금 더 머물고 싶다면','Need a little longer?','もう少し滞在したい場合','想多住一会儿？','想多住一會兒？'))}</h3><p>${text(departure.text)}</p></aside>
        </section>
      </div>${help()}${footer()}`;
  }
  function guidePage(){
    const g=D.guides[route],devices=['appliances','laundry'].includes(route),appliances=route==='appliances';
    const overview=appliances?`<nav class="guide-contents" aria-label="${tr('deviceJump')}"><p class="eyebrow">STAY ESSENTIALS / 12 GUIDES</p><div>${deviceGroups.map(group=>`<button type="button" data-scroll="group-${group.id}">${text(group.title)}<span aria-hidden="true">↓</span></button>`).join('')}</div></nav>`:['checkin','laundry'].includes(route)?'':`<nav class="guide-contents" aria-label="${tr('guide')}"><p class="eyebrow">IN THIS GUIDE</p><div>${g.cards.map((c,i)=>`<button type="button" data-scroll="${c.id?'device-'+c.id:'guide-'+route+'-'+i}">${text(c.title)}<span aria-hidden="true">↓</span></button>`).join('')}</div></nav>`;
    const cards=appliances?deviceGroups.map(group=>`<section class="guide-device-group" id="group-${group.id}" aria-labelledby="title-${group.id}"><h2 id="title-${group.id}">${text(group.title)}</h2>${group.ids.map(id=>{const i=g.cards.findIndex(c=>c.id===id);return guideCard(g.cards[i],i)}).join('')}</section>`).join(''):g.cards.map(guideCard).join('');
    return `${heading(g.label,g.title,g.lead)}<div class="guide-layout section"><div class="guide-content">${overview}${cards}${devices?`<div class="device-support"><p>${tr('deviceHelp')}</p>${ext(D.bookingUrl,tr('ask'))}</div>`:''}</div></div>${help()}${footer()}`;
  }

  function arrivalPhotoGuide(id,title,preview,body){
    return `<section class="arrival-photo-guide" id="${id}" aria-labelledby="title-${id}"><header class="arrival-photo-heading"><p class="eyebrow">${id==='arrival-walk'?'ON FOOT':'AT THE DOOR'}</p><h2 id="title-${id}">${text(title)}</h2><p>${preview}</p></header>${body}</section>`;
  }
  function busanStationGuide(){
    const stops=[[113,'부산역','Busan Station'],[114,'초량','Choryang'],[115,'부산진','Busanjin'],[116,'좌천','Jwacheon'],[117,'범일','Beomil'],[118,'범내골','Beomnaegol'],[119,'서면','Seomyeon'],[120,'부전','Bujeon']];
    return `<section class="busan-station-guide" id="arrival-routes" aria-labelledby="busan-station-title"><p class="eyebrow">FROM BUSAN STATION</p><h2 id="busan-station-title">${text(L('부산역에서 오는 길','From Busan Station','釜山駅からのアクセス','从釜山站出发','從釜山站出發'))}</h2><p class="busan-station-lead">${text(L('KTX 부산역에서 지하철 1호선 부산역으로 이동한 뒤, 노포 방면 열차를 타세요.','From KTX Busan Station, follow signs to Metro Line 1 and board a train toward Nopo.','KTX釜山駅から地下鉄1号線の釜山駅へ進み、老圃方面に乗車してください。','从KTX釜山站前往地铁1号线釜山站，乘坐老圃方向列车。','從KTX釜山站前往地鐵1號線釜山站，搭乘老圃方向列車。'))}</p><div class="busan-line-map"><div class="busan-line-heading"><span class="busan-line-symbol" aria-hidden="true">1</span><div><strong>${text(L('1호선 · 노포 방면','Line 1 · toward Nopo','1号線・老圃方面','1号线·老圃方向','1號線・老圃方向'))}</strong><span>${text(L('환승 없음','No transfers','乗換なし','无需换乘','無需轉乘'))}</span></div></div><div class="busan-endpoints"><div class="busan-endpoint"><span class="busan-stop-code">113</span><strong>${text(L('부산역','Busan Station','釜山駅','釜山站','釜山站'))}</strong><small>${text(L('승차','Board','乗車','上车','上車'))}</small></div><svg class="busan-express-arrow" viewBox="0 0 48 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 10h43m-8-7 8 7-8 7"/></svg><div class="busan-endpoint"><span class="busan-stop-code">120</span><strong>${text(L('부전역','Bujeon','釜田駅','釜田站','釜田站'))}</strong><small>${text(L('하차','Alight','下車','下车','下車'))}</small></div></div><div class="busan-trip-facts"><div><strong>${text(L('7정거장','7 stops','7駅','7站','7站'))}</strong><small>${text(L('부전역까지','To Bujeon','釜田駅まで','到釜田站','到釜田站'))}</small></div><div><strong>${text(L('약 12분','≈12 min','約12分','约12分钟','約12分鐘'))}</strong><small>${text(L('열차 이동','Train ride','電車の乗車時間','列车行程','列車車程'))}</small></div></div><p class="busan-time-note">${text(L('열차 탑승 기준 · 대기·도보 시간 별도','Train ride only · waiting and walking are extra','乗車時間の目安・待ち時間と徒歩は別途','仅列车行程，等候及步行另计','僅列車車程，等候及步行另計'))}</p><details class="busan-intermediate"><summary><span class="busan-stops-show">${text(L('중간 정차역 6개 보기','View 6 intermediate stops','途中の6駅を見る','查看6个中途站','查看6個中途站'))}</span><span class="busan-stops-hide">${text(L('중간 정차역 접기','Hide intermediate stops','途中駅を閉じる','收起中途站','收起中途站'))}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><ol class="busan-stops" aria-label="${text(L('부산역과 부전역 사이의 중간 정차역','Intermediate stations between Busan and Bujeon','釜山駅と釜田駅の間の途中駅','釜山站与釜田站之间的中途站','釜山站與釜田站之間的中途站'))}">${stops.slice(1,-1).map(([code,ko,en])=>`<li class="busan-stop"><span class="busan-stop-code">${code}</span><span class="busan-stop-name"><strong>${esc(language==='ko'?ko:en)}</strong><small lang="${language==='ko'?'en':'ko'}">${esc(language==='ko'?en:ko)}</small></span></li>`).join('')}</ol><p class="busan-stay-on">${text(L('서면역에서도 환승하지 않고, 다음 역인 부전역까지 계속 타세요.','Stay on the same train at Seomyeon; Bujeon is the next stop.','西面駅で乗り換えず、次の釜田駅までお乗りください。','在西面站不用换乘，继续乘坐一站到釜田站。','在西面站不用轉乘，繼續搭乘一站到釜田站。'))}</p></details><div class="busan-last-mile"><strong>${text(L('부전역 2번 출구 → 익스테이 전포','Bujeon Exit 2 → EXTAY JEONPO','釜田駅2番出口 → EXTAY JEONPO','釜田站2号出口 → EXTAY JEONPO','釜田站2號出口 → EXTAY JEONPO'))}</strong><span>${text(L('약 450m · 도보 5–8분','About 450 m · 5–8 min walk','約450m・徒歩5–8分','约450米·步行5–8分钟','約450公尺・步行5–8分鐘'))}</span></div></div>${ext('https://data.humetro.busan.kr/homepage/cyberstation/map.do',text(L('부산교통공사 공식 노선도','Official Busan Metro map','釜山交通公社の公式路線図','釜山交通公社官方线路图','釜山交通公社官方路線圖')),'outline-button')}</section>`;
  }
  function transport(){const steps=[
    [45,L('부전역 2번 출구','Bujeon Station, Exit 2','釜田駅2番出口','釜田站2号出口','釜田站2號出口'),L('부산 도시철도 1호선 부전역 2번 출구로 나옵니다. 숙소까지 약 450m, 도보 약 5–8분입니다.','Take Exit 2 at Bujeon Station on Metro Line 1. Walk about 450 m, approximately 5–8 minutes.','地下鉄1号線釜田駅2番出口から約450m、徒歩約5–8分。','地铁1号线釜田站2号出口，约450米，步行约5–8分钟。','地鐵1號線釜田站2號出口，約450公尺，步行約5–8分鐘。')],
    [46,L('왼쪽으로 돌아 직진','Turn left and go straight','左へ進んで直進','左转后直行','左轉後直行'),L('출구에서 왼쪽으로 돌아 파리바게뜨 방향으로 직진합니다. 대한적십자사 간판을 지나 계속 걸어주세요.','Turn left toward Paris Baguette. Continue straight past the Red Cross sign.','出口から左、パリバゲット方面へ。赤十字の看板を過ぎて直進。','出站左转朝巴黎贝甜方向，经过红十字标识继续直行。','出站左轉朝巴黎貝甜方向，經過紅十字標示繼續直行。')],
    [50,L('푸드앤 마트 사거리','FOOD& intersection','FOOD&マートの交差点','FOOD&超市路口','FOOD&超市路口'),L('사거리에 있는 대형 식자재마트 FOOD&를 찾습니다. 횡단보도로 마트 방향으로 건넌 뒤, 마트를 끼고 왼쪽으로 약 100m 직진합니다.','Find the FOOD& supermarket at the intersection. Cross toward it, then turn left along the supermarket and walk about 100 m.','交差点のFOOD&へ横断歩道で渡り、マートを左へ約100m進みます。','找到路口FOOD&超市，过人行横道朝超市走，沿超市左转约100米。','找到路口FOOD&超市，過行人穿越道朝超市走，沿超市左轉約100公尺。')],
    [37,L('식당 옆 입구에서 5층으로','Beside the restaurant, up to 5F','食堂横の入口から5階へ','餐厅旁入口，上5楼','餐廳旁入口，上5樓'),L('하얀 5층 건물의 1층 ‘전포대패삼겹’ 식당을 찾습니다. 식당 바로 옆이 계단 입구입니다. 엘리베이터가 없으니 계단으로 5층까지 올라와 주세요.','Look for Jeonpo Daepae Samgyeop on the ground floor of a white five-storey building. The stairs are immediately beside it. Take them to the 5th floor; there is no elevator.','白い5階建て、1階「전포대패삼겹」のすぐ横が階段入口。エレベーターはなく、階段で5階へ。','找到白色5层楼房1楼“전포대패삼겹”餐厅，旁边为楼梯入口，无电梯，请上5楼。','找到白色5層樓房1樓「전포대패삼겹」餐廳，旁邊為樓梯入口，無電梯，請上5樓。')]
  ];const entry=arrivalPhotoGuide('arrival-entry',L('건물 입구','Building entrance','建物入口','建筑入口','建築入口'),text(L('전포대패삼겹 간판 왼쪽, 노란 원으로 표시한 계단 입구입니다. 계단으로 5층까지 올라와 주세요.','Use the stair entrance marked in yellow, to the left of the Jeonpo Daepae Samgyeop sign. Walk up to the 5th floor.','「전포대패삼겹」の看板左側、黄色の丸が階段入口です。階段で5階へお上がりください。','从전포대패삼겹招牌左侧黄色圆圈标出的楼梯入口进入，上5楼。','從전포대패삼겹招牌左側黃色圓圈標出的樓梯入口進入，上5樓。')),`<div class="building-photo"><button class="photo-button" data-photo="36"><span class="entrance-crop"><span class="entrance-photo-plane">${img(36,'loading="lazy"')}${entranceHighlight()}</span></span><span class="media-expand" aria-hidden="true">↗</span></button></div>`);
  const walk=arrivalPhotoGuide('arrival-walk',L('부전역에서 익스테이 전포까지','Bujeon to EXTAY JEONPO','釜田駅からEXTAY JEONPOへ','釜田站到EXTAY JEONPO','釜田站到EXTAY JEONPO'),text(L('부전역 2번 출구 · 약 450m · 도보 5–8분','Bujeon Exit 2 · about 450 m · 5–8 min walk','釜田駅2番出口・約450m・徒歩5–8分','釜田站2号出口·约450米·步行5–8分钟','釜田站2號出口・約450公尺・步行5–8分鐘')),`<div class="walking-guide">${deviceCarousel({title:L('부전역에서 숙소까지','The walk from Bujeon','釜田駅から宿まで','釜田站到住宿','釜田站到住宿')},steps.map(([photo,title,body],i)=>({photo,title:L(...languages.map(lang=>'STEP 0'+(i+1)+' · '+title[lang])),keys:[body]})),'arrival-walk')}</div>`);return `${heading('GETTING HERE',D.ui.transport,D.ui.address)}<section class="transport-section section"><div class="arrival-map-actions">${ext(N(D.address),tr('naver'),'outline-button')}${ext(G(D.address),tr('google'),'outline-button')}<button type="button" class="copy-button" data-copy="${esc(D.address+', 5층')}">${tr('copy')} <span aria-hidden="true">⧉</span></button></div><p class="arrival-essential-facts">${tr('stairs')} · ${tr('noParking')}</p><nav class="arrival-index" aria-label="${text(L('찾아오는 길 바로가기','Jump to arrival information','アクセス案内への移動','到达指南快捷入口','抵達指南快捷入口'))}"><button type="button" data-scroll="arrival-routes">${text(L('부산역에서','From Busan','釜山駅から','从釜山站','從釜山站'))}<span aria-hidden="true">↓</span></button><button type="button" data-scroll="arrival-walk">${text(L('도보 안내','On foot','徒歩案内','步行指引','步行指引'))}<span aria-hidden="true">↓</span></button><button type="button" data-scroll="arrival-entry">${text(L('건물 입구','Entrance','建物入口','建筑入口','建築入口'))}<span aria-hidden="true">↓</span></button></nav>${busanStationGuide()}${walk}${entry}<div class="transport-notes"><h2>${text(L('짐과 주차 안내','Luggage & parking','荷物と駐車のご案内','行李与停车','行李與停車'))}</h2><article><h3>${text(L('짐이 많다면','With luggage','大きな荷物がある場合','携带较多行李时','攜帶較多行李時'))}</h3><p>${text(D.home.floorBody)}</p><p>${text(L('호스트는 부전역 6번 출구 엘리베이터 이용을 안내하고 있습니다. 택시에는 ‘부산진구 동성로 113’을 보여주세요. 1층 계단 옆에서 체크인 전·후 무료 짐 보관이 가능합니다.','Your host recommends the elevator at Bujeon Exit 6. For a taxi, show “부산진구 동성로 113”. Free luggage storage is beside the ground-floor stairs before and after your stay.','ホストは釜田駅6番出口のエレベーターを案内しています。タクシーには「부산진구 동성로 113」を。1階で滞在前後の無料荷物預かりが可能です。','房东建议使用釜田站6号出口电梯。向出租车出示“부산진구 동성로 113”。入住前后可在1楼楼梯旁免费寄存行李。','房東建議使用釜田站6號出口電梯。向計程車出示「부산진구 동성로 113」。入住前後可在1樓樓梯旁免費寄存行李。'))}</p></article><article><h3>${text(L('차를 가져오신다면','Arriving by car','お車の場合','自驾前来时','自行開車前來時'))}</h3><p>${text(L('건물 주차는 불가능합니다. 호스트 안내: 바로 옆 명성주차장, 도보 약 30초. 시간당 3,000원 / 일 주차 20,000원. 요금과 주차 가능 여부는 현장에서 확인해 주세요.','No parking at the building. Your host suggests nearby Myeongseong Parking, about 30 seconds away on foot: KRW 3,000/hour or KRW 20,000/day. Confirm rates and availability on site.','敷地内駐車不可。隣の명성주차장は徒歩約30秒、1時間3,000ウォン・1日20,000ウォン（ホスト案内）。現地で料金と空きをご確認ください。','楼内无停车位。房东推荐旁边명성주차장，步行约30秒，3,000韩元/小时、20,000韩元/天，实际费用及空位请现场确认。','樓內無停車位。房東推薦旁邊명성주차장，步行約30秒，3,000韓元/小時、20,000韓元/天，實際費用及空位請現場確認。'))}</p>${ext(N('명성주차장 부산 전포동 동성로113'),tr('map'))}</article></div></section>${help()}${footer()}`;}
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
    return total+items.map(x=>`<article class="discovery-item" id="place-${esc(x.id)}"><div class="discovery-meta"><span>${String(all.indexOf(x)+1).padStart(2,'0')} / ${esc(x.area)}</span><span>${text(categories[x.category])}</span></div><h2>${text(x.title)}</h2><p class="place-original" lang="${language==='ko'?'en':'ko'}">${esc(language==='ko'?x.nameEn:x.nameKo===t(x.title)?x.nameEn:x.nameKo)}</p>${D.localPhotos[x.id]?localPhoto(x.id,t(x.title),'place-feature-photo'):''}${x.menu?`<p class="place-menu">${text(x.menu)}</p>`:''}<p class="place-body">${text(x.body)}</p><div class="place-map-links">${ext(N(x.query),tr('naver'),'outline-button')}${ext(directions(x),tr('directions'),'outline-button')}</div><details class="place-details"><summary>${text(L('주소 · 영업정보','Address & opening information','住所・営業情報','地址与营业信息','地址與營業資訊'))}</summary><dl class="place-facts"><div><dt>${tr('addressLabel')}</dt><dd lang="ko">${esc(x.address)}</dd></div>${x.tip?`<div><dt>${tr('visitTip')}</dt><dd>${text(x.tip)}</dd></div>`:''}<div><dt>${tr('hoursLabel')}</dt><dd>${D.venueHours?.[x.id]?`<span class="hours-value">${esc(D.venueHours[x.id])}</span>`:''}${tr('checkOnMap')}</dd></div></dl>${ext(G(x.query),tr('google'))}${ext(x.source,tr('officialInfo'))}</details></article>`).join('');
  }
  function dayCourses(){
    return `<section class="day-courses section"><p class="eyebrow">A DAY, WELL SPENT</p><h2>${tr('courses')}</h2><div class="course-accordion">${D.dayCourses.map(c=>`<details><summary><small>${esc(c.label)}</small><span>${text(c.title)}</span><span class="course-preview">${c.stops.map(id=>text(D.sights.find(x=>x.id===id).title)).join(' → ')}</span></summary><ol>${c.stops.map(id=>{const place=D.sights.find(x=>x.id===id);return `<li>${ext(N(place.query),text(place.title))}</li>`}).join('')}</ol></details>`).join('')}</div></section>`;
  }
  function discoveryPage(dining){
    const categories=D.placeCategories[dining?'dining':'sights'];
    return `${heading(dining?'LOCAL NOTES / FOOD & CAFÉS':'LOCAL NOTES / BUSAN',dining?D.ui.diningIntro:D.ui.sightsIntro,dining?D.ui.diningLead:D.ui.sightsLead)}<section class="discovery-cover section">${localPhoto(dining?'jeonpo':'sea',dining?t(D.sights[0].title):t(D.sights.find(x=>x.id==='sea').title))}<div class="discovery-intro"><p class="eyebrow">${dining?'20 TABLES & COFFEE STOPS':'20 PLACES, YOUR OWN PACE'}</p><p>${tr('sourceNote')}</p><small>${tr('updated')}</small></div><div class="local-page-links">${link(dining?'tours':'nearby',tr(dining?'tours':'nearby'))}</div></section>${dining?'':dayCourses()}<section class="discovery-list section"><h2 class="discovery-list-title">${dining?tr('nearby'):tr('explorePlaces')}</h2><label class="search-field">${icon('nearby')}<input type="search" id="localSearch" placeholder="${tr(dining?'placeSearch':'sightSearch')}" aria-label="${tr(dining?'placeSearch':'sightSearch')}" value="${esc(query)}"></label><div class="filter-tabs" role="group" aria-label="${tr(dining?'nearby':'tours')}">${Object.entries(categories).map(([id,label])=>`<button type="button" class="${localCategory===id?'active':''}" data-local-category="${id}" aria-pressed="${localCategory===id}">${text(label)}</button>`).join('')}</div><div id="localResults">${localCards()}</div></section>${help()}${footer()}`;
  }
  function nearby(){return discoveryPage(true);}
  function tours(){return discoveryPage(false);}
  const airportIllustrations={
    rail:'<path class="airport-icon-wash" d="M14 9h20v20H14z"/><rect x="11" y="6" width="26" height="31" rx="7"/><path d="M17 6V3h14v3M11 23h26M24 12v11M17 12h14M16 37l-5 7M32 37l5 7M15 41h18"/><circle cx="18" cy="30" r="1.5"/><circle cx="30" cy="30" r="1.5"/>',
    bus:'<path class="airport-icon-wash" d="M13 12h22v14H13z"/><rect x="10" y="6" width="28" height="34" rx="5"/><path d="M16 6V3h16v3M15 12h18v14H15zM24 12v14M6 15v9M42 15v9M6 19h4M38 19h4M15 40v4M33 40v4M17 35h14"/><path d="M14 31h4M30 31h4"/>',
    taxi:'<path class="airport-icon-wash" d="m15 14-4 12h26l-4-12Z"/><path d="m8 26 5-13h22l5 13M8 26h32v12H8zM7 23H4M41 23h3M18 13V8h12v5M24 17v9M12 38v5h5v-5M31 38v5h5v-5M13 31h4M31 31h4M21 33h6"/>',
    arrival:'<path class="airport-icon-wash" d="m7 12 14 9 15-2 5 4-18 5-9-6Z"/><path d="m5 11 5 1 10 8 14-1 7 5-17 5-10-7-7-1-2-10ZM21 21l-2 9 4 1 7-10M6 40h36M32 34l5 3 3-5"/>',
    departure:'<path class="airport-icon-wash" d="m6 23 7 3 22-14 6 2-12 15-16 4Z"/><path d="m5 23 5-1 6 3 18-13 8 2-14 16-15 4-6-5-2-6ZM21 22l-5-10 4-2 10 6M6 40h36M33 5h7v7M33 12l7-7"/>'
  };
  const airportIllustration=id=>`<svg class="airport-illustration" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${airportIllustrations[id]}</svg>`;
  const airportMark=id=>`<span class="airport-pictogram" aria-hidden="true">${airportIllustration(id)}</span>`;
  const airportRouteArrow=()=>'<svg viewBox="0 0 32 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 8h28m-7-6 7 6-7 6"/></svg>';
  const airportFactIcon=id=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${id==='fare'?'<circle cx="12" cy="12" r="9"/><path d="m6.5 8 2.75 9L12 9l2.75 8 2.75-9M6 12h12"/>':'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'}</svg>`;
  const airportRecommendations={
    rail:L('요금 절약 추천','Budget pick','費用重視に','省钱推荐','省錢推薦'),
    bus:L('환승 줄이기','Fewer changes','乗換を減らす','减少换乘','減少轉乘'),
    taxi:L('짐·일행 많을 때','Groups & bags','荷物・同行者が多い方','多人·行李多','多人・行李多')
  };
  function airportMethod(x,direction){
    const g=D.airport.guide,u=g.labels,m=g.methods[x.id],key=direction+'-'+x.id;
    const price=t(x.fare).split(/[\/／]/)[0].trim(),unit=x.id==='taxi'?L('1대','per car','1台','每车','每車'):L('1인','per person','1人','每人','每人');
    return `<details class="airport-method" id="airport-${key}" data-airport-guide="${key}" ${airportOpenGuides.has(key)?'open':''}><summary class="airport-method-summary" id="airport-summary-${key}" aria-controls="airport-content-${key}"><span class="airport-method-heading"><span>${airportIllustration(x.id)}<strong>${text(m.name)}</strong><span class="airport-recommendation">${text(airportRecommendations[x.id])}</span></span><span class="airport-route-toggle"><span class="airport-route-show">${text(u.routeShow)}</span><span class="airport-route-hide">${text(u.routeHide)}</span><svg class="airport-method-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></span><span class="airport-method-facts"><span>${airportFactIcon('fare')}<span><small>${text(u.fareShort)} · ${text(unit)}</small><strong>${esc(price)}</strong></span></span><span>${airportFactIcon('time')}<span><small>${text(u.timeShort)}</small><strong>${text(m.time)}</strong></span></span></span></summary><div class="airport-method-content" id="airport-content-${key}" role="region" aria-labelledby="airport-summary-${key}"><p class="airport-method-best">${text(x.best)}<br>${text(m.note)}</p>${airportPanel(x.id,direction)}<button type="button" class="airport-close-guide" data-close-airport="airport-${key}">${text(u.routeClose)}<span aria-hidden="true">↑</span></button></div></details>`;
  }
  function airportPanel(method,direction){
    const a=D.airport,g=a.guide,u=g.labels,x=a.options.find(x=>x.id===method),j=g.journeys[direction][method],outbound=direction==='departure';
    const metroMap='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(outbound?D.address:'김해국제공항')+'&destination='+encodeURIComponent(outbound?'김해국제공항':D.address)+'&travelmode=transit';
    const walkMap=j.walkMap;
    const mapLabel=L('대중교통 길찾기','Transit directions','公共交通ルート','公共交通路线','公共交通路線');
    const actions=x.id==='bus'?`${ext('https://www.bustago.or.kr',text(u.book),'primary-button')}${ext(walkMap,text(outbound?u.walkToStop:u.walkToStay),'outline-button')}`:x.id==='rail'?`${ext(metroMap,text(mapLabel),'primary-button')}${link('transport',text(u.walkPhotos),'outline-button')}`:'';
    const driver=x.id==='taxi'?`<section class="airport-driver"><p>${text(u.driver)}</p><strong lang="ko">${esc(j.driver)}</strong><div class="airport-driver-actions">${outbound?`<button type="button" class="primary-button" data-copy="김해국제공항 국내선 출발층, 부산광역시 강서구 공항진입로 108">${text(u.domestic)}<span aria-hidden="true">⧉</span></button><button type="button" class="outline-button" data-copy="김해국제공항 국제선 출발층, 부산광역시 강서구 공항진입로 108">${text(u.international)}<span aria-hidden="true">⧉</span></button>`:`<button type="button" class="primary-button" data-copy="${esc(j.driver)}">${tr('copy')}<span aria-hidden="true">⧉</span></button>${ext(N(D.address),text(u.stayMap),'outline-button')}`}</div></section>`:'';
    const hours=j.hours?`<p class="airport-hours"><span>${text(L('출발편 운행','Departures','出発便','发车时间','發車時間'))}</span><strong>${esc(j.hours)}</strong></p>`:'';
    const boarding=x.id==='bus'&&!outbound?`<section class="airport-boarding" id="airport-boarding"><h3>${text(u.boarding)}</h3>${deviceCarousel({title:u.terminalMap},g.boardingSlides,'airport-boarding')}<p>${text(g.boardingNote)}</p></section>`:'';
    return `<div class="airport-detail">${outbound?`<aside class="airport-trip-note">${text(u.flightNote)}</aside>`:''}<section class="airport-route-infographic"><p class="airport-route-endpoints"><span>${text(j.from)}</span>${airportRouteArrow()}<span>${text(j.to)}</span></p><section class="airport-route" aria-label="${text(u.route)}"><ol class="airport-timeline">${j.route.map((step,i)=>`<li class="route-${step.kind}"><span class="airport-step-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div><span class="airport-line-label">${text(g.modes[step.kind])}</span><h4>${text(step.title)}</h4><p>${text(step.body)}</p></div></li>`).join('')}</ol></section><aside class="airport-key-note">${text(g.notices[x.id])}</aside></section>${driver}${hours}${actions?`<div class="airport-quick-actions">${actions}</div>`:''}${boarding}<details class="airport-conditions"><summary>${text(u.conditions)}</summary><p>${text(x.id==='rail'?g.fareNote:x.body)}</p>${x.extra?`<p>${text(x.extra)}</p>`:''}</details><section class="airport-sources"><h4>${text(u.official)}</h4><div>${x.links.filter(l=>!l.url.includes('bustago')).map(l=>ext(l.url,text(l.title))).join('')}${x.id==='bus'?ext(N('공항리무진2'),text(u.stopMap))+ext('https://www.airport.co.kr/gimhae/cms/frCon/index.do?MENU_ID=170&CONTENTS_NO=1',text(u.terminalMap)):''}</div></section></div>`;

  }
  function airport(){
    const g=D.airport.guide,u=g.labels;
    return `${heading('GIMHAE AIRPORT / EXTAY JEONPO',g.title,g.lead)}<section class="airport-shell section"><button class="airport-return-shortcut" type="button" data-scroll="airport-direction-departure">${text(u.departure)} <span aria-hidden="true">↓</span></button><div class="airport-direction-stack">${['arrival','departure'].map(direction=>`<section class="airport-direction-section" id="airport-direction-${direction}" aria-labelledby="airport-direction-title-${direction}"><h2 id="airport-direction-title-${direction}">${text(u[direction])}</h2><div class="airport-method-list">${D.airport.options.map(x=>airportMethod(x,direction)).join('')}</div></section>`).join('')}</div><p class="airport-comparison-basis">${text(u.basis)}</p><p class="content-date">${text(u.checked)}</p></section>${help()}${footer()}`;
  }

  function updateNavigation(){
    $('.desktop-nav').innerHTML=[['gallery','gallery'],['guide','guide'],['nearby','local']].map(([r,k])=>`<a href="#${r}" ${route===r?'aria-current="page"':''}>${tr(k)}</a>`).join('');
    $('.header-book').textContent=tr('book');
    $('.bottom-nav').innerHTML=[['home','home','home'],['gallery','space','gallery'],['guide','guide','guide'],['nearby','local','nearby'],['book','book','book']].map(([r,k,i])=>r==='book'?`<button data-book>${icon(i)}<span>${tr(k)}</span></button>`:`<a href="#${r}" ${route===r||(r==='guide'&&['airport','transport',...Object.keys(D.guides)].includes(route))||(r==='nearby'&&route==='tours')?'aria-current="page"':''}>${icon(i)}<span>${tr(k)}</span></a>`).join('');
    $('.drawer-nav').innerHTML=['home','gallery','airport','transport','checkin','wifi','appliances','laundry','rules','nearby','tours'].map((r,i)=>`<a href="#${r}" ${route===r?'aria-current="page"':''}><span class="drawer-icon" aria-hidden="true">${icon(r)}</span><span class="drawer-copy"><strong>${esc(tr(r))}</strong><span class="drawer-subtitle">${text(D.menuDescriptions[r])}</span></span><i aria-hidden="true">↗</i></a>${i===4?`<aside class="drawer-journal"><p>EXTAY JEONPO JOURNAL</p><strong>${lines(L('도시를 바라보고,\n우리답게 머무는 곳.','A view of the city.\nA stay of your own.','街を眺めて、\n自分たちらしく滞在。','望见城市，\n自在相聚。','望見城市，\n自在相聚。'))}</strong><small>BUSAN · JEONPO<br>A PRIVATE STAY, TOGETHER.</small></aside>`:''}`).join('');
    $('#language').value=language;$('#languageLabel').textContent=tr('language');$('.skip-link').textContent=tr('skip');$('.menu-button').setAttribute('aria-label',tr('menu'));$('.bottom-nav').setAttribute('aria-label',tr('quick'));
    $('#zoomIn').setAttribute('aria-label',tr('zoomIn'));$('#zoomOut').setAttribute('aria-label',tr('zoomOut'));$('#zoomReset').setAttribute('aria-label',tr('zoomReset'));
    $$('[data-close]').forEach(b=>b.setAttribute('aria-label',tr('close')));$('.prev').setAttribute('aria-label',tr('previous'));$('.next').setAttribute('aria-label',tr('next'));
    $('#bookingTitle').textContent=tr('bookingTitle');$('#bookingBody').innerHTML=`<p>${tr('bookingBody')}</p>${stats()}<div class="booking-facts"><p>${tr('stairs')}</p><p>${tr('noParking')}</p></div>${ext(D.bookingUrl,tr('bookingCta'),'primary-button')}<p class="booking-contact">${tr('askBody')}</p>`;
  }
  function compactLists(){
    const list=$('#localResults');if(!list)return;
    const cards=$$('#localResults>.discovery-item');
    const batch=4;
    cards.forEach((card,i)=>{card.hidden=i>=batch;});
    list.parentElement.querySelector('[data-show-more]')?.remove();
    if(cards.length>batch){const button=document.createElement('button');button.className='show-more outline-button';button.dataset.showMore=String(batch);
      button.innerHTML=`${text(L(`${batch}개 더 보기`,`Show ${batch} more`,`${batch}件をさらに見る`,`再看${batch}个`,`再看${batch}個`))}<span aria-hidden="true">＋</span>`;
      list.after(button);
    }
  }
  function compactPage(){
    if(route==='home')$$('.signature img,.home-photo-carousel img,.home-local-photo img').forEach(image=>{
      const width=Number(image.getAttribute('width')),height=Number(image.getAttribute('height'));
      if(width&&height)image.style.aspectRatio=`${width} / ${height}`;
    });
    if(route==='transport'){
      $('.transport-notes').id='arrival-luggage';
    }
    if(['nearby','tours'].includes(route)){
      $('.discovery-cover')?.remove();
    }
    compactLists();
  }

  let coverHeaderObserver;
  function bindCoverHeader(){
    coverHeaderObserver?.disconnect();const bar=$('.topbar'),cover=$('.atelier-cover');
    bar.classList.remove('over-photo');if(!cover)return;
    const update=()=>bar.classList.toggle('over-photo',cover.getBoundingClientRect().bottom>64&&cover.getBoundingClientRect().top<innerHeight);
    update();coverHeaderObserver=new IntersectionObserver(update,{rootMargin:'-64px 0px 0px',threshold:[0,1]});coverHeaderObserver.observe(cover);
  }
  function render(focus=false,restore=false){
    const galleryFilterOffset=$('.gallery-filters')?.scrollLeft||0;
    document.documentElement.lang={zh:'zh-CN',tw:'zh-TW'}[language]||language;
    const pages={home,gallery,guide:guideIndex,airport,transport,checkin:checkinPage,appliances:appliancesPage,nearby,tours};
    $('#main').innerHTML=(pages[route]||guidePage)();
    document.body.dataset.route=route;document.title=route==='home'?'EXTAY JEONPO — Busan Private Stay':`${route==='appliances'&&applianceId?t(applianceCard(applianceId).title):tr(route)} · EXTAY JEONPO`;
    compactPage();const galleryFilters=$('.gallery-filters');
    if(galleryFilters){
      galleryFilters.scrollLeft=galleryFilterOffset;
      const active=$('[aria-pressed="true"]',galleryFilters),bounds=galleryFilters.getBoundingClientRect(),selected=active?.getBoundingClientRect();
      if(selected&&selected.left<bounds.left)galleryFilters.scrollLeft+=selected.left-bounds.left;
      else if(selected&&selected.right>bounds.right)galleryFilters.scrollLeft+=selected.right-bounds.right;
    }
    updateNavigation();bindDeviceCarousels();bindHomePhotoCarousels();bindCoverHeader();if(focus)$('#main').focus({preventScroll:true});if(restore)window.scrollTo({top:scrolls.get(pageKey())||0,behavior:'instant'});
  }
  function navigate(){const previousDevice=applianceId,next=resolvePage(location.hash.slice(1)||'home');scrolls.set(pageKey(),window.scrollY);if(route!==next.route){localCategory='all';query='';}route=next.route;applianceId=next.id;$$('dialog[open]').forEach(x=>x.close());render(true,true);if(previousDevice&&route==='appliances'&&!applianceId&&scrolls.has('appliances'))$(`[data-appliance-id="${previousDevice}"]`)?.focus({preventScroll:true});}
  function showToast(message){clearTimeout(toastTimer);$('.toast').textContent=message;$('.toast').classList.add('visible');toastTimer=setTimeout(()=>$('.toast').classList.remove('visible'),3300);}
  function openPhoto(id){lightboxItems=route==='gallery'?galleryItems().map(x=>x.id):route==='transport'?[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]:D.guides[route]?[...new Set([D.guides[route].image,...D.guides[route].cards.flatMap(x=>[x.image,...(x.photos||[])]).filter(x=>x!==null)])]:D.gallery.map(x=>x.id);if(!lightboxItems.includes(id))lightboxItems.push(id);lightboxIndex=lightboxItems.indexOf(id);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);}
  function updatePhoto(){photoZoom=1;const item=lightboxItems[lightboxIndex],isFile=typeof item==='object';$('#lightboxImage').src=isFile?guideMediaUrl(item.file):`assets/images/photo-${String(item).padStart(2,'0')}.webp`;$('#lightboxImage').alt=isFile?item.caption:t(D.captions[item]);$('#lightboxRouteOverlay').innerHTML=isFile&&Number.isInteger(item.walkStep)?walkingDirections(item.walkStep):(isFile?item.file.endsWith('/photo-36.webp'):item===36)?entranceHighlight():'';$('#lightboxCaption').textContent=isFile?item.caption:t(D.captions[item]);$('#lightboxCaption').hidden=route==='gallery';$('.lightbox-counter').textContent=`${String(lightboxIndex+1).padStart(2,'0')} / ${String(lightboxItems.length).padStart(2,'0')}`;requestAnimationFrame(fitPhoto);}
  function shiftPhoto(n){lightboxIndex=(lightboxIndex+n+lightboxItems.length)%lightboxItems.length;updatePhoto();}

  document.addEventListener('click',async e=>{
    const applianceChoice=e.target.closest('[data-appliance-id]');if(applianceChoice&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey)scrolls.delete('appliances/'+applianceChoice.dataset.applianceId);
    const applianceFilter=e.target.closest('[data-appliance-filter]');if(applianceFilter){applianceCategory=applianceFilter.dataset.applianceFilter;$$('[data-appliance-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.applianceFilter===applianceCategory)));$('.appliance-grid').innerHTML=applianceCards();$('.appliance-result-count').innerHTML=applianceResultLabel();return;}
    if(e.target.closest('.skip-link')){e.preventDefault();$('#main').focus();return;}
    if(e.target.closest('[data-cover-scroll]')){const target=$('#stay-essentials');if(target)window.scrollTo({top:target.getBoundingClientRect().top+scrollY-$('.topbar').offsetHeight+1,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    const homePhoto=e.target.closest('[data-home-photo]');if(homePhoto){const[key,index]=homePhoto.dataset.homePhoto.split(':');lightboxItems=homePhotoSets[key].map(item=>item.id);lightboxIndex=Number(index);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);return;}
    const homeShift=e.target.closest('[data-home-shift]');if(homeShift){const root=homeShift.closest('[data-home-carousel]');moveHomePhotoCarousel(root,homePhotoIndices[root.dataset.homeCarousel]+Number(homeShift.dataset.homeShift));return;}
    const homeIndex=e.target.closest('[data-home-index]');if(homeIndex){moveHomePhotoCarousel(homeIndex.closest('[data-home-carousel]'),Number(homeIndex.dataset.homeIndex));return;}
    const informationClose=e.target.closest('[data-close-information]');if(informationClose){const card=document.getElementById(informationClose.dataset.closeInformation);card.open=false;const summary=$('summary',card);summary.focus({preventScroll:true});summary.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    const airportClose=e.target.closest('[data-close-airport]');if(airportClose){const card=document.getElementById(airportClose.dataset.closeAirport);card.open=false;const summary=$('summary',card);summary.focus({preventScroll:true});summary.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    const device=e.target.closest('[data-device-media]');if(device){const[id,index]=device.dataset.deviceMedia.split(':'),set=visualSets[id];lightboxItems=set.slides.map((s,i)=>({walkStep:id==='arrival-walk'?i:null,file:s.photo!==undefined?'assets/images/photo-'+String(s.photo).padStart(2,'0')+'.webp':s.file,caption:t(set.title)+' · '+t(s.title)+(s.keys?' · '+s.keys.map((k,i)=>(i+1)+'. '+t(k)).join(' / '):'')}));lightboxIndex=Number(index);updatePhoto();$('#lightbox').showModal();requestAnimationFrame(fitPhoto);return;}
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

    if(e.target.closest('.lightbox-arrow.prev'))shiftPhoto(-1);if(e.target.closest('.lightbox-arrow.next'))shiftPhoto(1);
    const more=e.target.closest('[data-show-more]');if(more){const hidden=$$('#localResults>.discovery-item[hidden]'),batch=Number(more.dataset.showMore);hidden.slice(0,batch).forEach(card=>{card.hidden=false;});if(hidden.length<=batch)more.remove();if(hidden[0]){hidden[0].tabIndex=-1;hidden[0].focus({preventScroll:true});hidden[0].scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}return;}
    const scroll=e.target.closest('[data-scroll]');if(scroll){const target=document.getElementById(scroll.dataset.scroll);if(target?.matches('details'))target.open=true;target?.closest('details')?.setAttribute('open','');target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===location.hash&&$('#menuDialog').open)$('#menuDialog').close();
  });
  document.addEventListener('toggle',e=>{
    const card=e.target;if(!card.isConnected)return;
    if(card.matches?.('.information-disclosure')){
      if(card.open){
        const summaryTop=card.getBoundingClientRect().top;
        $$('.information-disclosure').filter(other=>other!==card&&other.open).forEach(other=>{other.open=false;informationOpenGuides.delete(other.dataset.informationGuide);});
        const shift=card.getBoundingClientRect().top-summaryTop;
        if(shift)window.scrollBy({top:shift,behavior:'instant'});
        informationOpenGuides.add(card.dataset.informationGuide);
        requestAnimationFrame(()=>$$('[data-device-track]',card).forEach(track=>{syncDeviceCarousel(track);fitDeviceTrack(track);}));
      }else informationOpenGuides.delete(card.dataset.informationGuide);
      return;
    }
    if(!card.matches?.('.airport-method'))return;
    if(card.open){
      const summaryTop=card.getBoundingClientRect().top;
      $$('.airport-method',card.parentElement).filter(other=>other!==card&&other.open).forEach(other=>{other.open=false;airportOpenGuides.delete(other.dataset.airportGuide);});
      const shift=card.getBoundingClientRect().top-summaryTop;
      if(shift)window.scrollBy({top:shift,behavior:'instant'});
      airportOpenGuides.add(card.dataset.airportGuide);
      requestAnimationFrame(()=>$$('[data-device-track]',card).forEach(track=>{syncDeviceCarousel(track);fitDeviceTrack(track);}));
    }else airportOpenGuides.delete(card.dataset.airportGuide);
  },true);
  $('#language').addEventListener('change',e=>{const y=scrollY;language=e.target.value;try{localStorage.setItem('extayjeonpo-language',language)}catch{}render();window.scrollTo({top:y,behavior:'instant'})});
  document.addEventListener('input',e=>{if(e.target.id==='localSearch'){query=e.target.value;$('#localResults').innerHTML=localCards();compactLists()}});
  $('#menuDialog').addEventListener('close',()=>$('.menu-button').setAttribute('aria-expanded','false'));
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const b=d.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)d.close()}}));
  document.addEventListener('keydown',e=>{if($('#lightbox').open){if(e.key==='ArrowRight'){e.preventDefault();shiftPhoto(1)}if(e.key==='ArrowLeft'){e.preventDefault();shiftPhoto(-1)}}});
  let touchX=0;$('#lightbox').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});$('#lightbox').addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchX;if(photoZoom===1&&Math.abs(delta)>55)shiftPhoto(delta<0?1:-1)},{passive:true});
  let photoZoom=1;
  function fitPhoto(){
    const stage=$('#lightboxStage'),photo=$('#lightboxImage'),frame=$('#lightboxPhoto');if(!$('#lightbox').open||!photo.naturalWidth||!stage.clientWidth||!stage.clientHeight)return;
    const factor=Math.min(stage.clientWidth/photo.naturalWidth,stage.clientHeight/photo.naturalHeight);
    const width=photo.naturalWidth*factor*photoZoom,height=photo.naturalHeight*factor*photoZoom;
    stage.classList.toggle('is-zoomed',photoZoom>1);frame.style.width=`${width}px`;frame.style.height=`${height}px`;
    frame.style.marginLeft=photoZoom>1?`${Math.max(0,(stage.clientWidth-width)/2)}px`:'0';
    frame.style.marginTop=photoZoom>1?`${Math.max(0,(stage.clientHeight-height)/2)}px`:'0';
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
  window.addEventListener('hashchange',navigate);const initialPage=resolvePage(location.hash.slice(1)||'home');route=initialPage.route;applianceId=initialPage.id;render();playBrandIntro();
})();
