import Navbar from "@/components/common/Navbar";
import styles from './confirm.module.scss';
import { CiEdit } from "react-icons/ci";
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useRef, useState, useEffect } from "react";


const ConfirmationPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [formData, setFormData] = useState({
        title: '',
        gender: '',
        passportName: '',
        day: '',
        month: '',
        year: '',
        nationality: '',
    });
    const [formErrors, setFormErrors] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        setFormErrors(false); 
    };

    const validateForm = () => {
        const { title, gender, passportName, day, month, year, nationality } = formData;
        return (
          title &&
          gender &&
          passportName &&
          day &&
          month &&
          year &&
          nationality
        );
    };

    const checkForm = () => {
        if (!validateForm()) {
          setFormErrors(true);
          setShow(true)
          return;
        }
        setFormErrors(false);
    };
    
    const handleSave = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleShowModal = () => {
        setShow(true)
    }

    return (
        <>
            <Navbar isFixed={true} />
            <div className={styles.content}>
                <div className="row">
                    <div className="col-8">
                        <h2 className="text-muted mb-5">Who&apos;s travelling?</h2>
                        <div className="card p-3 rounded-4">
                            <div className="d-flex justify-content-between">
                                <div className="hstack gap-3 w-50">
                                    <div className={styles.avatar}>
                                        <p className="p-0 m-0">A</p>
                                    </div>
                                    <div className="vstack gap-1">
                                        <p className="p-0 m-0">Adult 1</p>
                                        <span style={{color: '#d55f3b'}}>Please chehck and complete field(s)</span>
                                    </div>
                                </div>
                                <div className="w-50 d-flex justify-content-end">
                                    <button 
                                        onClick={() => handleShowModal()} 
                                        className={`${styles.confirmFare} h-100`}
                                    >
                                        Edit <CiEdit style={{ fontSize: '24px' }}/>
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="w-100 mt-3">
                           {formErrors && (
                                <div
                                >
                                    Please fill in all required fields
                                </div>
                            )}
                            <button onClick={checkForm} className={`${styles.confirmFare} h-100 w-100`} >Continue to contact details</button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="vstack gap-2 w-100">
                                    <h3>Trip details</h3>
                                    <span className="text-muted">One way trip</span>
                                    <h3>Lahor to Doha</h3>
                                    <span className="text-muted">Sat, 8 March 2025</span>
                                    <hr className="border-2"></hr>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span>Grand Total</span>
                                        <span>PKR 388,050.00</span>
                                    </div>
                                    <div className="mt-3">
                                        <a
                                            href="#"
                                            className="text-black"
                                        >
                                            Payment Summary
                                        </a>
                                    </div>
                                    <div className="w-100 mt-2">
                                        <button className={`${styles.confirmFare} h-100 w-100`} >Continue</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={false} style={{width: '700px'}}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Adult passanger</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <>
                    <form className="p-3" onSubmit={handleSave}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <select
                            className="form-select"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            >
                            <option value="">Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Dr">Dr</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <div className="d-flex gap-2">
                            <div className="form-check rounded p-2 border">
                                <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="male">
                                Male
                                </label>
                            </div>
                            <div className="form-check rounded p-2 border">
                                <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="female">
                                Female
                                </label>
                            </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passportName" className="form-label">First/Middle Name on Passport</label>
                            <input
                            type="text"
                            className="form-control"
                            id="passportName"
                            name="passportName"
                            placeholder="Enter name"
                            value={formData.passportName}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <div className="d-flex gap-2">
                            <select
                                className="form-select"
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                            >
                                <option value="">Day</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                                ))}
                            </select>
                            <select
                                className="form-select"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                            >
                                <option value="">Month</option>
                                {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December",
                                ].map((month, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {month}
                                </option>
                                ))}
                            </select>
                            <select
                                className="form-select"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            >
                                <option value="">Year</option>
                                {Array.from({ length: 100 }, (_, i) => (
                                <option key={i} value={2025 - i}>
                                    {2025 - i}
                                </option>
                                ))}
                            </select>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="nationality" className="form-label">Nationality</label>
                            <select
                            className="form-select"
                            id="nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            >
                            <option value="">Select Nationality</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            </select>
                        </div>

                        <button type="submit" className={`${styles.confirmFare} h-100 w-100`}>
                            Save and Continue
                        </button>
                    </form>
                </>
            </Offcanvas.Body>
            
          </Offcanvas>
        </>
    );
  };
  
  export default ConfirmationPage;
  