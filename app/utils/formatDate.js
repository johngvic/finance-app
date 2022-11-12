module.exports.formatDate = (date) => {
  const firstSplit = date.split('T')[0];
  const secondSplit = firstSplit.split('-');

  return `${secondSplit[2]}/${secondSplit[1]}/${secondSplit[0]}`;
}
