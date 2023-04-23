import Image from "next/image";
import React from "react";
export default function Poster() {
  return (
    <div>
     
      <div className="flex justify-center  ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col  max-w-7xl justify-center items-center space-y-3 w-full ">
            <div className="flex flex-col   md:items-start items-center justify-center  space-y-3 px-8 text-center ">
              <div className="text-3xl md:text-7xl font-bold ">
                Make Your Fashion Look More Charming
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={'/poster.png'} width={1500} alt="poster" height={325} style={{'border-radius': '30px','padding':"10px"}} />
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
    </div>
  );
}
