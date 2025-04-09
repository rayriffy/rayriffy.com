import { getAllMergedBlogs } from '$modules/blog/functions/getBlogs'
import type { Blog } from '$modules/blog/models/Blog'

export const getAllBlogs = async (): Promise<Blog[]> => {
  return getAllMergedBlogs()
}
