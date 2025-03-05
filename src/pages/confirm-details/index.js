import Navbar from "@/components/common/Navbar";
import styles from './confirm.module.scss';

const ConfirmationPage = () => {
    return (
        <>
            <Navbar isFixed={true} />
            <div className={styles.content}>
                <div className="row">
                    <div className="col-8">
                        <h2 className="text-muted">Who&apos;s travelling?</h2>

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
                                    <div className="w-100">
                                        <button className={styles.confirmFare} >Continue</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
  };
  
  export default ConfirmationPage;
  