import "../Style.css";

function Tags({tag} : {tag : string}){
    return(
        <>
            <div className="tag">
                <span>#{tag}</span>
            </div>
        </>
    )
}

export default Tags;