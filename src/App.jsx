import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {

  return (
    <>
      <div className='items-center justify-center text-white bg-cover bg-no-repeat min-h-screen bg-center bg-fixed' style={{ backgroundImage: 'url(/hero-bg.png)' }}>
        <Header />
        <main>
            <Hero />
        </main>
      </div>
    </>
  )
}

export default App
