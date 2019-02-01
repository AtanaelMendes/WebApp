/*
export function someMutation (state) {
}
*/
// export function hasFilter(state, value) {
//   state.hasFilter = value;
// }
export function setFilterValue(state, value) {
  state.filter.value = value;
}
export function setFilterOptions(state, options) {
  state.filter.options = options;
}
