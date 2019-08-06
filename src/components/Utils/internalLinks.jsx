/**
 * Transforms @tb.id or @tb.id[label] parts to active links to records
 * @param  {String} text Text to parse
 * @return {String}      Replaces text
 */
export default function internalLinks(text : String) {
  return text.replace(
    /@([a-z]+)\.([a-z0-9/]+)(\[([^\]]+)\])?/gi,
    function(match, p1, p2, p3, p4, offset, string){
      return `<a href="/${p1}/${p2}">
        ${ p3 && p4 ? p4 : `paths.${p1}.${p2}` }
      </a>`;
    });
};
