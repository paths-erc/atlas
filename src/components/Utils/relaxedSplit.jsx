/**
 * Returns an array of two elements of the input string
 * @param  {String} str         The original string
 * @param  {Int} offset         The offet to cut at
 * @param  {String} [until='.'] The charactet to cut at
 * @return {Array}             Array of two elements containing the splitted string
 */

export default function relaxedSplit (str : String, offset : Number, until = '.') {

  // String is empty or shorter than offset.
  if (!str || str.length <= offset){
    return [str, false];
  }
  // str1 is cut at offset.
  const str1 = str.substr(0, offset);

  // If last char is until, return str1.
  if (str1.substr(str1.length - 1) === until){
    return [str1, false];
  }

  // first part is original string truncated at until
  const start = str1 + '' + str.replace(str1, '').split(until)[0];
  // second part is original string - ( first part + unitil )
  const cont = str.replace(start + '' + until, '');

  // return (start + until) and cont
  return [
    start + until,
    cont === start ? false : cont
  ];
}
