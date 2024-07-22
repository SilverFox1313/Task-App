const TaskCard = ({ post, handleDelete, handleEdit }) => {
  return (
    <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
            <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.title}
            </h3>
            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.body}</p>
            <div className={`pill ${post.priority}`}>
              {post.priority} priority
            </div>
            </div>
        </div>
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter font-bold text-sm green_gradient cursor-pointer'
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className='font-inter font-bold text-sm orange_gradient cursor-pointer'
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
    </div>
  )
}

export default TaskCard