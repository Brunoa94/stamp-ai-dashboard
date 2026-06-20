FROM node:23

EXPOSE 3002

# Use latest version of npm
RUN npm install npm@latest -g

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

# copy in our source code last, as it changes the most
WORKDIR /usr

COPY . .

# Create an entrypoint script
RUN echo '#!/bin/sh\nnpm run migrate\nnpm run start' > /usr/entrypoint.sh && chmod +x /usr/entrypoint.sh

CMD ["/usr/entrypoint.sh"]