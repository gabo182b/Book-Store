export interface Book {
  _id: string,
  title: string,
  author: string,
  publishedYear: number
}
export interface BookDetailsInterface {
  _id: string
  title: string,
  author: string,
  publishedYear: number | null
  createdAt: number | null
}

export interface BookDetailsProps {
  params : {
    bookId: string
}
}
export interface BookDetailsToEdit {
  title: string,
  author: string,
  publishedYear: number | null
}
