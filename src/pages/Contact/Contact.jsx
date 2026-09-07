import { useState, useEffect } from "react";
import { Send, MapPin, Mail, CalendarDays } from "lucide-react";
import emailjs from '@emailjs/browser';

// Google Calendar appointment-schedule link. Create it in Google Calendar
// (click a slot -> "Appointment schedule" -> set availability -> copy the
// booking-page link) and paste it here; the button renders once set.
const BOOKING_URL = "https://calendar.app.google/oJb2PxzPov8obgdD7";

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
      className="brand-section bg-sea text-abyss min-h-screen"
    >
      <div className="flex items-center relative">
        <div className="brand-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="t-h2 mb-4">Work with me</h2>
                <p className="t-body measure">
                  I take on consulting engagements in data platform architecture
                  and GCP/BigQuery, with AI-assisted delivery. That can be a
                  two-week audit, a pipeline rescue, or building your data
                  platform end to end. For bigger engagements I bring in a small
                  team I&apos;ve worked with for years.
                </p>
                <p className="t-body measure mt-3">
                  Tell me what you&apos;re building and I&apos;ll get back to you
                  within a couple of days.
                </p>

                {BOOKING_URL && (
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-button mt-5"
                  >
                    <CalendarDays className="w-5 h-5" />
                    Book an intro call
                  </a>
                )}

                {/* How I work */}
                <div className="mt-6 space-y-2">
                  <h3 className="t-h3">How I work</h3>
                  <ul className="t-body measure space-y-1.5">
                    <li>
                      <span className="font-semibold">Senior-only.</span>{" "}
                      You work with me directly, from first call to handover.
                      Nothing gets passed to a junior.
                    </li>
                    <li>
                      <span className="font-semibold">Documentation-first.</span>{" "}
                      Everything I build arrives explained, so your team owns it
                      after I leave.
                    </li>
                    <li>
                      <span className="font-semibold">Honest scoping.</span>{" "}
                      If something shouldn&apos;t be built, I&apos;ll tell you
                      before you pay for it.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-abyss text-chrome p-3 rounded-card">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="t-h3">Email</h3>
                    <p className="t-body">silvia.datadev@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-abyss text-chrome p-3 rounded-card">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="t-h3">Location</h3>
                    <p className="t-body">Mexico City | Madrid</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-foam brand-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-card bg-foam text-abyss placeholder:text-deep/70 border-2 ${
                        errors.name ? "border-chrome" : "border-transparent"
                      } focus:border-abyss focus:outline-none transition-colors`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="t-tag text-abyss mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-card bg-foam text-abyss placeholder:text-deep/70 border-2 ${
                        errors.email ? "border-chrome" : "border-transparent"
                      } focus:border-abyss focus:outline-none transition-colors`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <p className="t-tag text-abyss mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className={`w-full px-4 py-3 rounded-card bg-foam text-abyss placeholder:text-deep/70 border-2 ${
                        errors.subject ? "border-chrome" : "border-transparent"
                      } focus:border-abyss focus:outline-none transition-colors`}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                    {errors.subject && (
                      <p className="t-tag text-abyss mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows="4"
                      className={`w-full px-4 py-3 rounded-card bg-foam text-abyss placeholder:text-deep/70 border-2 ${
                        errors.message ? "border-chrome" : "border-transparent"
                      } focus:border-abyss focus:outline-none transition-colors resize-none`}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                    {errors.message && (
                      <p className="t-tag text-abyss mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="brand-button w-full py-3 px-6"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 text-center t-tag ${
                    status.includes("success") ? "text-deep" : "text-abyss"
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
