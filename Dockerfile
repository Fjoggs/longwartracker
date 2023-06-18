FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Bundle app source
COPY . ./

# Build NextJs bundle
RUN yarn build

# Expose port 3000
EXPOSE 3000

#Set node_env to production
ENV NODE_ENV=production

# defined in package.json
CMD [ "yarn", "start" ]