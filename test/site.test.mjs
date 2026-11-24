import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};for(const file of ['data.js','guest-guide-data.js','stay-essentials-data.js','appliance-guide-data.js','tour-photo-data.js','dining-photo-data.js','airport-guide-data.js'])vm.runInNewContext(fs.readFileSync(new URL('../assets/'+file,import.meta.url),'utf8'),ctx);const d=ctx.window.EXTAY;
test('guest-critical policies match supplied property information',()=>{
 assert.match(d.ui.stairs.ko,/5층/);assert.match(d.home.floorBody.ko,/엘리베이터가 없는/);
 const checkin=JSON.stringify(d.guides.checkin);for(const v of ['16:00','14:00','11:00','20,000','09:00–21:00'])assert.ok(checkin.includes(v),v);
 assert.ok(JSON.stringify(d.guides.rules).includes('CCTV'));assert.ok(JSON.stringify(d.guides.rules).includes('22:00'));
});
test('every public photograph has complete localized descriptive text',()=>{
 for(let i=1;i<59;i++){assert.ok(d.captions[i],`caption ${i}`);for(const lang of ['ko','en','ja','zh','tw'])assert.ok(d.captions[i][lang]?.trim(),`${i}:${lang}`)}
 assert.equal(new Set(d.gallery.map(x=>x.id)).size,35);
});
test('booking opens the supplied accommodation and all external sources use HTTPS',()=>{
 assert.equal(d.bookingUrl,'https://www.airbnb.co.kr/h/extayjeonpo');
 for(const x of d.local)if(x.source)assert.equal(new URL(x.source).protocol,'https:');
});
test('curated local routes resolve to distinct real places with official sources',()=>{
 for(const list of [d.dining,d.sights]){assert.equal(list.length,20);assert.equal(new Set(list.map(x=>x.id)).size,20);for(const x of list){assert.ok(x.address.startsWith('부산'));assert.match(new URL(x.source).hostname,/(^|\.)visitbusan\.net$/)}}
 for(const course of d.dayCourses)for(const stop of course.stops)assert.ok(d.sights.some(x=>x.id===stop),stop);
});
test('airport and device guidance keeps services and actual models separate',()=>{
 assert.equal(d.airport.options.length,3);
 assert.match(d.airport.options.find(x=>x.id==='bus').fare.ko,/6,000/);
 assert.match(d.airport.options.find(x=>x.id==='bus').steps[3].ko,/다른 승하차/);
 const hob=d.guides.appliances.cards.find(x=>x.id==='hob');assert.match(hob.model,/HEC-2050SH/);assert.match(hob.text.ko,/하이라이트/);
 const dryer=d.guides.laundry.cards.find(x=>x.id==='dryer');assert.match(dryer.model,/DV20CB8600BW/);assert.equal(dryer.image,null);
});
test('airport journeys preserve correct reverse directions and distinct boarding points',()=>{
 const g=d.airport.guide;
 for(const direction of ['arrival','departure'])for(const method of ['rail','bus','taxi']){
  const j=g.journeys[direction][method];assert.ok(j.route.length>=2);assert.notEqual(j.from.ko,j.to.ko);
  assert.equal(j.to.ko.includes('김해공항'),direction==='departure');
 }
 const back=g.journeys.departure.rail.route.map(s=>s.body.ko).join(' ');
 for(const destination of ['다대포해수욕장','양산','가야대'])assert.ok(back.includes(destination));
 assert.match(g.notices.bus.ko,/60–80/);assert.match(g.notices.bus.ko,/현금 불가/);
 assert.match(g.journeys.departure.bus.route[0].body.ko,/다른 승하차/);
 assert.equal(g.journeys.arrival.bus.hours,'07:20–21:30');assert.equal(g.journeys.departure.bus.hours,'06:00–20:00');
 assert.equal(g.journeys.arrival.bus.stopCode,'05708');assert.equal(g.journeys.departure.bus.stopCode,'05707');
 for(const direction of ['arrival','departure'])assert.equal(new URL(g.journeys[direction].bus.walkMap).hostname,'map.naver.com');
 assert.notEqual(g.journeys.arrival.bus.walkMap,g.journeys.departure.bus.walkMap);
 assert.equal(g.boardingSlides.length,2);
 for(const slide of g.boardingSlides){assert.equal(new URL(slide.source).hostname,'www.airport.co.kr');assert.ok(fs.existsSync(new URL('../'+slide.file,import.meta.url)));}
});
test('new coffee and water instructions match the installed models',()=>{
 const coffee=d.guides.appliances.cards.find(x=>x.id==='coffee');
 assert.match(coffee.model,/ESSENZA MINI C30/);assert.match(coffee.text.ko,/오리지널/);
 assert.match(coffee.steps.map(s=>s.ko).join(' '),/40mL.*110mL/);assert.match(coffee.caution.ko,/추출 중에는 레버를 열지/);
 assert.equal(new URL(coffee.links[0].url).hostname,'www.nespresso.com');
 const water=d.guides.appliances.cards.find(x=>x.id==='water');
 assert.match(water.model,/WQ652NWR/);assert.match(water.text.ko,/냉수·정수 전용/);
 assert.ok(!water.steps.some(s=>s.ko.includes('온수')));
 assert.equal(d.guides.appliances.cards.find(x=>x.id==='tv').location.ko,'거실');
});
test('every device has visual slides and every sight has a licensed local photograph',()=>{
 const devices=[...d.guides.appliances.cards,...d.guides.laundry.cards].filter(c=>c.id);
 assert.equal(devices.length,14);
 for(const c of devices){assert.ok(d.deviceMedia[c.id].length>=1,c.id);for(const s of d.deviceMedia[c.id])if(s.file)assert.ok(fs.existsSync(new URL('../'+s.file,import.meta.url)),s.file)}
 for(const sight of d.sights){const p=d.localPhotos[sight.id];assert.ok(p,sight.id);assert.match(p.license,/제1유형/);assert.ok(p.creator&&p.publisher);assert.ok(fs.existsSync(new URL('../'+p.file,import.meta.url)),p.file)}
});

test('all dining recommendations have distinct real photographs saved locally',()=>{
 const files=new Set();
 for(const place of d.dining){const photo=d.localPhotos[place.id];assert.ok(photo,place.id);assert.ok(photo.width>=300&&photo.height>=250);assert.ok(fs.existsSync(new URL('../'+photo.file,import.meta.url)));assert.equal(new URL(photo.source).protocol,'https:');files.add(photo.file)}
 assert.equal(files.size,20);
});

test('coffee starts with the official C30 diagram and old schematic placeholders are unused',()=>{
 const slides=d.deviceMedia.coffee;assert.equal(slides.length,4);assert.match(slides[0].file,/manual-coffee-overview.svg$/);
 for(const slide of slides)assert.equal(new URL(slide.source).hostname,'www.nespresso.com');
 for(const [device,media] of Object.entries(d.deviceMedia))for(const slide of media)assert.ok(!slide.file?.startsWith('assets/diagrams/'),device);
 for(const device of ['hob','washer','dryer'])assert.ok(d.deviceMedia[device][0].source,device);
});
