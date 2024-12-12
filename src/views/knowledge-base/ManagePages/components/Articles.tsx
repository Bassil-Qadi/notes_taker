import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Loading from '@/components/shared/Loading'
import Confirmations from './Confirmations'
import CustomerTableFilter from '@/views/crm/Customers/components/CustomerTableFilter'
import {
    getPages,
    toggleArticleDeleteConfirmation,
    toggleAddPage,
    toggleEditPage,
    setSelected,
    useAppDispatch,
    useAppSelector,
    Page,
} from '../store'
import { useAppSelector as useCrmSelector  } from "@/views/crm/Customers/store"

import { motion } from 'framer-motion'
import {
    HiOutlineTrash,
    HiOutlinePencil,
    HiOutlinePlus,
} from 'react-icons/hi'

const CategorySection = ({ data }: { data: Page }) => {
    const dispatch = useAppDispatch()

    const [collapse, ] = useState(false)

    const onArticleEdit = (data: Page) => {
        dispatch(setSelected(data))
        dispatch(toggleEditPage(true))
    }

    const onArticleDelete = (id: string) => {
        dispatch(setSelected({ id }))
        dispatch(toggleArticleDeleteConfirmation(true))
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{
                    opacity: collapse ? 0 : 1,
                    height: collapse ? 0 : 'auto',
                }}
                transition={{ duration: 0.15 }}
            >
                {data && (
                    <Card key={data._id} bordered>
                        <img className='object-cover h-48 w-96 rounded-md' src={data?.image} alt="" />
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex">
                                <Tooltip title="حذف">
                                    <Button
                                        shape="circle"
                                        variant="plain"
                                        size="sm"
                                        icon={<HiOutlineTrash />}
                                        onClick={() =>
                                            onArticleDelete(data?._id)
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="تعديل">
                                    <Button
                                        shape="circle"
                                        variant="plain"
                                        size="sm"
                                        icon={<HiOutlinePencil />}
                                        onClick={() => onArticleEdit(data)}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    )
}

const Articles = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.loading,
    )
    const pages = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pages,
    )

    const selectedSaloonId = useCrmSelector(
        state => state.crmCustomers.data.filterData.selectedSaloon
    )

    const [collapse, ] = useState(false)

    useEffect(() => {
        if(selectedSaloonId) fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSaloonId])

    const fetchData = () => {
        dispatch(getPages({ saloonId: selectedSaloonId }))
    }

    const onArticlePage = () => {
        dispatch(toggleAddPage(true))
        // navigate(
        //     `/app/knowledge-base/edit-article?categoryLabel=${data.label}&categoryValue=${data.value}`
        // )
    }

    return (
        <Loading loading={loading}>
                <CustomerTableFilter />
                <motion.div
                    className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4"
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{
                        opacity: collapse ? 0 : 1,
                        height: collapse ? 0 : 'auto',
                    }}
                    transition={{ duration: 0.15 }}
                >
                    <Card
                        clickable
                        className="group border-dashed border-2 hover:border-indigo-600"
                        onClick={onArticlePage}
                    >
                        <div className="flex flex-col justify-center items-center py-5">
                            <div className="p-4 border-2 border-dashed rounded-full border-gray-200 dark:border-gray-600 group-hover:border-indigo-600">
                                <HiOutlinePlus className="text-4xl text-gray-200 dark:text-gray-600 group-hover:text-indigo-600" />
                            </div>
                            <p className="mt-5 font-semibold">إضافة عمل جديد</p>
                        </div>
                    </Card>
                {pages?.map((page) => <CategorySection key={page._id} data={page} />)}
                </motion.div>
            <Confirmations data={pages} selectedSaloonId={selectedSaloonId} />
        </Loading>
    )
}

export default Articles
