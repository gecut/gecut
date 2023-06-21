FROM nginx:alpine

WORKDIR /

ARG PACKAGE_SOURCE

RUN set -ex;\
    if [ -z "${PACKAGE_SOURCE}" ]; then\
      echo 'PACKAGE_SOURCE not defined'>&2;\
      exit 1;\
    fi;

COPY $PACKAGE_SOURCE /var/www/
COPY cloud/pwa/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
