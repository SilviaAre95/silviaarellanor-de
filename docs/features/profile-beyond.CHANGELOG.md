# Changelog — profile-beyond

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-08 — shipped

- **Status**: in-progress → implemented; copy for padel, track and field, and the dogs supplied by Silvia; freediving dropped until it has a photo
- **Files touched**: docs/features/profile-beyond.md, docs/features/INDEX.md
- **Approved via**: Silvia's "push it deploy it pr it"

## 2026-09-08 — narrative intro, full-colour photos, pairing removed

- **Changed**: the introduction is rewritten as a narrative from Silvia's notes (Cozumel, 15 years as an athlete, the hobbies), then passed through the humanizer checklist; brand §2's banned words are avoided
- **Removed**: the "15 / years as a track athlete" caption pairing, and the photo-less Freediving card, at Silvia's request
- **Changed**: photos now run in full colour, Silvia's call; recorded as a stated exception to brand §6
- **Changed**: the friend's face in the padel photo is covered with a drawn emoji, re-exported from the original
- **Files touched**: src/pages/About/Beyond.jsx, src/assets/css/index.css, src/assets/images/beyond/padel.webp, docs/features/profile-beyond.md
- **Approved via**: Silvia's request in chat

## 2026-09-08 — introduction added

- **Added**: a three-paragraph introduction supplied by Silvia, edited for spelling and the brand voice ("passionate" and "journey" are on the §2 forbidden list); padel and science notes updated with the team in Madrid and the outreach project
- **Files touched**: src/pages/About/Beyond.jsx, src/data/beyond.js, src/assets/css/index.css, docs/features/profile-beyond.md
- **Approved via**: Silvia supplied the copy in chat

## 2026-09-08

- **Created**: "Beyond the code" section at the end of the About page, six pursuit cards fed by a data file, five photos from Silvia's "SilviaDataDev" album duotoned in CSS
- **Status**: in-progress — built in dev; open questions on the padel photo, the dogs, and freediving's photo before deploy
- **Files touched**: src/pages/About/Beyond.jsx, src/data/beyond.js, src/pages/About/About.jsx, src/assets/css/index.css, src/assets/images/beyond/*
- **Approved via**: Silvia's "build it in dev" after the about non-goal was raised twice; spec change to profile-about-experience applied alongside
