import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"

export function FriendCardComponent({ user }) {
  return (
    <li>
      <Link
        to={{
          pathname: "/selected-profile",
          state: { targetEmail: user.email },
        }}
      >
        <div class="comment-list friendlist">
          <div className="comment-pic user-picy">
            <img src="https://thispersondoesnotexist.com/image" alt="" />
          </div>
          <div class="comment">
            <h3 className="comment__user-name">{user.firstName + " " + user.lastName}</h3>
            <p>{user.nickname}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
