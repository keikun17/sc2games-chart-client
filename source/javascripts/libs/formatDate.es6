export default (date) => {
  var year    = date.getFullYear()
  var month   = '' + (date.getMonth()+1)
  if (month.length < 2) month = '0' + month;
  var day     = date.getDate()
  var date = [year, month, day].join('-')

  return date

}
