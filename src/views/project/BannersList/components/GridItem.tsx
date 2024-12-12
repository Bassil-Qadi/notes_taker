import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import { HiBadgeCheck, HiBan, HiCurrencyDollar } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

export type GridItemProps = {
    data: {
        _id: string,
        title: string,
        description: string,
        image: string,
        saloonId: string,
        userId: string,
        price: string
        priceAfterDiscount: string
        startDate: string
        endDate: string
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { _id, title, description, image, price, priceAfterDiscount, startDate, endDate } = data

    return (
        <Card bodyClass="h-full p-0">
            <img className="w-full h-52 mb-3" src={image} alt={title} />
            <div className="flex flex-col h-full p-4">
                <div className="flex justify-between">
                <h6>{title}</h6>
                    <ItemDropdown bannerId={_id} banner={data} />
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full me-2">
                                <HiCurrencyDollar className="text-base" />
                                <span className={`ml-1 rtl:mr-1 whitespace-nowrap text-green-600`}>
                                    {priceAfterDiscount} بعد الخصم
                                </span>
                            </div>
                            <span className='text-red-600'>{price} قبل الخصم</span>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex justify-between'>
                    <span>يبدأ الخصم: {dayjs(startDate).format('DD/MM/YYYY')}</span>
                    <span>ينتهي الخصم: {dayjs(endDate).format('DD/MM/YYYY')}</span>
                </div>
            </div>
        </Card>
        
    )
}

export default GridItem
