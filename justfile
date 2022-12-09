# add node bin script path for recipes
export PATH := "./node_modules/.bin:" + env_var('PATH')

# Default: display available recipes
_help:
    @just --list

# Install node modules
install *params:
    npm install {{params}}

# Compile code to `build/`
build *params:
    node build.js {{params}}

# Compile code to `build/`, then watch and recompile on changes
build-watch *params:
    node build.js watch {{params}}

# Run code linting
lint *params:
    semistandard {{params}}
