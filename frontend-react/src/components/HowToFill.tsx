export function HowToFill() {
  return (
    <div className="ciw-card">
      <header className="ciw-card__header">How to fill the intake form</header>
      <p className="ciw-card__lead">
        Use the assistant to draft your request. It will ask clarifying questions and ensure all required
        information is captured before your intake is submitted.
      </p>
      <ol className="ciw-card__steps">
        <li>Identify your project: title, description, FPM ID (if applicable), and target cloud provider.</li>
        <li>Provide your organization (L1/L2/L3/L4) and DWAN contact information.</li>
        <li>Select the service types required (IaaS, PaaS, SaaS, Storage, AI/ML, SSO, SMTP).</li>
        <li>Specify data classification, security artifacts, and connectivity requirements.</li>
        <li>Choose requested environments (Sandbox / Dev / Test / Staging / Prod) and the needed-by date.</li>
        <li>Review the summary and submit. You will receive a tracking ID for your request.</li>
      </ol>
    </div>
  );
}
