FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /www
COPY dist/static /www
EXPOSE 80