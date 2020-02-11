import React, { Component } from 'react';
import TableBody from './tableBody'
import TableHeader from './tableHeader';

const Table = ({columns, sortColumn, onSort, data}) => {
    
    return (
        <table className="table">
            <TableHeader 
                columns={columns} 
                sortColumn={sortColumn} 
                onSort={onSort}>
            </TableHeader>
    
            <TableBody columns={columns} data={data}></TableBody>
       </table> 
      );
}
 
export default Table;