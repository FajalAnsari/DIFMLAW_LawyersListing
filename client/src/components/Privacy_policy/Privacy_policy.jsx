import React from 'react'
import "../Contect_us/Contect_us.css";

const Privacy_policy = () => {
  return (
    <>
     <div className="container forms mb-5 p-3 shadow" style={{backgroundColor: "var(--second-primary)", borderRadius: "40px",marginTop:"120px"}}>
       <h2 className='text-center font-color'>Privacy Policy</h2>
      <div className='w-75 mx-auto'>
       <p className='fs-6 mt-5 text-white'>Do iT For Me LLC, the parent company of DIFM Law, is committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and disclose your personal information when you use our website.</p>
       <h4 className='font-color'>Information We Collect</h4>
       <p className='fs-6 text-white'>We collect personal information that you provide to us when you register for an account, submit a request for legal services, or contact us with a question or feedback. This information may include your name, email address, phone number, and any other information you choose to provide.</p>
       <h4 className='font-color'>Use of Information</h4>
       <p className='fs-6 text-white'>We use your personal information to provide our services, communicate with you, and improve our website. We may also use your information to send you promotional emails or newsletters, but you can opt-out of these communications at any time.<br />
       <br />
       We do not sell or rent your personal information to third parties. However, we may disclose your information to our affiliates and service providers who assist us in providing our services.
       </p>
       <h4 className='font-color'>Data Security</h4>
       <p className='fs-6 text-white'>We take reasonable measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.</p>
       <h4 className='font-color'>Children's Privacy</h4>
       <p className='fs-6 text-white'>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
       <h4 className='font-color'>Changes to Privacy Policy</h4>
       <p className='fs-6 text-white'>We may update this privacy policy from time to time by posting a new version on our website. We encourage you to review this policy periodically to stay informed about our data practices.</p>
       <h4 className='font-color'>Contact Us</h4>
       <p className='fs-6 mb-5 text-white'>If you have any questions or concerns about our privacy policy, please contact us at <a href="mailto:info@difmlaw.com" className='text-decoration-none font-color'>info@difmlaw.com.</a>
       <br />
       By using our website, you consent to the terms of this privacy policy. If you do not agree to the terms of this privacy policy, please do not use our website.
       </p>
      </div>
    </div>
    </>
  )
}

export default Privacy_policy
