import React from "react";
import axios from "axios";

class CommentForm extends React.Component {
    initialState = {
        comment: "",
        author: ""
    };
    state = this.initialState;

    handleOnChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    hasInvalidFields = () => {
        const { comment, author } = this.state;

        if (comment.trim() !== "" && author.trim() !== "") {
            return false;
        }

        return true;
    };

    handleOnSubmit = event => {
        event.preventDefault();
        const newComment = this.state;

        this.createComment(newComment);
    };

    createComment = newComment => {
        axios
            .post("/api/comments", { newComment })
            .then(comment => {
                this.props.addComment(comment);
                this.clearForm();
            })
            .catch(console.error);
    };

    clearForm = () => {
        this.setState(this.initialState);
    };

    render() {
        const { comment, author } = this.state;
        const isDisabled = this.hasInvalidFields();

        return (
            <form onSubmit={this.handleOnSubmit} style={styles.form}>
                <div>
                    <textarea
                        style={styles.commentBox}
                        onChange={this.handleOnChange}
                        placeholder="Write something..."
                        name="comment"
                        value={comment}
                    />
                </div>
                <div>
                    <label htmlFor="author" aria-labelledby="author">
                        Your Name
                    </label>
                    <input
                        style={styles.inputField}
                        onChange={this.handleOnChange}
                        id="author"
                        type="text"
                        name="author"
                        value={author}
                    />
                </div>
                <button style={styles.button} disabled={isDisabled}>
                    Add Comment
                </button>
            </form>
        );
    }
}

const styles = {
    form: {
        margin: "auto",
        padding: "0px",
        width: "500px"
    },
    commentBox: {
        width: "494px",
        height: "80px",
        marginBottom: "12px"
    },
    inputField: {
        width: "360px",
        float: "right"
    },
    button: {
        marginTop: "12px",
        width: "500px",
        color: "#fff",
        backgroundColor: "#767676",
        padding: "6px",
        borderRadius: "8px"
    }
};

export default CommentForm;
