const ToDoItems = (props) => {
    const {items, deleteItem} = props;
    const ListItems = items.map(item => {
        return (
            <div key={item.id}>
                <span>{item.name}</span>
                <span>{item.age}</span>
                <span onClick={()=> deleteItem(item.id)}>&times;</span>
            </div>
        )

    })
    return(
        <div className="ListItems">
            <span>Name</span>
            <span>Age</span>
            <span>Action</span>
           
           {ListItems}
          
        </div>
    )
}
export default ToDoItems;
