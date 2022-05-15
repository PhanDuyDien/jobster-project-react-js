import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../features/allJobs/allJobSlice'

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  // console.log(pages)

  const nextPage = () => {
    let nextPage = page + 1
    if (nextPage > numOfPages) {
      nextPage = 1
    }
    dispatch(changePage(nextPage))
  }

  const prevPage = () => {
    let nextPage = page - 1
    if (nextPage < 1) {
      nextPage = numOfPages
    }
    dispatch(changePage(nextPage))
  }

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage} type='button'>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              type='button'
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className='next-btn' onClick={nextPage} type='button'>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
