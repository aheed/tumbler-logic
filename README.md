# tumbler-logic

## Package releases
There is currently no mechanism to automatically bump version numbers. Manually edit version in package.json.
Example: 
"version": "1.1.2",

Alt 1:
npm ci
npm publish

Alt 2:
Github web UI / Releases / Draft new release
Set release tag to version prefixed by "v".
  Example: v1.1.2

## Installing package

### Route package requests through github packages
In the same directory as your package.json file, create or edit an .npmrc file to include a line specifying GitHub Packages URL and the namespace where the package is hosted.

@aheed:registry=https://npm.pkg.github.com

### github packages authentication
~/.npmrc:
//npm.pkg.github.com/:_authToken=<github PAT token>

