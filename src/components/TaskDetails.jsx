{
    comments.length > 0 ? (
        <ul className="comments-list">
            {comments
                .filter(comment => !comment.parent_id)
                .map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment_header">
                            <img
                                src={comment.author_avatar}
                                alt={comment.author_nickname}
                                className="comment_author_img"
                            />
                            <span className="comment_author">
                                {comment.author_nickname}
                            </span>
                        </div>
                        <p className="comment_text">{comment.text}</p>

                        {/* Reply ღილაკი */}
                        <button
                            onClick={() => setReplyTo(comment.id)}
                            className="reply-button"
                        >
                            პასუხი
                        </button>

                        {/* Reply ველი */}
                        {replyTo === comment.id && (
                            <div className="reply-input">
                                <textarea
                                    placeholder="დაწერე პასუხი..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <div className="reply-actions">
                                    <button
                                        onClick={handleSubmitComment}
                                        className="submit-reply"
                                        disabled={!commentText.trim()}
                                    >
                                        პასუხის გაგზავნა
                                    </button>
                                    <button
                                        onClick={() => {
                                            setReplyTo(null);
                                            setCommentText('');
                                        }}
                                        className="cancel-reply"
                                    >
                                        გაუქმება
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Reply-ების ჩვენება */}
                        {comments
                            .filter(reply => reply.parent_id === comment.id)
                            .map(reply => (
                                <div key={reply.id} className="reply-item">
                                    <div className="comment_header">
                                        <img
                                            src={reply.author_avatar}
                                            alt={reply.author_nickname}
                                            className="comment_author_img"
                                        />
                                        <span className="comment_author">
                                            {reply.author_nickname}
                                        </span>
                                    </div>
                                    <p className="comment_text">{reply.text}</p>
                                    <button
                                        onClick={() => setReplyTo(comment.id)}
                                        className="reply-button"
                                    >
                                        პასუხი
                                    </button>
                                </div>
                            ))
                        }
                    </li>
                ))}
        </ul>
    ) : (
    <p>კომენტარის გარეშე</p>
)
} 