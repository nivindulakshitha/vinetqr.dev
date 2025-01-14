const qrcode = require('qrcode-terminal');
const os = require('os');

function vinetQrPlugin() {
	return {
		name: 'vite-qrcode-plugin',
		configureServer(server) {
			server.httpServer?.once('listening', () => {
				const { port } = server.config.server;
				const networkInterfaces = os.networkInterfaces();

				console.log('\nAvailable network URLs with QR codes:\n');

				for (const interfaceName in networkInterfaces) {
					for (const net of networkInterfaces[interfaceName]) {
						if (net.family === 'IPv4' && !net.internal) {
							const url = `http://${net.address}:${port}`;
							console.log(`Network URL: ${url}`);
							qrcode.generate(url, { small: true });
						}
					}
				}
			});
		},
	};
}

module.exports = vinetQrPlugin;