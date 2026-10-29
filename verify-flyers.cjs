// Run with Node.js: node verify-flyers.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const panel = html.match(/<section class="panel flyer-panel"[^>]*>([\s\S]*?)<\/section>/)[1];
const images = [...panel.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
assert.equal(images.length, 4, 'The two existing flyers and both PDF pages must be present');
const assets = ['community-gives-thanks.jpg', 'trunk-or-treat.jpg', 'dia-de-muertos-spanish.png', 'dia-de-muertos-english.png'];
images.forEach((image, index) => {
  const data = image.match(/src="data:image\/(?:jpeg|png);base64,([^"]+)"/);
  assert(data, 'Each flyer must load without an external upload');
  assert(Buffer.from(data[1], 'base64').equals(fs.readFileSync(path.join(__dirname, 'assets', assets[index]))));
});
// Minimal DOM boundary: exercise the real rotation controller and its timer.
const slides = images.map(image => {
  const classes = new Set(image.match(/class="([^"]+)"/)[1].split(' '));
  return { complete:true, naturalWidth:1280, attributes:{}, classList:{toggle(name, active){ active ? classes.add(name) : classes.delete(name); },contains:name=>classes.has(name)},setAttribute(name,value){this.attributes[name]=value;} };
});
const jobs = [];
let now = 0;
const context = {document:{querySelectorAll:()=>slides},setInterval(fn,delay){jobs.push({fn,delay,next:delay});}};
vm.createContext(context);
const controller = html.match(/<script id="flyer-rotation">([\s\S]*?)<\/script>/);
assert(controller, 'Flyer rotation must be initialized');
vm.runInContext(controller[1],context);
function advance(ms){const until=now+ms;while(jobs.some(j=>j.next<=until)){const job=jobs.filter(j=>j.next<=until).sort((a,b)=>a.next-b.next)[0];now=job.next;job.next+=job.delay;job.fn();}now=until;}
const visible = () => slides.map(s=>s.classList.contains('is-active'));
assert.deepEqual(visible(),[true,false,false,false]);
advance(29999);assert.deepEqual(visible(),[true,false,false,false]);
advance(1);assert.deepEqual(visible(),[false,true,false,false]);
advance(30000);assert.deepEqual(visible(),[false,false,true,false]);
advance(30000);assert.deepEqual(visible(),[false,false,false,true]);
advance(30000);assert.deepEqual(visible(),[true,false,false,false]);
slides[1].complete=false;advance(30000);assert.deepEqual(visible(),[true,false,false,false]);
slides[1].complete=true;advance(30000);assert.deepEqual(visible(),[false,true,false,false]);
for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
console.log('PASS: four embedded slides, 30-second timing, wraparound, unloaded-image protection, script syntax.');
