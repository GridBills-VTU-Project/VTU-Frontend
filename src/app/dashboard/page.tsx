import React, { Suspense } from 'react'
import Dashboard from './Dashboard'

const page = () => {
  return (
    <Suspense><Dashboard/></Suspense>
  )
}

export default page