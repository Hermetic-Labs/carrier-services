# Courier coachmark media drop

Drop all finished coachmark media directly into this folder. Do not create subfolders and do not rename the stems.

The application URL prefix is `/media/coachmarks/`.

## Secure entry

- [ ] `SEC-OVERVIEW.video.mp4`
- [ ] `SEC-OVERVIEW.audio.m4a`
- [ ] `SEC-OVERVIEW.poster.webp`
- [ ] `SEC-OVERVIEW.captions.vtt`

## Driver package custody

- [ ] `DRV-FLOW.video.mp4`
- [ ] `DRV-FLOW.audio.m4a`
- [ ] `DRV-FLOW.poster.webp`
- [ ] `DRV-FLOW.captions.vtt`

## Offline sync

- [ ] `SYN-FLOW.video.mp4`
- [ ] `SYN-FLOW.audio.m4a`
- [ ] `SYN-FLOW.poster.webp`
- [ ] `SYN-FLOW.captions.vtt`

## Dispatcher recovery

- [ ] `DSP-RECOVERY.video.mp4`
- [ ] `DSP-RECOVERY.audio.m4a`
- [ ] `DSP-RECOVERY.poster.webp`
- [ ] `DSP-RECOVERY.captions.vtt`

## Courier AI and MCP

- [ ] `AI-GROUNDED.video.mp4`
- [ ] `AI-GROUNDED.audio.m4a`
- [ ] `AI-GROUNDED.poster.webp`
- [ ] `AI-GROUNDED.captions.vtt`

## Access administration

- [ ] `ADM-ACCESS.video.mp4`
- [ ] `ADM-ACCESS.audio.m4a`
- [ ] `ADM-ACCESS.poster.webp`
- [ ] `ADM-ACCESS.captions.vtt`

## Delivery requirements

- Keep videos under 60 seconds, with `H.264` video and `AAC` audio in an MP4 container.
- Use `M4A/AAC` for narration-only audio.
- Export posters as WebP at the video's display aspect ratio.
- Supply WebVTT captions and make them match the approved narration.
- Use synthetic identities, addresses, routes, packages, labels, and records.
- Do not include patient information, raw production barcodes, credentials, tenant identifiers, or real delivery addresses.
- Video remains optional enhancement: the transcript and interface must carry the full instruction without it.

The approved shot lists and voiceovers are in `docs/coachmark-media-script.md` in the Courier source repository.
