import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { default  as customerReducer } from '@/views/crm/Customers/store'
import { injectReducer } from '@/store'

injectReducer('bannersList', reducer)
injectReducer('crmCustomers', customerReducer)

const BannersList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <ProjectListContent />
            <NewProjectDialog />
        </Container>
    )
}

export default BannersList
