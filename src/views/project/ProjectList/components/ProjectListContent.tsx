import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import Spinner from '@/components/ui/Spinner'
import { getList, getSaloonsList, useAppDispatch, useAppSelector } from '../store'

const ProjectListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.projectList.data.loading)

    const { id, role, saloonId } = useAppSelector(
        state => state.auth.user
    )

    const ownerSaloonsList = useAppSelector(
        (state) => state.projectList.data.saloonsList.filter((saloon: any) => saloon.type === 'saloon' && saloon.userId === id)
    )

    const userSaloonsList = useAppSelector(
        (state) => state.projectList.data.saloonsList.filter(saloon => saloon.type === 'saloon' && saloon?._id === saloonId)
    )

    const view = useAppSelector((state) => state.projectList.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.projectList.data.query
    )


    useEffect(() => {
        dispatch(getList({ sort, search }))
        dispatch(getSaloonsList())
    }, [dispatch, sort, search])

    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && role === 'owner' && ownerSaloonsList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {ownerSaloonsList?.filter(saloon => saloon.name.toLocaleLowerCase()?.startsWith(search))?.map((saloon) => (
                        <GridItem key={saloon._id} data={saloon} />
                    ))}
                </div>
            )}
            {view === 'grid' && role === 'user' && userSaloonsList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {userSaloonsList?.filter(saloon => saloon.name.toLocaleLowerCase()?.startsWith(search))?.map((saloon) => (
                        <GridItem key={saloon._id} data={saloon} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectListContent
