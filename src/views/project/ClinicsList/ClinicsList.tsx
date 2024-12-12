import ActionBar from './components/ActionBar'
import ClinicsListContent from './components/ClinicsListContent'
import NewClinicDialog from './components/NewClinicDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)

const ProjectList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <ClinicsListContent />
            <NewClinicDialog />
        </Container>
    )
}

export default ProjectList
