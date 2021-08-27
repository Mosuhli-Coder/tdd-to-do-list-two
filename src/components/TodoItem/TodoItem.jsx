import React from 'react'
import styles from './TodoItem.module.css'

const TodoItem = ({todo, removeHandler}) => (
    <div className={styles.itemContainer}>
        <div>{todo.title}</div>
        <button
        className={styles.closeBtn} data-testid={'close-btn-${todo.id}'}
        onClick={() => removeHandler(todo.id)}
        >
            X
        </button>
    </div>
    
);

export default TodoItem;