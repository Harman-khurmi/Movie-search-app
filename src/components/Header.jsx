import React from 'react'
const Header = () => {
    return (
        <>
            <div className='flex gap-3 items-center p-3 px-12 text-white backdrop-blur-md fixed top-0 left-0 right-0 z-50'>
                <img src="/logo.png" alt="logo" className='size-16' />
                <h2 className='font-bold text-2xl'>Movie App</h2>
            </div>
        </>
    )
}

export default Header
