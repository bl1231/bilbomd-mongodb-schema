# bilbomd-mongodb-schema

Since we are using these Mongoose/MongoDB schema in multiple repositories I thought it would be better to put them in a separate repository so that we can keep track of the version and be assured that all BilboMD services are using the same database schema and Typescript interfaces.

## Authors

- Scott Classen sclassen at lbl dot gov

## Release

I had some great notes on how to do this... but alas.

### dev

```bash
npm version prerelease --preid=dev --no-git-tag-version
npm publish --tag dev
npm show @bl1231/bilbomd-mongodb-schema@dev
``` 

### stable release

```bash
npm version patch
npm publish
git push --follow-tags
```

## Version History

- 1.4.2 (12/17/2024)
  - Add `updatedAt` to `IUser` interface
- 1.4.1
  - Bump NodeJS to v22.12.0
  - Run `npm audit fix`
  - Start documenting version history