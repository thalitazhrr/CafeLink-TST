import CoffeBanner from '@/assets/coffee_image.png'
import CafeLinkLogo from '@/assets/cafelink-logo-white.png'
import CafeLinkText from '@/assets/cafelink-text-white.png'
import { Button } from '@/components/ui/button'
import CoffeeBean from '@/assets/coffee-bean-cup.png'
import CoffeWithBean from '@/assets/coffee-with-bean.jpeg'
import TestimonialAvatar1 from '@/assets/testimonial-avatar.png'
import { Link } from 'react-router-dom'
import { isLoggedin } from '@/utils/user'
import Cafe from '@/types/Cafe'
import useCafe from '@/hooks/useCafe'
import { useEffect, useState } from 'react'
import Coffee from '@/types/Coffee'
import useCoffee from '@/hooks/useCoffee'

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
            <div className='w-full overflow-clip'>
                <img className="w-full h-60 rounded-t-xl" src={imageUrl} alt={title} />
            </div>
          <div className="px-6 py-4 bg-[#FFF9F1] shadow-lg rounded-b-xl w-full h-full flex flex-col justify-between">
            <h2 className="font-bold text-xl mb-2 text-center text-[#603809]">{title}</h2>
            <p className="text-gray-600 text-center mb-2">{priceRange}</p>
            <p className="text-center text-[#603809] font-bold pb-2">{description}</p>
            
          </div>
          {show_detail &&
          <div className='flex justify-center'>
            <Link to={ isLoggedin() ? `/cafe/${id}` : '/login' }>
              <Button className="-mt-16 bg-[#F9C06A] hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full w-28">
                  Detail
              </Button>
            </Link>
          </div>
            }
        </div>
      );
  };
  
