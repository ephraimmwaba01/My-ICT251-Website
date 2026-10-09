# Ephraim Favour Mwaba | ICT251 Interactive Personal Website

A responsive student portfolio built for **ICT251 Web Technologies, Activity 3**
(Mulungushi University, School of Engineering and Technology, Computer Science Department).
It is a plain HTML5, CSS and JavaScript static site with no frameworks or build step.

- **Live website:** https://YOUR-SITE.onrender.com  *(replace with the Render link)*
- **Source code:** https://github.com/YOUR-USERNAME/YOUR-REPO  *(replace with the repository link)*

## About the website

The site introduces me as a second-year Computer Science student. It has an introduction
area with links to my projects and contact form, followed by these sections:

| Section | What it contains |
|---|---|
| About Me | A short paragraph about me and why I study Computer Science |
| Projects & Skills | Three cards showing what I have built and learned |
| My Hobbies | A list of three hobbies and a numbered list of steps to improve my web skills |
| My Learning Plan | A weekly learning table with a caption and header row |
| My Photos | Three captioned photos with descriptive alt text, shown in a viewer |
| My Media | A self-introduction video and an audio clip, each with a written summary |
| Contact | A labelled contact form with validation and a local preview |

Design choices: a navy and teal colour palette, system fonts, comfortable line spacing,
visible hover and keyboard focus states, a light and dark theme, and a layout that works from
phone width (about 375 px) to desktop (1280 px) without sideways scrolling.

## Folder structure

```
index.html          page content
css/styles.css      all styling, including the dark theme and media queries
js/script.js        all JavaScript features
images/             photo1.jpg, photo2.jpg, photo3.jpg
videos/             intro.mp4 (video) and voice.mp3 (audio)
README.md           this file
```

## The four JavaScript features

All logic is in `js/script.js`, with comments above the main functions.

1. **Contact form validation and preview (compulsory).**
   On submit, the name, email and message are checked. Empty or spaces-only names and messages
   and badly formatted emails are rejected, with a clear error message under each field. When
   everything is valid, a "Form validated" summary appears on the page without reloading. It
   states that the data was validated and that **nothing was sent**. The form is labelled
   *Browser demonstration only, no message is sent*. The summary is written with `textContent`.
2. **Mobile navigation.**
   On narrow screens a Menu button opens and closes the navigation. The button text and
   `aria-expanded` show the open or closed state. The menu closes when a link is chosen or
   Escape is pressed.
3. **Gallery viewer.**
   Previous and Next buttons change the displayed photo and its caption, with a
   "Photo 1 of 3" counter. At the first and last photo the buttons wrap around to the other end.
4. **Theme switch (light and dark).**
   A button in the navigation switches the whole page between a light and dark theme. Text and
   controls stay readable in both. The choice is saved in the browser and reused on the next visit.

## How to test

Run the site with VS Code Live Server (open the folder, click **Go Live**) or open the live link.

1. **Form:** submit it empty; enter only spaces in Name and Message; enter `a@b` or `name.example.com`
   as the email. Each should show an error. Then enter valid details and check that the preview
   appears and says nothing was sent. Type `<b>hi</b>` in the message and check it appears as plain text.
2. **Mobile navigation:** make the window narrower than 600 px, press Menu, choose a link
   (the menu should close), reopen it and press Escape.
3. **Gallery:** press Next three times (it returns to photo 1), then press Previous (it goes to photo 3).
   The caption should change each time.
4. **Theme:** press Dark mode, check that all sections stay readable, reload the page and confirm the
   theme is remembered, then press Light mode.
5. **General:** at 375 px and 1280 px check there is no sideways scrolling; press Tab to confirm focus
   is visible on links and buttons; play and pause the video and audio; open the browser Console and
   confirm there are no errors.

## Deployment

Hosted as a Render **Static Site** from this GitHub repository (branch `main`).
Root Directory: blank. Build Command: `echo "No build required"`. Publish Directory: `.`.
Auto Deploy is on, so every commit to `main` updates the live site.

## Sources and credits

- Course material and activity briefs for ICT251 Web Technologies, Mulungushi University.
- MDN Web Docs (https://developer.mozilla.org/en-US/docs/Learn) for HTML, CSS and JavaScript reference.
- Photos, video and audio were made by me.
- No external libraries, fonts or frameworks are used; text uses the visitor's system fonts.
