import { useState, useEffect } from 'react'
import clsx from 'clsx'

function Pagination(props) {
  const [activePage, setActivePage] = useState(1)
  const onPageChange = props.onPageChange || (f => f)
  const totalPages = +props.totalPages || 0  
  const sidePages = +props.sidePages || 1
  const totalNumbers = (sidePages * 2) + 3  // 5 = {1} {page} {last} 
  const totalButtons = totalNumbers + 2     // 2 = {<} {>}
  let pages = []  

  function handleClick(e, page) {
    e.preventDefault()    
    const newPage = page === 'left'  ? Math.max(activePage - 1, 1) :
                    page === 'right' ? Math.min(activePage + 1, totalPages) :
                    page
    setActivePage(newPage)
    onPageChange(newPage)
  }

  function range(first, last) {
    return Array(last + 1 - first).fill().map((v, i) => first + i)
  }

  useEffect(() => {
    setActivePage(props.page)
  }, [props.page])


  if (totalPages <= 0) {
    return null
  }

  if (totalPages <= totalButtons) {

    pages = range(1, totalPages)

  } else {

    const firstPage = activePage - sidePages
    const lastPage  = activePage + sidePages

    if (firstPage < 4) {
      pages = [...range(2, totalNumbers), 'right']
    } else if (lastPage > totalPages - 3) {
      pages = ['left', ...range(totalPages + 1 - totalNumbers, totalPages - 1)]
    } else {
      pages = ['left', ...range(firstPage, lastPage), 'right']
    }

    pages = [1, ...pages, totalPages]

  }

  return (

    <ul className="pagination">

      {pages.map(page => (
        <li 
          key={page} 
          className={clsx('page-item', page === activePage && 'active')}
        >
          <a 
            href="/#"           
            className={'page-link'} 
            onClick={e => handleClick(e, page)}
          >
            {page === 'left' ? (
              <>&laquo;</>              
            ) : page === 'right' ? (
              <>&raquo;</>
            ) : (
              page
            )}
          </a>
        </li>
      ))}

    </ul>

  )

}


export default Pagination