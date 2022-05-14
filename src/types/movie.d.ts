export interface IMovieAPIRes {
  Search: ISearch[]
  totalResults: string
  Response: string
  Error?: boolean
}
export interface ISearch {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
