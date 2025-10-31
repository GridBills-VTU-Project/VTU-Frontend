import React, { Suspense } from 'react'
import Page from './Dashboard'

const page = () => {
  return (
    <Suspense><Page/></Suspense>
  )
}

export default page