
function HelpModal() {
    return (
        <>
            <div className="offcanvas-body small row">
                <div className="col-4">
                    <div className="row">
                        <h3><strong className="offcanvas-title" id="offcanvasBottomLabel">OG Chat Support</strong></h3>
                    </div>
                    <div className="row py-5">
                        <h2>Let us know how you use OG Chat <br />
                            by providing the necessary information below.<br />
                            Then, tap or click "Send Question" to contact us.</h2>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <div className="col-12 mb-3">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floatingInput1" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput1">Email address</label>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floatingInput2" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput2">User name</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floatingInput3" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput3">Phone number</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                    style={{ height: '210px' }} />
                                <label htmlFor="floatingTextarea2">Question</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="row mb-5">
                        <div className="col-12 d-flex justify-content-end align-items-center">
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 py-3 d-flex justify-content-center ">
                            <button type="button" className="btn btn-success">SEND QUESTION</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HelpModal;