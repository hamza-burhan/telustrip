import Navbar from "@/components/common/Navbar";
import styles from './contact.module.scss';
import React, { useRef, useState, useEffect } from "react";
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        number: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!formData.name.trim()) validationErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            validationErrors.email = "Invalid email format.";
        }
        if (!formData.number.trim()) validationErrors.number = "Contact number is required.";
        if (!formData.subject.trim()) validationErrors.subject = "Subject is required.";
        if (!formData.message.trim()) validationErrors.message = "Message is required.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        alert("Form submitted successfully!");
    };

    return (
        <div className="container mt-5 mb-5">
            <section className={`${styles.contact_us}`}>
                <h1 className="text-center mb-4">Get in touch</h1>
                <p className="text-center mb-4"> Drop us a message and our team will be happy to assist you.</p>
                <div className={`card p-4 shadow`}>
                    <form onSubmit={handleSubmit} className={styles.form}   >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        id="floatingName"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingName">Full Name</label>
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        id="floatingEmail"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingEmail">Email address</label>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="subject"
                                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                                        id="floatingSubject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingSubject">Subject</label>
                                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        name="number"
                                        className={`form-control ${errors.number ? "is-invalid" : ""}`}
                                        id="floatingNumber"
                                        placeholder="Number"
                                        value={formData.number}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingNumber">Number</label>
                                    {errors.subject && <div className="invalid-feedback">{errors.number}</div>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="message"
                                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                        id="floatingMessage"
                                        placeholder="Your message"
                                        style={{ height: "150px" }}
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    <label htmlFor="floatingMessage">Message</label>
                                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                </div>
                            </div>

                        </div>








                        <button type="submit" className="btn btn-primary w-100">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            <section className="location">
                <span>Our Location</span>
                <h2>Find Us on the Map</h2>
                <p>Locate our office effortlessly on Google Maps.</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.13176239381!2d74.31338887390129!3d31.54799834577957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905a520618aa9%3A0x3d16ac091001a871!2sLucky%20Centre%20Jail%20Road!5e0!3m2!1sen!2s!4v1743029131968!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
            <section className="location">
                <span>Contact Us</span>
                <h3>Let’s Connect</h3>
                <p>Have questions? Need assistance? We’re here to help!</p>

                <div className="row g-3">
                    <div className="col-md-3">
                        <div className="rounded card border-0 bg-blue-50 px-3 py-4 h-100">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.0615234" width="48" height="48" rx="10" fill="#3776F4"></rect><path d="M34 18.0615C34 16.9615 33.1 16.0615 32 16.0615H16C14.9 16.0615 14 16.9615 14 18.0615M34 18.0615V30.0615C34 31.1615 33.1 32.0615 32 32.0615H16C14.9 32.0615 14 31.1615 14 30.0615V18.0615M34 18.0615L24 25.0615L14 18.0615" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="mt-5 mb-2 text-primary">Email Us</p>
                            <p className="text-primary small">Drop us a message anytime.</p>
                            <p className="mt-1 text-primary small mb-0">
                                <a className="stretched-link" href="mailto:contact@telustrip.com">
                                    contact@telustrip.com
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="rounded card border-0 bg-blue-50 px-3 py-4 h-100">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.0615234" width="48" height="48" rx="10" fill="#3776F4"></rect><path d="M34 18.0615C34 16.9615 33.1 16.0615 32 16.0615H16C14.9 16.0615 14 16.9615 14 18.0615M34 18.0615V30.0615C34 31.1615 33.1 32.0615 32 32.0615H16C14.9 32.0615 14 31.1615 14 30.0615V18.0615M34 18.0615L24 25.0615L14 18.0615" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="mt-5 mb-2 text-primary">Customer Support</p>
                            <p className="text-primary small">We’re here for you 24/7.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="rounded card border-0 bg-blue-50 px-3 py-4 h-100">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.0615234" width="48" height="48" rx="10" fill="#3776F4"></rect><path d="M34 18.0615C34 16.9615 33.1 16.0615 32 16.0615H16C14.9 16.0615 14 16.9615 14 18.0615M34 18.0615V30.0615C34 31.1615 33.1 32.0615 32 32.0615H16C14.9 32.0615 14 31.1615 14 30.0615V18.0615M34 18.0615L24 25.0615L14 18.0615" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="mt-5 mb-2 text-primary">Visit Us</p>
                            <p className="text-primary small">Come meet us at our office.</p>
                            <p className="text-primary small mb-0">1234 Main Street, City, Country</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="rounded card border-0 bg-blue-50 px-3 py-4 h-100">
                        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.0615234" width="48" height="48" rx="10" fill="#3776F4"></rect><path d="M34 18.0615C34 16.9615 33.1 16.0615 32 16.0615H16C14.9 16.0615 14 16.9615 14 18.0615M34 18.0615V30.0615C34 31.1615 33.1 32.0615 32 32.0615H16C14.9 32.0615 14 31.1615 14 30.0615V18.0615M34 18.0615L24 25.0615L14 18.0615" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="mt-5 mb-2 text-primary">Call Us</p>
                            <p className="text-primary small">Let’s talk! We’d love to hear from you.</p>
                            <p className="text-primary small mb-0">
                                <a href="tel:+1234567890">+1 234 567 890</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        
        </div>
    );
};


export default ContactPage;
