const hello = (turtleName) => {
  console.log('hello ' + turtleName);
}

const goodbye = (turtleName) => {
  console.info('good bye ' + turtleName);
}

module.exports = {
  hello,
  goodbye
}
