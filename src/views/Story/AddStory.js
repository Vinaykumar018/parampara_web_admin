import React, { useState } from "react";
import { FaPlus, FaUpload, FaImage } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

const AddStory = () => {
  const [story, setStory] = useState({
    title: "",
    description: "",
    subStories: [{ title: "", content: "", images: [] }],
  });

  const handleChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleSubStoryChange = (index, field, value) => {
    const newSubStories = [...story.subStories];
    newSubStories[index][field] = value;
    setStory({ ...story, subStories: newSubStories });
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0]; // Get selected file
    if (!file) return;

    const newSubStories = [...story.subStories];
    newSubStories[index].images.push(file); // Store file
    setStory({ ...story, subStories: newSubStories });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", story.title);
    formData.append("description", story.description);

    story.subStories.forEach((sub, index) => {
      formData.append(`subStories[${index}][title]`, sub.title);
      formData.append(`subStories[${index}][content]`, sub.content);
      sub.images.forEach((image) => {
        formData.append(`subStories[${index}][images]`, image);
      });
    });

    try {
      const response = await fetch("http://192.168.1.34:3000/api/story/add", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8",
        },
        body: formData, // Send FormData
      });

      const data = await response.json();
      console.log("Story added:", data);
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  return (
    <div className="container mt-4 p-3 border rounded shadow-sm" style={{ maxWidth: "400px", fontSize: "12px" }}>
      <h5 className="text-center">Add Story</h5>

      <input
        type="text"
        className="form-control form-control-sm mb-2"
        name="title"
        placeholder="Story Title"
        value={story.title}
        onChange={handleChange}
      />

      <textarea
        className="form-control form-control-sm mb-2"
        name="description"
        placeholder="Story Description"
        value={story.description}
        onChange={handleChange}
      />

      {story.subStories.map((sub, index) => (
        <div key={index} className="mb-2 p-2 border rounded bg-light">
          <input
            type="text"
            className="form-control form-control-sm mb-1"
            placeholder="Chapter Title"
            value={sub.title}
            onChange={(e) => handleSubStoryChange(index, "title", e.target.value)}
          />

          <textarea
            className="form-control form-control-sm mb-1"
            placeholder="Content"
            value={sub.content}
            onChange={(e) => handleSubStoryChange(index, "content", e.target.value)}
          />

          <div className="d-flex align-items-center">
            <label className="btn btn-sm btn-outline-primary">
              <FaImage className="text-primary me-2" /> Upload Image
              <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
            </label>
          </div>
        </div>
      ))}

      <button className="btn btn-sm btn-outline-primary w-100 mb-2" onClick={() => setStory({ ...story, subStories: [...story.subStories, { title: "", content: "", images: [] }] })}>
        <FaPlus /> Add Chapter
      </button>

      <button className="btn btn-sm btn-primary w-100" onClick={handleSubmit}>
        <FaUpload /> Upload Story
      </button>
    </div>
  );
};

export default AddStory;
