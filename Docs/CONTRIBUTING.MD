# Contributing guide

I'm excited to have you helping out. Thank you so much for your time 😄

### Contributing

#### Understanding the codebase
`react-imgpro` uses [Jimp](https://github.com/oliver-moran/jimp) for processing the images but will later extends it support for third party OpenGL libs. So before you start working on a PR, take a look at Jimp docs and it's features.

> [This](https://github.com/nitin42/react-imgpro/tree/with-comments) branch includes comments for every function and module. This may help you in understanding the codebase more easily.

#### Setting up the environment

Considering you've forked and cloned the repo on your system, switch to the directory and install the dependencies.

```
cd react-imgpro
npm install
```

#### Submitting pull requests

* Create a new branch for the new feature: git checkout -b new-feature
* Make your changes.
* Test everything with `npm run test`.
* Run `npm run lint` to check the syntax errors.
* Commit your changes: git commit -m 'Added some new feature'
* Push to the branch: git push origin new-feature
* Submit a pull request with full remarks documenting your changes.


That's it! I am excited to see your pull request.
