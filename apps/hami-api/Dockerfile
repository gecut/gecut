FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system hami-api && \
          adduser --system -G hami-api hami-api

COPY dist/apps/hami-api hami-api
RUN chown -R hami-api:hami-api .

CMD [ "node", "hami-api" ]
