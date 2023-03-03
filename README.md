![](https://github.com/PainOchoco/Orbital/actions/workflows/deploy.yml/badge.svg)

# 🛰️ Orbital

Tracking satellites has never been this easy.

_🚧 Project in WIP_
![Preview](https://user-images.githubusercontent.com/47084457/218479857-c67fc237-258b-4739-96bd-ba3bf6a6d936.png)

## ⚙️ How is it made ?

Data is coming from https://www.space-track.org/.

It uses the [SGP4](https://en.wikipedia.org/wiki/Simplified_perturbations_models) model to predict satellites position. Every SGP4 calculations are done on a second CPU via [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) thread to avoid lag on the main rendering thread.
It also uses instanced mesh for the 3D object, which helps avoid a ton of GPU draw calls

⚠️ The app runs pretty smoothly on any device but does a lot of calculations in the background which are power-hungry and might drain batteries quickly on mobile devices.

## 📋 To Do List

-   [ ] Settings menu
    -   [x] Switch between color and image background
    -   [x] Show atmosphere
    -   [ ] Time multiplier
-   [ ] Ability to focus satellite and follow it
-   [ ] Automatic SpaceTrack data fetching
