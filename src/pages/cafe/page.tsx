import CafeBanner from '@/assets/cafe-banner.png'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useCafe from '@/hooks/useCafe'
import useCafeType from '@/hooks/useCafeType'
import useCoffeeType from '@/hooks/useCoffeeType'
import Cafe from '@/types/Cafe'
import CoffeeType from '@/types/CoffeeType'
import { isLoggedin } from '@/utils/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
const FormSchema = z.object({
    CoffeeType: z.string(),
    CafeType: z.string(),
    Location: z.string(),
    PriceMin: z.number(),
    PriceMax: z.number(),
})
interface CardProps {
    id?: number;
    title: string;
    priceRange: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    show_detail?: boolean;
    likedCount?: number;
    isLiked?: boolean;
  }
const Card: React.FC<CardProps> = ({ title, priceRange, description, imageUrl, id = null, show_detail = true, likedCount = null, isLiked = false }) => {
    return (
        <div className="flex flex-col items-center">
         {/* add heart icon on top corner of image if liked */}
            <div className='relative w-full overflow-clip'>
                <img className="w-full h-60 rounded-t-xl" src={imageUrl} alt={title} />
                {isLiked && <div className="absolute top-2 right-2 text-[#f96ac9]"><HeartIcon size={24} fill='#f96ac9' /></div>}
            </div>

          <div className="px-6 py-4 bg-[#FFF9F1] shadow-lg rounded-b-xl w-full h-full flex flex-col justify-between">
            <h2 className="font-bold text-xl mb-2 text-center text-[#603809]">{title}</h2>
            <p className="text-gray-600 text-center mb-2">{priceRange}</p>
            <p className="text-center text-[#603809] font-bold pb-2">{description}</p>
            {
                likedCount !== null &&
                <p className="text-center text-xs text-gray-600 spb-2">Disukai {likedCount} orang</p>
            }
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
    const [cafe, setCafe] = useState<Cafe[]>([])
    const [favorite, setFavorite] = useState<Cafe[]>([])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            CoffeeType: "",
            CafeType: "",
            Location: "",
            PriceMin: 20000,
            PriceMax: 50000,
        },
      })
    const [name,] = useLocalStorage('name', 'Guest')
    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        const result = await callCafe({
            'cafe_type': formData.CafeType,
            'coffee_type': formData.CoffeeType,
            'location': formData.Location,
            'price_min': formData.PriceMin,
            'price_max': formData.PriceMax,
        })
        if (result.data) {
            setCafe(result.data)
        }

    } 
    const { loading : loadingCtype, call : callCtype} = useCoffeeType()
    const { loading : loadingCatype, call : callCatype} = useCafeType()
    const { loading : loadingCafe, call : callCafe} = useCafe()
    const [coffeeType, setCoffeeType] = useState<CoffeeType[]>([])
    const [cafeType, setCafeType] = useState<CoffeeType[]>([])
    useEffect(() => {
        async function fetchCoffeeType() {
            const result = await callCtype()
            if (result.data) {
                setCoffeeType(result.data)
            }
        }
        async function fetchCafeType() {
            const result = await callCatype()
            if (result.data) {
                setCafeType(result.data)
            }
        }
        async function fetchCafe() {
            const result = await callCafe({ cafeType: '', coffeeType: '', location: '' })
            if (result.data) {
                setCafe(result.data)
                setFavorite(result.data.filter((cafe) => cafe.isLiked))
            }
        }
        fetchCoffeeType()
        fetchCafeType()
        fetchCafe()
    }, [])
    return <div className="">
        <div className="pt-24 pb-16 xl:px-32 px-14 border-b-4 bg-cover bg-no-repeat" style={{background: `linear-gradient(89.82deg, #1E1E1E -6.88%, rgba(27, 27, 27, 0.89) 3.5%, rgba(0, 0, 0, 0.5) 87.45%), url(${CafeBanner})`, backgroundSize: 'cover'}}>
            <div className="container-wrapper">
                <div className="container py-24">
                    <h1 className="text-white text-5xl pb-5"><span className='font-bold'>{ name }'s</span> Favorite</h1>
                    <p className="text-[#F9C06A] leading-9">Discover the coffee that matches your style and taste.</p>
                    <p className='text-white leading-9'>
                        <span className='font-bold'>CaféLink brings you closer to your favorite coffee moments by connecting you to the
                        best coffee spots tailored to your preferences.</span>
                        Whether you're looking for cozy
                        atmospheres or unique brews, explore, save, and enjoy a personalized coffee
                        experience like never before. Start your coffee journey and indulge in what you truly love!
                    </p>
                    <div className='py-4 pb-6 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        {
                            favorite.map((cafe) => (
                                <Card title={cafe.name} priceRange={`${cafe.districtAddress}, ${cafe.cityAddress}`} description={cafe.types.map((type) => type.name).join(' dan ')} imageUrl={cafe.imageUrl} buttonText='Order Now' key={cafe.id} id={cafe.id} likedCount={cafe.likeCount} isLiked={cafe.isLiked}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className=''>
                <div className='pt-14 xl:px-32 px-14 border-b-4'>
                    <div className='container-wrapper'>
                        <div className='text-center py-5'>
                            <h1 className='text-black text-5xl font-bold pb-4 leading-relaxed'><span className='text-[#603809]'>Let's Begin to Explore</span></h1> 
                            <p>Discover the <span className='font-bold'>cafe</span> that matches your vibe and fulfills your cravings.</p>
                            <div className='flex justify-center w-full pt-5'>
                                <Form {...form}>
                                    <form className='flex gap-4 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className='grid lg:grid-cols-11 grid-cols-2 gap-2 w-full'>
                                        <FormField
                                            control={form.control}
                                            name="CoffeeType"
                                            render={({ field }) => (
                                                <div className="lg:col-span-2 col-span-1">
                                                <FormItem>
                                                    <div className="flex items-center">
                                                    <FormLabel>Coffee Type</FormLabel>
                                                    </div>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingCtype}>
                                                        <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Coffee Type" />
                                                        </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                coffeeType.length === 0 ? <SelectItem value="Loading...">Loading...</SelectItem>  :
                                                                coffeeType.map((ctype) => (
                                                                    <SelectItem value={ctype.name} key={ctype.id}>{ctype.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex items-center">
                                                    <FormMessage />
                                                    </div>
                                                </FormItem>
                                                </div>
                                            )}
                                            />
                                            <FormField
                                            control={form.control}
                                            name="CafeType"
                                            render={({ field }) => (
                                                <div className="lg:col-span-2 col-span-1">
                                                <FormItem>
                                                    <div className="flex items-center">
                                                    <FormLabel>Cafe Type</FormLabel>
                                                    </div>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loadingCatype}>
                                                        <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Cafe Type" />
                                                        </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                cafeType.length === 0 ? <SelectItem value="Loading...">Loading...</SelectItem>  :
                                                                cafeType.map((ctype) => (
                                                                    <SelectItem value={ctype.name} key={ctype.id}>{ctype.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex items-center">
                                                    <FormMessage />
                                                    </div>
                                                </FormItem>
                                                </div>
                                            )}
                                            />
                                            <FormField
                                            control={form.control}
                                            name="Location"
                                            render={({ field }) => (
                                                <div className="col-span-2">
                                                <FormItem>
                                                    <div className="flex items-center">
                                                    <FormLabel>Location</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                    <Input {...field} type="text" placeholder="Location" />
                                                    </FormControl>
                                                    <div className="flex items-center">
                                                    <FormMessage />
                                                    </div>
                                                </FormItem>
                                                </div>
                                            )}
                                            />
                                            <FormField
                                            control={form.control}
                                            name="PriceMin"
                                            render={({ field }) => (
                                                <div className="lg:col-span-2 col-span-1">
                                                <FormItem>
                                                    <div className="flex items-center">
                                                    <FormLabel>Lowest Price</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                    <div className="flex items-center rounded-lg border bg-background text-foreground">
                                                        <div className="flex items-center px-4 text-muted-foreground">
                                                            Rp
                                                        </div>
                                                        <Input
                                                            {...field}
                                                            onChange={event => field.onChange(+event.target.value)}
                                                            type="number"
                                                            placeholder="Search..."
                                                            className="flex-1 rounded-l-none rounded-r-lg border-0 bg-transparent py-2 pr-4 text-sm focus:outline-none focus:ring-0"
                                                        />
                                                        </div>
                                                    </FormControl>
                                                    <div className="flex items-center">
                                                    <FormMessage />
                                                    </div>
                                                </FormItem>
                                                </div>
                                            )}
                                            />
                                            <FormField
                                            control={form.control}
                                            name="PriceMax"
                                            render={({ field }) => (
                                                <div className="lg:col-span-2 col-span-1">
                                                <FormItem>
                                                    <div className="flex items-center">
                                                    <FormLabel>Highest Price</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                    <div className="flex items-center rounded-lg border bg-background text-foreground">
                                                        <div className="flex items-center px-4 text-muted-foreground">
                                                            Rp
                                                        </div>
                                                        <Input
                                                            {...field}
                                                            onChange={event => field.onChange(+event.target.value)}
                                                            type="number"
                                                            placeholder="Search..."
                                                            className="flex-1 rounded-l-none rounded-r-lg border-0 bg-transparent py-2 pr-4 text-sm focus:outline-none focus:ring-0"
                                                        />
                                                        </div>
                                                    </FormControl>
                                                    <div className="flex items-center">
                                                    <FormMessage />
                                                    </div>
                                                </FormItem>
                                                </div>
                                            )}
                                            />
                                            <Button type="submit" className="mt-6 lg:col-span-1 col-span-2 w-full bg-[#603809] hover:bg-[#4d2d07] text-white">
                                                Search
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                        </div>
                        <div className={cn(`py-4 pb-6 grid auto-rows-fr grid-cols-1 gap-4`,  `sm:grid-cols-${cafe.length > 1 ? 2 : 1}`, `md:grid-cols-${cafe.length > 4 ? 4 : cafe.length}`)}>
                            {
                                loadingCafe ? <div>Loading...</div> :
                                cafe.map((cafe) => (
                                    <Card title={cafe.name} priceRange={`${cafe.districtAddress}, ${cafe.cityAddress}`} description={cafe.types.map((type) => type.name).join(' dan ')} imageUrl={cafe.imageUrl} buttonText='Order Now' key={cafe.id} id={cafe.id} likedCount={cafe.likeCount} isLiked={cafe.isLiked}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}