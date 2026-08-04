# Architecture

The repository follows a layered monorepo model: `apps -> packages -> infrastructure`. Applications may consume shared packages; shared packages must not import application code.