export default function Home () {
    const { loading : loadingCafe, call : callCafe} = useCafe(true)
    const { loading : loadingCoffee, call : callCoffee} = useCoffee()
    const [cafe, setCafe] = useState<Cafe[]>([])
    const [coffee, setCoffee] = useState<Coffee[]>([])
    useEffect(() => {
        async function fetchCafe() {
            const result = await callCafe()
            if(result.data) {
                setCafe(result.data)
            }
        }
        async function fetchCoffee() {
            const result = await callCoffee()
            if(result.data) {
                setCoffee(result.data)
            }
        }
        fetchCafe()
        fetchCoffee()
    }, [])
    return (
        <div className="">
            <div className="pt-24 xl:px-32 px-14 border-b-4 bg-cover bg-no-repeat" style={{background: `linear-gradient(89.82deg, #1E1E1E -6.88%, rgba(0, 0, 0, 0) 87.45%), url(${CoffeBanner})`, backgroundSize: 'cover'}}>
                <div className="container-wrapper">
                    <div className="container py-20">
                        <h1 className="text-white">We've got your morning covered with</h1>
                        <div className="flex">
                            <img src={CafeLinkLogo} alt="CafeLink Logo" className="h-auto max-w-32  md:max-w-max"/>
                            <img src={CafeLinkText} alt="CafeLink Text" className="h-auto max-w-32 md:max-w-max"/>
                        </div>
                        <p className="text-[#F9C06A]">Find the perfect coffee experience tailored just for you</p>
                        <p className='text-white w-2/3'><span className='font-bold'>CaféLink connects you to the best coffee shops around, making every sip memorable.</span></p>
                        <p  className='text-white w-2/3'>Enjoy the convenience of exploring menus and added to your favorite list all in one platform.</p>
                        <p className='text-white'>Start your coffee journey today!</p>
                        <Link to={ isLoggedin() ? '/cafe' : '/login' }>
                            <Button className='bg-[#F9C06A] hover:bg-yellow-600 text-black mt-4 ml-6 rounded-full'>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='pt-14 xl:px-32 px-14 border-b-4'>
                    <div className='container-wrapper'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='col-span-1'>
                                <h2 className='text-[#603809] text-4xl font-bold pb-4'>Discover the best coffee shops near you</h2>
                                <p className='text-[#707070] leading-8 pb-4'>Step into a world of rich flavors and aromatic delights. At CaféLink, we connect you to coffee shops that redefine quality and taste. Elevate your day with coffee that energizes your spirit and satisfies your senses. Each cup tells a story, crafted with passion and perfection. Explore, indulge, and discover your favorite brew today!</p>
                                <Link to={ isLoggedin() ? '/cafe' : '/login' } className='text-[#F9C06A]'>    
                                    <Button className='bg-[#F9C06A] hover:bg-yellow-600 text-black mt-4 rounded-full px-5 py-6'>Go to<span className='font-bold'>Cafe’s</span></Button>
                                </Link>
                            </div>
                            <div className='col-span-1'>
                                <img src={CoffeeBean} alt="CafeLink Logo" className=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='pt-14 xl:px-32 px-14 border-b-4'>
                    <div className='container-wrapper'>
                        <div className='text-center py-5'>
                            <h1 className='text-[#603809] text-4xl font-bold pb-4'>Enjoy a new blend of coffee style</h1> 
                            <p>Find the <span className='font-bold'>coffee</span> that sparks your interest and satisfies your taste buds.</p>
                        </div>
                        <div className='py-4 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {
                                loadingCoffee ? <div>Loading...</div> :
                                coffee.slice(0,4).map((c) => (
                                    <Card title={c.name} priceRange={`Rp${c.price - 15000} - Rp${c.price + 15000}`} description={c.composition} imageUrl={c.imageUrl} buttonText='Order Now' show_detail={false} key={c.id}/>
                                ))
                            }
                        </div>
                        <div className='text-center py-5'>
                            <p>Discover the <span className='font-bold'>cafe</span> that matches your vibe and fulfills your cravings.</p>
                        </div>
                        <div className='py-4 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {
                                loadingCafe ? <div>Loading...</div> :
                                cafe.slice(0,4).map((cafe) => (
                                    <Card title={cafe.name} priceRange={`${cafe.districtAddress}, ${cafe.cityAddress}`} description={cafe.types.map((type) => type.name).join(' dan ')} imageUrl={cafe.imageUrl} buttonText='Order Now' id={cafe.id} key={cafe.id}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:px-32 px-14 border-b-4 bg-cover bg-no-repeat" style={{background: `url(${CoffeWithBean})`, backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(96, 56, 9, 0.7)'}}>
                <div className="container-wrapper">
                    <div className="container py-20">
                        <div className="flex">
                            <img src={CafeLinkLogo} alt="CafeLink Logo" className="h-16 w-auto"/>
                            <img src={CafeLinkText} alt="CafeLink Text" className="h-16 w-auto"/>
                        </div>
                        <h1 className="text-white font-bold text-6xl w-2/3 leading-normal py-4">Get a chance to have an Amazing Morning</h1>
                        <p className="text-white w-2/3">We are giving you are one time opportunity to experience a better life with coffee.</p>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='py-14 xl:px-32 px-14 border-b-4'>
                    <div className='container-wrapper'>
                        <div className='text-center'>
                            <h1 className='text-[#603809] text-5xl font-bold pb-4'>Our Coffee perfection feedback</h1> 
                            <p className='text-[#707070]'>Our customers has amazing things to say about us</p>
                        </div>
                        <div className='py-4 pb-6 bg-[#FFF9F1]'>
                            <div className='px-7 py-8 text-center'>
                                <p className='text-[#707070] leading-9 pb-5'>CaféLink has truly transformed my coffee experience. Not only does it help me discover the best coffee shops in town, but the personalized recommendations make every visit feel special. As a coffee lover, I can't imagine my mornings without CaféLink. It's more than just a website; it's a gateway to coffee perfection.</p>
                                <h1 className='text-[#603809] text-3xl font-bold'>Thalita Zahra</h1>
                                <p className='text-[#707070]'>Project Manager</p>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className='-mt-12 w-fit h-24 overflow-hidden rounded-xl'>
                                <img src={TestimonialAvatar1} alt="Testimonial Avatar" className="h-32 w-auto rounded-xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:px-32 px-14 border-b-4 bg-cover bg-no-repeat" style={{background: `url(${CoffeWithBean})`, backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(96, 56, 9, 0.7)'}}>
                <div className="container-wrapper">
                    <div className='text-center py-32'>
                        <p className='text-white pb-3'>Great ideas start with great coffee, Lets help you achieve that</p>
                        <h1 className='text-white text-3xl font-bold pb-4'>Get started today</h1> 
                        <Link to={ isLoggedin() ? '/cafe' : '/login' } className='mt-4'>
                            <Button className='bg-[#F9C06A] hover:bg-yellow-600 text-black  rounded-full font-bold'>Join Us</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}