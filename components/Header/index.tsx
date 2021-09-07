import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

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
    useEffect(() => {
        axios.get('/api/category').then(res => {
            setList(res.data)
        })
    }, [])
    return (
        <header className="h-12 flex items-center">
            <Link href="/">
                <a className="h-10">
                    <Image src="/logo.png" width="40" height="40" alt="logo" />
                </a>
            </Link>
        </header>
    )
}

export default memo(Header)

