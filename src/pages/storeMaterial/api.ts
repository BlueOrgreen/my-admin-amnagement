import request from '@/utils/request'

export const getPostList = (data: any) => {
    return request(
        {
          url: `/api/posts`,
          method: 'GET',
          params: data,
        },
        // { success: true },
      )
}

export const createPost = (data: any) => {
  return request(
      {
        url: `/api/posts`,
        method: 'POST',
        data,
      },
      { success: false },
    )
}