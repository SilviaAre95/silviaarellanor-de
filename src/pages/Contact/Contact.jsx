import React, { useState, useEffect } from "react";
import { Send, Phone, MapPin, Mail } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    try {
      // Using EmailJS to send email
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS result:', result); // Debug log
      
      if (result.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatus("There was an error sending your message.");
      }
    } catch (error) {
      setStatus(`An error occurred: ${error.message}`);
      console.error("Full error:", error);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-main-white min-h-screen"
    >
      <div className="flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-main-darkGrey">
                  Get in Touch
                </h2>
                <p className="text-main-mediumGrey text-lg">
                  Working on a project or just curious about all things data?
                  Drop me a message!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-softBlue/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-accent-softBlue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-darkGrey">Email</h3>
                    <p className="text-main-mediumGrey">silvia.datadev@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-accent-mutedTeal/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent-mutedTeal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-darkGrey">Location</h3>
                    <p className="text-main-mediumGrey">Mexico City | Vienna | Arvada | Tulum</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-main-lightGrey p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg bg-white border ${
                        errors.name ? "border-accent-gentleCoral" : "border-main-mediumGrey/30"
                      } focus:border-accent-softBlue focus:outline-none transition-colors text-main-darkGrey`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="text-accent-gentleCoral text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-lg bg-white border ${
                        errors.email ? "border-accent-gentleCoral" : "border-main-mediumGrey/30"
                      } focus:border-accent-softBlue focus:outline-none transition-colors text-main-darkGrey`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <p className="text-accent-gentleCoral text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className={`w-full px-4 py-3 rounded-lg bg-white border ${
                        errors.subject ? "border-accent-gentleCoral" : "border-main-mediumGrey/30"
                      } focus:border-accent-softBlue focus:outline-none transition-colors text-main-darkGrey`}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                    {errors.subject && (
                      <p className="text-accent-gentleCoral text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg bg-white border ${
                        errors.message ? "border-accent-gentleCoral" : "border-main-mediumGrey/30"
                      } focus:border-accent-softBlue focus:outline-none transition-colors resize-none text-main-darkGrey`}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                    {errors.message && (
                      <p className="text-accent-gentleCoral text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-softBlue text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-accent-mutedTeal transition-colors"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 text-center ${
                    status.includes("success")
                      ? "text-accent-mutedTeal"
                      : "text-accent-gentleCoral"
                  }`}
                >
                  <p>{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
