import React, { forwardRef } from 'react';

const FormPdf = forwardRef((formData, ref ) => {
  return (
    <div ref={ref} id="form-pdf" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Orenda Intake Form Submission</h1>
      <h2>Patient Details</h2>
      <p><strong>First Name:</strong> {formData.first_name}</p>
      <p><strong>Last Name:</strong> {formData.last_name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone:</strong> {formData.phone_number}</p>
      <p><strong>Date of Birth:</strong> {formData.date_of_birth}</p>
      <p><strong>Sex Assigned at Birth:</strong> {formData.sex_at_birth}</p>
      <p><strong>Gender:</strong> {formData.gender}</p>

      <h2>Address</h2>
      <p><strong>Address 1:</strong> {formData.address_1}</p>
      <p><strong>Address 2:</strong> {formData.address_2 || 'N/A'}</p>
      <p><strong>City:</strong> {formData.city}</p>
      <p><strong>State:</strong> {formData.state}</p>
      <p><strong>Zip Code:</strong> {formData.zip_code}</p>

      <h2>Appointment Details</h2>
      <p><strong>Reason for Visit:</strong> {formData.reason_for_visit}</p>
      <p><strong>Referral Source:</strong> {formData.referral_source}</p>
      <p><strong>Type of Mental Health Care:</strong> {formData.mental_health_type}</p>

      <h2>Insurance & Payment Info</h2>
      <p><strong>Billing Zip Code:</strong> {formData.billing_zip_code}</p>
      <p><strong>Credit Card Expiration:</strong> {formData.credit_card_expiration}</p>

      <h2>Additional Information</h2>
      <p><strong>Emergency Contact:</strong> {formData.emergency_contact}</p>
      <p><strong>Emergency Contact Number:</strong> {formData.emergency_contact_number}</p>
      <p><strong>Extra Info for Provider:</strong> {formData.extra_info_for_provider}</p>
      <p><strong>Suicidal Thoughts:</strong> {formData.suicidal_thoughts}</p>

      <h2>Terms and Conditions</h2>
      <p><strong>Accepted Terms:</strong> {formData.terms_and_conditions}</p>
    </div>
  );
});

export default FormPdf;