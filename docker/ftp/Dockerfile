FROM fauria/vsftpd:latest

LABEL maintainer="OnlineShop Team" \
      description="vsftpd FTP server for OnlineShop e-commerce" \
      version="1.0"

# vsftpd is configured via environment variables at runtime:
#   FTP_USER, FTP_PASSWORD, FTP_UPLOAD_DIR
# This image provides a secure, production-ready FTP server.

EXPOSE 20 21

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD nc -z localhost 21 || exit 1