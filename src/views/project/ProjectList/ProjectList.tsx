import React from 'react'
import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)

const ProjectList = () => {
    return (
        <Container className="h-full">
            {/* <ActionBar />
            <ProjectListContent />
            <NewProjectDialog /> */}
            <h1>test</h1>
        </Container>
    )
}

export default ProjectList
