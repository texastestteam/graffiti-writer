# 🎨 Digital Graffiti Writer 🖌️

**Digital Graffiti Writer** is an interactive web-based app that simulates graffiti writing with customizable marker colors, dynamic drip effects, and the ability to save your artwork as a PNG with a transparent background.

## Features 🚀

- 🖌️ **Graffiti Marker Simulation**: Draw with a marker that adjusts its stroke size based on the speed of your mouse.
- 🎨 **Color Picker**: Change your marker color using the color picker.
- 💧 **Drip Effect**: Add realistic drip effects to your drawings with adjustable frequency, length, and speed.
- 💾 **Save as PNG**: Save your artwork with a transparent background based on the current window size.
- 🔄 **Erase Button**: Clear the canvas while maintaining transparency.

## Iterations

Version 1

    Initial Setup: Created a basic p5.js setup that simulates a graffiti marker with a black outline. Added an “Erase” button to clear the canvas.

Version 2

    Stroke Size Slider: Added a slider to control the size of the marker’s stroke for more customization.

Version 3

    Non-Interactive UI Elements: Fixed a bug where interacting with the slider or erase button triggered drawing. Ensured no strokes were added when using the UI.

Version 4

    Drip Effect System: Introduced a system to create random vertical drips for a realistic graffiti effect. Added a slider to control the drip frequency.

Version 5

    Adjustable Drip Length: Enhanced the drip system by adding randomness to the drip length, controlled by a new slider for vertical drip length.

Version 6

    UI Label Placement: Improved the UI by moving slider labels to the right side for better visibility.

Version 7

    Slower Drip Speed: Made the drip system slower, allowing drips to occur in real-time. Added a new slider to control the speed of the drips.

Version 8

    Natural Drip Sizes: Adjusted the drip stroke size to be more random but always smaller than the initial stroke size, for a more natural look.

Version 9

    Velocity-Based Stroke Size: Added a feature where stroke size adjusts based on mouse velocity. Faster movements result in thinner strokes for a natural graffiti effect.

Version 10

    Smooth Stroke Size Transition: Enhanced the velocity-based stroke size feature by adding a gradual transition, making the size change smoother instead of immediately jumping from thick to thin.

Version 11

    Color Picker & Save as PNG: Added a color picker button to change marker color, with a color preview always visible. Introduced a “Save as PNG” button to capture drawings with a transparent background, sized to the current window.
