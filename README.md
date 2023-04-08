# tumbler-logic

## Installing package

### Route package requests through github packages
In the same directory as your package.json file, create or edit an .npmrc file to include a line specifying GitHub Packages URL and the namespace where the package is hosted.

@aheed:registry=https://npm.pkg.github.com

### github packages authentication
~/.npmrc:
//npm.pkg.github.com/:_authToken=<github PAT token>

