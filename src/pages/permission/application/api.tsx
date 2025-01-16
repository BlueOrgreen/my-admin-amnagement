import { mock } from '@/utils/utils'


// 获取制备手册详情
export function getProductBrochureDetail(data = {}) {
    return mock({
      recipeManufactureProcessList: [
        {
          containerName: '水果刀版',
          containerNo: '水果刀002',
          contentList: [
            {
                processName: '水果刀版一',
              processContent: [
                {
                  detail: '将原料切成大小均匀的块状，便于后续加工。',
                  stepName: '第1步',
                  imgUrlList: [
                    //   {
                    //     uid: '1',
                    //     status: 'done',
                    //     url: 'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    //   },
                    //   {
                    //     uid: '2',
                    //     status: 'done',
                    //     url: 'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    //   },
                    //   {
                    //     uid: '3',
                    //     status: 'done',
                    //     url: 'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    //   },
                  ],
                },
                {
                  detail: '清洗原料并切割成0.5cm大小的小块，以确保加工效果。',
                  stepName: '第2步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
              ],
            },
            {
              processName: '水果刀版2',
              processContent: [
                {
                  detail: '将切割后的原料放入混合容器中准备混合。',
                  stepName: '第1步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
                {
                  detail: '根据比例加入其他材料，并确保混合均匀。',
                  stepName: '第2步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
                {
                  detail: '持续搅拌10分钟以确保充分混合。',
                  stepName: '第3步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
              ],
            },
            {
              processName: '存储',
              processContent: [
                {
                  detail: '将混合物装入专用容器中，准备存储。',
                  stepName: '第1步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
                {
                  detail: '检查容器密封性并贴上标签标识。',
                  stepName: '第2步',
                  imgUrlList: [
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                    'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
                  ],
                },
              ],
             
            },
          ],
        },
        // {
        //   containerName: '切割机版',
        //   containerNo: '切割001',
        //   contentList: [
        //     {
        //       processContent: [
        //         {
        //           detail: '将原料切成大小均匀的块状，便于后续加工。',
        //           stepName: '第1步',
        //           // imgUrlList: [],
        //         },
        //         // {
        //         //   detail: '清洗原料并切割成0.5cm大小的小块，以确保加工效果。',
        //         //   stepName: '切丁机版-切割-第2步',
        //         //   // imgUrlList: [],
        //         // },
        //       ],
        //       stepName: '切割2',
        //     },
        //     {
        //       processContent: [
        //         {
        //           detail: '将切割后的原料放入混合容器中准备混合。',
        //           stepName: '第1步',
        //           imgUrlList: [],
        //         },
        //         {
        //           detail: '根据比例加入其他材料，并确保混合均匀。',
        //           stepName: '第2步',
        //           // imgUrlList: [],
        //         },
        //         {
        //           detail: '持续搅拌10分钟以确保充分混合。',
        //           stepName: '第3步',
        //           // imgUrlList: [],
        //         },
        //       ],
        //       stepName: '混合2',
        //     },
        //     {
        //       processContent: [
        //         {
        //           detail: '将混合物装入专用容器中，准备存储。',
        //           stepName: '切丁机版-存储-第1步第1步',
        //           imgUrlList: [
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //           ],
        //         },
        //         {
        //           detail: '检查容器密封性并贴上标签标识。',
        //           stepName: '切丁机版-存储-第1步第2步',
        //           imgUrlList: [
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //             'https://cdn.test.heytea.com/storage/upms/2025/01/03/1e1076c9fc034310b36a6f1e86b64d4f.png',
        //           ],
        //         },
        //       ],
        //       stepName: '存储',
        //     },
        //   ],
        // },
      ],
      refCode: 'REC123456',
      versionType: 'single',
    })
    // return request(
    //   {
    //     url: '/api/service-semi-sop-admin/semi/recipe-manufacture/detail',
    //     method: 'GET',
    //     params: data,
    //     baseURL,
    //   },
    //   {
    //     success: false,
    //     error: false,
    //   },
    // )
}

// 器具集合
export function getContainers() {
  return mock([
    {
      containerName: '切割机版',
      containerNo: '切割001',
    },
    {
      containerName: '水果刀版',
      containerNo: '水果刀002',
    },
    {
      containerName: '器具版',
      containerNo: '器具003',
    },
    {
      containerName: '器具版-1',
      containerNo: '器具版-1',
    },
  ])
  // return request(
  //   {
  //     url: '/api/service-semi-sop-admin/semi/common/admin/container/containers',
  //     method: 'GET',
  //     baseURL,
  //   },
  //   {
  //     success: false,
  //   },
  // )
}