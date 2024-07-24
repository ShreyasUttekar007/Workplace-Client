import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AWS from "aws-sdk";
import "../css/viewMom.css";
import localforage from "localforage";
import Dashboard from "./Dashboard";

AWS.config.update({
  accessKeyId: "AKIAYS2NVAK3QUXQZW5X",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const ViewMom = () => {
  const { momId } = useParams();
  const [formData, setFormData] = useState({
    district: "",
    zone: "",
    pc: "",
    constituency: "",
    leaderName: "",
    dom: "",
    designation: "",
    partyName: "",
    remarks: "",
    tags:"",
    photo: null,
    document: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoUrl = formData.photo
          ? await uploadFileToS3(formData.photo, "images")
          : null;

        const documentUrl = formData.document
          ? await uploadFileToS3(formData.document, "documents")
          : null;

        const updatedMomData = {
          ...formData,
          photo: photoUrl,
          document: documentUrl,
        };

        setFormData(updatedMomData);
        const token = await localforage.getItem("token");
        const response = await axios.get(
          `http://15.206.128.21:5000/api/moms/get-mom-by-id/${momId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching mom data:", error);
      }
    };

    fetchData();
  }, [momId]);

  const uploadFileToS3 = async (file, folder) => {
    const params = {
      Bucket: "mom-files-data",
      Key: `${folder}/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  };

  return (
    <>
      <Dashboard />
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <div>
              <img
                src={formData.photo}
                className="card-img"
                alt={formData.leaderName}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{formData.leaderName}</h5>
              <p className="card-text">
                <strong>Party Name:</strong> {formData.partyName}
              </p>
              <p className="card-text">
                <strong>Designation:</strong> {formData.designation}
              </p>
            </div>
          </div>
          <div className="text-dom">
            <p className="card-text">
              <strong>Date of Meeting:</strong> {new Date(formData.dom).toLocaleDateString('en-GB')}
            </p>
            <p className="card-text">
              <strong>Tags:</strong> {Array.isArray(formData.tags) ? formData.tags.map(tag => `#${tag}`).join(' ') : formData.tags}
            </p>
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Remarks:</strong> {formData.remarks}
            </p>
            <a
              href={formData.document}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Read MoM
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMom;
