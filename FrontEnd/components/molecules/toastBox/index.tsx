"use client";


export default function ToastBox({ message, title }:{ message:string, title:string }) {
 
  

  return(
    <div className={`font-IRANSans relative`}>
      <div className="-z-10 absolute -inset-9 bg-state-error7"></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-[calc(100dvw-110px)] font-normal text-[12px]">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
