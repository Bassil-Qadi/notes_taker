import AdaptableCard from '@/components/shared/AdaptableCard'
import UsersTable from './components/UsersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <UsersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
