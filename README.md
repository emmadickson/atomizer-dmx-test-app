### Installation and Setup

1. **Open Terminal**:
    - Open the Terminal application

2. **Navigate to the Project Directory**:
    - Change directory to your project folder:
      ```bash
      cd path/to/dmx
      ```

3. **Start the Application**:
    - Run the application by typing the following command and pressing Enter:
      ```bash
      node main.js
      ```

4. **Access the Web Interface**:
    - The browser should automatically open the web interface at `http://localhost:3000`. If it doesn't open automatically, manually type the URL into your browser's address bar.

5. **Using the Web Interface**:
    - You will see a web page with buttons and sliders.
    - To save the settings for the next time, click the **"Save"** button.

### Configuring for Art-Net

If you are using Art-Net instead of a USB Enttec:

- Modify `line 21` in `main.js` to use the appropriate IP address for your Art-Net device:
  ```javascript
  const universe = dmx.addUniverse('demo', 'artnet', '192.168.1.100', { universe: 0 });

- Replace 192.168.1.100 with the IP address of your Art-Net device.
