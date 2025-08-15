import { useState } from "react";

export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");

  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  const [agree, setAgree] = useState(false);

  // Error States
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [planError, setPlanError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const inputFnameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
    setFnameError(false);
  };

  const inputLnameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLname(e.target.value);
    setLnameError(false);
  };

  const selectPlanOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(e.target.value);
    setPlanError(false);
  };

  const radioGenderMaleOnChange = () => {
    setGender("male");
    setGenderError(false);
  };

  const radioGenderFemaleOnChange = () => {
    setGender("female");
    setGenderError(false);
  };

  const computeTotalPayment = () => {
    let base = 0;
    if (plan === "funrun") base = 500;
    if (plan === "mini") base = 800;
    if (plan === "half") base = 1200;
    if (plan === "full") base = 1500;

    let extras = 0;
    if (buyBottle) extras += 200;
    if (buyShoes) extras += 600;
    if (buyCap) extras += 400;

    const isDiscount = buyBottle && buyShoes && buyCap;
    if (isDiscount) extras *= 0.8;

    return base + extras;
  };

  const registerBtnOnClick = () => {
    let isValid = true;

    if (fname === "") {
      setFnameError(true);
      isValid = false;
    }
    if (lname === "") {
      setLnameError(true);
      isValid = false;
    }
    if (plan === "") {
      setPlanError(true);
      isValid = false;
    }
    if (gender === "") {
      setGenderError(true);
      isValid = false;
    }

    if (isValid) {
      alert(
        `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  return (
    <div className="modal fade" id="modalregister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">

            {/* First & Last Name */}
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${fnameError ? "is-invalid" : ""}`}
                  value={fname}
                  onChange={inputFnameOnChange}
                />
                {fnameError && <div className="invalid-feedback">Invalid last name</div>}
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${lnameError ? "is-invalid" : ""}`}
                  value={lname}
                  onChange={inputLnameOnChange}
                />
                {lnameError && <div className="invalid-feedback">Invalid last name</div>}
              </div>
            </div>

            {/* Plan */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select className={`form-select ${planError ? "is-invalid" : ""}`} value={plan} onChange={selectPlanOnChange}>
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
              </select>
              {planError && <div className="invalid-feedback">Please select a Plan</div>}
            </div>

            {/* Gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input className="form-check-input me-2" type="radio" checked={gender === "male"} onChange={radioGenderMaleOnChange} />Male 👨
                <input className="form-check-input mx-2" type="radio" checked={gender === "female"} onChange={radioGenderFemaleOnChange} />Female 👩
                {genderError && <div className="text-danger">Please select gender</div>}
              </div>
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input type="checkbox" className="form-check-input me-2" checked={buyBottle} onChange={(e) => setBuyBottle(e.target.checked)} />
                Bottle 🍼 (200 THB)
              </div>
              <div>
                <input type="checkbox" className="form-check-input me-2" checked={buyShoes} onChange={(e) => setBuyShoes(e.target.checked)} />
                Shoes 👟 (600 THB)
              </div>
              <div>
                <input type="checkbox" className="form-check-input me-2" checked={buyCap} onChange={(e) => setBuyCap(e.target.checked)} />
                Cap 🧢 (400 THB)
              </div>
            </div>
              <div>
              {(buyBottle && buyShoes && buyCap) && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            </div>
            <div className="alert alert-primary mt-3">
              Promotion📢 Buy all items to get 20% Discount
            </div>
            {/* Total Payment */}
            <div>
                Total Payment : {computeTotalPayment().toLocaleString()} THB
              </div>
          </div>

          <div className="modal-footer">
            <div>
              <input type="checkbox" className="form-check-input me-2" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              I agree to the terms and conditions
            </div>
            <button className="btn btn-success my-2" onClick={registerBtnOnClick} disabled={!agree}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
