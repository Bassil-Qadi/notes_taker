import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Articles from './components/Articles'
import reducer from './store'
import { default as crmReducer } from '@/views/crm/Customers/store'
import { injectReducer } from '@/store'

injectReducer('knowledgeBaseManagePages', reducer)
injectReducer('crmCustomers', crmReducer)

const ManageFAQs = () => {
    return (
        <Container>
            <AdaptableCard>
                <Articles />
            </AdaptableCard>
        </Container>
    )
}

export default ManageFAQs
