export interface ResponseApiData {
  data: Array<unknown>
  current_page: number,
  per_page: number,
  total: number,
  last_page: number,
  from: number,
}
