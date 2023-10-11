# xSafe User Interface

![Static Badge](https://img.shields.io/badge/license-MIT-yellow)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/chainrule-labs/xsafe-ui/ci.yml?label=tests)

An open source user interface for the cross-chain contract aggregation tool, xSafe.

This interface allows users to **securely**:

-   Deploy smart contracts to different chains with the same address and configuration.

## Getting Started with Development

The following are instructions to get a copy of the project running locally on your machine for developement and testing purposes.

### Prerequisites

The preferred package manager of the Chain Rule team is [npm](https://docs.npmjs.com/), so this README only references npm, but pmpm or yarn may be used alternatively.

Ensure that npm is installed globally on your machine.

### Installing and Running

Install dependencies for the project:

```
npm install
```

To launch the dev version of the app locally:

```
npm run dev
```

### Building

To get a complete bundle use:

```
npm run build
```

## Contributing

-   On a new branch, open a PR for a particular set of changes.
-   Name the PR according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   All commits must be related to the PR name and commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   To make the enforcement of these guidelines easier, husky, commitlint, commitizen, and GitHub Actions have been configured for this project.
-   All PRs must be squashed and merged to keep a clean history on the main branch.

**When commiting to GitHub, instead of using `git commit`, run the folowing command and follow the instrucitons.**

```sh
npm run commit
```

## License

This project is released under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
