const chalk = require('chalk')
const toolbox = require('gluegun/toolbox')

const step = (spinner, subject, text) => {
  if (text) {
    spinner.stopAndPersist({
      text: toolbox.print.colors.muted(`${subject} ${text}`),
    })
  } else {
    spinner.stopAndPersist({ text: subject })
  }
  spinner.start()
  return spinner
}

const withSpinner = async (text, errorText, f) => {
  let spinner = toolbox.print.spin(text)
  try {
    let result = await f(spinner)
    spinner.succeed(text)
    return result
  } catch (e) {
    spinner.fail(`${errorText}: ${e}`)
    throw e
  }
}

module.exports = {
  step,
  withSpinner,
}
