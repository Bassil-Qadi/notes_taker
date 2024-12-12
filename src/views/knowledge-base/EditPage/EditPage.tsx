import { useEffect } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Button from '@/components/ui/Button'
import Editor from './components/Editor'
import useQuery from '@/utils/hooks/useQuery'
import { injectReducer } from '@/store'
import reducer, {
    getArticle,
    setPage,
    setMode,
    useAppDispatch,
    useAppSelector,
} from './store'
 

injectReducer('knowledgeBaseEditPage', reducer)


const EditPage = () => {
    const dispatch = useAppDispatch()

    const mode = useAppSelector(
        (state) => state.knowledgeBaseEditPage.data.mode
    )

    const query = useQuery()

    const id = query.get('id')
    const title = query.get('title')
    const description = query.get('description')

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        if (id) {
            dispatch(getArticle({ id }))
        }

        if (!id) {
            dispatch(setMode('add'))
            dispatch(setPage(''))
        }
    }

    const onModeChange = (mode: string) => {
        dispatch(setMode(mode))
    }

    return (
        <Container>
            <AdaptableCard>
                <div className="max-w-[800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3>
                            {mode === 'edit' && <span>تعديل الصفحة</span>}
                            {mode === 'add' && <span>Add Article</span>}
                            {mode === 'preview' && <span>Preview Article</span>}
                        </h3>
                        {mode === 'preview' ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    onModeChange(id ? 'edit' : 'add')
                                }
                            >
                                عودة
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => onModeChange('preview')}
                            >
                                عرض
                            </Button>
                        )}
                    </div>
                    <Editor mode={mode} data={ {title: title, description: description, id: id} } />
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default EditPage
