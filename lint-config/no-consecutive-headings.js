/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["no-consecutive-headings"],
  description: "Disallow consecutive headings",
  tags: ["headings"],
  function: function noConsecutiveHeadings(params, onError) {
    const tokens = params.tokens;

    let lastTokenWasHeading = false;

    tokens.forEach((token) => {
      if (token.type === "heading_open") {
        if (lastTokenWasHeading) {
          onError({
            lineNumber: token.lineNumber,
            detail: "Consecutive headings are not allowed.",
            context: params.lines[token.lineNumber - 1],
          });
        }
        lastTokenWasHeading = true;
      } else if (token.type !== "heading_close" && token.type !== "inline" && token.type !== "text") {
        // Reset flag if any non-heading block token found
        lastTokenWasHeading = false;
      }
    });
  },
};
