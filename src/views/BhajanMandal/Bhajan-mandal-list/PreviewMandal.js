import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBhajanById, fetchVideos } from "../../Services/BhajanMandalApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

const PreviewMandal = () => {
  const { id } = useParams();
  const [bhajanData, setBhajanData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;


   const { globalContextBhajanMandalCategoryData } = useContext(AppContext);
  const handleEdit = (video) => {
    setCurrentVideo(video);
    setShowEditModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const payload = {
      video_id: currentVideo._id,
      bhajan_mandal_id: currentVideo.bhajan_mandal_id,
      video_url: event.target.video_url.value,
      title: event.target.title.value,
      date: event.target.date.value,
    };

    try {
      const response = await fetch(`${BASE_URL}/bhajanMandal/edit-video`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Video updated successfully");
        setShowEditModal(false);
        fetchVideosData(); // Refresh the video list
      } else {
        console.error(result);
        toast.error("Failed to update video: " + result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the video");
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const response = await fetch(`${BASE_URL}/bhajanMandal/delete/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        toast.success("Video deleted successfully");
        fetchVideosData(); // Refresh the video list
      } else {
        toast.error("Failed to delete video");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the video");
    }
  };

  const fetchVideosData = async () => {
    try {
      const videosResponse = await fetchVideos(id);
      setVideos(videosResponse.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bhajan = await getBhajanById(id);
        setBhajanData(bhajan.data);
        fetchVideosData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  if (!bhajanData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <ToastContainer />
      
      {/* Bhajan Details Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white py-3">
          <h6 className="mb-0">{bhajanData.bhajan_name}</h6>
        </div>
        <div className="card-body p-3">
          <div className="row">
            {/* Content Section */}
            <div className="col-md-8">
              <table className="table table-striped table-borderless table-sm">
                <tbody>
                <tr>
  <th className="text-muted small" style={{ width: "30%" }}>Bhajan Category</th>
  <td className="small">
    {(() => {
      const category = globalContextBhajanMandalCategoryData.find(
        (item) => item._id === bhajanData.bhajan_category
      );
      return category ? category.category : "-"; // Display category name if found, otherwise "-"
    })()}
  </td>
</tr>

                  <tr>
                    <th className="text-muted small">Bhajan Members</th>
                    <td className="small">{bhajanData.bhajan_member}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Bhajan Price</th>
                    <td className="small">₹{bhajanData.bhajan_price}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Created At</th>
                    <td className="small">{new Date(bhajanData.created_at).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Expiry Year</th>
                    <td className="small">{bhajanData.exp_year}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Mandali Address</th>
                    <td className="small">
                      {bhajanData.mandali_address.address}, {bhajanData.mandali_address.city}, {bhajanData.mandali_address.state}, {bhajanData.mandali_address.country}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Slug URL</th>
                    <td className="small">
                      <a href={`/${bhajanData.slug_url}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        {bhajanData.slug_url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Status</th>
                    <td className="small">
                      <span className={`badge ${bhajanData.status === "1" ? "bg-success" : "bg-danger"}`}>
                        {bhajanData.status === "1" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Updated At</th>
                    <td className="small">{new Date(bhajanData.updated_at).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">ID</th>
                    <td className="small">{bhajanData._id}</td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Short Description</th>
                    <td className="small">
                      <div dangerouslySetInnerHTML={{ __html: bhajanData.short_discription }} />
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted small">Long Description</th>
                    <td className="small">
                      <div dangerouslySetInnerHTML={{ __html: bhajanData.long_discription }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Image Section */}
            <div className="col-md-4 d-flex align-items-start justify-content-center">
              <img
                src={`http://34.131.41.101:3000${bhajanData.bhajan_image}`}
                alt={bhajanData.bhajan_name}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bhajan Mandal Videos Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white py-3">
          <h6 className="mb-0">Mandali Videos</h6>
        </div>
        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-borderless table-sm">
              <thead>
                <tr>
                  <th className="text-muted">Title</th>
                  <th className="text-muted">Video URL</th>
                  <th className="text-muted">Date</th>
                  <th className="text-muted">Uploaded At</th>
                  <th className="text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video._id}>
                    <td>{video.title}</td>
                    <td>
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        Watch Video
                      </a>
                    </td>
                    <td>{new Date(video.date).toLocaleDateString()}</td>
                    <td>{new Date(video.uploaded_at).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(video)}
                        className="btn btn-info btn-sm me-2 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="btn btn-danger btn-sm text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Video Modal */}
      {showEditModal && (
  <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="editVideoModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title mb-0" id="editVideoModalLabel">Edit Video</h5>
          <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
            <span>&times;</span>
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={currentVideo?.title}
                required
                placeholder="Enter video title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="video_url">Video URL</label>
              <input
                type="url"
                className="form-control"
                id="video_url"
                defaultValue={currentVideo?.video_url}
                required
                placeholder="Enter video URL"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                defaultValue={currentVideo?.date.split('T')[0]} // Format date for input
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PreviewMandal;