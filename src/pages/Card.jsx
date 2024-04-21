import React from "react";




const Card = ({card}) => {
  return (
    <div className="relative flex flex-row gap-4 p-4 mb-4 bg-purplelight">
      <div className='border-r-2 border-gray-300 basis-full'>
        <p className='text-lg font-bold'>TERM</p>
        <div className='p-4 text-xl'>{card.q}</div>
      </div>
      <div className='basis-full'>
        <p className='text-lg font-bold'>DEFINITION</p>
        <div className='p-4 text-xl'>{card.a}</div>
      </div>
      <i className="absolute text-xl transition-all cursor-pointer top-2 right-2 fa-solid fa-pencil hover:scale-110 hover:text-purpledark"></i>
    </div>
  );
}

export default Card;