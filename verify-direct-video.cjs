const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const crypto = require('crypto');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
assert.equal(hash(html.match(/<style>[\s\S]*?<\/style>/)[0]), 'eaa480fd01a484fc0fd61977a4041c0a4b79bd26a69081516fe9517904b6bd27', 'Original layout and panel dimensions must remain unchanged');
assert.equal(hash(html.slice(html.indexOf('  function todayParts'))), '5f0216480a7bc9351831a6b7da462bbfd826b1732103df453336ff3c4f57bee9', 'Calendar, weather and flyers must stay unchanged');
const video = html.match(/<video\b[\s\S]*?<\/video>/)[0];
assert(video.includes('src="franklin-academy-video.mp4"'));
assert(/\bautoplay\b/.test(video) && /\bloop\b/.test(video) && /\bplaysinline\b/.test(video));
assert(/\bcontrols\b/.test(video), 'Native controls must allow manual sound activation');
assert(!/\bmuted\b/.test(video), 'Request sound rather than default muted playback');
assert(!html.includes('youtube.com/embed/') && !html.includes('youtube.com/iframe_api'));
assert(html.includes('const requestAutomaticSound = soundMode !== "off";'));
for (const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
const file = path.join(__dirname, 'franklin-academy-video.mp4');
if (fs.existsSync(file)) {
  assert(fs.statSync(file).size < 25 * 1000 * 1000, 'Video must fit even a conservative 25 MB upload budget');
  const bytes = fs.readFileSync(file);
  const boxes=[];
  for(let pos=0;pos+8<=bytes.length;){
    let size=bytes.readUInt32BE(pos);const type=bytes.toString('ascii',pos+4,pos+8);
    if(size===1)size=Number(bytes.readBigUInt64BE(pos+8));
    if(size===0)size=bytes.length-pos;
    assert(size>=8 && pos+size<=bytes.length,'Valid MP4 box size');boxes.push(type);pos+=size;
  }
  assert(boxes.includes('moov') && boxes.indexOf('moov')<boxes.indexOf('mdat'),'Fast-start metadata must precede video data');
}
console.log('PASS: native MP4 playback with sound requested, loop and controls; unchanged calendar/layout/flyers; syntax; optional MP4 size and fast-start checks.');
