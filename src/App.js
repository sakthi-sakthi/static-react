import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formDataList, setFormDataList] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://laravelvercel-eight.vercel.app/api/api/store-form-data",
        {
          name,
          email,
          message,
        }
      );

      console.log("Data stored:", response.data);
      fetchFormData(); // Fetch updated data after submission
    } catch (error) {
      console.error("Submission failed:", error.response.data);
    }
  };

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        "https://laravelvercel-eight.vercel.app/api/api/get-form-data"
      );
      setFormDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []); // Fetch data on component mount

  return (
    <div>
      <h1>Form Submission</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Message: </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit Form</button>
      </form>

      <h2>Form Data:</h2>
      <ul>
        {formDataList.map((data) => (
          <li key={data.id}>
            <strong>Name:</strong> {data.name}, <strong>Email:</strong>{" "}
            {data.email}, <strong>Message:</strong> {data.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
