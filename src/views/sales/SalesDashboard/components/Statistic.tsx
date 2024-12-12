import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import { useAppSelector } from '../store'
import dayjs from 'dayjs'

type StatisticCardProps = {
    data?: []
    label: string
    valuePrefix?: string
    date: number
}

type StatisticProps = {
    data?: {
        categories: [],
        services: [],
        saloons: []
    }
}

const StatisticCard = ({
    data = [],
    label,
    valuePrefix,
    date,
}: StatisticCardProps) => {

    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumericFormat
                            thousandSeparator
                            displayType="text"
                            value={data.length}
                            prefix={valuePrefix}
                        />
                    </h3>
                    {/* <p>
                        vs. 3 months prior to{' '}
                        <span className="font-semibold">
                            {dayjs(date).format('DD MMM')}
                        </span>
                    </p> */}
                </div>
                <GrowShrinkTag value={data.length} suffix="%" />
            </div>
        </Card>
    )
}

const Statistic = ({ data = { categories: [],
    services: [],
    saloons: [] } }: StatisticProps) => {
    const startDate = useAppSelector(
        (state) => state.salesDashboard.data.startDate
    )

    const currentUserId = useAppSelector(
        (state) => state.auth.user.id
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                data={data.categories.filter(cat => cat?.createdBy === currentUserId)}
                valuePrefix=""
                label="الفئات"
                date={startDate}
            />
            <StatisticCard data={data.services.filter(service => service?.saloonId?._id === currentUserId)} label="الخدمات" date={startDate} />
            <StatisticCard
                data={data.saloons.filter(saloon => saloon?.createdBy?.id === currentUserId)}
                valuePrefix=""
                label="الصالونات"
                date={startDate}
            />
        </div>
    )
}

export default Statistic
