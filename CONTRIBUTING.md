Thanks for showing interest to contribute to <strong>chakra-ui-steps</strong>! Before you start, please read the following guidelines.

## Setup the Project

The following steps will get you up and running to contribute to Chakra UI:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/jeanverster/chakra-ui-steps))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/chakra-ui-steps.git
cd chakra-ui-steps
```

3. Setup all the dependencies and packages by running `yarn`.

## Development

You'll notice that the project has been configured using yarn workspaces. Essentially this means that you can run `yarn` from the root of the project and it will install all the dependencies for all the packages. You can also run `yarn` from within a package and it will only install the dependencies for that package.

### Running Storybook

To run storybook, first run `cd chakra-ui-steps` to navigate to the correct directory. Then run `yarn storybook`. This will start the storybook server and open the browser to the storybook page.

### Tooling

- [Yarn](https://yarnpkg.com/en/) - Package manager
- [Vite](https://vitejs.dev/) - Build tool
- [Storybook](https://storybook.js.org/) for rapid UI component development and
  testing

### Commands

<strong>chakra-ui-steps</strong>

- `yarn` - Install all dependencies
- `yarn dev` - Run the development server
- `yarn build` - Build the package
- `yarn storybook` - Run storybook
- `yarn test` - Run tests

<strong>website</strong>

- `yarn` - Install all dependencies
- `yarn dev` - Run the website in development mode
- `yarn build` - Build the website (make sure to run `yarn build` in the `chakra-ui-steps`
  directory first)
- `yarn start` - Serve the website
- `yarn lint` - Lint the website

### Commit Convention

NB! Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the chakra-ui-steps repository and clone your fork
2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. `type`
   can be either `fix`, `feat`, `chore`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.
3. Make and commit your changes following the commit convention described above.
   As you develop, it is recommended to have storybook running so you can ensure all your changes are working as expected.
4. Push your changes to your fork and create a pull request to the `develop` branch of the chakra-ui-steps repository. The reason we're using `develop` as the base branch is so we can automatically version the project using [semantic-release](https://github.com/semantic-release/semantic-release).

## License

By contributing your code to the chakra-ui-steps GitHub repository, you agree to
license your contribution under the MIT license.
