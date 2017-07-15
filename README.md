## Add env-cmd to set unsplash client information

1.create [https://unsplash.com/oauth/applications/new](new application)

NOTE: check these permissions
```
public
read_photos
write_likes
read_collections
write_collections
```

NOTE: in development mode the Redirect URL is http://localhost:3030/auth/callback

### [https://unsplash.com/documentation](API Documentation)

2.add `env-cmd` to set environment variables via file

```
yarn add env-cmd --dev
```

3.put client information in `.env` file like `.env_sample`

NOTE: don't commit `.env` file

```
```