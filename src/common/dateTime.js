export function formatLocalDateTime(localDateTimeString) {
   const dateTimeString = localDateTimeString.split('.')[0].replace("T"," ");

   return dateTimeString
}