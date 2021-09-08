// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const url = 'http://wallpaper.apc.360.cn/index.php'

interface Data {
  id: string,
  class_id: string,
  resolution: string,
  url: string,
  url_thumb: string,
  url_mid: string,
  download_times: string,
  tag: string,
  create_time: string,
  update_time: string,
  utag: string,
  img_1600_900: string,
  img_1440_900: string,
  img_1366_768: string,
  img_1280_800: string,
  img_1280_1024: string,
  img_1024_768: string,
}

interface ServerError {
  message: string
  code: string
  error?: unknown
}

const defaultParams = {
  c: 'WallPaper',
  a: 'getAppsByCategory',
  count : 24
  // cid : 26
  // start : 0
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | ServerError>
) {
  axios.get(url, {
    params: {
      ...defaultParams,
      ...req.query
    }
  }).then(response => {
    const { errno, errmsg, data } = response.data
    if (errno === '0') {
      res.status(200).json(data)
    } else {
      res.status(500).json({
        message: errmsg,
        code: errno,
      })
    }
  }).catch(error => {
    res.status(500).json({
      message: '服务器错误',
      code: '500',
      error,
    })
  })
}
