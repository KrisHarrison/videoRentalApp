import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) =>{

    let pagesCount = Math.ceil(itemsCount / pageSize)
    if (pagesCount === 1) return null;
    let pages = _.range(1, pagesCount + 1);

        
        return (
        
        <nav aria-label="Page navigation example">
            <ul className="pagination">
            {pages.map(page =>(
                <li key={page} className={page === currentPage?'page-item active':'page-item'}>
                    <a className="page-link" href ="/#" onClick={()=> onPageChange(page)}
                    >{page}
                    </a>
                </li>
            ))}
            </ul>
        </nav>
      );

}

//Used for people to pass the right props
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize:PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;