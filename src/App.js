import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [formDataList, setFormDataList] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate name length
    if (name.length < 3) {
      toast.error("Name should be at least 3 characters.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if email already exists
    const emailExists = formDataList.some((data) => data.email === email);
    if (emailExists) {
      toast.error("Email already exists. Please use a different email.");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Check if mobile number already exists
    const mobileExists = formDataList.some((data) => data.mobile === mobile);
    if (mobileExists) {
      toast.error(
        "Mobile number already exists. Please use a different number."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://catgenius.up.railway.app/api/store-form-data",

        {
          name,
          email,
          message,
          mobile,
        }
      );
      console.log("Full response:", response);

      // Check for variations in the response structure
      const responseData =
        response?.data && response?.data?.result
          ? response?.data?.result
          : response?.data;

      if (responseData) {
        toast.success("Form submitted successfully!");
        fetchFormData();
      } else {
        toast.error("Invalid response. Please try again.");
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
      console.error("Submission failed:", error.response.data);
    }
  };

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        "https://catgenius.up.railway.app/api/get-form-data"

      );
      setFormDataList(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []); // Fetch data on component mount

  return (
    <div className="registration-form">
      <Form onSubmit={handleFormSubmit}>
        <div className="form-icon">
          <span>
            <i className="icon icon-user" />
          </span>
        </div>
        <Form.Group controlId="formName">
          <Form.Control
            type="text"
            className="form-control item"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            className="form-control item"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formMobile">
          <Form.Control
            type="tel"
            className="form-control item"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Control
            as="textarea"
            rows={3}
            className="form-control item"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <div className="form-group">
          <Button type="submit" className="btn btn-block create-account">
            Send Message
          </Button>
        </div>
      </Form>
      <div className="social-media"></div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
