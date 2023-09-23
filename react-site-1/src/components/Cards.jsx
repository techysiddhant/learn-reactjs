import React from 'react'
import Single from '../assets/single.png';
import Double from '../assets/double.png';
import Triple from '../assets/triple.png';
const Card = ({imgSrc,userType,price,maxUser,storage,storageLimit,cardBg="bg-white",btnBg="bg-[#00df9a] text-black", cardMargin="my-4",imgBg="bg-white"})=>{
    return(
        <div className={` ${cardBg} w-full shadow-xl flex flex-col p-4 ${cardMargin} rounded-lg hover:scale-105 duration-300`}>
                <img className={`w-20 mx-auto mt-[-3rem] ${imgBg}`} src={imgSrc} alt={userType} />
                <h2 className='text-2xl font-bold text-center py-8'>{userType}</h2>
                <p className='text-center text-4xl font-bold '>{price}</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>{maxUser}</p>
                    <p className='py-2 border-b mx-8'>{storage}</p>
                    <p className='py-2 border-b mx-8 '>{storageLimit}</p>
                </div>
                <button className={`${btnBg} w-[200px]  rounded-md font-medium my-6 mx-auto px-6 py-3`}>Start Trial</button>
            </div>
    )
}
const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'> 
            
            <Card imgSrc={Single} userType={"Single User"} price={"$149"} maxUser={"1 User Allowed"} storage={"500 GB Storage"} storageLimit={"Send up to 2 GB"}  />
            <Card imgSrc={Double} userType={"Partnership"} price={"$199"} maxUser={"3 Users Allowed"} storage={"1 TB Storage"} storageLimit={"Send up to 10 GB"} cardBg={"bg-gray-100"} cardMargin={"md:my-0 my-8"} btnBg={"bg-black text-[#00df9a]"} imgBg={'bg-transparent'} />
            <Card imgSrc={Triple} userType={"Group Account"} price={"$299"} maxUser={"10 Users Allowed"} storage={"5 TB Storage"} storageLimit={"Send up to 20 GB"}  />
        </div>
    </div>
  )
}

export default Cards