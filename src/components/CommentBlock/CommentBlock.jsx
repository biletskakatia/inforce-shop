import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchComments, addComment, deleteComment, } from '../../redux/commentsOps';
import css from './CommentBlock.module.css';

const CommentBlock = ({ productId }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const { isLoading, error, byProduct } = useSelector(state => state.comments)
    const comments = byProduct[productId] || []

    useEffect(() => {
        dispatch(fetchComments(productId))
    }, [dispatch, productId])

    const handleSubmit = e => {
        e.preventDefault()
        if (text.trim() === '') return
    

    const newComment = {
        productId,
        description: text,
        date: new Date().toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
    }
    dispatch(addComment(newComment))
    setText('')
    }

    const handleDelete = id => {
        dispatch(deleteComment(id))
        }
    return (
        <div>
        {isLoading && <p>Loading comments...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <ul className={css.list}>
            {comments.map(c => (
            <li key={c.id} className={css.comment}>
                <p>{c.description}</p>
                <small>{c.date}</small>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
            </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit} className={css.form}>
            <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
            />
            <button type="submit">Add Comment</button>
        </form>
        </div>
)
}

export default CommentBlock
