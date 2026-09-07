import { useState, useEffect } from "react";
import { Send, MapPin, Mail, CalendarDays } from "lucide-react";
import emailjs from "@emailjs/browser";

// Google Calendar appointment-schedule link. Create it in Google Calendar
// (click a slot -> "Appointment schedule" -> set availability -> copy the
// booking-page link) and paste it here; the button renders once set.
const BOOKING_URL = "https://calendar.app.google/oJb2PxzPov8obgdD7";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
];

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
    <section id="contact" className="talk">
      <div className="wrap">
        <div className="talk__head">
          <div>
            <span className="talk__rule" aria-hidden="true" />
            <h2>
              <span>Let&rsquo;s build</span>
              <span>something useful.</span>
            </h2>
          </div>

          <div className="talk__aside">
            <p>
              Data platform architecture, GCP / BigQuery and AI-assisted
              delivery.
            </p>

            <div className="talk__cta">
              <a className="solid" href="#contact-form">
                Get in touch
              </a>
              {BOOKING_URL && (
                <a
                  className="plain"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CalendarDays />
                  Book an intro call
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="talk__grid">
          <div className="talk__info">
            <p>
              I take on consulting engagements in data platform architecture and
              GCP/BigQuery, with AI-assisted delivery. That can be a two-week
              audit, a pipeline rescue, or building your data platform end to
              end. For bigger engagements I bring in a small team I&apos;ve
              worked with for years.
            </p>
            <p>
              Tell me what you&apos;re building and I&apos;ll get back to you
              within a couple of days.
            </p>

            <h3>How I work</h3>
            <ul className="talk__principles">
              <li>
                <b>Senior-only.</b> You work with me directly, from first call to
                handover. Nothing gets passed to a junior.
              </li>
              <li>
                <b>Documentation-first.</b> Everything I build arrives explained,
                so your team owns it after I leave.
              </li>
              <li>
                <b>Honest scoping.</b> If something shouldn&apos;t be built,
                I&apos;ll tell you before you pay for it.
              </li>
            </ul>

            <ul className="talk__facts">
              <li>
                <Mail />
                <a href="mailto:silvia.datadev@gmail.com">
                  silvia.datadev@gmail.com
                </a>
              </li>
              <li>
                <MapPin />
                Mexico City | Madrid
              </li>
            </ul>
          </div>

          <form id="contact-form" className="talk__form" onSubmit={handleSubmit} noValidate>
            {FIELDS.map(({ name, label, type }) => (
              <p className="field" key={name}>
                <label htmlFor={`contact-${name}`}>{label}</label>
                <input
                  id={`contact-${name}`}
                  type={type}
                  value={formData[name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: e.target.value })
                  }
                  /* The invalid state is carried by a heavier border and the
                     message below it, not by colour: the palette has no red,
                     and a non-colour cue is the better signal anyway. */
                  aria-invalid={errors[name] ? "true" : undefined}
                  aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
                  className={errors[name] ? "is-invalid" : undefined}
                />
                {errors[name] && (
                  <span className="field__error" id={`contact-${name}-error`}>
                    {errors[name]}
                  </span>
                )}
              </p>
            ))}

            <p className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows="5"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={errors.message ? "is-invalid" : undefined}
              />
              {errors.message && (
                <span className="field__error" id="contact-message-error">
                  {errors.message}
                </span>
              )}
            </p>

            <button type="submit">
              Send message
              <Send />
            </button>

            {status && (
              <p className="talk__status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
