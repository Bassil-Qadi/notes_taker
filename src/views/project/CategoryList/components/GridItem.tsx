import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import { HiCalendar  } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

export type GridItemProps = {
    data: {
        _id: string,
        name: string,
        description: string,
        image: string,
        createdBy?: string,
        createdAt?: string,
        updatedAt?: string
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { _id, name, description, image, createdAt } = data

    return (
        <Card bodyClass="h-full p-0">
            <img className="w-full h-52 mb-3" src={image} alt={name} />
            <div className="flex flex-col h-full p-4">
                <div className="flex justify-between">
                    <Link to="/app/scrum-board">
                        <h6>{name}</h6>
                    </Link>
                    <ItemDropdown category={data} categoryId={_id} />
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiCalendar className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    Created At: {dayjs(createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
    )
}

export default GridItem
