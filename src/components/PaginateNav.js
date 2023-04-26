import { handlePaginate } from "./handlePaginate"


//This is a pagination navigation
const PaginateNav = ({ page, getApi }) => {

    const handlePaginate = (buttonId, api, page) => {

        switch(buttonId){
            case "previous" :
                api(page.previous?.page);
                break;
            case "next" : 
                api(page.next?.page);
                break;
        }
    }

    return (
        <div className="paginateNav">
            <div id="previous" className={page.previous?.page > 0 ? "unhide" : "hide"} onClick={(e) => handlePaginate(e.target.id, getApi, page)}>&#8592;</div>
            <p>{page.current} of {page.total }</p>
            <div id="next" className={page.next?.page ? "unhide" : "hide"} onClick={(e) => handlePaginate(e.target.id, getApi, page)}>&#8594;</div>
        </div>
    )
}

export default PaginateNav;