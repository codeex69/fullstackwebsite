export default function reportinsights(){
    return(
        <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-950 min- h-screen">
          <h1 className="text-3xl text-teal-500 font-bold text-center p-10">Reports and insights</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4  w-500 gap-30  text-center ">
            <div className="bg-white/5 backdrop-blur border border-white/10   rounded py-12 px-6 ml-23">
                <h3 className="text-white ">business intelligence</h3>
                <p className="text-teal-500 text-center">98.5%</p>
        
           
         </div>
         <div className="bg-white/5 backdrop-blur border border-white/10   rounded py-12 px-6 ml-23">
                <h3 className="text-white ">mobile analytics</h3>
                <p className="text-teal-500 text-center">2.4m</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10  rounded py-12 px-6 ml-23">
                <h3 className="text-white ">Global reach</h3>
                <p className="text-teal-500 text-center">150+</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10   rounded py-12 px-6 ml-23">
                <h3 className="text-white ">data processing</h3>
                <p className="text-teal-500 text-center">12tb</p>
            </div>
        </div>

    
        </div>

    )
}