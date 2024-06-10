const DMX = require('dmx');
const express = require('express');
const path = require('path');
const { readConfig, updateConfig } = require("./save.js");
const ToneGenerator = require('tonegenerator');
const Speaker = require('speaker');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const port = 3000; // You can use any port number
app.use(express.static('public'));
readConfig();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    import('open').then(open => {
        open.default(`http://localhost:${port}`);
    });
});

const dmx = new DMX();
let universeName = '';
const universe = dmx.addUniverse(universeName, 'enttec-usb-dmx-pro', 'COM7');


const dmxValues = [ 25, 50, 75, 100, 125, 150, 175, 200, 225, 255];
let currentIndex = 0;

function playTone(frequency, duration) {
    const sampleRate = 44100; // Standard sample rate
    const numSamples = Math.floor(sampleRate * duration);
    const tone = ToneGenerator({ frequency, lengthInSecs: duration });
    const buffer = Buffer.alloc(numSamples * 2);

    for (let i = 0; i < numSamples; i++) {
        const sample = Math.max(-32768, Math.min(32767, tone[i] * 32767));
        buffer.writeInt16LE(sample, i * 2);
    }

    const speaker = new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: sampleRate
    });

    speaker.write(buffer);
    speaker.end();
}

function toggleDMX(value, duration) {
    if (value === 0) {
    } else {
    playTone(1000, 0.1); // Play 1000 Hz tone for 0.1 seconds
    }

    if (universe) {
      console.log(`send DMX value: ${value} for ${duration} seconds`);

        for (let channel = 1; channel <= 24; channel++) {

            universe.update({ [channel]: value });
        }
    }

    if (value !== 0) {
        setTimeout(() => {
            toggleDMX(0, 0); // Turn off after the specified duration
        }, duration);
    }
}

function fadeSequence(onValue) {
  console.log("fade called")

    for (let i = 0; i < dmxValues.length; i++) {
        setTimeout(() => {
            const dmxValue = dmxValues[i];
            toggleDMX(dmxValue, onValue * 1000); // Run for onValue seconds
            console.log(`In the fade sequence at index ${i}, DMX value: ${dmxValue} for ${onValue} seconds`);
        }, i * 2 * onValue * 1000); // Delay each iteration by (onValue * 2) seconds
    }
}

app.post('/process-data', (req, res) => {
    const buttonLabel = req.body.buttonLabel;
    const dmxValue = parseInt(req.body.dmxValue); // Parse the DMX value
    const onValue = parseInt(req.body.onValue); // Parse the 'on for x seconds' value
    if (buttonLabel === 'run') {
        console.log('run button pressed');
        toggleDMX(dmxValue, onValue * 1000); // Start toggling DMX signal
        res.status(200).send('DMX signals toggling started.');
    }
    else if (buttonLabel === 'fade') {
       const onValue = parseInt(req.body.onValue); // Parse the 'on for x seconds' value

       fadeSequence(onValue); // Start the fade sequence
   res.status(200).send('DMX sequence started.');
    }
    else if (buttonLabel === 'stop') {
        if (universe) {
            for (let channel = 1; channel <= 24; channel++) {
                universe.update({ [channel]: 0 });
            }
        }
        res.status(200).send('DMX signals stopped.');
    } else {
        res.status(200).send('Unknown action.');
    }
});

// GET route to fetch JSON values
app.get('/get-config', (req, res) => {
    const config = readConfig();
    if (config) {
        res.json(config);
    } else {
        res.status(500).json({ error: 'Error reading config file' });
    }
});

app.post('/update-config', (req, res) => {
    const updatedValues = req.body; // Assuming the updated values are sent as an object in the request body
    updateConfig(updatedValues); // Call the updateConfig function with the received values
    res.status(200).send('Config updated successfully.');
});
