import React, { useEffect, useState } from 'react'

const Card = (item) => {
    const [imgSource, setImgSource] = useState('')

    useEffect(() => {
        item ? setImgSource(item.item.image) :  setImgSource('')
    }
    ,[item])


  return (
    <>
        <img src={imgSource}  alt=""/>
    </>
  )
}

export default Card