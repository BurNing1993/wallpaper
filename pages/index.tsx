import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import axios, { AxiosResponse } from 'axios'
import Image from 'rc-image'
import 'rc-image/assets/index.css'
import emitter, { UPDATE_CATE_ID } from '../utils/emitter'

interface Wallpaper {
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
let observer: IntersectionObserver;

const Home: NextPage = () => {
  const loadEl = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<Wallpaper[]>([])
  const [page, setPage] = useState(0)
  const [cateId, setCateId] = useState('27')
  const [loading, setLoading] = useState(true)
  const [finish, setFinish] = useState(false)
  useEffect(() => {
    observer = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      setPage(p => p + 1)
      console.log('Loaded new items');
    })
    const onCateIdChange = (cid: string) => {
      observer.unobserve(loadEl.current!)
      setList([])
      setPage(0)
      setLoading(false)
      setCateId(cid)
    }
    emitter.on(UPDATE_CATE_ID, onCateIdChange)
    return () => { emitter.off(UPDATE_CATE_ID, onCateIdChange); observer.disconnect() }
  }, [])

  useEffect(() => {
    if (!finish) {
      setLoading(true)
      axios.get('/api/wallpaper', {
        params: {
          cid: cateId,
          start: page * 24
        }
      }).then((res: AxiosResponse<Wallpaper[]>) => {
        const data = res.data
        if (data.length > 0) {
          setList((list) => list.concat(data))
        } else {
          setFinish(false)
          observer.unobserve(loadEl.current!)
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [cateId, finish, page])

  useEffect(() => {
    if (loading) {
      observer.unobserve(loadEl.current!)
    } else {
      observer.observe(loadEl.current!)
    }
  }, [loading])


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          list.map(wall => <Image key={wall.id} src={wall.url_thumb} alt={wall.utag} />)
        }
      </div>
      <div className={`${finish ? 'hidden' : ''} flex justify-center text-xs items-center h-8`} ref={loadEl}>
        <svg className="animate-spin" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>
          加载数据中...
        </span>
      </div>
    </>
  )
}

export default Home
