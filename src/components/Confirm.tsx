import "../Style.css";

function Confirm({open, onConfirm, onCancel}:any){
    if(!open) return null;

    return(
        <>
            <div className="deleteblog">
                <div className="modal">
                    <h3>Delete Blog</h3>
                    <p>Are you sure you want to delete this blog? This action cannot be undone and all content will be permanently removed</p>
                    <div className="options">
                        <button type="button" onClick={onCancel}>Cancel</button>
                        <button onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirm;