import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import { getSalesDashboardData, useAppSelector } from '../store'
import { useAppDispatch } from '@/store'

const SalesDashboardBody = () => {
    const dispatch = useAppDispatch()

    const dashboardData = useAppSelector(
        (state) => state.salesDashboard.data.dashboardData
    )

    const loading = useAppSelector((state) => state.salesDashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getSalesDashboardData())
    }

    function groupByCreatedAt(data: any) {
        const groups = data.reduce((acc, item): any => {
            const date = new Date(item.createdAt);
            const dateString = date.toISOString().split('T')[0]; // Get date part only
            if (!acc[dateString]) {
                acc[dateString] = 0;
            }
            acc[dateString]++;
            return acc;
        }, {});
    
        return Object.values(groups);
    }

    const reportData = {
        series: [
            {
                name: 'Online Sales',
                data: [24, 33, 29, 36, 34, 43, 40, 47, 45, 48, 46, 55],
                // data: groupByCreatedAt(dashboardData?.categories),
            },
            {
                name: 'Marketing Sales',
                data: [20, 26, 23, 24, 22, 29, 27, 36, 32, 35, 32, 38],
            },
        ],
        categories: [
            '01 Jan',
            '02 Jan',
            '03 Jan',
            '04 Jan',
            '05 Jan',
            '06 Jan',
            '07 Jan',
            '08 Jan',
            '09 Jan',
            '10 Jan',
            '11 Jan',
            '12 Jan',
        ],
    }

    const categoryData = {
        salesByCategoriesData: {
            // labels: Object.keys(dashboardData),
            labels: ["الفئات", "الخدمات", "الصالونات"],
            data: Object.values(dashboardData).map((arr) => arr.length),
        },
    }

    return (
        <Loading loading={loading}>
            <Statistic data={dashboardData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport
                    data={reportData}
                    className="col-span-2"
                />
                <SalesByCategories
                    data={categoryData?.salesByCategoriesData}
                />
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LatestOrder
                    data={dashboardData?.latestOrderData}
                    className="lg:col-span-2"
                />
                <TopProduct data={dashboardData?.topProductsData} />
            </div> */}
        </Loading>
    )
}

export default SalesDashboardBody
