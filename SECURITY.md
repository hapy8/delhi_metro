# Security Policy

## Supported Versions

Currently, only the latest version on the `main` branch is supported with security updates.

## Reporting a Vulnerability

Security is a top priority for us. If you discover a security vulnerability within the Delhi Metro PWA or its deployment scripts, please do not disclose it publicly until we've had a chance to review and address it.

**To report a vulnerability:**
Please open an issue describing the vulnerability if it does not contain sensitive exploit details, or contact the repository maintainers directly if a private channel is available. 

We will strive to respond to all reports within 48 hours and work with you to understand the issue and provide a fix.

## Deployment Security

The provided `install.sh` script is designed to deploy the application securely by default. It includes:
- Nginx configuration with restrictive security headers (CSP, X-Frame-Options, etc.).
- Automated HTTPS provisioning via Let's Encrypt.
- Proper file permission settings for web server directories.

However, server security is a shared responsibility. Ensure that the host server itself is kept up-to-date with security patches, and that SSH access is properly secured.
