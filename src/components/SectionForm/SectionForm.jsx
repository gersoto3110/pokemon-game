import "./SectionForm.css"

const SectionForm = ({title, className, children}) => {
  return (
    <section className={`section-form ${className}`}>
      <h2>{`${title}`}</h2>
      {children}
    </section>
  )
}

export default SectionForm