import "../Style.css";


function Search({setsearch} : any){
    return(
        <>
            <div className="search">
                <input type="text" placeholder="Search Blogs by title, content, tags or author" onChange={(e) => setsearch(e.target.value)}/>
            </div>
        </>
    )
}

export default Search;