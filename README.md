# bilbomd-mongodb-schema

Since we are using these Mongoose/MongoDB schema in multiple repositories I thought it would be better to put them in a separate repository so that we can keep track of the version and be assured that all BilboMD services are using the same database schema and Typescript interfaces.

## Authors

- Scott Classen sclassen at lbl dot gov

## Release

I had some great notes on how to do this... but alas.

### dev

If we are on `1.4.3-dev.13` and want to go to `1.4.4-dev.0`

```bash
npm version prerelease --preid=dev --no-git-tag-version
npm publish
git add package.json package-lock.json
git commit -m "Bump version to x.x.x-dev.x"
git push

npm show @bl1231/bilbomd-mongodb-schema@dev
npm dist-tag ls @bl1231/bilbomd-mongodb-schema 
```

otherwise any push to `main` will trigger an increment as long as the "version" in package.json is `X.X.X-dev.X`


### stable release

I think we need to manually adjust "version" in package.json to the current stable version (i.e. `X.X.X` ) before running `npm version ....`

```bash
npm version patch/minor/major
git push --follow-tags
```

## Version History

- 1.5.0 (3/35/2025)
  - Add enums for NERSC status
- 1.4.9 (1/10/2025)
  - Add `__t` Job discriminator to each job interface
- 1.4.8 (1/9/2025)
  - Allow optional `best_model` so we don't break existing DB entries
- 1.4.6 (1/8/2025)
  - Add `best_ensemble_pdb_file` to `IFeedbackData` and Job schema
- 1.4.5 (12/18/2024)
  - Remove the explicit index for MultiJob uuid
- 1.4.4 (12/18/2024)
  - Add jobCount and jobTypes to User schema and interface
- 1.4.2 (12/17/2024)
  - Add `updatedAt` to `IUser` interface
- 1.4.1
  - Bump NodeJS to v22.12.0
  - Run `npm audit fix`
  - Start documenting version history