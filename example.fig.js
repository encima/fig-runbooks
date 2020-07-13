
var schema =
  [
    {
      "component": "h3",
      "children": "Fork Prod DB For Testing"
    },
    {
      "type": "select",
      "name": "uri",
      "label": "DB URI",
      "placeholder": "postgres://user:pass@domain.com:port/db",
      "options": {
        "postgresql-amorphous-12345": "postgresql-amorphous-12345",
        "postgres://john:password12@example.com:5432/private_db": "postgres://john:password12@example.com:5432/private_db"
      },
      "help": "Can be: HEROKU_POSTGRESQL_COLOR_URL, appname::HEROKU_POSTGRESQL_COLOR_URL, or the full URL of any Heroku Postgres database.",
    },
    {
      "type": "checkbox",
      "name": "flags",
      "options": {
       "--fast" : "--fast",
       "--test" : "--test",
      },
      "help": "Will make fork much faster, but db will be up to 30 hours out of date",
    },
    {
      "type": "text",
      "label": "App Name",
      "name": "appName",
      "help": "Your Heroku App name",
    }
  ]

  

var markdown = `
### Create a fork  
\`\`\`bash
heroku addons:create heroku-postgresql:standard-{{input.flags && input.flags.includes("--fast") ? "4" : "0"}} --fork {{input.uri}}{{input.flags ? " " + input.flags.join(" ") : ""}} --app {{input.appName}}
\`\`\`


### Output Provisioning Status of New DBs
\`\`\`bash
heroku pg:wait --app {{input.appName}}
\`\`\`


### Deprovision a Fork
\`\`\`bash
heroku addons:destroy {{input.uri}} --app {{input.appName}}
\`\`\`


### Resources
[Heroku Postgres Fork](https://devcenter.heroku.com/articles/heroku-postgres-fork)
`

