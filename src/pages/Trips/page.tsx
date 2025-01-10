import BucketQLogo from '@/assets/BucketQ.png'
import { Button } from '@/components/ui/button'
import useTrip from '@/hooks/useTrip'
import { TripPackage } from '@/types/TripPackage'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CardPackage: React.FC<TripPackage> = ({ name, location, trips}) => {
    
    return (
        <div className="w-full flex flex-row lg:py-8 lg:px-8 py-4 px-4 bg-white rounded-lg gap-2 shadow-2xl"> 
            <div className="flex">
            {/* 
            // @ts-expect-error ignore trips undefined case */}
                <img src={trips[0].photos[0].url ?? ''} alt="trip" className="hidden md:flex w-32 h-32 md:w-64 md:h-64 rounded-lg" />

            </div>
            <div className="flex flex-col text-left w-full">
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-lg py-2">{location}</p>
                {/* 
                // @ts-expect-error ignore trips undefined case */}
                <p className="text-ellipsis leading-9">{trips[0].description}</p>
                <div className="flex justify-end items-end h-full w-full">
                    <Link to={import.meta.env.VITE_BUCKET_QUEST_URL} className="">
                        <Button className="mt-4 bg-black text-white ">Book Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [tripPackages, setTripPackages] = useState<TripPackage[]>([])
    const { loading, call } = useTrip()
    useEffect(() => {
        async function fetchTrip() {
            const result = await call()
            if (result.data) {
                setTripPackages(result.data)
            }
        }
        fetchTrip()
    }, [])
    return (
        <div className="mt-14">
            <div className="pt-12 pb-12 xl:px-32 px-14 border-b-4 leading-8 bg-blue-400">
                <h1 className="text-5xl font-bold text-black text-center">Partners</h1>
                <div className="flex">
                    <img src={BucketQLogo} alt="CafeLink Logo" className="h-auto max-w-32 -ml-12  md:max-w-max"/>
                </div>
                <p className="text-left text-xl font-bold text-[#F9C06A]">Get Your Best Trip Deals Now!</p>
                <div className="pb-8 lg:pb-16">
                
                <div className="flex flex-col justify-center items-center w-full gap-4">
                    {
                        loading ? <p>Loading...</p> :
                        tripPackages.slice(0,1).map((tripPackage, index) => (
                            <CardPackage key={index} {...tripPackage}/>
                        ))
                    }
                </div>
            </div>
            
            </div>
            <div className='pt-12'>
                <p className='text-4xl font-bold text-black text-center'>Book your next adventure - from the depths of the sea to the peaks of the mountains.</p>
                <div className="pt-14 lg:px-14 px-6 lg:pt-24">
                    <div className="flex flex-col justify-center items-center w-full gap-4">
                    {
                        tripPackages.slice(1,6).map((tripPackage, index) => (
                            <CardPackage key={index} {...tripPackage} />
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}