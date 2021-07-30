# Contributing

The [Code of Conduct](CODE_OF_CONDUCT.md) applies to all contributions (pull requests, issues, comments, etc). Thanks!

## Workflow

1. Fork the project.
   * [GitHub documentation on fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo "Link to GitHub documentation on how to fork a repository") [Forking Projects Tutorial](https://guides.github.com/activities/forking/ "Short tutorial on how to fork a GitHub demo reporistory")

1. Clone the fork into your local repository.<br />
   `$ git clone https://github.com/YOUR-USER-NAME/PROJECT-NAME`

1. It's up to you whether you'd like to work on your **fork's main branch** or create a new **feature branch**. The latter would probably be more useful if you're submitting an idea that has more in-depth guidelines.
   * Create a separat feature branch named "*my-feature-branch-name*":<br />
   `$ git checkout -b my-feature-branch-name`
   * Stay on the main branch:<br />
   `$ git checkout main`

2. Commit your changes.<br />
   `$ git commit -am 'Add some new feature'`
   
   One idea = one commit, please. Write commit messages in the *present imperative tense*, so that they read as changes to be applied to the repository rather than a diary of changes made ("Add the widget" would be correct, vs. "Added the widget").

3.  Push to the branch.<br />
   `$ git push origin main` or `$ git push origin my-feature-branch-name`

1. [Submit a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to the main branch!

## Formatting

* Follow [this style](https://guides.github.com/features/mastering-markdown/) of Markdown. We're using asterisks instead of dashes for bulleted lists.
* If you add an idea to the list:
  * Follow the same imperative grammatical structure:<br />
    "Do a thing", instead of "A thing"
  * If your idea has more in-depth guidelines than a simple sentence, format your idea in the list as `Do a thing ([Guidelines](docs/your-idea.md))`. As shown in this example, the word "Guidelines" links to a markdown file in the `docs/` folder detailing your project idea's guidelines.

## Creating the Table Of Contents (TOC)

Feel free to use a little tool called 'doctoc' to create a table of contents:
* https://github.com/thlorenz/doctoc

If you use Visual Studio Code you can use the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) extension.

  * navigate to the place in your markdown file where you want to have your TOC created and set your cursor there
  * press **Shift + Command + P** (⇧ + ⌘ + P) to open the VSCode command prompt
  * type >**Create Table of Contents**
  * => Done: TOC is created and will be updated automatically on every file save by default

## Sources

* https://github.com/melanierichards/just-build-websites/blob/master/CONTRIBUTING.md
* https://github.com/melanierichards/just-build-websites/blob/master/CODE_OF_CONDUCT.md