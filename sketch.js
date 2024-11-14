let eraseButton, colorButton, colorPicker, saveButton;
let sizeSlider, dripSlider, dripLengthSlider, dripSpeedSlider;
let sizeLabel, dripLabel, dripLengthLabel, dripSpeedLabel;
let isDrawing = true;
let drips = [];
let lastMouseX = 0, lastMouseY = 0;
let maxSpeed = 20; // Maximum speed threshold
let currentStrokeSize;
let markerColor = '#000000'; // Default marker color

function setup() {
  createCanvas(windowWidth, windowHeight);
  clearCanvas(); // Set up the transparent background

  // Create the Erase button
  eraseButton = createButton('Erase');
  eraseButton.position(20, 20);
  eraseButton.mousePressed(eraseCanvas);

  // Create the color button
  colorButton = createButton('Change Color');
  colorButton.position(20, 60);
  colorButton.mousePressed(showColorPicker);

  // Create the color picker (visible to show current color)
  colorPicker = createColorPicker(markerColor);
  colorPicker.position(120, 60); // Position next to the "Change Color" button
  colorPicker.input(() => {
    markerColor = colorPicker.value(); // Update marker color
  });
  
  colorPicker.mouseOver(() => isDrawing = false); // Stop drawing when hovering over the color picker
  colorPicker.mouseOut(() => isDrawing = true); // Re-enable drawing after leaving the color picker

  // Create the save button
  saveButton = createButton('Save as PNG');
  saveButton.position(windowWidth - 150, 20); // Position top-right
  saveButton.mousePressed(saveDrawing);

  // Create the size slider
  sizeSlider = createSlider(1, 50, 10); // Min size: 1, Max size: 50, Initial: 10
  sizeSlider.position(220, 20); // Move over to avoid overlap
  sizeLabel = createP('Marker Size:').position(sizeSlider.x + sizeSlider.width + 10, 5); // Label on the right

  // Set the initial stroke size after the sizeSlider is created
  currentStrokeSize = sizeSlider.value();

  // Create the drip slider
  dripSlider = createSlider(0, 100, 50); // Min drip: 0, Max drip: 100, Initial: 50
  dripSlider.position(220, 60); // Move over to avoid overlap
  dripLabel = createP('Drip Frequency:').position(dripSlider.x + dripSlider.width + 10, 45); // Label on the right

  // Create the drip length slider
  dripLengthSlider = createSlider(10, 200, 50); // Min length: 10, Max length: 200, Initial: 50
  dripLengthSlider.position(220, 100); // Move over to avoid overlap
  dripLengthLabel = createP('Drip Length:').position(dripLengthSlider.x + dripLengthSlider.width + 10, 85); // Label on the right

  // Create the drip speed slider
  dripSpeedSlider = createSlider(1, 10, 5); // Min speed: 1 (slow), Max speed: 10 (fast), Initial: 5
  dripSpeedSlider.position(220, 140); // Move over to avoid overlap
  dripSpeedLabel = createP('Drip Speed:').position(dripSpeedSlider.x + dripSpeedSlider.width + 10, 125); // Label on the right

  // Prevent drawing when interacting with sliders or button
  eraseButton.mouseOver(() => isDrawing = false);
  eraseButton.mouseOut(() => isDrawing = true);
  colorButton.mouseOver(() => isDrawing = false);
  colorButton.mouseOut(() => isDrawing = true);
  sizeSlider.mouseOver(() => isDrawing = false);
  sizeSlider.mouseOut(() => isDrawing = true);
  dripSlider.mouseOver(() => isDrawing = false);
  dripSlider.mouseOut(() => isDrawing = true);
  dripLengthSlider.mouseOver(() => isDrawing = false);
  dripLengthSlider.mouseOut(() => isDrawing = true);
  dripSpeedSlider.mouseOver(() => isDrawing = false);
  dripSpeedSlider.mouseOut(() => isDrawing = true);
}

function draw() {
  // Calculate mouse speed based on distance moved
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  let mouseSpeed = dist(0, 0, dx, dy);

  // Map the mouse speed to a target stroke size (faster movement, smaller stroke)
  let targetStrokeSize = map(mouseSpeed, 0, maxSpeed, sizeSlider.value(), sizeSlider.value() / 8); // Make the minimum size smaller
  targetStrokeSize = constrain(targetStrokeSize, sizeSlider.value() / 8, sizeSlider.value());

  // Gradually transition the current stroke size to the target stroke size faster
  currentStrokeSize = lerp(currentStrokeSize, targetStrokeSize, 0.3); // Faster transition with 0.3

  // Draw black outlines where the mouse is clicked and dragged, unless interacting with UI
  if (mouseIsPressed && isDrawing) {
    stroke(markerColor); // Use the selected marker color
    strokeWeight(currentStrokeSize); // Adjust stroke size with smooth transition
    noFill(); // No fill, just outline
    line(mouseX, mouseY, pmouseX, pmouseY); // Draw the line as you move the mouse

    // Randomly create drips based on the drip slider value
    let dripChance = dripSlider.value(); // Control how often drips appear
    if (random(100) < dripChance) {
      let dripLength = random(currentStrokeSize / 2, dripLengthSlider.value()); // Random length controlled by slider
      let dripX = mouseX + random(-currentStrokeSize / 2, currentStrokeSize / 2); // Random horizontal offset for the drip
      let dripSpeed = dripSpeedSlider.value(); // Get the drip speed from the slider
      let dripStrokeWeight = random(currentStrokeSize / 4, currentStrokeSize / 2); // Randomize the drip stroke size but keep it smaller than the marker stroke
      drips.push({ x: dripX, y: mouseY, length: dripLength, progress: 0, speed: dripSpeed, weight: dripStrokeWeight });
    }
  }

  // Update and draw the drips over time
  for (let i = drips.length - 1; i >= 0; i--) {
    let drip = drips[i];
    stroke(markerColor);
    strokeWeight(drip.weight); // Use the random drip stroke weight
    line(drip.x, drip.y, drip.x, drip.y + (drip.length * drip.progress)); // Draw the drip downwards
    drip.progress += 0.01 * drip.speed; // Slow down the drip progress based on the speed slider

    // Remove the drip once it completes
    if (drip.progress >= 1) {
      drips.splice(i, 1);
    }
  }

  // Store the current mouse position for the next frame
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// Show the color picker when the "Change Color" button is clicked
function showColorPicker() {
  colorPicker.show();
}

// Save the current drawing as a PNG with transparency
function saveDrawing() {
  saveCanvas('graffiti_drawing', 'png');
}

// Clear the canvas with transparency for the background
function clearCanvas() {
  clear(); // Clears canvas with transparency
}

// Function to clear the canvas
function eraseCanvas() {
  clearCanvas(); // Reset the transparent background
  drips = []; // Clear all drips
}

