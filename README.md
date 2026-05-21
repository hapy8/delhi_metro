# Delhi Metro PWA Navigator


The **Delhi Metro PWA Navigator** is a fast, offline-capable Progressive Web Application designed to help commuters find the most efficient routes across the Delhi Metro network.

## Features

- **Offline Support**: Once loaded, the app works entirely offline, ensuring you can find your way even underground where internet connectivity is poor.
- **Smart Routing**: Calculate the fastest route or the route with the fewest interchanges based on your preference.
- **Installable**: Can be installed directly to your mobile device's home screen as a standalone app without needing an app store.
- **Interactive UI**: Search with auto-complete dropdowns, view route statistics (time, interchanges), and see visual representations of your journey.
- **Up-to-Date Network**: Includes all 10 DMRC lines (Red, Yellow, Blue, Green, Violet, Orange, Pink, Magenta, Grey).

## Prerequisites for Deployment

To deploy this application to a production environment, you will need:
- A Linux server (Ubuntu/Debian recommended) with root access (`sudo`).
- A registered domain name pointed to your server's IP address.

## Production Installation

This repository includes a robust installation script that automates the deployment process, including setting up an Nginx reverse proxy and securing the site with HTTPS via Let's Encrypt.

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url> /opt/delhi_metro
   cd /opt/delhi_metro
   ```

2. **Run the installation script**:
   ```bash
   sudo ./install.sh
   ```

3. **Follow the interactive prompts**:
   - Provide your target domain name (e.g., `metro.yourdomain.com`).
   - Provide an email address for Let's Encrypt certificate recovery.

The script will handle the rest, and your secure, production-ready PWA will be available at your provided domain.

## Project Structure

- `index.html`: The core application UI, styling, and JavaScript logic.
- `manifest.json`: Web App Manifest defining the PWA's appearance on mobile devices.
- `sw.js`: The Service Worker handling caching for offline capabilities.
- `icons/`: Directory containing app icons for various device sizes.
- `install.sh`: Automated production deployment script.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit issues and pull requests.

## Security

Please refer to our [SECURITY.md](SECURITY.md) for information on reporting security vulnerabilities.

## License

This project is licensed under the [MIT License](LICENSE).
