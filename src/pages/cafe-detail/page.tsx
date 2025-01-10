import { Link, redirect, useParams } from "react-router-dom"
import useCafeDetail from "@/hooks/useCafeDetail"
import { useEffect, useState } from "react"
import Cafe from "@/types/Cafe"
import LocationSVG from '@/assets/location.svg'
import { isLoggedin } from "@/utils/user"
import { Button } from "@/components/ui/button"
import { HeartIcon, X } from "lucide-react"
import useLikeCafe from "@/hooks/useLikeCafe"

interface CardProps {
    id?: number;
    title: string;
    priceRange: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    show_detail?: boolean;
  }
const Card: React.FC<CardProps> = ({ title, priceRange, description, imageUrl, id = null, show_detail = true }) => {
    return (
        <div className="flex flex-col items-center">
          <img className="w-full rounded-t-xl" src={imageUrl} alt={title} />
          <div className="px-6 py-4 bg-[#FFF9F1] shadow-lg rounded-b-xl w-full h-full flex flex-col justify-between">
            <h2 className="font-bold text-xl mb-2 text-center text-[#603809]">{title}</h2>
            <p className="text-gray-600 text-center mb-2">{priceRange}</p>
            <p className="text-center text-[#603809] font-bold pb-2">{description}</p>
            
          </div>
          {show_detail &&
          <div className='flex justify-center'>
            <Link to={ isLoggedin() ? `/cafe/${id}` : '/login' }>
              <Button className="-mt-4 bg-[#F9C06A] hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full w-28">
                  Detail
              </Button>
            </Link>
          </div>
            }
        </div>
      );
  };

export default function Page () {
    const { id } = useParams()
    const [cafe, setCafe] = useState<Cafe>()
    const { loading, call } = useCafeDetail(parseInt(id ?? ''))
    const { loading: loadingLike, callToLike, callToDislike, callToCheck } = useLikeCafe(parseInt(id ?? ''))
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        async function fetchCafe() {
            const result = await call()
            if (result.data) {
                setCafe(result.data)
            } else {
                redirect('/404')
            }
        }
        async function fetchLike() {
            const result = await callToCheck()
            if (result.data) {
                setLiked(result.data)
            }
        }
        fetchCafe()
        fetchLike()
    }, [])
    return (
        <div className="">
             <div className="pt-24 min-h-[calc(100vh-61px)] pb-16 xl:px-32 px-14 border-b-4 !bg-cover !bg-no-repeat" style={{background: `linear-gradient(89.82deg, #1E1E1E -6.88%, rgba(27, 27, 27, 0.89) 3.5%, rgba(0, 0, 0, 0.5) 87.45%), url(${cafe?.imageUrl})`}}>
                <div className="container-wrapper">
                    <div className="container py-24">
                        <h1 className="text-white text-5xl pb-5"><span className='font-bold'>{ cafe?.name }</span></h1>
                        <p className="text-white leading-9">
                            <img src={LocationSVG} alt="location" className="inline-block mr-4" />
                            { cafe?.districtAddress },
                            <span className="font-bold"> { cafe?.cityAddress }</span>
                        </p>
                        <p className='text-white leading-9 pb-5'>
                            { cafe?.description }
                        </p>
                        <p className="text-white leading-9">
                            <span className="font-bold">
                                Special Feature: 
                            </span> 
                             
                            {
                                " " + cafe?.specials.join(', ') + "."
                            }
                        </p>   
                        <Button className='bg-[#f96ac9] hover:bg-[#96417a] text-black mt-4 rounded-full px-5 py-6' onClick={async () => {
                            if (liked) {
                                await callToDislike()
                            } else {
                                await callToLike()
                            }
                            setLiked(!liked)
                        }}
                        >
                            {
                                loadingLike ? <div>Loading...</div> :
                                liked ?
                                <>
                                    <X className='w-6 h-6 mr-2'/>
                                    <span className='font-bold'>Discard from Favorites</span>
                                </>
                                :
                                <>
                                    <HeartIcon className='w-6 h-6 mr-2'/>
                                    <span className='font-bold'>Save to Favorites</span>
                                </>
                            }

                        </Button>
                            
                    </div>
                    <div className='text-center py-5'>
                        <p className="text-white text-4xl">Recommended <span className='font-bold'>coffee</span></p>
                        <div className='py-4 pb-6 grid auto-rows-fr  sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {
                                loading ? <div>Loading...</div> :
                                cafe?.coffees.map((coffee) => (
                                    <Card title={coffee.name} priceRange={`Rp${coffee.price}`} description={coffee?.composition} imageUrl={coffee?.imageUrl} buttonText='Order Now' key={cafe.id} show_detail={false}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}