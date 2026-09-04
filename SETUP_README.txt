Franklin Academy Front Desk Digital Bulletin Board — Version 19

Files:
1. index.html — complete dashboard with the logo embedded directly.
2. franklin_logo_v19_all_white_details.png — high-resolution transparent logo used in Version 19.
3. franklin_academy_promo_2026.mp4 — optimized web/TV copy of the Franklin Academy promotional video.
4. start_dashboard.command — local Mac preview launcher.

Version 19 local-video update:
- Replaces the YouTube player with FA宣传片2026.mp4.
- Uses a clear, web-optimized H.264/AAC copy sized for the dashboard's video panel and Android TV compatibility.
- Keeps the deployable video near 17 MB so it remains below GitHub's 25 MB browser-upload limit.
- Starts playing automatically with no on-screen click.
- Requests full-volume sound automatically in Android TV and signage browsers; falls back to muted playback instead of freezing if the browser blocks audible autoplay.
- Loops continuously with automatic replay and recovery after TV sleep or focus changes.
- Uses the complete video panel without a heading or player controls.

Video panel retained from Version 17:
- Adds a compact promotional-video panel below the events panel.
- Keeps the video panel aligned with the right-side events section.
- Shows the next six events above the video so each event card remains readable.
- Displays the complete video without cropping.
- Restarts video playback when the TV browser wakes up.

Version 17 calendar update:
- Adds Quarter 4 Assessments from June 1 through June 9, 2027.
- Adds the Students vs. Teachers Competition on June 10, 2027.
- These two entries were present on Franklin Academy’s official event pages but missing from Version 16.

Calendar label update retained from Version 16:
- Allows calendar event names to wrap onto a second or third line when needed.
- Removes the three-dot ellipsis from calendar event labels.
- Keeps the larger event-label font introduced in Version 15.

Calendar readability retained from Version 15:
- Increases the font size of event labels inside the calendar cells.
- Adds slightly more padding and line spacing so the event labels are easier to read on a TV.

Weather spacing retained from Version 14:
- Moves the weather emoji closer to the temperature and weather description.
- Keeps the complete weather group aligned at the top right.

Weather alignment retained from Version 13:
- Aligns the temperature and weather description to the same right edge.
- Keeps the weather text grouped neatly beside the weather icon.

Event-panel update retained from Version 12:
- Stretches the event cards evenly from the top to the bottom of the right panel.
- Automatically fills the panel when fewer than eight upcoming events remain.
- Slightly increases the event date, title, and note font sizes for clearer TV viewing.
- Shows a full-panel message instead of an empty area when no future events are listed.

Right-panel update retained from Version 11:
- Removes the Announcements section and its saved announcement text.
- Expands “Next Events & Holidays” to fill the complete right side of the dashboard.

Clock update retained from Version 10:
- Replaces the basic 30-second clock timer with a self-correcting clock loop.
- Refreshes the time immediately when the browser returns from sleep or regains focus.
- Refreshes the calendar and event list when the browser wakes up.

Wording retained from Version 9:
- Changes the calendar title to “Franklin Academy Calendar.”
- Changes the event title to “Next Events & Holidays.”
- Removes the event-list review date from the footer.

Layout retained from Version 8:
- Restores the earlier wide-calendar layout, with the calendar using roughly two-thirds of the dashboard.
- Keeps the right-side information column narrower so the overall layout remains balanced.
- Shows only dates from the displayed month; adjacent-month date numbers are blank.
- Automatically removes an unnecessary final calendar row when it contains only dates from the next month.
- Uses four, five, or six calendar rows depending on what the displayed month actually needs.

Event features retained from Version 6:
- Replaces the empty Google Calendar view with a built-in Franklin events calendar.
- Adds the official September 25, 2026 Moon Festival Classroom Activity.
- Includes the public Franklin Academy events and school closures published for the 2026–2027 school year.
- Originally showed the next eight events or closures in the right panel. Version 17 shows six so the video panel has enough space.
- Automatically rolls the calendar to the next month that has an active event.
- Automatically removes past items from the next-eight list as each date passes.

Important maintenance note:
- The calendar and event cards roll forward automatically through the dates saved in index.html.
- They do not automatically download new or revised dates from FranklinAcademy.us.
- FranklinAcademy.us currently protects its event feed with a robot challenge, so a static GitHub Pages dashboard cannot reliably sync that feed directly.
- When the official schedule changes, edit the EVENTS list near the top of the script in index.html, then upload the revised file to GitHub.

Logo:
- Uses the approved Franklin Academy logo with the wordmark and previously black details changed to white.
- Preserves the burgundy and navy crest and the transparent background.

To preview on this Mac:
1. Double-click start_dashboard.command.
2. Keep the Terminal window open while the dashboard is running.
3. The dashboard opens at http://127.0.0.1:8765/.
4. Press Control-C in the Terminal window when finished.

The dashboard now requests full-volume sound on every display. Browsers can still block automatic sound. For unattended TV playback, turn off Mute for this display in Screen Keep and make sure the TV volume is on.

For GitHub Pages and the TV:
1. Upload both index.html and franklin_academy_promo_2026.mp4 to the repository's top folder.
2. Commit and push both files.
3. Wait for GitHub Pages to finish deploying.
4. In Screen Keep, confirm that Mute is off for the display.
5. Refresh the dashboard URL on the TV.
