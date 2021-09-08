import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Head from 'next/head'
import emitter, { UPDATE_CATE_ID } from '../../utils/emitter'

interface Category {
    id: string
    pjt: string
    name: string
    order_num: string
    tag: string
    create_time: string
    order_createtime_hidden: string
    mobile_hidden: string
}

const Header: React.FC = () => {
    const [list, setList] = useState<Category[]>([])
    const [show, setShow] = useState(false)
    const [category, setCategory] = useState<{ id: string; name: string }>({
        id: '27',
        name: '每日推荐',
    })
    useEffect(() => {
        axios.get('/api/category').then((res) => {
            setList(res.data)
        })
    }, [])

    useEffect(() => {
        emitter.emit(UPDATE_CATE_ID, category.id)
    }, [category.id])

    const onCateClick = (cate: Category) => {
        setShow(false)
        setCategory({
            id: cate.id,
            name: cate.name
        })
    }

    return (
        <>
            <Head>
                <title>{category.name} - 壁纸 🎆</title>
                <meta name="description" content={`${category.name} - 壁纸 🎆`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="h-12 flex items-center justify-between px-6 text-base lg:text-lg fixed z-50 top-0 left-0 w-full bg-black bg-opacity-50"
                onMouseEnter={() => setShow(true)}
                onClick={() => setShow(show => !show)}
            >
                <div>{category.name}</div>
                <Image src="/logo.png" width="40" height="40" alt="logo" />
                <div className="flex items-center">
                    <span>分类</span>
                    <svg className={show ? 'transform rotate-180' : ''} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                        <path d="M37 18L25 30L13 18" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </header>
            <div
                className={`${show ? 'grid' : 'hidden'} fixed top-12 z-50 w-full text-sm py-4 bg-black grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 bg-opacity-50`}
                onMouseLeave={() => setShow(false)}
            >
                {list.map((cate) => (
                    <div
                        key={cate.id}
                        className={`${cate.id === category.id ? 'text-green-300 bg-gray-400' : ''} py-1 mx-4 rounded cursor-pointer hover:opacity-80 hover:shadow`}
                        onClick={() => onCateClick(cate)}
                    >
                        {cate.name}
                    </div>
                ))}
            </div>

        </>
    )
}

export default memo(Header)
