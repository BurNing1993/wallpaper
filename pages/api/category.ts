// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const url = 'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAllCategories'

interface Data {
  id: string
  pjt: string
  name: string
  order_num: string
  tag: string
  create_time: string
  order_createtime_hidden: string
  mobile_hidden: string
  pid: string
}

interface ServerError {
  message: string
  code: string
  error?: unknown
}

// 排除
const exclude: string[] = ['1', '21', '33', '31']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | ServerError>
) {
  axios.get(url).then(response => {
    const { errno, errmsg, data } = response.data
    if (errno === '0') {
      res.status(200).json(
        (Object.values(data) as Data[])
          .filter(item => !exclude.includes(item.id))
          .sort((a, b) => Number(a.order_num) - Number(b.order_num))
      )
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
