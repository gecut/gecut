FROM docker.io/node:19-alpine

WORKDIR /app

ARG PACKAGE_SOURCE

RUN set -ex;\
    if [ -z "${PACKAGE_SOURCE}" ]; then\
      echo 'PACKAGE_SOURCE not defined'>&2;\
      exit 1;\
    fi;

COPY $PACKAGE_SOURCE /app/

CMD [ "node", "index.mjs" ]

ENV NODE_ENV production
ENV NODE_OPTIONS --enable-source-maps
ENV ALWATR_DEBUG 1
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80
