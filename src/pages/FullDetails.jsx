import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { membersApi } from "../config/api";
import "./FullDetails.css";

const initialFormData = {
  fullName: "",
  gender: "",
  location: "",
  dateOfBirth: "",
  dateOfEntry: "",
  contacts: "",
  remarks: "",
};

export default function FullDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "Full Name is required";
    if (!formData.gender) next.gender = "Please select gender";
    if (!formData.location.trim()) next.location = "Location is required";
    if (!formData.dateOfBirth) next.dateOfBirth = "Date of Birth is required";
    if (!formData.dateOfEntry) next.dateOfEntry = "Date of Entry is required";
    if (!formData.contacts.trim()) next.contacts = "Contact is required";
    else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.contacts.trim()))
      next.contacts = "Enter a valid contact number";
    if (!formData.remarks.trim()) next.remarks = "Remarks are required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all required fields correctly.",
        confirmButtonColor: "#17365D",
      });
      return;
    }
    setLoading(true);
    const payload = {
      fullName: formData.fullName.trim(),
      gender: formData.gender,
      location: formData.location.trim(),
      dateOfBirth: formData.dateOfBirth,
      dateOfEntry: formData.dateOfEntry,
      contacts: formData.contacts.trim(),
      remarks: formData.remarks.trim(),
    };
    try {
      const result = await membersApi.create(payload);
      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        text: result.message || "Membership details saved successfully!",
        confirmButtonColor: "#17365D",
      });
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="membership-details-container">
      <div className="membership-details-card">
        <div className="card-header">
          <h3>{t("details.title")}</h3>
          <button
            className="dashboard-nav-btn"
            onClick={() => navigate("/MembersDashboard")}
            type="button"
          >
            <span aria-hidden="true">⌂</span> {t("details.dashboard")}
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {[
            { id: "fullName", label: t("details.fullName"), type: "text" },
            { id: "location", label: t("details.location"), type: "text" },
            { id: "dateOfBirth", label: t("details.dob"), type: "date" },
            { id: "dateOfEntry", label: t("details.doe"), type: "date" },
            { id: "contacts", label: t("details.contacts"), type: "tel" },
          ].map((f) => (
            <div className="form-group" key={f.id}>
              <label htmlFor={f.id}>
                {f.label} <span>*</span>
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                value={formData[f.id]}
                onChange={handleChange}
                placeholder={`Enter ${f.label.toLowerCase()}`}
                className={errors[f.id] ? "input-error" : ""}
                aria-invalid={!!errors[f.id]}
                aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
              />
              {errors[f.id] && (
                <small id={`${f.id}-error`} className="error-message">
                  {errors[f.id]}
                </small>
              )}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="gender">{t("details.gender")} <span>*</span></label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "input-error" : ""}
            >
              <option value="">{t("details.selectGender")}</option>
              <option value="Male">{t("details.male")}</option>
              <option value="Female">{t("details.female")}</option>
              <option value="Other">{t("details.other")}</option>
            </select>
            {errors.gender && <small className="error-message">{errors.gender}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="remarks">{t("details.remarks")} <span>*</span></label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="4"
              className={errors.remarks ? "input-error" : ""}
            />
            {errors.remarks && <small className="error-message">{errors.remarks}</small>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" /> {t("details.submitting")}
              </>
            ) : (
              t("details.submit")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}