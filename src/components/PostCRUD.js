import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./PostCRUD.css";
class PostCRUD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      title: "", // Add this line to define the 'title' variable
      body: "",
      isEditing: false,
      editedPostId: null,
      editedPostTitle: "",
      editedPostBody: "",
    };
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      this.setState({ posts: response.data });
    });
  }

  createPost = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: this.state.title,
        body: this.state.body,
        userId: 1,
      })
      .then((response) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, response.data],
          title: "",
          body: "",
        }));
      });
  };

  updatePost = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: this.state.editedPostTitle,
        body: this.state.editedPostBody,
        userId: 1,
      })
      .then((response) => {
        this.setState((prevState) => ({
          posts: prevState.posts.map((post) =>
            post.id === id ? response.data : post
          ),
          isEditing: false,
          editedPostId: null,
          editedPostTitle: "",
          editedPostBody: "",
        }));
      });
  };

  deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          posts: prevState.posts.filter((post) => post.id !== id),
        }));
      });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };

  toggleEdit = (id) => {
    const post = this.state.posts.find((post) => post.id === id);
    this.setState({
      isEditing: true,
      editedPostId: id,
      editedPostTitle: post.title,
      editedPostBody: post.body,
    });
  };

  handleEditTitleChange = (event) => {
    this.setState({ editedPostTitle: event.target.value });
  };

  handleEditBodyChange = (event) => {
    this.setState({ editedPostBody: event.target.value });
  };

  render() {
    const {
      posts,
      isEditing,
      editedPostId,
      editedPostBody,
      editedPostTitle,
      title,
      body,
    } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Posts</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{ width: "35%" }}>Title</th>
              <th style={{ width: "50%" }}>Body</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                {isEditing && editedPostId === post.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editedPostTitle}
                        onChange={this.handleEditTitleChange}
                      />
                    </td>
                    <td>
                      <textarea
                        value={editedPostBody}
                        onChange={this.handleEditBodyChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => this.updatePost(post.id)}>
                        Save
                      </button>
                      <button
                        onClick={() => this.setState({ isEditing: false })}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td style={{ display: "flex", padding: "4%" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="27"
                        fill="currentColor"
                        class="bi bi-trash"
                        style={{ background: "red", marginLeft: "10%"  }}
                        viewBox="0 0 16 16"
                        onClick={() => this.deletePost(post.id)}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => this.toggleEdit(post.id)}
                        width="35"
                        style={{ background: "#1974D2", marginLeft: "10%" }}
                        height="27"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <h2>Create Post</h2>
        <form onSubmit={this.createPost}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={this.handleTitleChange}
            />
          </label>
          <br />
          <label>
            Body:
            <textarea value={body} onChange={this.handleBodyChange} />
          </label>
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default PostCRUD;
