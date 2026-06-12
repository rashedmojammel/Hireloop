'use client';
import { useState } from "react";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 9h12" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const seekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "forever",
    tagline: "Start your search",
    description: "Essential tools to organize and track your job hunt.",
    features: [
      "Save up to 10 jobs",
      "3 applications per month",
      "Basic profile page",
      "Standard email alerts",
    ],
    cta: "Get started",
    popular: false,
    accent: "#94a3b8",
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "per month",
    tagline: "Land the role faster",
    description: "Everything serious candidates need to move quickly and stay organized.",
    features: [
      "30 applications per month",
      "Unlimited saved jobs",
      "Application tracking dashboard",
      "Full salary insights & benchmarks",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    accent: "#6366f1",
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "per month",
    tagline: "Front of the queue",
    description: "Uncapped applications and direct visibility into recruiter feeds.",
    features: [
      "Unlimited applications",
      "Profile boost to recruiter feeds",
      "Early access to new listings",
      "24/7 priority support",
    ],
    cta: "Go Premium",
    popular: false,
    accent: "#a78bfa",
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id: "recruiter_free",
    price: "$0",
    period: "forever",
    tagline: "First hires covered",
    description: "A solid baseline for early-stage teams just starting to hire.",
    features: [
      "3 active job posts",
      "Basic applicant pipeline",
      "Standard listing visibility",
      "Community support",
    ],
    cta: "Start posting",
    popular: false,
    accent: "#94a3b8",
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "$49",
    period: "per month",
    tagline: "Scale your team",
    description: "For expanding companies running multiple hiring tracks at once.",
    features: [
      "10 active job posts",
      "Automated applicant tracking",
      "Listing performance analytics",
      "Dedicated email support",
    ],
    cta: "Scale hiring",
    popular: true,
    accent: "#6366f1",
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "$149",
    period: "per month",
    tagline: "Talent at scale",
    description: "High-throughput operations for continuous large-scale acquisition.",
    features: [
      "50 active job posts",
      "Advanced analytics dashboard",
      "Featured listing boosts",
      "Multi-seat team collaboration",
      "Custom branding options",
      "Dedicated account manager",
    ],
    cta: "Contact us",
    popular: false,
    accent: "#a78bfa",
  },
];

const faqs = [
  {
    question: "Can I cancel at any time?",
    answer: "Yes. All plans are month-to-month with no lock-in. Cancel, downgrade, or switch anytime from your billing dashboard — no penalties.",
  },
  {
    question: "How do refunds work?",
    answer: "We offer a 14-day satisfaction guarantee. If the plan isn't working for you within the first two weeks, contact support for a full refund.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "Visa, Mastercard, Amex, and Discover. Enterprise customers can also arrange monthly or annual invoicing by bank transfer.",
  },
  {
    question: "What happens when I switch plans mid-month?",
    answer: "Upgrades take effect immediately — unused days are credited to your next invoice. Downgrades kick in at the start of your next billing cycle.",
  },
];

export default function PricingPage() {
  const [target, setTarget] = useState("seeker");
  const [openFaq, setOpenFaq] = useState(null);

  const plans = target === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c18",
      color: "#e8e8f0",
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: "0 1rem",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "80px 0 100px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: 14,
          }}>Pricing</span>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "#f4f4f8",
            margin: "0 0 16px",
          }}>
            Plans built around<br/>
            <span style={{ color: "#6366f1" }}>your next move.</span>
          </h1>
          <p style={{
            fontSize: 15,
            color: "#8b8ba8",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Whether you're hunting for a role or building a team, pick the plan that matches your pace.
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
          <div style={{
            background: "#111625",
            border: "1px solid #1e2438",
            borderRadius: 12,
            padding: 4,
            display: "flex",
            gap: 4,
          }}>
            {[
              { id: "seeker", label: "Job Seekers", icon: <PersonIcon /> },
              { id: "recruiter", label: "Recruiters", icon: <BriefcaseIcon /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTarget(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  borderRadius: 9,
                  border: target === id ? "1px solid #2a2f4a" : "1px solid transparent",
                  background: target === id ? "#1a1f35" : "transparent",
                  color: target === id ? "#e8e8f0" : "#64647a",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          alignItems: "start",
          marginBottom: 80,
        }}>
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              style={{
                position: "relative",
                background: plan.popular ? "#10152a" : "#0e1122",
                border: plan.popular ? "1px solid #3b3fd4" : "1px solid #181d30",
                borderRadius: 18,
                padding: "28px 24px 24px",
                marginTop: plan.popular ? -12 : 0,
                boxShadow: plan.popular ? "0 0 0 4px rgba(99,102,241,0.08), 0 24px 64px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {plan.popular && (
                <span style={{
                  position: "absolute",
                  top: -13,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #5b5fef, #7c3aed)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 14px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                }}>
                  Most popular
                </span>
              )}

              {/* Plan header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#0a0e1c",
                  border: "1px solid #1e2438",
                  borderRadius: 8,
                  padding: "5px 10px",
                  marginBottom: 16,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: plan.accent }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: plan.accent, letterSpacing: "0.06em" }}>
                    {plan.tagline}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f4f4f8", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 12, color: "#5a5a72", lineHeight: 1.6, margin: 0, minHeight: 38 }}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                padding: "16px 0",
                borderTop: "1px solid #181d30",
                borderBottom: "1px solid #181d30",
                marginBottom: 20,
              }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: "#f4f4f8", letterSpacing: "-0.04em" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: 12, color: "#5a5a72" }}>{plan.period}</span>
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f, fi) => (
                  <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "#a0a0bc", lineHeight: 1.5 }}>
                    <span style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(99,102,241,0.12)",
                      color: "#818cf8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}>
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                <button
                  type="submit"
                  role="link"
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    borderRadius: 10,
                    border: plan.popular ? "none" : "1px solid #252840",
                    background: plan.popular
                      ? "linear-gradient(135deg, #5b5fef 0%, #7c3aed 100%)"
                      : "#111625",
                    color: plan.popular ? "#fff" : "#9090b0",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "opacity 0.15s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {plan.cta}
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f4f4f8", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
              Common questions
            </h2>
            <p style={{ fontSize: 13, color: "#5a5a72", margin: 0 }}>
              Everything about billing, switching plans, and refunds.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: "#0e1122",
                    border: isOpen ? "1px solid #252840" : "1px solid #161927",
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "border-color 0.15s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      background: "transparent",
                      border: "none",
                      color: "#c8c8e0",
                      fontSize: 13.5,
                      fontWeight: 500,
                      cursor: "pointer",
                      textAlign: "left",
                      gap: 12,
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ color: isOpen ? "#6366f1" : "#3c3c54", flexShrink: 0 }}>
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.25s ease",
                  }}>
                    <p style={{
                      fontSize: 13,
                      color: "#6a6a88",
                      lineHeight: 1.7,
                      margin: 0,
                      padding: "0 16px 16px",
                      borderTop: "1px solid #161927",
                      paddingTop: 12,
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p style={{ textAlign: "center", fontSize: 12, color: "#3a3a52", marginTop: 40 }}>
            Questions about Enterprise pricing?{" "}
            <span style={{ color: "#6366f1", cursor: "pointer" }}>Talk to our team →</span>
          </p>
        </div>

      </div>
    </div>
  );
}