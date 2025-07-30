import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('shoppingListItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Save to localStorage on any item change
  useEffect(() => {
    localStorage.setItem('shoppingListItems', JSON.stringify(items));
    calculateTotal(items);
    setTotalCount(items.length);
  }, [items]);

  const handleAddButtonClick = () => {
    if (inputValue.trim() === '') return;

    const newItem = {
      itemName: inputValue,
      quantity: 0,
      isSelected: false,
      isEditing: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue('');
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 0) newItems[index].quantity--;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const calculateTotal = (itemList) => {
    const totalItemCount = itemList.reduce((total, item) => total + item.quantity, 0);
    setTotalItemCount(totalItemCount);
  };

  const toggleEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = !newItems[index].isEditing;
    setItems(newItems);
  };

  const handleEditChange = (e, index) => {
    const newItems = [...items];
    newItems[index].itemName = e.target.value;
    setItems(newItems);
  };

  return (
    <div className='app-background'>
       <h1 className='main-heading'>Shopping List</h1>
      <div className='main-container'>
        <div className='add-item-box'>
          <input
            id='add-item'
            name='add-item'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='add-item-input'
            placeholder='Add an item...'
          />
          <FontAwesomeIcon icon={faPlus} onClick={handleAddButtonClick} />
        </div>

        <div className='item-list'>
          {items.map((item, index) => (
            <div className='item-container' key={index}>
              <div className='item-name' onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : item.isEditing ? (
                  <input
                    type='text'
                    value={item.itemName}
                    onChange={(e) => handleEditChange(e, index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>

              <div className='quantity'>
                <button onClick={() => handleQuantityDecrease(index)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityIncrease(index)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              <div className='actions'>
                <button onClick={() => toggleEdit(index)}>
                  <FontAwesomeIcon icon={item.isEditing ? faSave : faEdit} />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='total'>
          {totalItemCount <= 1 ? 'Item' : 'Items'} : {totalItemCount}
        </div>
        <div className='total1'>Total : {totalCount}</div>
      </div>
    </div>
  );
};

export default App;
