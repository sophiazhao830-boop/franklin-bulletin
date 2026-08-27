Franklin Academy Front Desk Digital Bulletin Board — Version 9

Files:
1. index.html — complete dashboard with the logo embedded directly.
2. franklin_logo_v9_all_white_details.png — high-resolution transparent logo used in Version 9.

Version 9 wording update:
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
- Shows the next eight events or closures in the right panel.
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

To preview:
Open index.html in a normal web browser. Internet access is only required for Irvine weather.

For GitHub Pages and the Samsung TV:
1. Replace the existing repository index.html with this Version 9 index.html.
2. Commit and push the change.
3. Wait for GitHub Pages to finish deploying.
4. Refresh the dashboard URL in the Samsung TV browser.
