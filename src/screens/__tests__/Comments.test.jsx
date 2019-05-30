import React from "react";
import { render, fireEvent, wait, cleanup } from "react-testing-library";
import axios from "axios";
import Comments from "../Comments";

const comment1 = {
    id: 1,
    comment: "I do love writing tests",
    author: "The Notester"
};
const comment2 = {
    id: 2,
    comment: "Nothing is better than a good comment app",
    author: "Comment Hater"
};
const comments = [comment1, comment2];
const newComment = {
    id: 3,
    comment: "Brave new world of testing",
    author: "Spongebob"
}

describe("Comments Screen", () => {
    afterEach(cleanup);

    beforeEach(() => {
        axios.get = jest.fn(() => Promise.resolve(comments));
        axios.post = jest.fn(() => Promise.resolve(newComment));
    });

    test("it fetches comments and renders them to the page", async () => {
        const { getByText } = render(<Comments />);

        await wait(() => getByText(comment1.comment))

        const firstCommentNode = getByText(comment1.comment);
        const firstAuthorTagNode = getByText(`- ${comment1.author}`);
        const secondCommentNode = getByText(comment2.comment);
        const secondAuthorTagNode = getByText(`- ${comment2.author}`);

        expect(firstCommentNode).toBeDefined();
        expect(firstAuthorTagNode).toBeDefined();
        expect(secondCommentNode).toBeDefined();
        expect(secondAuthorTagNode).toBeDefined();
    });

    test("it creates a new comment, renders it and clears out form upon submission", async () => {
        const { getByLabelText, getByPlaceholderText, getByText } = render(<Comments />)

        await wait(() => getByText(comment1.comment))

        const submitButton = getByText("Add Comment")
        const commentTextFieldNode = getByPlaceholderText("Write something...")
        const nameFieldNode = getByLabelText("Your Name")

        fireEvent.change(commentTextFieldNode, { target: { value: newComment.comment } })
        fireEvent.change(nameFieldNode, { target: { value: newComment.author } })
        fireEvent.click(submitButton)

        await wait(() => getByText(`- ${newComment.author}`))

        expect(commentTextFieldNode.value).toEqual("")
        expect(nameFieldNode.value).toEqual("")
    })
});
