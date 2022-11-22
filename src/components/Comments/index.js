import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  changeInput = event => {
    this.setState({nameInput: event.target.value})
  }

  changeTextArea = event => {
    this.setState({commentInput: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state

    const initialBackgroundColor = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onToggelLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteClicked = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="container">
        <h1 className="heading">Comments</h1>
        <div className="top-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-image"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <p>Say Something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input-name"
              onChange={this.changeInput}
              value={nameInput}
            />
            <textarea
              type="description"
              placeholder="Your Comment"
              rows="6"
              onChange={this.changeTextArea}
              className="input-description"
              value={commentInput}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
        </div>
        <hr className="line" />
        <div className="bottom-section">
          <div className="comments-count-card">
            <p className="comments-count">{commentsList.length}</p>
            <p className="comments-name">Comments</p>
          </div>
          <ul>
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                eachCommentDetails={eachComment}
                toggleIsLiked={this.onToggelLike}
                deleteComment={this.onDeleteClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
