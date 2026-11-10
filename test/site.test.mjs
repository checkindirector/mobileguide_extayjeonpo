import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../assets/data.js',import.meta.url),'utf8'),ctx);const d=ctx.window.EXTAY;
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
