
export function paginationParser (
  data: any) {
  return {
    page: data.current_page,
    rowsPerPage: data.per_page,
    rowsNumber: data.total
  }
}
