import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name==='/'||name==='/guide-extayjeonpo')name='/index.html';const p=resolve(root,'.'+name);if(p!==root&&!p.startsWith(root+sep)){res.writeHead(403).end();return}const s=await stat(p);if(!s.isFile())throw Error('not a file');res.writeHead(200,{'Content-Type':types[extname(p)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(p))}catch{res.writeHead(404).end('Not found')}});
const port=Number(process.env.PORT||8796);server.listen(port,'127.0.0.1',()=>console.log(`EXTAY JEONPO Local: http://127.0.0.1:${port}`));
