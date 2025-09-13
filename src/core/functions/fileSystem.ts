import { defineCacheInstance } from '@rayriffy/filesystem'

export const {
  write: writeFileSystem,
  read: readFileSystem,
  remove: removeFileSystem,
} = defineCacheInstance()
