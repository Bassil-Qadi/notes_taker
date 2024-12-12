import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Members from './Members'
import { HiBadgeCheck, HiBan, HiEye } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '@/components/override/swiper-overrides.css'

export type GridItemProps = {
    data: {
        _id: string
        name: string
        logo: string
        categories: {
            name: string
            _id: string
        }[]
        createdBy: {
            name: string
            id: string
        }
        images: string[]
        isActive: boolean
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const navigate = useNavigate()
    const { _id, name, createdBy, categories, images, logo, isActive } = data

    return (
        <Card bodyClass="h-full p-0">
            {images?.length > 0 && (
                <Swiper
                    className="mySwiper"
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                >
                    {images?.map((image) => (
                        <SwiperSlide key={image}>
                            <img src={image} alt={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="flex flex-col h-full mb-3 p-4">
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-4">
                        <img
                            src={logo}
                            className="w-10 h-10 rounded-full"
                            alt={name}
                        />
                        <Link to={`/app/project/saloon-details?id=${_id}`}>
                            <h6>{name}</h6>
                        </Link>
                    </div>
                    <Button 
                        shape='circle'
                        variant='plain'
                        size='xs'
                        icon={<HiEye />}
                        onClick={() => navigate(`/app/project/saloon-details?id=${_id}`)}
                    />
                </div>
                {/* <p className="mt-4"><strong>المالك:</strong> {createdBy?.name}</p> */}
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <Members members={categories} />
                        <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                            {isActive ? (
                                <HiBadgeCheck className="text-base text-green-600" />
                            ) : (
                                <HiBan className="text-base text-red-600" />
                            )}
                            <span
                                className={`ml-1 rtl:mr-1 whitespace-nowrap ${
                                    isActive ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {isActive ? 'مفعّل' : 'غير مفعّل'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
