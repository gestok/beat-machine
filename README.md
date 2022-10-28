# The Beat Machine

![The Beat Machine](https://user-images.githubusercontent.com/30212452/198720939-eda6d6eb-541b-4e0d-a51f-9b356d37f45f.gif)

## Description
Beat Machine is a ReactJS app that utilizes WebAudioAPI to playback beats with multiple tracks and options. It is inspired by FreeCodeCamp's Drum Machine certificate challenge and FL Studio's main beatmaking component.

### Features
- Offers up to 8 tracks
- User can edit the BPM, Step size and overall Volume
- User can edit the labels of each track
- User can load his own sounds using base64 data strings
- A track can be muted/unmuted
- Each track has its own Panning and Volume options
- Uses Web Audio API

### May add in the future
- Save/Load beat sequence in local storage
- Export/Import beat sequence in JSON
- Reset Button to remove any active pads

### Known Issues
1. Latency/Lagging - When loaded with multiple tracks and a lot active pads, there is a noticeable latency on playback. This can be avoided by using WebAudioAPI buffers to schedule the notes but this is a thing I might work later on.
2. Mobile Performance - As of this commit, the mobile performance is just terrible.
3. Responsive - As of this commit, the app is not responsive and there is no reason to make it as long as there is issue 2.
