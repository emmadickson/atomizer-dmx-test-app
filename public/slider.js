document.addEventListener('DOMContentLoaded', () => {
    const dmxSlider = document.getElementById('dmx-plus-slider');
    const dmxSliderValue = document.getElementById('dmx-plus-slider-value');
    const onSlider = document.getElementById('on-plus-slider');
    const onSliderValue = document.getElementById('on-plus-slider-value');
    const loopSlider = document.getElementById('loop-plus-slider');
    const loopSliderValue = document.getElementById('loop-plus-slider-value');


    // Sync sliders with number inputs
    dmxSlider.addEventListener('input', () => {
        dmxSliderValue.value = dmxSlider.value;
    });
    dmxSliderValue.addEventListener('input', () => {
        dmxSlider.value = dmxSliderValue.value;
    });

    onSlider.addEventListener('input', () => {
        onSliderValue.value = onSlider.value;
    });
    onSliderValue.addEventListener('input', () => {
        onSlider.value = onSliderValue.value;
    });


    document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save');

  saveButton.addEventListener('click', function() {
    // Find all sliders including DMX, on for, and off for sliders
    const sliders = document.querySelectorAll('.slider');

    // Extract the values of all sliders
    const sliderValues = {};
    sliders.forEach(slider => {
        sliderValues[slider.id] = slider.value;
    });

    const entecInput = document.getElementById('entec')

    const entecId = entecInput.value;
    console.log("Entec ID:", entecId);

    // Convert sliderValues to a JSON string
    let content = JSON.stringify(sliderValues);
    console.log("Original content:", content);

    // Parse the JSON string back to an object
    let contentObj = JSON.parse(content);

    // Add entecId to the object
    contentObj['entecId'] = entecId;

    // Convert the object back to a JSON string
    content = JSON.stringify(contentObj);
    console.log("Sending :", content);


    fetch('/update-config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body:content
    })
    .then(response => {
        if (response.ok) {
            console.log('Configuration updated successfully.');
        } else {
            throw new Error('Failed to update configuration.');
        }
    })
    .catch(error => {
        console.error('Error updating configuration:', error);
    });
  });
  });

});
