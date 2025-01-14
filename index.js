const qrcode = require('qrcode-terminal');
const os = require('os');
const chalk = require('chalk');

function vinetQrDevPlugin(options = {}) {
	const {
		smallQR = true,
		showAllNetworks = false,
		logLevel = 'info'
	} = options;

	return {
		name: 'vinetqr-dev-plugin',
		
		/**
		 * Configures the Vite server to listen on all available network interfaces
		 * so that the QR code can be accessed from any device on the same network.
		 *
		 * @param {import('vite').UserConfig} config - The Vite configuration
		 * @param {{command: 'serve'|'build'|'preview'}} [context] - The context of the configuration
		 * @returns {import('vite').UserConfig} The modified configuration
		 */
		config(config, { command }) {
			if (command === 'serve') {
				try {
					config.server = config.server || {};
					config.server.host = config.server.host || true;
				} catch (error) {
					console.error(chalk.red('Error configuring server:', error.message));
				}
			}
		},

		/**
		 * @param {import('vite').ViteDevServer} server
		 */
		configureServer(server) {
			server.httpServer?.once('listening', () => {
				try {
					const { port } = server.config.server;
					const networkInterfaces = os.networkInterfaces();

					if (!networkInterfaces) {
						throw new Error('Unable to get network interfaces');
					}

					console.log(chalk.cyan('\n=== VineQR Dev Server Access ===\n'));

					let hasDisplayedQR = false;

					for (const interfaceName in networkInterfaces) {
						for (const net of networkInterfaces[interfaceName]) {
							if (net.family === 'IPv4' && (!net.internal || showAllNetworks)) {
								const url = `http://${net.address}:${port}`;
								
								console.log(chalk.yellow(`For development on ${interfaceName}`));
								console.log(chalk.green(`  ➜  URL: ${url}\n`));

								qrcode.generate(url, {
									small: smallQR,
									errorLevel: 'M'
								});
								hasDisplayedQR = true;
							}
						}
					}

					if (!hasDisplayedQR) {
						console.log(chalk.yellow('No suitable network interface found for QR code generation'));
					}

					console.log(chalk.cyan('===============================\n'));

				} catch (error) {
					console.error(chalk.red('Error generating QR code:', error.message));
					if (logLevel === 'debug') {
						console.error(error.stack);
					}
				}
			});

			server.httpServer?.on('error', (error) => {
				console.error(chalk.red('Server error:', error.message));
			});
		},
	};
}

module.exports = vinetQrDevPlugin;
