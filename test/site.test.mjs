import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};for(const file of ['data.js','guest-guide-data.js','stay-essentials-data.js'])vm.runInNewContext(fs.readFileSync(new URL('../assets/'+file,import.meta.url),'utf8'),ctx);const d=ctx.window.EXTAY;
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
