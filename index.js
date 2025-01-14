import qrcode from 'qrcode-terminal';
import { networkInterfaces as _networkInterfaces } from 'os';
import chalk from 'chalk';
const { red, cyan, yellow, green } = chalk;

/**
 * A Vite plugin that generates QR codes for accessing the development server
 * over the network. The QR code is displayed in the terminal when the
 * development server is started.
 *
 * @param {object} [options] - The plugin options
 * @param {boolean} [options.smallQR=true] - Set to false to use a larger QR code
 * @param {boolean} [options.showAllNetworks=false] - Set to true to show QR codes for all network interfaces, including internal ones
 * @param {string} [options.logLevel='info'] - The log level to use. Set to 'debug' to show debug-level logs
 * @returns {import('vite').Plugin} The Vite plugin
 */
function vinetQrDevPlugin(options = {}) {
	const {
		smallQR = true,
		showAllNetworks = false,
		logLevel = 'info'
	} = options;

	return {
		name: 'vinetqr-dev-plugin',

		config(config, { command }) {
			if (command === 'serve') {
				try {
					config.server = config.server || {};
					config.server.host = config.server.host || true;
				} catch (error) {
					console.error(red('Error configuring server:', error.message));
				}
			}
		},

		configureServer(server) {
			server.httpServer?.once('listening', () => {
				try {
					const { port } = server.config.server;
					const networkInterfaces = _networkInterfaces();

					if (!networkInterfaces) {
						throw new Error('Unable to get network interfaces');
					}

					console.log(cyan('\n=== VinetQR Dev Server Access ===\n'));

					let hasDisplayedQR = false;

					for (const interfaceName in networkInterfaces) {
						for (const net of networkInterfaces[interfaceName]) {
							if (net.family === 'IPv4' && (!net.internal || showAllNetworks)) {
								const url = `http://${net.address}:${port}`;

								console.log(yellow(`For development on ${interfaceName}`));
								console.log(green(`  ➜  URL: ${url}\n`));

								qrcode.generate(url, {
									small: smallQR,
									errorLevel: 'M'
								});
								hasDisplayedQR = true;
							}
						}
					}

					if (!hasDisplayedQR) {
						console.log(yellow('No suitable network interface found for QR code generation'));
					}

					console.log(cyan('===============================\n'));

				} catch (error) {
					console.error(red('Error generating QR code:', error.message));
					if (logLevel === 'debug') {
						console.error(error.stack);
					}
				}
			});

			server.httpServer?.on('error', (error) => {
				console.error(red('Server error:', error.message));
			});
		},
	};
}

export default vinetQrDevPlugin;