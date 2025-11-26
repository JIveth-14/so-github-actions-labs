FROM node:20-alpine
WORKDIR /app
COPY container-script.sh /app/container-script.sh
RUN  chmod +x /app/container-script.sh
CMD ["/app/container-script.sh"]                 