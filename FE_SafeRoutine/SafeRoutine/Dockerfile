FROM nginx:latest
# RUN rm /etc/nginx/sites-available/default
# RUN rm -rf /etc/nginx/sites-available
# COPY ./nginx.conf /etc/nginx/sites-available/
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*
COPY /dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]