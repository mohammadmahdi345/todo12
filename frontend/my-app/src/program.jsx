import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./input";

const Program = () => {
  const [program, setProgram] = useState({ title: "", description: "", date: "" });
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const fixedData = { ...program, date: new Date(program.date).toISOString().split("T")[0] };
      const response = await axios.post("http://localhost:8007/task/", fixedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const taskId = response.data.id;
      console.log(response.data.id) // گرفتن id تسک
      navigate(`/time/${taskId}`); // هدایت به تایم اسلات همان تسک
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("❌ ثبت تسک ناموفق بود");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="program-form">
        <Input name="title" className="program-input" value={program.title} onChange={handleChange} label='عنوان' />
        <Input name="description" className="program-input" value={program.description} onChange={handleChange} label='توضیح' />
        <Input name="date" type="date" className="program-input" value={program.date} onChange={handleChange} label='تاریخ' />
        <button type="submit" className="program-submit-btn">ثبت تسک</button>
      </form>
      <p className="program-message">{message}</p>

    </>
  );
};

export default Program;
