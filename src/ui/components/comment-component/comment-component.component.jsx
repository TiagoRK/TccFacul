import "bootstrap/dist/css/bootstrap.min.css"
import "./comment-component.style.css"

export function CommentComponent({ comment }) {
  function renderComments() {
    if (comment) {
      return (
        <li>
          <div class="comment-list">
            <div className="comment-pic user-picy">
              <img src="https://thispersondoesnotexist.com/image" alt="" />
            </div>
            <div class="comment">
              <h3 className="comment__user-name">{comment.ownerFullname}</h3>
              <p>{comment.commentContent}</p>
            </div>
          </div>
        </li>
      )
    } else {
      return <h1>ERRO!</h1>
    }
  }

  return renderComments()
}
