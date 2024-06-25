
const MessageSkeleton = () => {
  return (
      <>
          <div className="flex flex-col gap-4">
            <div className="flex justify-start gap-3 items-center min-h-16">
                <div className="skeleton size-10 rounded-full"></div>
                <div className="flex flex-col items-center w-[50%] gap-2">
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-full h-4"></div>
                </div>
              </div>
            <div className="flex justify-end gap-3 items-center min-h-16">
                <div className="flex flex-col items-center w-[50%] gap-2">
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-full h-4"></div>
                  </div>
                <div className="skeleton size-10 rounded-full"></div>
             </div>
          </div>
      </>
  )
}

export default MessageSkeleton;
