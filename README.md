# unsplash clone project just for education

this project made for Reactjs + Redux tutorial that recorded for [Faranesh.com](https://faranesh.com/web/16454-clone-unsplashcom-with-reactjs--redux)

## pre requirements

1. [create new application on unsplash.com](https://unsplash.com/oauth/applications/new)


NOTE: the `Redirect URI` is `http://localhost:3030/auth/callback` in development mode
NOTE: our application should have these permission

```
public
read_photos
write_likes
read_collections
write_collections
```

2. create `.env_development` or `.env_production` file to set environment variable like `.env_sample`

```
NODE_ENV=development
ROOT_URL=https://unsplash.com
API_ROOT=https://api.unsplash.com/
CLIENT_ID=XXXXXXXXXXXXX
CLIENT_SECRET=XXXXXXXXXXXXX
OAUTH_PATH=https://unsplash.com/oauth/authorize?client_id=XXXXXXXXXXXXX&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth%2Fcallback&response_type=code&scope=public+read_photos+write_likes+read_collections+write_collections
REDIRECT_URI=http://localhost:3030/auth/callback
```

## start app in development mode
```
yarn run start
```

## test app 

```
yarn run test
```

## run test in watch mode

```
yarn run test-w
```

## build project in production mode

```
yarn run build
```

## build and run server

```
yarn run build-and-run-server
```

## run server only

```
yarn run run-server
```