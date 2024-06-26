import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Posts.css";
import { uploadImage } from "../uimg/UpImage";
import sanitizeHtml from "sanitize-html";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";

function PostsAdd() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [publishDate, setPublishDate] = useState(new Date());
  const [articleCategoryID, setArticleCategoryID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const editor = useRef(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setHeaderImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!headerImage) {
      setErrorMessage("Image is required.");
      return;
    }

    try {
      const downloadURL = await uploadImage(headerImage, setProgress);

      const editorContent = editor.current.value;
      const sanitizedContent = sanitizeHtml(editorContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          img: ["src", "alt"],
        },
      });

      const postData = {
        Title: title,
        HeaderImage: downloadURL,
        Content: sanitizedContent,
        PublishDate: publishDate.toISOString().split("T")[0],
        AuthorID: userId,
        ArticleCategoryID: parseInt(articleCategoryID),
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/article/createArticle/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error.response);
      setErrorMessage(
        "Error creating post: " + (error.response?.data || error.message)
      );
    }
  };

  const editorConfig = useMemo(() => ({
    readonly: false,
    toolbar: true,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', 'eraser',
      '|', 'ul', 'ol', 'indent', 'outdent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'link', 'table',
      '|', 'align', 'undo', 'redo', 'hr',
      '|', 'copyformat', 'fullsize',
      {
        name: 'uploadImage',
        iconURL: 'https://cdn-icons-png.flaticon.com/512/622/622669.png', // Đường dẫn đến icon của bạn
        exec: async (editor) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
              try {
                const url = await uploadImage(file, setProgress);
                editor.selection.insertHTML(`<img src="${url}" alt="Image" />`);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            }
          };
          input.click();
        },
        tooltip: 'Upload Image'
      }
    ]
  }), [setProgress]);

  return (
    <div className="container post-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="title">Tiêu đề:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="header-image">Ảnh đầu trang</label>
            <input
              type="file"
              className="form-control"
              id="header-image"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        {previewImage && (
          <div className="row mb-3">
            <div className="col">
              <img src={previewImage} alt="Preview" className="preview-image" />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="content">Nội dung</label>
            <div className="editor">
              <JoditEditor
                ref={editor}
                value=""
                config={editorConfig}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="publish-date">Ngày công bố</label>
            <DatePicker
              selected={publishDate}
              onChange={(date) => setPublishDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="article-category-id">Loại bài viết</label>
            <input
              type="number"
              className="form-control"
              id="article-category-id"
              value={articleCategoryID}
              onChange={(e) => setArticleCategoryID(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostsAdd;
