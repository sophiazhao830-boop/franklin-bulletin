// Source expectations: Franklin Academy Calendar v16, revised October 15, 2026.
// Run with Node.js: node verify-calendar.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
// The renderer only needs this small DOM boundary; all calendar logic is real.
class Element {
  constructor() {
    this.children = []; this.className = ''; this.textContent = ''; this.attributes = {};
    this.style = { setProperty(name, value) { this[name] = value; } };
    this.classList = { add: name => { this.className += ' ' + name; } };
  }
  get firstChild() { return this.children[0]; }
  appendChild(child) { this.children.push(child); }
  removeChild(child) { this.children.splice(this.children.indexOf(child), 1); }
  setAttribute(name, value) { this.attributes[name] = value; }
}
const nodes = Object.fromEntries(['calendar-grid', 'calendar-month-name', 'calendar-month-tbd'].map(id => [id, new Element()]));
const context = { document: { getElementById: id => nodes[id], createElement: () => new Element() } };
vm.createContext(context);
vm.runInContext(
  script.slice(script.indexOf('  const EVENTS ='), script.indexOf('  function showVideoPlaceholder')) +
  script.slice(script.indexOf('  function makeKey'), script.indexOf('  function formatDateChip')) +
  script.slice(script.indexOf('  function calendarRanges'), script.indexOf('  function renderEventViews')) +
  '\nthis.events = EVENTS; this.tbdEvents = TBD_EVENTS;', context);
function month(year, value) { context.renderCalendar(year, value, `${year}-${String(value).padStart(2, '0')}-01`); }
function day(number) {
  return nodes['calendar-grid'].children.find(node => node.className.split(' ').includes('calendar-day') &&
    !node.className.split(' ').includes('outside') && String(node.children[0].textContent) === String(number));
}
function badges(number) { return day(number).children.filter(node => node.className.split(' ').includes('calendar-event')); }
function titles(number) { return badges(number).map(node => node.children[0].textContent); }

month(2026, 11);
assert(titles(2).includes('Día de los Muertos'), 'Día de los Muertos must display on the user-confirmed Nov 2 date');
assert(!titles(6).includes('Día de los Muertos'), 'Remove the superseded Nov 6 date');
assert(badges(9).some(node => node.className.includes('closed') && node.children[0].textContent === 'Veterans Day'), 'School closure must display on Nov 9');
assert(!titles(11).includes('Veterans Day'), 'Remove the superseded Nov 11 closure');

month(2026, 10);
assert.deepEqual(titles(13), ['Picture Day', 'City Council Comments']);
assert(day(13).className.includes('many-events'));
assert.deepEqual(titles(15), ['Great ShakeOut Drill', 'AP Chinese Field Trip']);
assert(badges(15)[1].title.includes('Irvine City Hall'));
assert(badges(15)[1].title.includes('9:30 AM–12:00 PM'));
const midtermBars = nodes['calendar-grid'].children.filter(node => node.className.split(' ').includes('calendar-range') && node.textContent.startsWith('Semester 1 Midterm'));
assert.equal(midtermBars.length, 2, 'Midterm remains two weekly bars, not daily duplicates');
assert.deepEqual(midtermBars.map(node => node.style.gridColumn), ['4 / 8', '1 / 6']);

month(2027, 4);
assert(titles(21).includes('Cap & Gown Photos'));
month(2027, 6);
assert.equal(nodes['calendar-month-tbd'].hidden, false);
assert(nodes['calendar-month-tbd'].textContent.includes('All-School Irvine City Hall Field Trip'));
assert(!context.events.some(event => event.title.includes('All-School Irvine City Hall')), 'Do not assign a day to the undated trip');
assert(context.tbdEvents.some(event => event.year === 2027 && event.month === 6 && event.title === '12th Grade Senior Night/Trip'));

const expectedRanges = [
  ['2026-08-10','2026-08-21','Staff Development'],
  ['2026-10-21','2026-10-29','Semester 1 Midterm'],
  ['2026-11-25','2026-11-27','Thanksgiving Holiday'],
  ['2026-12-14','2026-12-18','Semester 1 Finals'],
  ['2026-12-21','2027-01-01','Winter Break'],
  ['2027-02-08','2027-02-12','Kindness Week'],
  ['2027-03-17','2027-03-25','Semester 2 Midterm'],
  ['2027-03-29','2027-04-09','Spring Break'],
  ['2027-05-03','2027-05-07','AP Exams'],
  ['2027-05-03','2027-05-07','Teacher Appreciation'],
  ['2027-05-10','2027-05-14','AP Exams'],
  ['2027-05-17','2027-05-21','Spirit Week'],
  ['2027-06-01','2027-06-09','Semester 2 Final']
];
const ranges = Array.from(context.events.filter(e => e.start !== e.end && e.display !== 'start'), e => [e.start,e.end,e.short]);
assert.deepEqual(ranges, expectedRanges);
for (const event of context.events) {
  assert(event.start <= event.end);
  for (const date of [event.start, event.end]) assert.equal(new Date(date+'T00:00:00Z').toISOString().slice(0,10), date);
}
assert.equal(new Set(context.events.map(e => e.start+'|'+e.end+'|'+e.title)).size, context.events.length);
assert.equal(context.displayMonthForDate({year:2026,month:9,day:27}).month,10);
console.log('PASS: revised calendar dates and rendered entries, old dates removed, field-trip details, TBD display, range bars, rollover, date validity, and no duplicates.');
