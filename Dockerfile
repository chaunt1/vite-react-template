FROM hub.abs.vn/abs2022/frontend/ui-web:cache as build-stage

WORKDIR /app

COPY package*.json /app/

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
