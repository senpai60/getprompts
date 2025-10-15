import React from 'react'

function PromptCopyCard({pinToCopyPrompt}) {
  return (
    <div className='w-full h-full'>
       <div className="left">
            <img src={``} alt="" />
        </div> 
        <div className="right">
            <div className="prompt-text"></div>
        </div>
    </div>
  )
}

export default PromptCopyCard