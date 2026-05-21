# Contributing to Delhi Metro PWA

Thank you for considering contributing to the Delhi Metro PWA project! We welcome contributions of all kinds: bug fixes, new features, documentation improvements, and more.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally.
   ```bash
   git clone https://github.com/your-username/delhi-metro-pwa.git
   ```
3. **Create a new branch** for your feature or bug fix.
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

## Development Workflow

This is a simple static PWA. There are no complex build steps required for local development.

1. You can serve the application locally using any basic HTTP server. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
2. Open your browser and navigate to `http://localhost:8000`.

### Important Notes

- **Service Workers**: When making changes to the offline caching behavior, ensure you update the cache version in `sw.js` so clients receive the updated files.
- **Vanilla JavaScript**: This project currently uses vanilla HTML/CSS/JS to remain lightweight. Please refrain from introducing heavy frameworks or external dependencies unless discussed and approved in an issue first.

## Submitting a Pull Request

1. **Commit your changes** with clear and descriptive commit messages.
2. **Push your branch** to your fork.
   ```bash
   git push origin feature/my-awesome-feature
   ```
3. **Open a Pull Request** against the `main` branch of the upstream repository.
4. Describe your changes in detail in the PR description.

## Reporting Issues

If you find a bug or have a feature request, please use the issue tracker. Provide as much detail as possible, including steps to reproduce bugs.
