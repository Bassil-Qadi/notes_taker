import React from 'react'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const TagsContainer = () => {

    const TAGS = [
        {id: 1, title: 'React'},
        {id: 2, title: 'Vue'},
        {id: 3, title: 'angular'},
        {id: 4, title: 'cooking'},
        {id: 5, title: 'dev'},
        {id: 6, title: 'Health'},
        {id: 7, title: 'fitness'},
        {id: 8, title: 'Travel'},
    ]

    return(
        <div className='px-4'>
            <hr />  
            <div className='pt-4'>
            <h6 className='text-gray-400 px-3'>Tags</h6>
            <div className='flex flex-col px-3 pt-4 gap-4'>
            {TAGS?.map((tag: any) => <div key={tag.id} className='flex items-center justify-start gap-3'>
                <LocalOfferOutlinedIcon />
            <h6 className='text-gray-500 font-bold capitalize'>{tag.title}</h6>
            </div>)}
            </div>
            </div>
        </div>
    )
}

export default TagsContainer