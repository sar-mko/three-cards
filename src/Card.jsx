import React, { useEffect, useState } from 'react'

const Card = (item) => {
    const [imgSource, SetImgSource] = useState('')

    useEffect(() => {
        item ? SetImgSource(item.item.image) :  SetImgSource('')
    }
    ,[item])


  return (
    <>
        <img src={imgSource}  alt=""/>
    </>
  )
}

export default Card