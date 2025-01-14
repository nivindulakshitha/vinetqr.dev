# VinetQr-dev-plugin ```/vaɪn ɛt kjuː ɑːr dɛv plʌɡɪn/```

A Vite plugin that helps developers easily generate QR codes for accessing their development servers on different network interfaces. It provides an automatic way to display network URLs with QR codes, making it easier to access the development server from any device on the same network.

## Features

- Automatically detects all available network interfaces on the local machine.
- Displays network URLs with QR codes for each interface.
- Supports configuration options for small or large QR codes, the ability to show all network interfaces, and logging levels.
- Seamlessly integrates with your Vite project for easy access to your development server.

## Installation

To use `vinetqr-dev-plugin`, you need to install it as a development dependency in your Vite project.

```bash
npm install --save-dev vinetqr-dev-plugin
```

Alternatively, if you're using Yarn:

```bash
yarn add --dev vinetqr-dev-plugin
```

## Setup

After installing the plugin, you need to add it to your Vite configuration file (`vite.config.js` or `vite.config.ts`).

### Example Configuration

```javascript
import { defineConfig } from 'vite';
import vinetQrDevPlugin from 'vinetqr-dev-plugin';

export default defineConfig({
  plugins: [
    vinetQrDevPlugin({
      smallQR: true, // Set to false if you want larger QR codes
      showAllNetworks: false, // Set to true if you want to show QR codes for internal network interfaces too
      logLevel: 'info', // Set log level ('info' or 'debug')
    }),
  ],
});
```

## Plugin Configuration Options

You can customize the behavior of the plugin using the following options:

| Option            | Type     | Default  | Description |
|-------------------|----------|----------|-------------|
| `smallQR`         | `boolean`| `true`   | Determines if the QR codes should be small (default) or large. |
| `showAllNetworks` | `boolean`| `false`  | When set to `true`, will display QR codes for all network interfaces, including internal ones. |
| `logLevel`        | `string` | `'info'` | Controls the logging level. Set to `'debug'` for more detailed logging output. Options: `'info'`, `'debug'`. |

### Explanation of Options:

- **`smallQR`**: If set to `true`, the QR codes will be generated in a smaller format, which is useful for terminal display. If set to `false`, the QR codes will be larger and more readable.
- **`showAllNetworks`**: By default, the plugin only shows QR codes for external network interfaces. Set this option to `true` if you want to display QR codes for internal networks as well (e.g., localhost).
- **`logLevel`**: Controls how verbose the plugin logs are. The `'debug'` level will provide more detailed logs that are useful during development, while `'info'` is more concise.

## How It Works

1. **Automatic Network Detection**: When you run your Vite development server, the plugin automatically detects all available network interfaces on your local machine.
2. **QR Code Generation**: For each available network interface (that is not internal), the plugin generates a URL pointing to your Vite development server.
3. **QR Code Display**: The plugin displays the URL as a QR code in your terminal, making it easy to scan and open the development server on any mobile device or other machines in the same network.

Each QR code is linked to the corresponding network URL, which you can scan using your phone or tablet to access your local development server.

## Usage

Once the plugin is installed and configured, it will automatically show the QR codes when you run `vite dev` or start your development server.

### Example Output:

When you start your development server with `vite`, you will see output similar to the following in your terminal:

```
VITE v6.0.7  ready in 1099 ms

Available network URLs with QR codes:

For development on en0
  ➜  URL: http://192.168.1.2:5173/
  [QR code goes here]

For development on en1
  ➜  URL: http://192.168.56.1:5173/
  [QR code goes here]
```

### Scanning QR Codes:

You can scan the generated QR codes with your mobile device's camera or any QR code scanner app. It will open the corresponding URL, giving you access to your development server from any device on the same network.

## Troubleshooting

### No QR codes displayed

If no QR codes are being displayed, it could be due to the following reasons:
- **No network interfaces detected**: Make sure that your network interfaces are properly configured and connected to a network.
- **Internal interfaces only**: By default, the plugin does not show QR codes for internal interfaces (e.g., `localhost`). Set `showAllNetworks: true` in the configuration if you want to display QR codes for internal interfaces.

### Plugin not working with Vite version

The plugin is compatible with Vite versions `2.x.x` and later. If you are experiencing issues with a specific version, ensure that your Vite setup is properly configured and up-to-date.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to the project! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request. Make sure to follow the coding style and include tests for any new functionality.
