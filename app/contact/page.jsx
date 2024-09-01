"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+359) 883 474 455",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "teodor.at.tod@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Veliko Tarnovo, Bulgaria",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.trim() === "") {
      setErrors({ ...errors, [name]: "This field is required" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors({ ...errors, [name]: "This field is required" });
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((field) => field.trim() !== "") &&
      captchaToken !== null &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please complete all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { email: formData.email, name: `${formData.firstname} ${formData.lastname}` },
          to: [{ email: process.env.NEXT_PUBLIC_EMAIL_RECEIVER, name: "Your Name" }],
          subject: "New Contact Form Submission",
          htmlContent: `<p>You have a new message from ${formData.firstname} ${formData.lastname}:</p>
                        <p>Email: ${formData.email}</p>
                        <p>Phone: ${formData.phone}</p>
                        <p>Message: ${formData.message}</p>
                        <p>reCAPTCHA Token: ${captchaToken}</p>`,
        },
        {
          headers: {
            "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error("There was an error sending the email:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Contact me</h3>
              <p className="text-white/60">
                If you have a question or just want to connect, please send me a
                message. I'll get back to you as soon as possible.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="firstname"
                    type="text"
                    placeholder="Firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                </div>
                <div>
                  <Input
                    name="lastname"
                    type="text"
                    placeholder="Lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <Input
                    name="phone"
                    type="text"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <Textarea
                  name="message"
                  className="h-[200px]"
                  placeholder="Type your message here."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Your reCAPTCHA site key
                onChange={handleCaptchaChange}
              />
              <div className="flex justify-center mt-4">
                <Button type="submit" size="md" className="max-w-40" disabled={!isFormValid()}>
                  Send message
                </Button>
              </div>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10 ">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6 ">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
