FROM node:latest

# Define labels for giving more information about this image
LABEL description="test xample with docker"
LABEL maintainers="koffiedy@gmail.com"
LABEL name="ms_depot"
LABEL vendor="CIQL Microservices"
LABEL version="1.0.0"

# Set ENV variables
ENV DATABASE_URL=

# Copy file
ADD build /App
WORKDIR /App

    # install latest version of yarn and 
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash \
    # install all nodejs package
    && yarn install \ 
    # install pm2 for running app in production mode
    && yarn global add pm2

# Generate prisma-client
RUN npx prisma generate

# Expose port for communication
EXPOSE 8888

    # update database url info
CMD echo ${DATABASE_URL} > .env \
    # Update Database schema
    && npx prisma migrate deploy \
    # Run application in production mode
    && NODE_ENV=production pm2-runtime index.js --name ms_depot