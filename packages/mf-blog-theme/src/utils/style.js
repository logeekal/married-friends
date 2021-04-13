/**
 * FLEX_CONFIG. -> Auto generate flex props.
 *
 * @param {string} display
 * @param {string} flexDirection
 * @param {string} alignItems
 * @param {string} justifyContent
 */
export function FLEX_CONFIG(
  display = "flex",
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "center"
) {
  return {
    display,
    flexDirection,
    alignItems,
    justifyContent,
  };
}
