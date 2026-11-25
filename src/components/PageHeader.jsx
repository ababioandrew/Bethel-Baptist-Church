import "./PageHeader.css";

export default function PageHeader({ label, title, subtitle, bg }) {
  return (
    <header
      className="page-header"
      style={bg ? { backgroundImage: `url(${bg})` } : undefined}
    >
      <div className="page-header__overlay" />
      <div className="page-header__inner">
        {label && <p className="page-header__eyebrow">{label}</p>}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}