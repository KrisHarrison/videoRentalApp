import _ from 'lodash';

//Paginating Data
export function paginate(items, pageNumber, pageSize){
    //Starting index from the current page
    let startIndex = (pageNumber - 1) * pageSize;
    //returns '-' lodash object
    //Slice() from starting index of current page
    //Take() - get the necesarry number of items(page size)
    //Value() - parse into a javascript array object
    return _(items)
                    .slice(startIndex)
                    .take(pageSize)
                    .value();
    
}