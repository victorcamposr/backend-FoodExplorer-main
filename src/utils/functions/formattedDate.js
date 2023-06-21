function formatDate() {
   let date = new Date();
   let formattedDate = (`${(date.getDate())}/${((date.getMonth() + 1))}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`);

   return formattedDate;
}

module.exports = formatDate;