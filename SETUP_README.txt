Franklin Academy Front Desk Digital Bulletin Board — Version 19

Files:
1. index.html — complete dashboard with the logo embedded directly.
2. franklin_logo_v19_all_white_details.png — high-resolution transparent logo used in Version 19.

Version 19 YouTube correction (Error 153 hotfix):
- Uses YouTube's recommended strict-origin-when-cross-origin referral policy.
- Uses the dashboard's real web origin instead of trying to substitute a GitHub address during local-file previews.
- Adds start_dashboard.command for a one-click local preview with the HTTP referrer YouTube now requires.
- Shows a clear launcher message instead of YouTube Error 153 if index.html is opened directly from disk.
- Removes the “Franklin Academy Videos” heading and the “Channel” label.
- Expands the video player to use the complete lower-right panel.

Autoplay correction retained from Version 18:
- Connects the video panel directly to Franklin Academy’s official YouTube uploads playlist.
- Starts the latest public channel video automatically with sound muted.
- Use the Sound Off button on the video to turn audio on; the setting remains active as the dashboard advances through its playlist.
- Continues through the channel’s public uploads and loops the playlist.
- Removes the empty “Video playlist ready” screen from Version 17.
- Does not require individual YouTube links for the official channel videos.

Video panel retained from Version 17:
- Adds a compact “Franklin Academy Videos” panel below the events panel.
- Keeps the video panel aligned with the right-side events section.
- Shows the next six events above the video so each event card remains readable.
- Supports individual public YouTube and Google Drive video links.
- Starts videos muted so TV browsers are more likely to allow autoplay.
- Loops one video continuously or cycles through several videos.
- Restarts Google Drive video playback when the TV browser wakes up.

How to add optional extra videos:
1. Open index.html in a text editor.
2. Find the VIDEO_PLAYLIST list near the top of the script.
3. Paste one entry for each video. Use the formats below.

YouTube example:
{ type: "youtube", url: "https://www.youtube.com/watch?v=VIDEO_ID", seconds: 60, title: "Campus Tour" }

Google Drive example:
{ type: "drive", url: "https://drive.google.com/file/d/FILE_ID/view", title: "Student Programs" }

The official YouTube channel playlist already plays when this list is empty. Separate several custom entries with commas. The channel playlist plays for ten minutes before the player moves to the first custom item. The YouTube seconds value should be close to the full video length because it controls when the next custom video begins. Google Drive videos normally advance when each video ends.

YouTube channel:
https://www.youtube.com/@FranklinAcademy-K12/videos

Google Drive sharing:
- Set every Drive video to “Anyone with the link” before using it.
- Keep the videos muted for reliable autoplay on the Samsung TV.
- Very large Drive files may not stream through the direct link. YouTube is the more reliable choice for TV playback.

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
3. The dashboard opens at http://127.0.0.1:8765/ and YouTube videos play automatically.
4. Press Control-C in the Terminal window when you are finished.

Do not double-click index.html for video testing. YouTube now rejects embedded players opened directly from a file because file:// pages cannot send the required HTTP Referer header. The published GitHub Pages dashboard is already served through HTTPS and does not need the launcher.

For GitHub Pages and the Samsung TV:
1. Add any optional extra video links to VIDEO_PLAYLIST in this Version 19 index.html.
2. Replace the existing repository index.html with this Version 19 index.html.
3. Commit and push the change.
4. Wait for GitHub Pages to finish deploying.
5. Refresh the dashboard URL in the Samsung TV browser.
