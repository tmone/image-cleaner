module.exports = {
  daemon: true,
  run: [
    // Edit this step to customize your app's launch command
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        env: { },                   // Edit this to customize environment variables (see documentation)
        message: [
          "iopaint start \
          --model=lama \
          --device=cuda \
          --port=8080 \
          --enable-remove-bg \
          --enable-interactive-seg \
          --interactive-seg-device=cuda",    // Edit with your custom commands
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/http:\/\/\\S+[0-9]{4,}/",   

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    // This step sets the local variable 'url'.
    // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
    {
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}"
      }
    },
  ]
}

