import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const load=p=>fs.readFileSync(path.join(root,p),'utf8');
const contentFiles=['assets/data.js','assets/guest-guide-data.js','assets/stay-essentials-data.js','assets/appliance-guide-data.js','assets/tour-photo-data.js','assets/dining-photo-data.js'];
const source=load('index.html')+load('assets/app.js')+contentFiles.map(load).join('')+load('assets/styles.css')+load('assets/audit-refinements.css');
const sandbox={window:{}};for(const file of contentFiles)vm.runInNewContext(load(file),sandbox);const d=sandbox.window.EXTAY;
const files=new Set(['index.html','assets/data.js','assets/app.js','assets/styles.css','assets/images/logo.png','manifest.webmanifest','assets/favicon.svg','robots.txt','vercel.json']);
for(const x of [...source.matchAll(/(?:src|href)="(assets\/[^"$]+)"/g)])files.add(x[1].split(/[?#]/)[0]);
for(let i=0;i<59;i++)files.add(`assets/images/photo-${String(i).padStart(2,'0')}.webp`);
for(const photo of Object.values(d.localPhotos))files.add(photo.file);
for(const icon of JSON.parse(load('manifest.webmanifest')).icons)files.add(icon.src.split(/[?#]/)[0]);
for(const [device,slides] of Object.entries(d.deviceMedia)){
 if(slides.length<1)throw Error(`Incomplete visual guide: ${device}`);
 for(const slide of slides){
  if(slide.file){files.add(slide.file);if(!(slide.width>0&&slide.height>0))throw Error(`Missing media dimensions: ${slide.file}`)}
  else if(!d.photoSizes[slide.photo])throw Error(`Unknown guide photograph: ${device}`);
  if(slide.source&&new URL(slide.source).protocol!=='https:')throw Error(`Invalid manual source: ${device}`);
 }
}
for(const name of files)if(!fs.existsSync(path.join(root,name)))throw Error(`Missing asset: ${name}`);
let translations=0;function walk(v,p='data'){if(!v||typeof v!=='object')return;if('ko'in v){for(const language of ['ko','en','ja','zh','tw'])if(typeof v[language]!=='string'||!v[language].trim())throw Error(`Missing ${language}: ${p}`);translations++;return}for(const[k,x]of Object.entries(v))walk(x,`${p}.${k}`)}walk(d);
for(const item of d.gallery)if(!d.captions[item.id])throw Error(`Missing caption ${item.id}`);
if(d.gallery.length!==35)throw Error('Incomplete gallery');
for(const collection of [d.dining,d.sights]){
 if(collection.length!==20||new Set(collection.map(x=>x.id)).size!==20)throw Error('Incomplete or duplicate local recommendations');
 for(const place of collection)if(!place.address||!place.source||new URL(place.source).protocol!=='https:')throw Error(`Incomplete place ${place.id}`);
}
for(const course of d.dayCourses)for(const stop of course.stops)if(!d.sights.some(x=>x.id===stop))throw Error(`Unknown course stop ${stop}`);
for(const sight of d.sights){
 const photo=d.localPhotos[sight.id],credit=d.photoCredits.find(p=>p.id===sight.id);
 if(!photo||!credit||!(photo.width>0&&photo.height>0)||!credit.creator||!credit.publisher||!credit.license.includes('제1유형'))throw Error(`Incomplete licensed sight photo: ${sight.id}`);
}
for(const guide of Object.values(d.guides))for(const card of guide.cards)if(card.image!==null&&!d.captions[card.image])throw Error('Unknown device image');
for(const forbidden of ['staynemo-guide','anotherhouse-guide','을지로3가','OPENAI_API_KEY','api.openai.com','dongdae48@'])if(source.includes(forbidden))throw Error(`Unexpected carryover or private data: ${forbidden}`);
for(const hostSource of ['source-info.md','source-info-latest.md'].map(n=>path.join(root,'..',n)))
 if(fs.existsSync(hostSource)){const m=fs.readFileSync(hostSource,'utf8').match(/Wi-Fi 비밀번호:([^\r\n]+)/);if(m){const secret=m[1].trim().replace(/\\/g,'');if(secret&&source.includes(secret))throw Error('Private Wi-Fi password must stay out of public source')}}
if(d.bookingUrl!=='https://www.airbnb.co.kr/h/extayjeonpo')throw Error('Wrong booking destination');
console.log(`Validated EXTAY JEONPO: ${files.size} assets, 35 gallery photos, 20 dining + 20 sights, ${translations} complete five-language text groups.`);
