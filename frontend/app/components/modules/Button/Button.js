import React from 'react'

export default function Button({type,onClick,children}) {
  return (
    <>
    {
        type === "small" && (
            <button onClick={onClick} className="text-primary border-solid border-primary border-[1px] font-medium text-xs rounded-lg w-[70px] h-6 md:w-[102px] md:h-9">{children}</button>
        )
    }
    </>
  )
}
