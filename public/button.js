document.addEventListener('DOMContentLoaded', function() {




    // Find all buttons within the control-panel
    const buttons = document.querySelectorAll('.control-panel .control button');
    buttons.forEach(button => {
        // Adding event listener to each button
        button.addEventListener('click', function() {
            if (this.id === 'run' ) {
                // Get values from all relevant sliders
                const dmxSlider = document.getElementById('dmx-plus-slider').value;
                const onSlider = document.getElementById('on-plus-slider').value;

                // Prepare data to be sent
                const dataToSend = {
                    buttonLabel: 'run',
                    dmxValue: dmxSlider,
                    onValue: onSlider,
                };

                // Sending data to backend
                fetch('http://localhost:3000/process-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            }
            else if (this.id === 'fade' ) {
                // Get values from all relevant sliders
                const dmxSlider = document.getElementById('dmx-plus-slider').value;
                const onSlider = document.getElementById('on-plus-slider').value;

                // Prepare data to be sent
                const dataToSend = {
                    buttonLabel: 'fade',
                    dmxValue: dmxSlider,
                    onValue: onSlider,
                };

                // Sending data to backend
                fetch('http://localhost:3000/process-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            }
            else {
                // Assuming each button's corresponding slider has an ID that matches a pattern
                const sliderId = this.id + '-slider';
                const slider = document.getElementById(sliderId);

                if (slider) {
                    const duration = parseInt(slider.value, 10); // Get the slider value

                    // Darken the button
                    this.style.backgroundColor = 'darkgray';

                    // After the specified duration, reset the button color
                    setTimeout(() => {
                        this.style.backgroundColor = ''; // Reset the color
                    }, duration);
                }

                const buttonLabel = this.id; // Using button ID as the label
                const sliderValue = slider ? slider.value : 'No slider found';

                // Prepare data to be sent
                const dataToSend = {
                    buttonLabel,
                    sliderValue,
                };

                // Sending data to backend
                fetch('http://localhost:3000/process-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
