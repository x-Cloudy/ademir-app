export type ImageUploadResponseData = {
  image: {
    path: string
    updated_at: string
    created_at: string
    id: number
    url: string
  }
}

export type UploadResponse = {
  files: readonly unknown[]
  xhr: XMLHttpRequest
}
